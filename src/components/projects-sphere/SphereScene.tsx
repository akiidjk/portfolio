import { useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Group } from 'three'
import type { Project } from '../../types'
import { fibonacciSphere } from '../../lib/fibonacci-sphere'
import { SpherePoint } from './SpherePoint'

const SPHERE_RADIUS = 2.1
const POINT_RADIUS = SPHERE_RADIUS * 1.04
const ROTATION_SPEED = 0.12

function RotatingGroup({ isPaused, children }: { isPaused: boolean; children: ReactNode }) {
  const groupRef = useRef<Group>(null)
  useFrame((_, delta) => {
    if (isPaused || !groupRef.current) return
    groupRef.current.rotation.y += delta * ROTATION_SPEED
  })
  return <group ref={groupRef}>{children}</group>
}

function Wireframe() {
  return (
    <mesh>
      <sphereGeometry args={[SPHERE_RADIUS, 20, 14]} />
      {/* react-three-fiber passes this straight to THREE.Color, which can't resolve CSS var() — literal, mirrors --active-gray */}
      <meshBasicMaterial color="#404040" wireframe transparent opacity={0.45} />
    </mesh>
  )
}

interface SphereSceneProps {
  projects: Project[]
  matchingIds: Set<string>
  activeId: string | null
  isDragging: boolean
  onActivate: (id: string) => void
  onOpenDetail: (project: Project) => void
  onDismiss: () => void
  onDragStart: () => void
  onDragEnd: () => void
}

export function SphereScene({
  projects,
  matchingIds,
  activeId,
  isDragging,
  onActivate,
  onOpenDetail,
  onDismiss,
  onDragStart,
  onDragEnd,
}: SphereSceneProps) {
  const positions = useMemo(() => fibonacciSphere(projects.length, POINT_RADIUS), [projects.length])

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      onPointerMissed={onDismiss}
    >
      <RotatingGroup isPaused={activeId !== null || isDragging}>
        <Wireframe />
        {projects.map((project, i) => {
          const pos = positions[i]
          if (!pos) return null
          const isMatch = matchingIds.has(project.id)
          const isActive = activeId === project.id
          return (
            <SpherePoint
              key={project.id}
              position={[pos.x, pos.y, pos.z]}
              isActive={isActive}
              isMatch={isMatch}
              onPointerOver={() => {
                if (isMatch) onActivate(project.id)
              }}
              onClick={() => {
                if (!isMatch) return
                if (isActive) onOpenDetail(project)
                else onActivate(project.id)
              }}
            />
          )
        })}
      </RotatingGroup>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        rotateSpeed={0.5}
        onStart={onDragStart}
        onEnd={onDragEnd}
      />
    </Canvas>
  )
}
