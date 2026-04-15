import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { MeshStandardMaterial, Color, Box3, Vector3 } from "three";
import { pageAtom, pages } from "./UI";

/* ── Design Tokens ──────────────────────────── */
const COLORS = {
  accent: "#C5272D",
  olive: "#4A6741",
  text: "#1A1A1A",
  white: "#FAFAF8",
  gray: "#8B8680",
  light: "#d4ccc4",
};

/* ── Shared Materials (pre-created for perf) ── */
const matAccent = new MeshStandardMaterial({ color: new Color(COLORS.accent), roughness: 0.35, metalness: 0.1 });
const matOlive = new MeshStandardMaterial({ color: new Color(COLORS.olive), roughness: 0.35, metalness: 0.1 });
const matDark = new MeshStandardMaterial({ color: new Color(COLORS.text), roughness: 0.4, metalness: 0.05 });
const matWhite = new MeshStandardMaterial({ color: new Color(COLORS.white), roughness: 0.25, metalness: 0 });
const matGray = new MeshStandardMaterial({ color: new Color(COLORS.gray), roughness: 0.45, metalness: 0 });
const matLight = new MeshStandardMaterial({ color: new Color(COLORS.light), roughness: 0.5, metalness: 0 });

/* ══════════════════════════════════════════════
   PopupWrapper — pop-up book style animation
   - Models rise from the book's SPINE (center, x≈0)
   - Face the camera (rotated toward viewer)
   - Sit ON the page, not float high above
   ══════════════════════════════════════════════ */
const PopupWrapper = ({ visible, children, riseHeight = 0.35, delay = 0 }) => {
  const ref = useRef();
  const prog = useRef(0);

  useFrame((_, delta) => {
    const target = visible ? 1 : 0;
    const speed = 3.0 - delay * 2;
    prog.current += (target - prog.current) * Math.min(1, delta * speed);
    if (Math.abs(prog.current - target) < 0.002) prog.current = target;

    const p = prog.current;
    if (ref.current) {
      ref.current.scale.set(p, p, p);
      // Rise from the page surface (Z-axis because book is rotated -PI/4)
      ref.current.position.z = p * riseHeight;
    }
  });

  return (
    <group ref={ref} scale={0}>
      {children}
    </group>
  );
};

/* ══════════════════════════════════════════════
   Popup Sub-Components
   ══════════════════════════════════════════════ */

/** Stick Figure helper */
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

/** Page 1: Lý thuyết — 3 Pillars of "Tồn tại XH" + Arrow */
const PillarsPopup = () => (
  <group>
    {/* 3 pillars */}
    <group position={[-0.25, -0.08, 0]}>
      <mesh position={[0, 0.1, 0]} material={matAccent}><boxGeometry args={[0.12, 0.24, 0.06]} /></mesh>
      <mesh position={[0, -0.04, 0]} material={matLight}><boxGeometry args={[0.15, 0.025, 0.08]} /></mesh>
    </group>
    <group position={[0, -0.08, 0]}>
      <mesh position={[0, 0.07, 0]} material={matOlive}><boxGeometry args={[0.12, 0.19, 0.06]} /></mesh>
      <mesh position={[0, -0.04, 0]} material={matLight}><boxGeometry args={[0.15, 0.025, 0.08]} /></mesh>
    </group>
    <group position={[0.25, -0.08, 0]}>
      <mesh position={[0, 0.08, 0]} material={matDark}><boxGeometry args={[0.12, 0.21, 0.06]} /></mesh>
      <mesh position={[0, -0.04, 0]} material={matLight}><boxGeometry args={[0.15, 0.025, 0.08]} /></mesh>
    </group>
    {/* Common base */}
    <mesh position={[0, -0.13, 0]} material={matGray}>
      <boxGeometry args={[0.8, 0.015, 0.1]} />
    </mesh>
    {/* Arrow: TTXH → YTXH */}
    <mesh position={[0, 0.28, 0]} material={matAccent}>
      <boxGeometry args={[0.35, 0.02, 0.02]} />
    </mesh>
    <mesh position={[0.2, 0.28, 0]} rotation={[0, 0, -Math.PI / 4]} material={matAccent}>
      <coneGeometry args={[0.025, 0.05, 4]} />
    </mesh>
  </group>
);

/** Page 2: Công nhân — Factory GLB model */
const FACTORY_GLB = "/models/nhamay.glb";
const FactoryPopup = () => {
  const { scene } = useGLTF(FACTORY_GLB);

  const { clonedScene, normalizedScale, offset } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 0.45;
    const s = targetSize / maxDim;
    return {
      clonedScene: cloned,
      normalizedScale: s,
      offset: [-center.x * s, -box.min.y * s, -center.z * s],
    };
  }, [scene]);

  return (
    <group>
      <primitive
        object={clonedScene}
        scale={normalizedScale}
        position={offset}
      />
    </group>
  );
};
useGLTF.preload(FACTORY_GLB);

/** Page 3: Sinh viên — University building */
const UniversityPopup = () => (
  <group>
    <mesh position={[0, 0, 0]} material={matOlive}>
      <boxGeometry args={[0.4, 0.16, 0.1]} />
    </mesh>
    <mesh position={[0, 0.13, 0]} rotation={[0, Math.PI / 4, 0]} material={matDark}>
      <coneGeometry args={[0.25, 0.1, 4]} />
    </mesh>
    {[-0.12, -0.04, 0.04, 0.12].map((x, i) => (
      <mesh key={i} position={[x, -0.01, 0.055]} material={matWhite}>
        <cylinderGeometry args={[0.012, 0.012, 0.14, 6]} />
      </mesh>
    ))}
    <mesh position={[0, -0.1, 0.05]} material={matLight}>
      <boxGeometry args={[0.35, 0.02, 0.04]} />
    </mesh>
    <StickFigure position={[-0.3, -0.03, 0.04]} color={matOlive} scale={0.35} />
    <StickFigure position={[0.3, -0.03, 0.04]} color={matOlive} scale={0.35} />
  </group>
);

/** Page 4: Doanh nhân — Office building / skyscraper */
const BuildingPopup = () => (
  <group>
    <mesh position={[0, 0.08, 0]} material={matDark}>
      <boxGeometry args={[0.16, 0.4, 0.1]} />
    </mesh>
    {[0, 0.07, 0.14, 0.21, 0.28].map((y, r) =>
      [-0.035, 0.035].map((x, c) => (
        <mesh key={`${r}-${c}`} position={[x, -0.05 + y, 0.051]} material={matWhite}>
          <boxGeometry args={[0.03, 0.028, 0.004]} />
        </mesh>
      ))
    )}
    <mesh position={[0, -0.1, 0.051]} material={matAccent}>
      <boxGeometry args={[0.04, 0.05, 0.004]} />
    </mesh>
    <mesh position={[0.16, -0.02, 0]} material={matGray}>
      <boxGeometry args={[0.1, 0.2, 0.08]} />
    </mesh>
    <mesh position={[0, 0.33, 0]} material={matGray}>
      <cylinderGeometry args={[0.004, 0.004, 0.08, 4]} />
    </mesh>
  </group>
);

/** Page 5: Tổng kết — Combined mini icons */
const ConclusionPopup = () => (
  <group>
    {/* Mini factory */}
    <group position={[-0.3, 0.01, 0]} scale={0.4}>
      <mesh material={matAccent}><boxGeometry args={[0.2, 0.12, 0.08]} /></mesh>
      <mesh position={[0.05, 0.1, 0]} material={matGray}><cylinderGeometry args={[0.015, 0.018, 0.1, 6]} /></mesh>
      <mesh position={[0.05, 0.18, 0.008]} material={matLight}><sphereGeometry args={[0.016, 6, 6]} /></mesh>
    </group>
    {/* Mini university */}
    <group position={[0, 0.01, 0]} scale={0.4}>
      <mesh material={matOlive}><boxGeometry args={[0.25, 0.1, 0.08]} /></mesh>
      <mesh position={[0, 0.08, 0]} material={matDark}><coneGeometry args={[0.15, 0.06, 4]} /></mesh>
    </group>
    {/* Mini building */}
    <group position={[0.3, 0.03, 0]} scale={0.4}>
      <mesh material={matDark}><boxGeometry args={[0.1, 0.2, 0.06]} /></mesh>
      <mesh position={[0, 0.13, 0]} material={matGray}><cylinderGeometry args={[0.003, 0.003, 0.06, 4]} /></mesh>
    </group>
    {/* Flow arrow */}
    <mesh position={[0, -0.13, 0]} material={matAccent}>
      <boxGeometry args={[0.8, 0.02, 0.02]} />
    </mesh>
    <mesh position={[0.42, -0.13, 0]} rotation={[0, 0, -Math.PI / 2]} material={matAccent}>
      <coneGeometry args={[0.025, 0.05, 4]} />
    </mesh>
  </group>
);

/* ══════════════════════════════════════════════
   Main Export — spine-centered, camera-facing popups
   ══════════════════════════════════════════════ */
export const PopupElements = () => {
  const [page] = useAtom(pageAtom);

  // Popup sits at the book's spine (x=0), slightly above page surface
  // rotation-x tilts model to face camera (book is tilted -PI/4)
  // Each popup faces forward like a real pop-up book

  return (
    <group
      position={[0, 0.1, 0]}
      rotation={[Math.PI / 4, 0, 0]}
    >
      {/* Lý thuyết — Pillars */}
      <PopupWrapper visible={page === 1} riseHeight={0.3} delay={0}>
        <PillarsPopup />
      </PopupWrapper>

      {/* Công nhân — Factory GLB */}
      <PopupWrapper visible={page === 2} riseHeight={0.25} delay={0}>
        <FactoryPopup />
      </PopupWrapper>

      {/* Sinh viên — University */}
      <PopupWrapper visible={page === 3} riseHeight={0.3} delay={0}>
        <UniversityPopup />
      </PopupWrapper>

      {/* Doanh nhân — Building */}
      <PopupWrapper visible={page === 4} riseHeight={0.35} delay={0}>
        <BuildingPopup />
      </PopupWrapper>

      {/* Tổng kết — Combined */}
      <PopupWrapper visible={page === 5} riseHeight={0.25} delay={0}>
        <ConclusionPopup />
      </PopupWrapper>
    </group>
  );
};

