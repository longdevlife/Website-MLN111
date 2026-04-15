import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";
import { ModelShowcase } from "./ModelShowcase";
import { PageParticles } from "./PageParticles";

export const Experience = () => {
  return (
    <>
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
