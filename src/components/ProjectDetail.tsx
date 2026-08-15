import { useEffect, useState } from 'react'
import type { Project } from '../types'
import { useIsMobile } from '../hooks/useBreakpoint'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

const CLOSE_DURATION = 220

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const isMobile = useIsMobile()
  const [imageHovered, setImageHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const repoPath = project.detail.find((d) => d.label === 'Repository')?.value
  const githubUrl = repoPath ? `https://github.com/${repoPath}` : undefined

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, CLOSE_DURATION)
  }

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8,8,8,0.96)',
        zIndex: 5000,
        overflowY: 'auto',
        cursor: 'none',
        animation: isClosing ? `overlayFadeIn ${CLOSE_DURATION}ms ease reverse forwards` : 'overlayFadeIn 0.25s ease',
      }}
    >
      <button
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: isMobile ? 16 : 24,
          right: isMobile ? 16 : 24,
          zIndex: 1,
          background: 'rgba(8,8,8,0.9)',
          border: '1px solid var(--hairline)',
          color: 'var(--muted-steel)',
          fontFamily: 'JetBrains Mono',
          fontSize: 11,
          padding: isMobile ? '8px 12px' : '8px 16px',
          cursor: 'none',
          letterSpacing: '0.1em',
        }}
      >
        × CLOSE
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 860,
          margin: '0 auto',
          padding: isMobile ? '90px 20px 60px' : '80px 40px 120px',
          animation: isClosing
            ? `modalSlideUp ${CLOSE_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) reverse forwards`
            : 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: isMobile ? 32 : 48, paddingRight: isMobile ? 90 : 120 }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              color: 'var(--dim-label)',
              letterSpacing: '0.15em',
              marginBottom: 12,
            }}
          >
            {project.id} ──────────────────────── {project.year}
          </div>
          <h2
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 'clamp(28px, 8vw, 64px)',
              letterSpacing: '-0.045em',
              color: 'var(--phosphor-white)',
              margin: 0,
              lineHeight: 1.05,
              overflowWrap: 'break-word',
            }}
          >
            {project.title}
          </h2>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--muted-steel)', marginTop: 8 }}>
            {project.subtitle}
          </div>
        </div>

        {/* Meta table */}
        <div style={{ borderTop: '1px solid var(--hairline)', marginBottom: 48 }}>
          {project.detail.map((d) => (
            <div
              key={d.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '1px solid var(--hairline)',
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 10,
                  color: 'var(--dim-label)',
                  letterSpacing: '0.12em',
                }}
              >
                {d.label}
              </span>
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 11,
                  color: 'var(--phosphor-white)',
                  letterSpacing: '0.05em',
                }}
              >
                {d.value}
              </span>
            </div>
          ))}
        </div>

        {/* Image */}
        <div
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
          style={{
            position: 'relative',
            marginBottom: 48,
            overflow: 'hidden',
            border: `1px solid ${imageHovered ? 'var(--active-gray)' : 'transparent'}`,
            transition: 'border-color 0.3s',
          }}
        >
          {imageError ? (
            <div
              style={{
                width: '100%',
                height: isMobile ? 200 : 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--panel-black)',
                fontFamily: 'JetBrains Mono',
                fontSize: 11,
                color: 'var(--dim-label)',
                letterSpacing: '0.15em',
              }}
            >
              [ IMAGE UNAVAILABLE ]
            </div>
          ) : (
            <>
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImageError(true)}
                style={{
                  width: '100%',
                  height: isMobile ? 200 : 320,
                  objectFit: 'cover',
                  display: 'block',
                  filter: imageHovered
                    ? 'grayscale(60%) contrast(1.15) brightness(0.95)'
                    : 'grayscale(100%) contrast(1.3)',
                  transform: imageHovered ? 'scale(1.03)' : 'scale(1)',
                  transition: 'filter 0.4s, transform 0.5s',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 3px, var(--scanline-light) 3px, var(--scanline-light) 6px)',
                  pointerEvents: 'none',
                }}
              />
            </>
          )}

          {/* Hover overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: isMobile ? 16 : 20,
              background: imageHovered ? 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 55%)' : 'none',
              opacity: imageHovered ? 1 : 0,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 10,
                color: 'var(--signal-green)',
                lineHeight: 2,
                letterSpacing: '0.1em',
              }}
            >
              <div>DOMAIN · {project.domain}</div>
              <div>STATUS · {project.status}</div>
            </div>
          </div>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} on GitHub`}
              style={{
                position: 'absolute',
                bottom: isMobile ? 12 : 16,
                right: isMobile ? 12 : 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                backgroundColor: 'rgba(8,8,8,0.85)',
                border: `1px solid ${imageHovered ? 'var(--signal-green)' : 'var(--hairline)'}`,
                color: imageHovered ? 'var(--signal-green)' : 'var(--muted-steel)',
                cursor: 'none',
                opacity: imageHovered || isMobile ? 1 : 0,
                transform: imageHovered || isMobile ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.3s, transform 0.3s, border-color 0.3s, color 0.3s',
              }}
            >
              <GitHubIcon />
            </a>
          )}
        </div>

        {/* Problem / Approach / Outcome */}
        {[
          { label: 'PROBLEM', content: project.problem },
          { label: 'APPROACH', content: project.approach },
          { label: 'OUTCOME', content: project.outcome },
        ].map((section) => (
          <div key={section.label} style={{ marginBottom: 40 }}>
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 10,
                color: 'var(--dim-label)',
                letterSpacing: '0.2em',
                marginBottom: 16,
              }}
            >
              ── {section.label}
            </div>
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: 16,
                color: 'var(--body-gray)',
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 300,
              }}
            >
              {section.content}
            </p>
          </div>
        ))}

        {/* Stack */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid var(--hairline)',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {project.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 10,
                color: 'var(--muted-steel)',
                border: '1px solid var(--active-gray)',
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
