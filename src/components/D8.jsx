import React from "react";
import * as THREE from "three";
import { useConvexPolyhedron, Physics, usePlane } from "@react-three/cannon";
import { Octahedron } from "@react-three/drei";
console.log(useConvexPolyhedron);
const D8 = props => {
  const radius = 4;
  const octahedronGeometry = new THREE.OctahedronGeometry(radius);
  const [ref, api] = useConvexPolyhedron(() => {
    return {
      args: octahedronGeometry,
      mass: 1,
      ...props,
    };
  });

  return (
    <Octahedron args={[radius, radius, radius]} ref={ref} onClick={() => api.applyImpulse([0, 20, 0], [0, 0, 0])} castShadow receiveShadow>
      <meshNormalMaterial attach='material' />
    </Octahedron>
  );
};

export default D8;
