import { useIsMobile } from '../hooks/useBreakpoint'

export function NotFound({ path, onNavigateHome }: { path: string; onNavigateHome: () => void }) {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isMobile ? '0 20px' : '0 40px',
        textAlign: 'center',
      }}
    >
      {/* Background image, filtered + textured to match the rest of the site */}
      <img
        src="/assets/404_bg.jpg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%) contrast(1.3) brightness(0.55)',
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 25%, rgba(8,8,8,0.92) 100%)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 9 : 10,
            color: '#3D3D3D',
            letterSpacing: '0.2em',
            marginBottom: isMobile ? 16 : 24,
            textTransform: 'uppercase',
          }}
        >
          [ ERR_ROUTE_NOT_FOUND ]
        </div>

        <h1
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 'clamp(38px, 9vw, 104px)',
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
            color: '#E8E8E3',
            margin: 0,
          }}
        >
          404<span style={{ color: '#C7FF2E' }}>_</span>
        </h1>

        <p
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 12 : 13,
            color: '#5D5D5D',
            letterSpacing: '0.02em',
            margin: isMobile ? '16px 0 28px' : '20px 0 36px',
            maxWidth: 420,
          }}
        >
          Whatever you were chasing already walked off-frame.
        </p>

        <div
          style={{
            display: 'inline-block',
            textAlign: 'left',
            border: '1px solid #1a1a1a',
            backgroundColor: '#0d0d0d',
            padding: isMobile ? '16px 18px' : '18px 24px',
            marginBottom: isMobile ? 28 : 36,
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 10 : 11,
            color: '#5D5D5D',
            lineHeight: 2,
            maxWidth: '90vw',
            overflowWrap: 'break-word',
          }}
        >
          <div>→ REQUESTED · {path}</div>
          <div>→ STATUS · 404 NOT FOUND</div>
        </div>

        <div>
          <button
            onClick={onNavigateHome}
            style={{
              background: 'none',
              border: '1px solid #1a1a1a',
              color: '#5D5D5D',
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              padding: isMobile ? '14px 18px' : '10px 18px',
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
            ← BACK TO INDEX
          </button>
        </div>
      </div>
    </section>
  )
}
