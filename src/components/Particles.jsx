import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 2000, animate = true, distance = 100 }) => {
  const points = useRef();

  // Generate our positions and velocities
  const [particlesPosition, particlesVelocity] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * distance;
      let y = (Math.random() - 0.5) * distance;
      let z = (Math.random() - 0.5) * distance;

      positions.set([x, y, z], i * 3);

      // Generate a random velocity for each particle (small random values for slow motion)
      const vx = (Math.random() - 0.5) * 0.005;
      const vy = (Math.random() - 0.5) * 0.005;
      const vz = (Math.random() - 0.5) * 0.005;

      velocities.set([vx, vy, vz], i * 3);
    }

    return [positions, velocities];
  }, [count]);

  if (animate) {
    useFrame(state => {
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
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={particlesPosition.length / 3} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color='#767168' sizeAttenuation depthWrite={false} transparent={true} opacity={0.75} />
    </points>
  );
};

export default Particles;
