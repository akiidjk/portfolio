import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import type { Project } from '../types'
import { useIsMobile } from '../hooks/useBreakpoint'
import { ProjectDetail } from './ProjectDetail'
import { SectionHeader } from './SectionHeader'
import { SurveillanceTile } from './SurveillanceTile'

const FEED_COUNT = 8
const featuredProjects = PROJECTS.slice(0, FEED_COUNT)

export function Work({ onViewAll }: { onViewAll: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null)
  const isMobile = useIsMobile()

  return (
    <section id="work" style={{ padding: isMobile ? '56px 20px' : '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="01" title="SELECTED WORK" right={`${PROJECTS.length} PROJECTS`} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? 10 : 2,
          marginTop: isMobile ? 24 : 40,
        }}
      >
        {featuredProjects.map((project, i) => (
          <SurveillanceTile key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
        ))}

        {/* Control panel — the one feed that isn't a camera */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 8',
            overflow: 'hidden',
            backgroundColor: '#0d0d0d',
            border: '1px solid #161616',
            padding: isMobile ? '14px 16px' : '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.1em' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#C7FF2E' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'currentColor' }} />
              LIVE
            </span>
            <span style={{ color: '#5D5D5D' }}>PANEL-00</span>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#3D3D3D', letterSpacing: '0.15em', marginBottom: 10 }}>
              [ CURRENT ]
            </div>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontSize: isMobile ? 13 : 14,
                color: '#999',
                lineHeight: 1.5,
                margin: '0 0 12px',
              }}
            >
              Building client projects, competing in weekly CTFs, leveling up in microservices &amp; DevOps.
            </p>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#5D5D5D', lineHeight: 1.9 }}>
              <div>→ Weekly CTFs w/ ByteTheCookies</div>
              <div>→ Microservices &amp; DevOps <span style={{ color: '#C7FF2E' }}>WIP</span></div>
              <div>→ Web exploitation</div>
            </div>
          </div>

          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#1a1a1a', letterSpacing: '0.1em' }}>
            ──────────────
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'flex-end', marginTop: isMobile ? 20 : 24 }}>
        <button
          onClick={onViewAll}
          style={{
            background: 'none',
            border: '1px solid #1a1a1a',
            color: '#5D5D5D',
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
            padding: isMobile ? '14px 18px' : '10px 18px',
            width: isMobile ? '100%' : 'auto',
            cursor: 'none',
            letterSpacing: '0.1em',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#E8E8E3'
            e.currentTarget.style.borderColor = '#292929'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#5D5D5D'
            e.currentTarget.style.borderColor = '#1a1a1a'
          }}
        >
          VIEW ALL PROJECTS ↗
        </button>
      </div>

      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
