import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import type { Project } from '../types'
import { useIsMobile } from '../hooks/useBreakpoint'
import { ProjectDetail } from './ProjectDetail'
import { ProjectsList } from './ProjectsList'
import { SectionHeader } from './SectionHeader'

const FEED_COUNT = 8
const featuredProjects = PROJECTS.slice(0, FEED_COUNT)

export function Work({ onViewAll }: { onViewAll: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null)
  const isMobile = useIsMobile()

  return (
    <section id="work" style={{ padding: isMobile ? '56px 20px' : '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="01" title="SELECTED WORK" right={`${PROJECTS.length} PROJECTS`} />

      <div style={{ marginTop: isMobile ? 24 : 40 }}>
        <ProjectsList projects={featuredProjects} onSelect={setSelected} />
      </div>

      {/* Status */}
      <div
        style={{
          marginTop: isMobile ? 24 : 32,
          border: '1px solid #161616',
          backgroundColor: '#0d0d0d',
          padding: isMobile ? '16px 18px' : '18px 24px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 14 : 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'JetBrains Mono',
            fontSize: 9,
            letterSpacing: '0.1em',
            color: '#C7FF2E',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: 'currentColor',
              boxShadow: '0 0 5px #C7FF2E',
            }}
          />
          CURRENT
        </div>
        <p
          style={{
            fontFamily: 'Inter',
            fontWeight: 300,
            fontSize: isMobile ? 13 : 14,
            color: '#999',
            lineHeight: 1.5,
            margin: 0,
            flex: 1,
          }}
        >
          Building client projects, competing in weekly CTFs with ByteTheCookies, and leveling up in microservices &amp;
          DevOps <span style={{ color: '#C7FF2E' }}>WIP</span>.
        </p>
      </div>

      <div
        style={{ display: 'flex', justifyContent: isMobile ? 'stretch' : 'flex-end', marginTop: isMobile ? 20 : 24 }}
      >
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
