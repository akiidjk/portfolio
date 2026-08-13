import { useEffect } from 'react'
import type { Project } from '../types'

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8,8,8,0.96)',
        zIndex: 5000,
        overflowY: 'auto',
        cursor: 'none',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 860,
          margin: '0 auto',
          padding: '80px 40px 120px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D', letterSpacing: '0.15em', marginBottom: 12 }}>
              {project.id} ──────────────────────── {project.year}
            </div>
            <h2
              style={{
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: 64,
                letterSpacing: '-0.045em',
                color: '#E8E8E3',
                margin: 0,
                lineHeight: 1,
              }}
            >
              {project.title}
            </h2>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#5D5D5D', marginTop: 8 }}>
              {project.subtitle}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #1a1a1a',
              color: '#5D5D5D',
              fontFamily: 'JetBrains Mono',
              fontSize: 11,
              padding: '8px 16px',
              cursor: 'none',
              letterSpacing: '0.1em',
            }}
          >
            × CLOSE
          </button>
        </div>

        {/* Meta table */}
        <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: 48 }}>
          {project.detail.map((d) => (
            <div
              key={d.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '1px solid #1a1a1a',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D', letterSpacing: '0.12em' }}>
                {d.label}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#E8E8E3', letterSpacing: '0.05em' }}>
                {d.value}
              </span>
            </div>
          ))}
        </div>

        {/* Image */}
        <div style={{ position: 'relative', marginBottom: 48 }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: 320,
              objectFit: 'cover',
              filter: 'grayscale(100%) contrast(1.3)',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 6px)',
            }}
          />
        </div>

        {/* Problem / Approach / Outcome */}
        {[
          { label: 'PROBLEM', content: project.problem },
          { label: 'APPROACH', content: project.approach },
          { label: 'OUTCOME', content: project.outcome },
        ].map((section) => (
          <div key={section.label} style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D', letterSpacing: '0.2em', marginBottom: 16 }}>
              ── {section.label}
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#999', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
              {section.content}
            </p>
          </div>
        ))}

        {/* Stack */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #1a1a1a', display: 'flex', gap: 8 }}>
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 10,
                color: '#5D5D5D',
                border: '1px solid #292929',
                padding: '4px 12px',
                letterSpacing: '0.1em',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
