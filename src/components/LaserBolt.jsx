import React, { useState, useRef, useContext } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import { Vector3, Raycaster, Color } from "three";
import { RigidBody } from "@react-three/rapier";

const SPEED = 3;
const BOLT_LIMIT = 10;

function LaserBolt() {
  const { camera, gl, pointer } = useThree();
  const [bolts, setBolts] = useState([]);
  const boltCount = useRef(0);

  const removeLaserBolt = id => {
    setBolts(prev => prev.filter(bolt => bolt.id !== id));
    boltCount.current--;
  };

  const handleClick = event => {
    if (boltCount.current >= BOLT_LIMIT) return;

    const id = Math.random().toString(36).substring(7);

    // Raycaster to calculate the direction for the laser bolt
    const raycaster = new Raycaster();
    const userPointer = new Vector3(pointer.x, pointer.y, 0.5);
    raycaster.setFromCamera(userPointer, camera);
    const direction = raycaster.ray.direction.clone();
    const startPos = camera.position.clone();

    // Add the new bolt immutably
    setBolts(prev => [...prev, { startPos, position: startPos, direction, id }]);
    boltCount.current++;
  };

  useFrame((state, delta) => {
    const tempPos = new Vector3(); // Temporary vectors for calculations
    const tempDir = new Vector3();

    // Update bolts positions without mutating the state directly
    setBolts(
      prevBolts =>
        prevBolts
          .map(bolt => {
            tempPos.copy(bolt.position); // Clone the bolt's position
            tempDir.copy(bolt.direction).multiplyScalar(SPEED * delta); // Move along direction

            const newPos = tempPos.add(tempDir); // Update position

            // If the bolt has moved past a certain point, remove it
            if (Math.abs(bolt.startPos.z - newPos.z) > 8) {
              removeLaserBolt(bolt.id);
              return null; // This will be filtered out
            }

            // Return the updated bolt without mutating the original one
            return { ...bolt, position: newPos.clone() };
          })
          .filter(Boolean) // Filter out any null values
    );
  });

  React.useEffect(() => {
    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [gl]);

  return (
    <>
      {bolts.map((bolt, index) => (
        <RigidBody
          key={index}
          name={bolt.id}
          colliders='ball'
          position={bolt.position}
          onCollisionEnter={() => {
            removeLaserBolt(bolt.id);
          }}
        >
          <Icosahedron args={[0.02, 2]} material-color={new Color(0x90caf9)} material-transparent={true} />
        </RigidBody>
      ))}
    </>
  );
}

export default LaserBolt;
