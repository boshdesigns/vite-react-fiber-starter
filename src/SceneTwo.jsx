import { Canvas } from "@react-three/fiber";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

import CameraZoom from "./components/CameraZoom";
import { Perf } from "r3f-perf";
import Particles from "./components/Particles";

import TubeAlongSpline from "./components/TubeAlongSpline";
import { OrbitControls } from "@react-three/drei";

export default function App({ gameMode }) {
  return (
    <>
      <Canvas camera={{ fov: 0 }}>
        <OrbitControls />
        {IS_WATCH && <Perf position={"bottom-left"} />}
        <CameraZoom speed={0.3} />
        <fog attach='fog' color={0x272727} near={0} far={6} />
        <Particles animate={false} distance={40} />
        <TubeAlongSpline gameMode={gameMode} />
        <EffectComposer>
          <Glitch
            delay={[5, 10]} // min and max glitch delay
            duration={[0.1, 0.3]} // min and max glitch duration
            strength={[0.3, 0.5]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.75} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
        </EffectComposer>
      </Canvas>
    </>
  );
}
