import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { useEffect, useRef, useState } from "react";

function CameraZoom({ speed }) {
  const { camera } = useThree();
  const zoomRef = useRef(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [fov, setFov] = useState(camera.fov); // store FOV state

  // Start the zoom-in effect when the component mounts
  useEffect(() => {
    zoomRef.current = true;
  }, []);

  useFrame((state, delta) => {
    if (zoomRef.current && !zoomedIn) {
      // Animate FOV manually
      const targetFov = 80; // Target zoom FOV
      const zoomSpeed = speed; // Adjust zoom speed

      // Interpolate FOV towards target
      const newFov = MathUtils.lerp(camera.fov, targetFov, zoomSpeed * delta);
      setFov(newFov);
      camera.fov = newFov;
      camera.updateProjectionMatrix(); // Update projection matrix with the new FOV

      // Stop zooming after reaching target FOV
      if (Math.abs(camera.fov - targetFov) < 0.1) {
        setZoomedIn(true);
        zoomRef.current = false;
      }
    }
  });

  return null;
}

export default CameraZoom;
