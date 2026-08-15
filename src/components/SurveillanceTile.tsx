import { useState } from 'react'
import type { Project } from '../types'

function Bracket({ position, active }: { position: 'tl' | 'tr' | 'bl' | 'br'; active: boolean }) {
  const size = 14
  const base: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    transition: 'border-color 0.25s',
    borderColor: active ? '#C7FF2E' : '#2a2a2a',
  }
  const sides: Record<typeof position, React.CSSProperties> = {
    tl: { top: 8, left: 8, borderTop: '1px solid', borderLeft: '1px solid' },
    tr: { top: 8, right: 8, borderTop: '1px solid', borderRight: '1px solid' },
    bl: { bottom: 8, left: 8, borderBottom: '1px solid', borderLeft: '1px solid' },
    br: { bottom: 8, right: 8, borderBottom: '1px solid', borderRight: '1px solid' },
  }
  return <div style={{ ...base, ...sides[position] }} />
}

export function SurveillanceTile({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '16 / 8',
        overflow: 'hidden',
        cursor: 'none',
        backgroundColor: '#050505',
        border: `1px solid ${hovered ? '#292929' : '#161616'}`,
        transition: 'border-color 0.25s',
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: hovered ? 'grayscale(85%) contrast(1.2) brightness(0.55)' : 'grayscale(100%) contrast(1.1) brightness(0.4)',
          transition: 'filter 0.3s',
        }}
      />

      {/* Glitch tear layer */}
      {hovered && (
        <img
          src={project.image}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(0%) saturate(3) hue-rotate(60deg) brightness(0.8)',
            mixBlendMode: 'screen',
            opacity: 0.35,
            animation: 'glitch 0.7s steps(2) infinite',
          }}
        />
      )}

      {/* Scan lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 3px)',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Bracket position="tl" active={hovered} />
      <Bracket position="tr" active={hovered} />
      <Bracket position="bl" active={hovered} />
      <Bracket position="br" active={hovered} />

      {/* Top readout bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 14px',
          fontFamily: 'JetBrains Mono',
          fontSize: 9,
          letterSpacing: '0.1em',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: hovered ? '#C7FF2E' : '#C7FF2E99' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'currentColor', animation: 'blink 1.4s step-end infinite' }} />
          REC
        </span>
        <span style={{ color: '#5D5D5D' }}>CAM-{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Bottom caption bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px 14px 12px',
        }}
      >
        <div
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '-0.01em',
            color: '#E8E8E3',
            marginBottom: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 9,
            color: '#5D5D5D',
            letterSpacing: '0.05em',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.domain.split('/')[0]?.trim()}</span>
          <span style={{ flexShrink: 0, marginLeft: 8 }}>SIG·{project.year}</span>
        </div>
      </div>
    </div>
  )
}
