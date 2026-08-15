import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import type { Project } from '../types'
import { useIsMobile } from '../hooks/useBreakpoint'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'
import { SectionHeader } from './SectionHeader'

// Work assumes at least 4 projects to fill the bento-style layout below.
const [featuredProject, secondProject, thirdProject, fourthProject] = PROJECTS as [Project, Project, Project, Project]

export function Work({ onViewAll }: { onViewAll: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null)
  const isMobile = useIsMobile()

  return (
    <section id="work" style={{ padding: isMobile ? '56px 20px' : '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="01" title="SELECTED WORK" right={`${PROJECTS.length} PROJECTS`} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
          gap: isMobile ? 16 : 2,
          marginTop: isMobile ? 24 : 40,
        }}
      >
        {/* Featured large */}
        <div style={{ gridColumn: isMobile ? 'auto' : '1 / 8' }}>
          <ProjectCard project={featuredProject} featured onClick={() => setSelected(featuredProject)} />
        </div>

        {/* Two stacked right */}
        <div style={{ gridColumn: isMobile ? 'auto' : '8 / 13', display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 2 }}>
          <ProjectCard project={secondProject} onClick={() => setSelected(secondProject)} />
          <ProjectCard project={thirdProject} onClick={() => setSelected(thirdProject)} />
        </div>

        {/* Bottom half */}
        <div style={{ gridColumn: isMobile ? 'auto' : '1 / 7', marginTop: isMobile ? 0 : 2 }}>
          <ProjectCard project={fourthProject} onClick={() => setSelected(fourthProject)} />
        </div>

        {/* Status block */}
        <div
          style={{
            gridColumn: isMobile ? 'auto' : '7 / 13',
            marginTop: isMobile ? 0 : 2,
            border: '1px solid #1a1a1a',
            backgroundColor: '#0d0d0d',
            padding: isMobile ? 24 : 36,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: isMobile ? 20 : 0,
          }}
        >
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D', letterSpacing: '0.2em' }}>
            [ CURRENT ]
          </div>
          <div>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontSize: isMobile ? 18 : 22,
                color: '#E8E8E3',
                lineHeight: 1.4,
                margin: '0 0 28px',
                letterSpacing: '-0.02em',
              }}
            >
              Building private client projects, competing in CTFs with ByteTheCookies every week, and leveling up in microservices and DevOps.
            </p>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#3D3D3D', lineHeight: 2.4 }}>
              <div>→ Weekly CTFs w/ ByteTheCookies</div>
              <div>→ Microservices & DevOps <span style={{ color: '#C7FF2E' }}>WIP</span></div>
              <div>→ Web exploitation</div>
            </div>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#1a1a1a', letterSpacing: '0.1em' }}>
            ────────────────────
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
