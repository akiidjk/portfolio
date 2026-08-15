import { useState } from 'react'
import type { Project } from '../../types'

export function ProjectPreviewCard({
  project,
  onOpen,
  onDismiss,
}: {
  project: Project
  onOpen: () => void
  onDismiss: () => void
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      style={{
        border: '1px solid #1a1a1a',
        backgroundColor: '#0d0d0d',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ position: 'relative', height: 200, flexShrink: 0, overflow: 'hidden', backgroundColor: '#111' }}>
        {imageError ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              color: '#3D3D3D',
              letterSpacing: '0.12em',
            }}
          >
            [ IMAGE UNAVAILABLE ]
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%) contrast(1.3) brightness(0.8)',
            }}
          />
        )}
        <button
          onClick={onDismiss}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'rgba(8,8,8,0.85)',
            border: '1px solid #1a1a1a',
            color: '#999',
            width: 26,
            height: 26,
            lineHeight: 1,
            cursor: 'none',
            fontFamily: 'JetBrains Mono',
            fontSize: 13,
          }}
          aria-label="Close preview"
        >
          ×
        </button>
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
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

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 9,
            color: '#3D3D3D',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          {project.domain}
        </div>
        <h3
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: '-0.03em',
            color: '#E8E8E3',
            margin: '0 0 6px',
          }}
        >
          {project.title}
        </h3>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#5D5D5D', marginBottom: 16 }}>
          {project.subtitle}
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#999', lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {project.stack.slice(0, 4).map((s) => (
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
        <button
          onClick={onOpen}
          style={{
            backgroundColor: '#C7FF2E',
            color: '#080808',
            border: 'none',
            padding: '12px 20px',
            fontFamily: 'JetBrains Mono',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            cursor: 'none',
          }}
        >
          OPEN PROJECT ↗
        </button>
      </div>
    </div>
  )
}
