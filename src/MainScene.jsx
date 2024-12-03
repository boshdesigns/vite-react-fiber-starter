import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLocation } from "react-router-dom";

const SceneOneContent = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color='orange' />
  </mesh>
);

const SceneTwoContent = () => (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color='blue' />
  </mesh>
);

const MainScene = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/scene-three":
        return <SceneTwoContent />;
      case "/scene-four":
      default:
        return <SceneOneContent />;
    }
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {renderContent()}
      <OrbitControls />
    </Canvas>
  );
};

export default MainScene;
