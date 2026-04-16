import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Box3, Vector3 } from "three";
import { useAtom } from "jotai";
import { pageAtom } from "./UI";
import { a, useSpring } from "@react-spring/three";

// ╔══════════════════════════════════════════════╗
// ║  PRELOAD TẤT CẢ MODEL NGAY KHI APP KHỞI ĐỘNG  ║
// ║  => Không bao giờ hiện loading khi lật trang    ║
// ╚══════════════════════════════════════════════╝
useGLTF.preload("/models/nongnghiep.glb");
useGLTF.preload("/models/cloude.glb");
useGLTF.preload("/models/nhamay.glb");
useGLTF.preload("/models/model1.glb");
useGLTF.preload("/models/vuongmien.glb");

/** Generic GLB Loader — auto-scales and auto-centers the 3D model */
const GenericGLBPopup = ({
  url,
  targetSize = 0.8,
  positionOffset = [0, 0, 0],
}) => {
  const { scene } = useGLTF(url);

  const { clonedScene, normalizedScale, offset } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new Box3().setFromObject(cloned);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim === 0)
      return { clonedScene: cloned, normalizedScale: 1, offset: [0, 0, 0] };

    const s = targetSize / maxDim;

    // Tối ưu: tắt shadow trên mesh, dùng ContactShadows thay thế
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.material) {
          child.material.envMapIntensity = 0.6;
        }
        child.frustumCulled = true;
      }
    });

    return {
      clonedScene: cloned,
      normalizedScale: s,
      offset: [
        -center.x * s + positionOffset[0],
        -box.min.y * s + positionOffset[1],
        -center.z * s + positionOffset[2],
      ],
    };
  }, [scene, targetSize, positionOffset]);

  return (
    <primitive object={clonedScene} scale={normalizedScale} position={offset} />
  );
};

/* ══════════════════════════════════════════════
   PopupWrapper — spring animation for pop-up book effect
   ══════════════════════════════════════════════ */
const PopupWrapper = ({ children, visible, riseHeight = 0.3, delay = 0 }) => {
  const { position, scale } = useSpring({
    position: visible ? [0, 0, 0] : [0, -riseHeight, 0],
    scale: visible ? 1 : 0.01,
    delay: visible ? delay : 0,
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <a.group position={position} scale={scale}>
      {children}
    </a.group>
  );
};

/* ══════════════════════════════════════════════
   PopupElements — TẤT CẢ model luôn mounted (đã preload)
   Chỉ hiện/ẩn bằng PopupWrapper spring animation
   => KHÔNG BAO GIỜ hiện loading khi lật trang
   ══════════════════════════════════════════════ */
export const PopupElements = () => {
  const [page] = useAtom(pageAtom);

  return (
    <group position={[0, 0.1, 0]} rotation={[Math.PI / 4, 0, 0]}>
      {/* Page 1: Tồn tại XH (Nông nghiệp) + Ý thức XH (Cloud) */}
      <PopupWrapper visible={page === 1} riseHeight={0.3}>
        {page === 1 && (
          <group>
            <GenericGLBPopup url="/models/nongnghiep.glb" />
            <GenericGLBPopup
              url="/models/cloude.glb"
              targetSize={0.375}
              positionOffset={[0, 0.375, 0]}
            />
          </group>
        )}
      </PopupWrapper>

      {/* Page 2: Công nhân — Nhà máy */}
      <PopupWrapper visible={page === 2} riseHeight={0.25}>
        {page === 2 && <GenericGLBPopup url="/models/nhamay.glb" />}
      </PopupWrapper>

      {/* Page 3: Sinh viên */}
      <PopupWrapper visible={page === 3} riseHeight={0.3}>
        {page === 3 && <GenericGLBPopup url="/models/model1.glb" />}
      </PopupWrapper>

      {/* Page 4: Doanh nhân — Vương miện */}
      <PopupWrapper visible={page === 4} riseHeight={0.35}>
        {page === 4 && <GenericGLBPopup url="/models/vuongmien.glb" />}
      </PopupWrapper>
    </group>
  );
};
