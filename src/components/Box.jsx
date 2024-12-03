import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import fragmentShader from "../glsl/fragmentShader.glsl";
import vertexShader from "../glsl/vertexShader.glsl";
import GameContext from "../context/GameContext";

const BOX_SIZE = 0.03;

function Boxes({ box, cb, name }) {
  const ref = useRef([]);
  const rigidRef = useRef([]);
  const { setScore } = React.useContext(GameContext);

  const [dissolveBox, updateDissolveBox] = useState(false);

  // Define the shader uniforms with memoization to optimize performance
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: [0, 0] },
      uDissolveProgress: { value: 1.0 },
    }),
    []
  );

  useFrame(() => {
    if (dissolveBox) {
      const dissolveProgress = ref.current.material.uniforms.uDissolveProgress.value;
      if (dissolveProgress > 0) {
        ref.current.material.uniforms.uDissolveProgress.value -= 0.08;
      } else {
        cb(name);
      }
    }
  });

  return (
    <RigidBody
      key={box.name}
      colliders='cuboid'
      ref={rigidRef}
      onCollisionEnter={() => {
        !dissolveBox && setScore();
        updateDissolveBox(true); // Add to dissolve list
      }}
      name={box.name}
      position={[box.position.x, box.position.y, box.position.z]}
      rotation={[box.rotation.x, box.rotation.y, box.rotation.z]}
    >
      <mesh ref={ref}>
        <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
        <shaderMaterial
          uniforms={uniforms} // Assign unique uniforms per box
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
        />
      </mesh>
    </RigidBody>
  );
}

export default Boxes;
