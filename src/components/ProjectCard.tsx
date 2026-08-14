import { useState } from 'react'
import type { Project } from '../types'
import { useIsMobile } from '../hooks/useBreakpoint'

export function ProjectCard({
  project,
  featured,
  onClick,
}: {
  project: Project
  featured?: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid #1a1a1a',
        backgroundColor: '#0d0d0d',
        overflow: 'hidden',
        cursor: 'none',
        transition: 'border-color 0.3s',
        borderColor: hovered ? '#292929' : '#1a1a1a',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: featured ? (isMobile ? 220 : 360) : (isMobile ? 180 : 240),
          overflow: 'hidden',
          backgroundColor: '#111',
          flexShrink: 0,
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: hovered
              ? 'grayscale(30%) contrast(1.05) brightness(0.9)'
              : 'grayscale(100%) contrast(1.4) brightness(0.7)',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'filter 0.5s, transform 0.6s',
          }}
        />

        {/* Dither pattern overlay — fades on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='2' height='2' fill='%23000' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '4px 4px',
            opacity: hovered ? 0 : 1,
            transition: 'opacity 0.4s',
            pointerEvents: 'none',
          }}
        />

        {/* Scan lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
            opacity: hovered ? 0 : 0.6,
            transition: 'opacity 0.4s',
            pointerEvents: 'none',
          }}
        />

        {/* Hover metadata overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 16,
            background: hovered ? 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)' : 'none',
            transition: 'background 0.3s',
            pointerEvents: 'none',
          }}
        >
          {hovered && (
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 10,
                color: '#C7FF2E',
                lineHeight: 2,
                letterSpacing: '0.1em',
              }}
            >
              <div>DOMAIN · {project.domain}</div>
              <div>STATUS · {project.status}</div>
            </div>
          )}
        </div>

        {/* ID badge */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontFamily: 'JetBrains Mono',
            fontSize: 9,
            color: '#5D5D5D',
            backgroundColor: 'rgba(8,8,8,0.8)',
            padding: '3px 8px',
            letterSpacing: '0.12em',
            border: '1px solid #1a1a1a',
          }}
        >
          {project.id}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: isMobile ? '16px 18px 18px' : '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <h3
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: '-0.025em',
                  color: '#E8E8E3',
                  margin: '0 0 3px',
                }}
              >
                {project.title}
              </h3>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D', letterSpacing: '0.05em' }}>
                {project.subtitle}
              </div>
            </div>
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 9,
                color: project.status === 'ACTIVE' ? '#C7FF2E' : '#3D3D3D',
                border: `1px solid ${project.status === 'ACTIVE' ? 'rgba(199,255,46,0.4)' : '#1a1a1a'}`,
                padding: '2px 7px',
                letterSpacing: '0.1em',
                flexShrink: 0,
                marginLeft: 12,
              }}
            >
              {project.status}
            </span>
          </div>

          <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#666', lineHeight: 1.65, margin: '12px 0 16px' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {project.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 9,
                  color: '#3D3D3D',
                  border: '1px solid #1a1a1a',
                  padding: '2px 7px',
                  letterSpacing: '0.1em',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid #1a1a1a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D' }}>{project.year}</span>
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              color: hovered ? '#E8E8E3' : '#3D3D3D',
              letterSpacing: '0.1em',
              transition: 'color 0.2s',
            }}
          >
            VIEW PROJECT ↗
          </span>
        </div>
      </div>
    </div>
  )
}
