import { useState } from 'react'
import { useIsMobile } from '../hooks/useBreakpoint'

const LINKS = [
  { path: '/', label: '[00]', aria: 'Home' },
  { path: '/projects', label: '[01]', aria: 'Projects' },
  { path: '/experience', label: '[02]', aria: 'Experience' },
  { path: '/about', label: '[03]', aria: 'About' },
  { path: '/contact', label: '[04]', aria: 'Contact' },
]

// DESIGN.md's signature corner-bracket "reticle" device — a target-lock
// frame around the one focal, personal element on the page.
function ReticleCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 8
  const base: React.CSSProperties = { position: 'absolute', width: size, height: size }
  const sides: Record<typeof position, React.CSSProperties> = {
    tl: { top: -4, left: -4, borderTop: '1px solid var(--active-gray)', borderLeft: '1px solid var(--active-gray)' },
    tr: { top: -4, right: -4, borderTop: '1px solid var(--active-gray)', borderRight: '1px solid var(--active-gray)' },
    bl: {
      bottom: -4,
      left: -4,
      borderBottom: '1px solid var(--active-gray)',
      borderLeft: '1px solid var(--active-gray)',
    },
    br: {
      bottom: -4,
      right: -4,
      borderBottom: '1px solid var(--active-gray)',
      borderRight: '1px solid var(--active-gray)',
    },
  }
  return <div style={{ ...base, ...sides[position] }} />
}

// Bracket codes ([00]-[04]) are the resting state; the real section name
// surfaces only on hover/focus, so sighted first-time visitors get a label
// without the nav losing its terminal-readout look at rest.
function NavLink({
  link,
  active,
  isMobile,
  navigate,
}: {
  link: (typeof LINKS)[number]
  active: boolean
  isMobile: boolean
  navigate: (to: string) => void
}) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
    >
      <a
        href={link.path}
        aria-label={link.aria}
        aria-current={active ? 'page' : undefined}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          e.preventDefault()
          navigate(link.path)
        }}
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: isMobile ? 'var(--fs-9)' : 'var(--fs-10)',
          letterSpacing: isMobile ? '0.02em' : '0.1em',
          textDecoration: 'none',
          color: active ? 'var(--phosphor-white)' : 'var(--dim-label)',
          transition: 'color 0.2s',
        }}
      >
        {link.label}
      </a>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: `translateX(-50%) translateY(${revealed ? '4px' : '0px'})`,
          marginTop: 6,
          padding: '3px 6px',
          whiteSpace: 'nowrap',
          fontFamily: 'JetBrains Mono',
          fontSize: 'var(--fs-8)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--phosphor-white)',
          backgroundColor: 'var(--panel-black)',
          border: '1px solid var(--hairline)',
          pointerEvents: 'none',
          opacity: revealed ? 1 : 0,
          transition: 'opacity 0.15s, transform 0.15s',
        }}
      >
        {link.aria}
      </span>
    </div>
  )
}

export function Nav({ active, navigate }: { active: string; navigate: (to: string) => void }) {
  const isMobile = useIsMobile()
  const current = LINKS.find((l) => l.path === active)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '12px 16px' : '18px 40px',
        borderBottom: '1px solid var(--hairline)',
        backgroundColor: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 18, minWidth: 0 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src="/assets/spidy.jpg"
            alt="Logo"
            style={{
              width: isMobile ? 32 : 48,
              height: isMobile ? 32 : 48,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid var(--hairline)',
              transform: 'scaleX(-1)',
              display: 'block',
            }}
          />
          <ReticleCorner position="tl" />
          <ReticleCorner position="tr" />
          <ReticleCorner position="bl" />
          <ReticleCorner position="br" />
        </div>

        {current && !isMobile && (
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 'var(--fs-11)',
              color: 'var(--phosphor-white)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {current.aria}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: isMobile ? 8 : 28, alignItems: 'center' }}>
        {LINKS.map((l) => (
          <NavLink key={l.path} link={l} active={active === l.path} isMobile={isMobile} navigate={navigate} />
        ))}
      </div>
    </nav>
  )
}
