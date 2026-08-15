import { useRef } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

interface SpherePointProps {
  position: [number, number, number]
  isActive: boolean
  isMatch: boolean
  onPointerOver: () => void
  onClick: () => void
}

// THREE.Color can't resolve CSS var() — kept as literal hex, mirrored from
// the --signal-green / --hairline tokens in index.css.
const ACCENT_COLOR = new THREE.Color('#c7ff2e')
const MATCH_COLOR = new THREE.Color('#9a9a94')
const DIM_COLOR = new THREE.Color('#2a2a2a')

export function SpherePoint({ position, isActive, isMatch, onPointerOver, onClick }: SpherePointProps) {
  const dotRef = useRef<THREE.Mesh>(null)
  const dotMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const haloMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((_, delta) => {
    const lerpFactor = Math.min(delta * 8, 1)

    const dot = dotRef.current
    const dotMaterial = dotMaterialRef.current
    if (dot && dotMaterial) {
      const targetScale = isActive ? 2.2 : isMatch ? 1 : 0.55
      dot.scale.setScalar(THREE.MathUtils.lerp(dot.scale.x, targetScale, lerpFactor))
      const targetColor = isActive ? ACCENT_COLOR : isMatch ? MATCH_COLOR : DIM_COLOR
      dotMaterial.color.lerp(targetColor, lerpFactor)
      dotMaterial.opacity = THREE.MathUtils.lerp(dotMaterial.opacity, isMatch ? 1 : 0.3, lerpFactor)
    }

    const halo = haloRef.current
    const haloMaterial = haloMaterialRef.current
    if (halo && haloMaterial) {
      const targetScale = isActive ? 3.4 : 1
      halo.scale.setScalar(THREE.MathUtils.lerp(halo.scale.x, targetScale, lerpFactor))
      haloMaterial.opacity = THREE.MathUtils.lerp(haloMaterial.opacity, isActive ? 0.35 : 0, lerpFactor)
    }
  })

  return (
    <group position={position}>
      {/* Larger invisible hit area — makes hover/tap forgiving on a tiny dot */}
      <mesh
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation()
          onPointerOver()
        }}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation()
          onClick()
        }}
      >
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Glow, only visible when active */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial
          ref={haloMaterialRef}
          color={ACCENT_COLOR}
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Visible dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.045, 12, 12]} />
        {/* THREE.Color can't resolve CSS var() — literal, mirrors --muted-steel; overridden imperatively per-frame below */}
        <meshBasicMaterial ref={dotMaterialRef} color="#7a7a7a" transparent opacity={0.6} toneMapped={false} />
      </mesh>
    </group>
  )
}
