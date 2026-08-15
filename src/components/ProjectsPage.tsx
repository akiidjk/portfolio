import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
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
const years = PROJECTS.map((p) => Number(p.year)).filter((y) => !Number.isNaN(y))
const earliestYear = years.length ? Math.min(...years) : undefined

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted-steel)" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function ProjectsPage({ onNavigateHome }: { onNavigateHome: () => void }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('ALL')
  const [selected, setSelected] = useState<Project | null>(null)
  // Starts false to match SSR (no WebGL there), upgraded after mount.
  const [supportsWebGL, setSupportsWebGL] = useState(false)
  const catalogRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => setSupportsWebGL(isWebGLAvailable()), [])

  const categories = useMemo(() => {
    const set = new Set(PROJECTS.map((p) => p.domain.split('/')[0]?.trim() ?? p.domain))
    return ['ALL', ...Array.from(set).sort()]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      const matchesCategory = category === 'ALL' || p.domain.startsWith(category)
      const matchesQuery = !q || [p.title, p.subtitle, p.domain, ...p.stack].join(' ').toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--void-black)' }}>
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '14px 16px' : '18px 40px',
          borderBottom: '1px solid var(--hairline)',
          backgroundColor: 'rgba(8,8,8,0.96)',
          backdropFilter: 'blur(12px)',
          gap: isMobile ? 12 : 24,
        }}
      >
        <button
          onClick={onNavigateHome}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
            fontFamily: 'JetBrains Mono',
            fontSize: 11,
            letterSpacing: '0.1em',
            color: 'var(--muted-steel)',
          }}
        >
          ← INDEX
        </button>

        {!isMobile && (
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 11,
              color: 'var(--phosphor-white)',
              letterSpacing: '0.15em',
              flexShrink: 0,
            }}
          >
            PROJECTS
          </span>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid var(--hairline)',
            padding: '8px 14px',
            flex: isMobile ? 1 : '0 1 auto',
            minWidth: isMobile ? 0 : 200,
          }}
        >
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PROJECTS"
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              flex: 1,
              minWidth: 0,
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              letterSpacing: '0.1em',
              color: 'var(--phosphor-white)',
            }}
          />
        </div>
      </header>

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
          <div
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              color: 'var(--dim-label)',
              letterSpacing: '0.2em',
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            [ CATALOG / {PROJECTS.length.toString().padStart(2, '0')} ENTRIES ]
          </div>

          <h1
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 'clamp(38px, 9vw, 104px)',
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
              fontSize: 13,
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
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                cursor: 'none',
              }}
            >
              OPEN CATALOG ↓
            </button>
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 10,
                color: 'var(--dim-label)',
                letterSpacing: '0.08em',
              }}
            >
              {PROJECTS.length} PROJECTS{earliestYear ? ` · SINCE ${earliestYear}` : ''}
            </span>
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
                  fontSize: 10,
                  color: 'var(--signal-green)',
                  letterSpacing: '0.1em',
                }}
              >
                ACTIVELY MAINTAINED
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 10,
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
            fontSize: 10,
            color: 'var(--active-gray)',
            letterSpacing: '0.15em',
            marginBottom: 32,
          }}
        >
          [ {filtered.length} RESULT{filtered.length === 1 ? '' : 'S'} ]
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              border: '1px solid var(--hairline)',
              padding: '60px 40px',
              textAlign: 'center',
              fontFamily: 'JetBrains Mono',
              fontSize: 12,
              color: 'var(--dim-label)',
              letterSpacing: '0.05em',
            }}
          >
            NO PROJECTS MATCH YOUR SEARCH.
          </div>
        ) : supportsWebGL ? (
          <Suspense fallback={<ProjectsList projects={filtered} onSelect={setSelected} />}>
            <ProjectsSphere projects={PROJECTS} filtered={filtered} onOpen={setSelected} />
          </Suspense>
        ) : (
          <ProjectsList projects={filtered} onSelect={setSelected} />
        )}
      </section>

      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
