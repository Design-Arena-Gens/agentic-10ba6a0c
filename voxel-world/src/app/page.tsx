"use client";

import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Sky, PointerLockControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Player } from "@/components/Player";
import { Cubes } from "@/components/Cubes";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas shadows camera={{ fov: 45 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
          <Physics gravity={[0, -30, 0]}>
            <Cubes />
            <Player />
          </Physics>
          <PointerLockControls />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          </EffectComposer>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}