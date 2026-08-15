import { useState } from 'react'
import type { Project } from '../types'
import { useIsMobile } from '../hooks/useBreakpoint'

const STACK_PREVIEW_COUNT = 3

function ProjectRow({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  const isActive = /active|maintained/i.test(project.status)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: isMobile ? '32px 1fr auto' : '48px 1fr auto auto 24px',
        alignItems: 'center',
        gap: isMobile ? 12 : 24,
        padding: isMobile ? '16px 4px 16px 14px' : '20px 20px',
        borderBottom: '1px solid #1a1a1a',
        backgroundColor: hovered ? '#0d0d0d' : 'transparent',
        cursor: 'none',
        transition: 'background-color 0.25s',
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: '#C7FF2E',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Index */}
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 11,
          color: hovered ? '#C7FF2E' : '#3D3D3D',
          letterSpacing: '0.05em',
          transition: 'color 0.25s',
        }}
      >
        {String(index + 1).padStart(3, '0')}
      </span>

      {/* Title + meta */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: isMobile ? 15 : 17,
              letterSpacing: '-0.02em',
              color: '#E8E8E3',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              color: '#3D3D3D',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}
          >
            {project.domain.split('/')[0]?.trim()}
          </span>
        </div>

        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 8,
              maxHeight: hovered ? 24 : 0,
              opacity: hovered ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, opacity 0.25s ease',
            }}
          >
            {project.stack.slice(0, STACK_PREVIEW_COUNT).map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 9,
                  color: '#5D5D5D',
                  border: '1px solid #1a1a1a',
                  padding: '2px 8px',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Status + year */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#5D5D5D', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: isActive ? '#C7FF2E' : '#3D3D3D',
              boxShadow: isActive ? '0 0 5px #C7FF2E' : 'none',
              flexShrink: 0,
            }}
          />
          {project.year}
        </div>
      )}

      {/* Arrow */}
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 14,
          color: hovered ? '#E8E8E3' : '#292929',
          transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
          opacity: hovered ? 1 : 0.6,
          transition: 'transform 0.25s ease, color 0.25s, opacity 0.25s',
        }}
      >
        →
      </span>
    </div>
  )
}

export function ProjectsList({
  projects,
  onSelect,
}: {
  projects: Project[]
  onSelect: (project: Project) => void
}) {
  return (
    <div style={{ borderTop: '1px solid #1a1a1a' }}>
      {projects.map((project, i) => (
        <ProjectRow key={project.id} project={project} index={i} onClick={() => onSelect(project)} />
      ))}
    </div>
  )
}
