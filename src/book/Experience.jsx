import { useRef, useEffect } from "react";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Vector3 } from "three";
import { Book } from "./Book";
import { ModelShowcase } from "./ModelShowcase";
import { PageParticles } from "./PageParticles";
import { viewModeAtom } from "./UI";

/* ── Camera target positions ── */
const SHOWCASE_POS = new Vector3(0, 1.2, 5);
const READING_POS = new Vector3(0, 0.6, 3);

const CameraAnimator = () => {
  const { camera } = useThree();
  const [viewMode] = useAtom(viewModeAtom);
  const animating = useRef(false);
  const prevMode = useRef(viewMode);

  useEffect(() => {
    if (prevMode.current !== viewMode) {
      animating.current = true;
      prevMode.current = viewMode;
    }
  }, [viewMode]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    const target = viewMode === "reading" ? READING_POS : SHOWCASE_POS;
    camera.position.lerp(target, Math.min(1, delta * 3));

    // Stop animating when close enough
    if (camera.position.distanceTo(target) < 0.05) {
      animating.current = false;
    }
  });

  return null;
};

export const Experience = () => {
  return (
    <>
      {/* Smooth camera transition on mode switch */}
      <CameraAnimator />

      {/* Book — always centered */}
      <Float
        rotation-x={-Math.PI / 4}
        floatIntensity={1}
        speed={1}
        rotationIntensity={0.1}
      >
        <Book />
        <PageParticles />
      </Float>

      {/* Model — floats ABOVE the book, centered */}
      <ModelShowcase />

      {/* Full OrbitControls — rotate, pan, zoom freely */}
      <OrbitControls />
      <Environment preset="studio" />
      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.15} />
      </mesh>
    </>
  );
};
