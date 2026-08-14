import type { Project } from '../types'
import { ProjectCard } from './ProjectCard'

/**
 * Plain bento-style grid, used as the accessible fallback for browsers/
 * environments without WebGL support (see lib/webgl-support.ts).
 */
export function ProjectsGrid({
  projects,
  isUnfiltered,
  onSelect,
}: {
  projects: Project[]
  isUnfiltered: boolean
  onSelect: (project: Project) => void
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 2,
      }}
    >
      {projects.map((p, i) => {
        const isHero = isUnfiltered && i === 0
        return (
          <div key={p.id} style={{ gridColumn: isHero ? 'span 2' : 'span 1' }}>
            <ProjectCard project={p} featured={isHero} onClick={() => onSelect(p)} />
          </div>
        )
      })}
    </div>
  )
}
