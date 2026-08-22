import { useMemo, useState } from 'react'
import type { Project } from '../../types'
import { useIsMobile } from '../../hooks/useBreakpoint'
import { ProjectSidePanel } from './ProjectSidePanel'
import { SphereScene } from './SphereScene'

export function ProjectsSphere({
  projects,
  onOpen,
}: {
  /** Full, unfiltered project list — positions on the sphere stay fixed regardless of filtering. */
  projects: Project[]
  onOpen: (project: Project) => void
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  // Still needed: the sphere/panel caption text differs by input mode
  // (tap vs drag), which is real content, not just layout.
  const isMobile = useIsMobile()

  const matchingIds = useMemo(() => new Set(projects.map((p) => p.id)), [projects])
  const activeProject = useMemo(() => projects.find((p) => p.id === activeId) ?? null, [projects, activeId])

  const handleDismiss = () => setActiveId(null)
  const handleSelect = (project: Project) => setActiveId(project.id)

  return (
    <div className="grid grid-cols-1 items-start gap-6 sm:gap-10 wide:grid-cols-[minmax(0,1fr)_360px]">
      <div className="relative h-[320px] border border-hairline bg-[#050505] sm:h-[420px] wide:h-[560px]">
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
        <div className="pointer-events-none absolute bottom-3.5 left-3.5 font-mono text-fs-9 tracking-[0.1em] text-dim-label">
          {isMobile ? 'TAP A POINT' : 'DRAG TO ROTATE'}
        </div>
      </div>

      <ProjectSidePanel
        projects={projects}
        activeProject={activeProject}
        onSelectList={handleSelect}
        onOpen={onOpen}
        onDismiss={handleDismiss}
      />
    </div>
  )
}
