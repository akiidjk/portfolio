import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/projects'
import { useIsMobile } from '../hooks/useBreakpoint'
import { isWebGLAvailable } from '../lib/webgl-support'
import type { Project } from '../types'
import { ProjectDetail } from './ProjectDetail'
import { ProjectsList } from './ProjectsList'

// Pulls in three.js + @react-three/fiber + @react-three/drei + framer-motion
// — hundreds of KB only needed on this one WebGL view. Splitting it out
// keeps that weight off every visitor who never leaves the home page.
const ProjectsSphere = lazy(() =>
  import('./projects-sphere/ProjectsSphere').then((m) => ({ default: m.ProjectsSphere })),
)

const activeCount = PROJECTS.filter((p) => /active|maintained/i.test(p.status)).length

export function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null)
  // Starts false to match SSR (no WebGL there), upgraded after mount.
  const [supportsWebGL, setSupportsWebGL] = useState(false)
  const catalogRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => setSupportsWebGL(isWebGLAvailable()), [])

  return (
    <div style={{ backgroundColor: 'var(--void-black)' }}>
      {/* Hero */}
      <section
        style={{
          padding: isMobile ? '48px 20px' : '80px 40px',
          borderBottom: '1px solid var(--hairline)',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? 32 : 60,
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 'clamp(2.375rem, 9vw, 6.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.045em',
              color: 'var(--phosphor-white)',
              margin: '0 0 28px',
              textTransform: 'uppercase',
              overflowWrap: 'break-word',
            }}
          >
            Built
            <br />
            for the
            <br />
            machine<span style={{ color: 'var(--signal-green)' }}>.</span>
          </h1>

          <p
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 'var(--fs-13)',
              color: 'var(--body-gray)',
              lineHeight: 1.7,
              margin: '0 0 32px',
              maxWidth: 460,
            }}
          >
            Every tool, experiment and system I've shipped from CTF infrastructure to emulators and low-level utilities.
            Filter by domain or search to find something specific.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button
              onClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: 'var(--signal-green)',
                color: 'var(--void-black)',
                border: 'none',
                padding: '14px 28px',
                fontFamily: 'JetBrains Mono',
                fontSize: 'var(--fs-11)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'none',
              }}
            >
              OPEN CATALOG ↓
            </button>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            aspectRatio: '3 / 4',
            overflow: 'hidden',
            border: '1px solid var(--hairline)',
            backgroundColor: 'var(--panel-black)',
          }}
        >
          <img
            src="/assets/hands.jpg"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%) contrast(1.2) brightness(0.85)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--scanline-strong) 2px, var(--scanline-strong) 4px)',
            }}
          />

          {/* Annotation callout */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              right: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: 'rgba(8,8,8,0.75)',
              padding: '10px 12px',
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: 'var(--signal-green)',
                boxShadow: '0 0 6px var(--signal-green)',
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 'var(--fs-10)',
                  color: 'var(--signal-green)',
                  letterSpacing: '0.1em',
                }}
              >
                ACTIVELY MAINTAINED
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 'var(--fs-10)',
                  color: 'var(--body-gray)',
                  letterSpacing: '0.05em',
                }}
              >
                {activeCount} project{activeCount === 1 ? '' : 's'} still evolving
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section ref={catalogRef} style={{ padding: isMobile ? '40px 20px 80px' : '60px 40px 140px' }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 'var(--fs-10)',
            color: 'var(--dim-label)',
            letterSpacing: '0.15em',
            marginBottom: 32,
          }}
        >
          [ {PROJECTS.length} RESULT{PROJECTS.length === 1 ? '' : 'S'} ]
        </div>

        {supportsWebGL ? (
          <Suspense fallback={<ProjectsList projects={PROJECTS} onSelect={setSelected} />}>
            <ProjectsSphere projects={PROJECTS} onOpen={setSelected} />
          </Suspense>
        ) : (
          <ProjectsList projects={PROJECTS} onSelect={setSelected} />
        )}
      </section>

      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
