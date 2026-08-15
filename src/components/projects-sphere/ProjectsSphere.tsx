import { useMemo, useState } from 'react'
import type { Project } from '../../types'
import { useIsMobile } from '../../hooks/useBreakpoint'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ProjectSidePanel } from './ProjectSidePanel'
import { SphereScene } from './SphereScene'

export function ProjectsSphere({
  projects,
  filtered,
  onOpen,
}: {
  /** Full, unfiltered project list — positions on the sphere stay fixed regardless of filtering. */
  projects: Project[]
  /** Currently matching projects (search/category) — non-matching points dim out instead of moving. */
  filtered: Project[]
  onOpen: (project: Project) => void
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const isCompact = useMediaQuery('(max-width: 900px)')
  const isMobile = useIsMobile()

  const matchingIds = useMemo(() => new Set(filtered.map((p) => p.id)), [filtered])
  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [projects, activeId])

  const handleDismiss = () => setActiveId(null)
  const handleSelect = (project: Project) => setActiveId(project.id)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isCompact ? '1fr' : 'minmax(0, 1fr) 360px',
        gap: isMobile ? 24 : 40,
        alignItems: 'start',
      }}
    >
      <div
        style={{
          height: isMobile ? 320 : isCompact ? 420 : 560,
          border: '1px solid #1a1a1a',
          backgroundColor: '#050505',
          position: 'relative',
        }}
      >
        <SphereScene
          projects={projects}
          matchingIds={matchingIds}
          activeId={activeId}
          isDragging={isDragging}
          onActivate={setActiveId}
          onOpenDetail={onOpen}
          onDismiss={handleDismiss}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: 14,
            fontFamily: 'JetBrains Mono',
            fontSize: 9,
            color: '#3D3D3D',
            letterSpacing: '0.1em',
            pointerEvents: 'none',
          }}
        >
          {isMobile ? 'TAP A POINT' : 'DRAG TO ROTATE'}
        </div>
      </div>

      <ProjectSidePanel
        projects={filtered}
        activeProject={activeProject}
        onSelectList={handleSelect}
        onOpen={onOpen}
        onDismiss={handleDismiss}
      />
    </div>
  )
}
