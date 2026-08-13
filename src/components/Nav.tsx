const LINKS = [
  { id: 'index', label: '[00]' },
  { id: 'work', label: '[01]' },
  { id: 'lab', label: '[02]' },
  { id: 'archive', label: '[03]' },
  { id: 'about', label: '[04]' },
  { id: 'contact', label: '[05]' },
]

export function Nav({ active }: { active: string }) {
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
        padding: '18px 40px',
        borderBottom: '1px solid #1a1a1a',
        backgroundColor: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#E8E8E3', letterSpacing: '0.15em' }}>
        SF™
      </span>

      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              color: active === l.id ? '#E8E8E3' : '#3D3D3D',
              transition: 'color 0.2s',
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 5,
            height: 5,
            backgroundColor: '#C7FF2E',
            borderRadius: '50%',
            boxShadow: '0 0 6px #C7FF2E',
          }}
        />
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#5D5D5D', letterSpacing: '0.1em' }}>
          AVAILABLE
        </span>
      </div>
    </nav>
  )
}
