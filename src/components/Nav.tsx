import { useIsMobile } from '../hooks/useBreakpoint'

const LINKS = [
  { id: 'index', label: '[00]', aria: 'Home' },
  { id: 'work', label: '[01]', aria: 'Selected Work' },
  { id: 'archive', label: '[02]', aria: 'Archive' },
  { id: 'about', label: '[03]', aria: 'About' },
  { id: 'contact', label: '[04]', aria: 'Contact' },
]

// DESIGN.md's signature corner-bracket "reticle" device — a target-lock
// frame around the one focal, personal element on the page.
function ReticleCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 8
  const base: React.CSSProperties = { position: 'absolute', width: size, height: size }
  const sides: Record<typeof position, React.CSSProperties> = {
    tl: { top: -4, left: -4, borderTop: '1px solid #292929', borderLeft: '1px solid #292929' },
    tr: { top: -4, right: -4, borderTop: '1px solid #292929', borderRight: '1px solid #292929' },
    bl: { bottom: -4, left: -4, borderBottom: '1px solid #292929', borderLeft: '1px solid #292929' },
    br: { bottom: -4, right: -4, borderBottom: '1px solid #292929', borderRight: '1px solid #292929' },
  }
  return <div style={{ ...base, ...sides[position] }} />
}

export function Nav({ active }: { active: string }) {
  const isMobile = useIsMobile()

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
        borderBottom: '1px solid #1a1a1a',
        backgroundColor: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img
          src="/assets/spidy.jpg"
          alt="Logo"
          style={{
            width: isMobile ? 32 : 48,
            height: isMobile ? 32 : 48,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid #1a1a1a',
            transform: 'scaleX(-1)',
            display: 'block',
          }}
        />
        <ReticleCorner position="tl" />
        <ReticleCorner position="tr" />
        <ReticleCorner position="bl" />
        <ReticleCorner position="br" />
      </div>

      <div style={{ display: 'flex', gap: isMobile ? 8 : 28, alignItems: 'center' }}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            aria-label={l.aria}
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: isMobile ? 9 : 10,
              letterSpacing: isMobile ? '0.02em' : '0.1em',
              textDecoration: 'none',
              color: active === l.id ? '#E8E8E3' : '#3D3D3D',
              transition: 'color 0.2s',
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
