import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Sparkles } from "@react-three/drei";
import { useAtom } from "jotai";
import { MeshStandardMaterial, Color, Box3, Vector3 } from "three";
import { pageAtom } from "./UI";

/* ── Shared Materials ── */
const matAccent = new MeshStandardMaterial({ color: new Color("#C5272D"), roughness: 0.35, metalness: 0.1 });
const matOlive = new MeshStandardMaterial({ color: new Color("#4A6741"), roughness: 0.35, metalness: 0.1 });
const matDark = new MeshStandardMaterial({ color: new Color("#1A1A1A"), roughness: 0.4, metalness: 0.05 });
const matWhite = new MeshStandardMaterial({ color: new Color("#FAFAF8"), roughness: 0.25, metalness: 0 });
const matGray = new MeshStandardMaterial({ color: new Color("#8B8680"), roughness: 0.45, metalness: 0 });
const matLight = new MeshStandardMaterial({ color: new Color("#d4ccc4"), roughness: 0.5, metalness: 0 });

/* ══════════════════════════════════════════════
   ShowcaseWrapper — scale in + auto-rotate
   ══════════════════════════════════════════════ */
const ShowcaseWrapper = ({ visible, children }) => {
  const ref = useRef();
  const prog = useRef(0);

  useFrame((_, delta) => {
    const target = visible ? 1 : 0;
    prog.current += (target - prog.current) * Math.min(1, delta * 3);
    if (Math.abs(prog.current - target) < 0.001) prog.current = target;

    if (ref.current) {
      ref.current.scale.setScalar(prog.current);
      if (prog.current > 0.1) {
        ref.current.rotation.y += delta * 0.25;
      }
    }
  });

  return (
    <group ref={ref} scale={0}>
      {children}
    </group>
  );
};

/* ══════════════════════════════════════════════
   Model Components
   ══════════════════════════════════════════════ */

const StickFigure = ({ position = [0, 0, 0], color = matDark, scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.2, 0]} material={color}><sphereGeometry args={[0.045, 10, 10]} /></mesh>
    <mesh position={[0, 0.1, 0]} material={color}><cylinderGeometry args={[0.015, 0.015, 0.14, 6]} /></mesh>
    <mesh position={[-0.05, 0.14, 0]} rotation={[0, 0, Math.PI / 4]} material={color}><cylinderGeometry args={[0.01, 0.01, 0.1, 6]} /></mesh>
    <mesh position={[0.05, 0.14, 0]} rotation={[0, 0, -Math.PI / 4]} material={color}><cylinderGeometry args={[0.01, 0.01, 0.1, 6]} /></mesh>
    <mesh position={[-0.025, -0.02, 0]} rotation={[0, 0, Math.PI / 12]} material={color}><cylinderGeometry args={[0.01, 0.01, 0.12, 6]} /></mesh>
    <mesh position={[0.025, -0.02, 0]} rotation={[0, 0, -Math.PI / 12]} material={color}><cylinderGeometry args={[0.01, 0.01, 0.12, 6]} /></mesh>
  </group>
);

/** Page 1: 3 Pillars */
const PillarsModel = () => (
  <group scale={1.3}>
    <group position={[-0.25, 0, 0]}>
      <mesh position={[0, 0.15, 0]} material={matAccent}><boxGeometry args={[0.12, 0.3, 0.08]} /></mesh>
      <mesh position={[0, -0.02, 0]} material={matLight}><boxGeometry args={[0.15, 0.03, 0.1]} /></mesh>
    </group>
    <group>
      <mesh position={[0, 0.12, 0]} material={matOlive}><boxGeometry args={[0.12, 0.24, 0.08]} /></mesh>
      <mesh position={[0, -0.02, 0]} material={matLight}><boxGeometry args={[0.15, 0.03, 0.1]} /></mesh>
    </group>
    <group position={[0.25, 0, 0]}>
      <mesh position={[0, 0.13, 0]} material={matDark}><boxGeometry args={[0.12, 0.26, 0.08]} /></mesh>
      <mesh position={[0, -0.02, 0]} material={matLight}><boxGeometry args={[0.15, 0.03, 0.1]} /></mesh>
    </group>
    <mesh position={[0, -0.05, 0]} material={matGray}><boxGeometry args={[0.8, 0.02, 0.12]} /></mesh>
    <mesh position={[0, 0.38, 0]} material={matAccent}><boxGeometry args={[0.4, 0.025, 0.025]} /></mesh>
    <mesh position={[0.22, 0.38, 0]} rotation={[0, 0, -Math.PI / 4]} material={matAccent}><coneGeometry args={[0.03, 0.06, 4]} /></mesh>
  </group>
);

/** Page 2: Factory GLB */
const FACTORY_GLB = "/models/nhamay.glb";
const FactoryModel = () => {
  const { scene } = useGLTF(FACTORY_GLB);
  const { clonedScene, normalizedScale, offset } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = 0.8 / maxDim;
    return {
      clonedScene: cloned,
      normalizedScale: s,
      offset: [-center.x * s, -box.min.y * s, -center.z * s],
    };
  }, [scene]);
  return <primitive object={clonedScene} scale={normalizedScale} position={offset} />;
};
useGLTF.preload(FACTORY_GLB);

/** Page 3: University */
const UniversityModel = () => (
  <group scale={1.3}>
    <mesh position={[0, 0.1, 0]} material={matOlive}><boxGeometry args={[0.5, 0.2, 0.15]} /></mesh>
    <mesh position={[0, 0.26, 0]} rotation={[0, Math.PI / 4, 0]} material={matDark}><coneGeometry args={[0.3, 0.12, 4]} /></mesh>
    {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
      <mesh key={i} position={[x, 0.05, 0.085]} material={matWhite}><cylinderGeometry args={[0.015, 0.015, 0.2, 6]} /></mesh>
    ))}
    <mesh position={[0, -0.04, 0.07]} material={matLight}><boxGeometry args={[0.45, 0.03, 0.06]} /></mesh>
    <StickFigure position={[-0.38, 0.02, 0.06]} color={matOlive} scale={0.5} />
    <StickFigure position={[0.38, 0.02, 0.06]} color={matOlive} scale={0.5} />
  </group>
);

/** Page 4: Office Tower */
const BuildingModel = () => (
  <group scale={1.1}>
    <mesh position={[0, 0.2, 0]} material={matDark}><boxGeometry args={[0.2, 0.5, 0.12]} /></mesh>
    {[0, 0.08, 0.16, 0.24, 0.32].map((y, r) =>
      [-0.045, 0.045].map((x, c) => (
        <mesh key={`${r}-${c}`} position={[x, 0.01 + y, 0.061]} material={matWhite}><boxGeometry args={[0.035, 0.03, 0.005]} /></mesh>
      ))
    )}
    <mesh position={[0, -0.02, 0.061]} material={matAccent}><boxGeometry args={[0.05, 0.06, 0.005]} /></mesh>
    <mesh position={[0.2, 0.08, 0]} material={matGray}><boxGeometry args={[0.12, 0.26, 0.1]} /></mesh>
    <mesh position={[0, 0.5, 0]} material={matGray}><cylinderGeometry args={[0.005, 0.005, 0.1, 4]} /></mesh>
  </group>
);

/** Page 5: Conclusion */
const ConclusionModel = () => (
  <group scale={1.1}>
    <group position={[-0.35, 0.02, 0]} scale={0.5}>
      <mesh material={matAccent}><boxGeometry args={[0.25, 0.15, 0.1]} /></mesh>
      <mesh position={[0.06, 0.13, 0]} material={matGray}><cylinderGeometry args={[0.018, 0.022, 0.12, 6]} /></mesh>
    </group>
    <group position={[0, 0.02, 0]} scale={0.5}>
      <mesh material={matOlive}><boxGeometry args={[0.3, 0.12, 0.1]} /></mesh>
      <mesh position={[0, 0.1, 0]} material={matDark}><coneGeometry args={[0.18, 0.07, 4]} /></mesh>
    </group>
    <group position={[0.35, 0.05, 0]} scale={0.5}>
      <mesh material={matDark}><boxGeometry args={[0.12, 0.25, 0.08]} /></mesh>
    </group>
    <mesh position={[0, -0.15, 0]} material={matAccent}><boxGeometry args={[0.9, 0.025, 0.025]} /></mesh>
    <mesh position={[0.48, -0.15, 0]} rotation={[0, 0, -Math.PI / 2]} material={matAccent}><coneGeometry args={[0.03, 0.06, 4]} /></mesh>
  </group>
);

/* ══════════════════════════════════════════════
   SpotlightCone — visible volumetric light beam
   A translucent cone that simulates dramatic lighting
   ══════════════════════════════════════════════ */
const SpotlightCone = ({ visible }) => {
  const coneRef = useRef();
  const prog = useRef(0);

  useFrame((_, delta) => {
    const target = visible ? 1 : 0;
    prog.current += (target - prog.current) * Math.min(1, delta * 2);

    if (coneRef.current) {
      // Pulse opacity subtly
      const pulse = 0.06 + Math.sin(Date.now() * 0.002) * 0.02;
      coneRef.current.material.opacity = pulse * prog.current;
      coneRef.current.scale.setScalar(prog.current);
    }
  });

  return (
    <mesh ref={coneRef} position={[0, 0.8, 0]} scale={0}>
      <coneGeometry args={[0.6, 2.0, 32, 1, true]} />
      <meshBasicMaterial
        color="#C5272D"
        transparent
        opacity={0}
        side={2}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ══════════════════════════════════════════════
   GlowRing — pulsing emissive ring at model base
   Creates a "summoning portal" effect
   ══════════════════════════════════════════════ */
const GlowRing = ({ visible }) => {
  const ringRef = useRef();
  const ringRef2 = useRef();
  const prog = useRef(0);

  useFrame((_, delta) => {
    const target = visible ? 1 : 0;
    prog.current += (target - prog.current) * Math.min(1, delta * 2);

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
      const pulse = 0.3 + Math.sin(Date.now() * 0.003) * 0.15;
      ringRef.current.material.emissiveIntensity = pulse * prog.current;
      ringRef.current.scale.setScalar(prog.current);
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.4;
      ringRef2.current.scale.setScalar(prog.current * 0.85);
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* Outer ring */}
      <mesh ref={ringRef} rotation-x={-Math.PI / 2} scale={0}>
        <torusGeometry args={[0.5, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#C5272D"
          emissive="#C5272D"
          emissiveIntensity={0}
          transparent
          opacity={0.7}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      {/* Inner ring */}
      <mesh ref={ringRef2} rotation-x={-Math.PI / 2} scale={0}>
        <torusGeometry args={[0.35, 0.008, 6, 48]} />
        <meshStandardMaterial
          color="#e8d0c0"
          emissive="#C5272D"
          emissiveIntensity={0.15}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Ground glow disc */}
      {visible && (
        <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
          <circleGeometry args={[0.55, 48]} />
          <meshBasicMaterial
            color="#C5272D"
            transparent
            opacity={0.04}
          />
        </mesh>
      )}
    </group>
  );
};

/* ══════════════════════════════════════════════
   ModelShowcase — floats ABOVE the book, centered
   With volumetric spotlight + glow ring
   ══════════════════════════════════════════════ */
export const ModelShowcase = () => {
  const [page] = useAtom(pageAtom);
  const hasModel = page >= 1 && page <= 5;

  const groupRef = useRef();
  const prog = useRef(0);

  useFrame((_, delta) => {
    const target = hasModel ? 1 : 0;
    prog.current += (target - prog.current) * Math.min(1, delta * 2.5);

    if (groupRef.current) {
      const p = prog.current;
      groupRef.current.position.y = 0.3 + p * 0.8;
      groupRef.current.scale.setScalar(p > 0.02 ? p : 0);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Real spotlight for shadows */}
      <spotLight
        position={[0, 2.5, 1]}
        angle={0.4}
        penumbra={0.7}
        intensity={hasModel ? 4 : 0}
        color="#fff8f0"
        castShadow
      />

      {/* Volumetric light cone — visible beam from above */}
      <SpotlightCone visible={hasModel} />

      {/* Glow ring — pulsing portal at model base */}
      <GlowRing visible={hasModel} />

      {/* Sparkles */}
      {hasModel && (
        <Sparkles
          count={30}
          scale={1.5}
          size={2}
          speed={0.3}
          color="#C5272D"
          opacity={0.25}
        />
      )}

      {/* Models */}
      <ShowcaseWrapper visible={page === 1}>
        <PillarsModel />
      </ShowcaseWrapper>
      <ShowcaseWrapper visible={page === 2}>
        <FactoryModel />
      </ShowcaseWrapper>
      <ShowcaseWrapper visible={page === 3}>
        <UniversityModel />
      </ShowcaseWrapper>
      <ShowcaseWrapper visible={page === 4}>
        <BuildingModel />
      </ShowcaseWrapper>
      <ShowcaseWrapper visible={page === 5}>
        <ConclusionModel />
      </ShowcaseWrapper>
    </group>
  );
};
