// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Box, OrbitControls } from "@react-three/drei";
// import D8 from "./components/D8";
// import { Physics, usePlane, useBox } from "@react-three/cannon";

// function Plane(props) {
//   const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
//   return (
//     <mesh ref={ref} receiveShadow>
//       <planeGeometry args={[1000, 1000]} />
//       <shadowMaterial color='#171717' transparent opacity={0.4} />
//     </mesh>
//   );
// }

// function Cube(props) {
//   const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }));
//   return (
//     <mesh receiveShadow castShadow ref={ref}>
//       <boxGeometry />
//       <meshStandardMaterial color='hotpink' transparent />
//     </mesh>
//   );
// }

// const Scene = () => {
//   return (
//     <Physics gravity={[-1, -1, -5]}>
//       <Plane position={[0, 0, 0]} />
//       <Cube position={[0.1, 5, 0]} />
//       <Cube position={[0, 10, -1]} />
//       <Cube position={[0, 20, -2]} />
//       <ambientLight />
//     </Physics>
//   );
// };

// const SceneOne = () => {
//   return (
//     <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
//       <Scene />
//     </Canvas>
//   );
// };

// export default SceneOne;

import { Perf } from "r3f-perf";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import CameraZoom from "./components/CameraZoom";
import Particles from "./components/Particles";

const CustomGeometryParticles = props => {
  const { count } = props;

  const points = useRef();

  // Generate our positions and velocities
  const [particlesPosition, particlesVelocity] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 100;
      let y = (Math.random() - 0.5) * 100;
      let z = (Math.random() - 0.5) * 100;

      positions.set([x, y, z], i * 3);

      // Generate a random velocity for each particle (small random values for slow motion)
      const vx = (Math.random() - 0.5) * 0.005;
      const vy = (Math.random() - 0.5) * 0.005;
      const vz = (Math.random() - 0.5) * 0.005;

      velocities.set([vx, vy, vz], i * 3);
    }

    return [positions, velocities];
  }, [count]);

  useFrame(state => {
    const { clock } = state;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update position by adding velocity to each axis
      points.current.geometry.attributes.position.array[i3] += particlesVelocity[i3];
      points.current.geometry.attributes.position.array[i3 + 1] += particlesVelocity[i3 + 1];
      points.current.geometry.attributes.position.array[i3 + 2] += particlesVelocity[i3 + 2];

      // Optionally, if you want particles to bounce or change direction
      // when they move outside a certain boundary, you can reverse the velocity.
      const boundary = 50;
      if (Math.abs(points.current.geometry.attributes.position.array[i3]) > boundary) particlesVelocity[i3] *= -1;
      if (Math.abs(points.current.geometry.attributes.position.array[i3 + 1]) > boundary) particlesVelocity[i3 + 1] *= -1;
      if (Math.abs(points.current.geometry.attributes.position.array[i3 + 2]) > boundary) particlesVelocity[i3 + 2] *= -1;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={particlesPosition.length / 3} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color='#767168' sizeAttenuation depthWrite={false} transparent={true} opacity={0.75} />
    </points>
  );
};

const SceneOne = () => {
  return (
    <Canvas camera={{ fov: 0, position: [1.5, 1.5, 1.5] }}>
      {IS_WATCH && <Perf position={"bottom-left"} />}
      <CameraZoom speed={2.5} />
      <ambientLight intensity={0.5} />
      <Particles count={2000} animate={true} />
      <OrbitControls />
    </Canvas>
  );
};

export default SceneOne;
