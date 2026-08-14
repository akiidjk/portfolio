import { useIsMobile } from '../hooks/useBreakpoint'

const LINKS = [
  { id: 'index', label: '[00]' },
  { id: 'work', label: '[01]' },
  { id: 'lab', label: '[02]' },
  { id: 'archive', label: '[03]' },
  { id: 'about', label: '[04]' },
  { id: 'contact', label: '[05]' },
]

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
          flexShrink: 0,
        }}
      />

      <div style={{ display: 'flex', gap: isMobile ? 8 : 28, alignItems: 'center' }}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
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
