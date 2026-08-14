import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import type { Project } from '../types'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'
import { SectionHeader } from './SectionHeader'

// Work assumes at least 4 projects to fill the bento-style layout below.
const [featuredProject, secondProject, thirdProject, fourthProject] = PROJECTS as [Project, Project, Project, Project]

export function Work({ onViewAll }: { onViewAll: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="work" style={{ padding: '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="01" title="SELECTED WORK" right={`${PROJECTS.length} PROJECTS`} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 2,
          marginTop: 40,
        }}
      >
        {/* Featured large */}
        <div style={{ gridColumn: '1 / 8' }}>
          <ProjectCard project={featuredProject} featured onClick={() => setSelected(featuredProject)} />
        </div>

        {/* Two stacked right */}
        <div style={{ gridColumn: '8 / 13', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ProjectCard project={secondProject} onClick={() => setSelected(secondProject)} />
          <ProjectCard project={thirdProject} onClick={() => setSelected(thirdProject)} />
        </div>

        {/* Bottom half */}
        <div style={{ gridColumn: '1 / 7', marginTop: 2 }}>
          <ProjectCard project={fourthProject} onClick={() => setSelected(fourthProject)} />
        </div>

        {/* Status block */}
        <div
          style={{
            gridColumn: '7 / 13',
            marginTop: 2,
            border: '1px solid #1a1a1a',
            backgroundColor: '#0d0d0d',
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D', letterSpacing: '0.2em' }}>
            [ SYS.STATUS ]
          </div>
          <div>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 300,
                fontSize: 22,
                color: '#E8E8E3',
                lineHeight: 1.4,
                margin: '0 0 28px',
                letterSpacing: '-0.02em',
              }}
            >
              Currently deep in TLS 1.3 implementation, binary exploitation research, and compiler internals.
            </p>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#3D3D3D', lineHeight: 2.4 }}>
              <div>→ TLS 1.3 in Zig <span style={{ color: '#C7FF2E' }}>WIP</span></div>
              <div>→ Binary exploitation</div>
              <div>→ Compiler internals</div>
            </div>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#1a1a1a', letterSpacing: '0.1em' }}>
            ────────────────────
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <button
          onClick={onViewAll}
          style={{
            background: 'none',
            border: '1px solid #1a1a1a',
            color: '#5D5D5D',
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
            padding: '10px 18px',
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
