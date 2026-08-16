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
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--scanline-strong) 2px, var(--scanline-strong) 4px)',
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
            fontSize: isMobile ? 'var(--fs-9)' : 'var(--fs-10)',
            color: 'var(--dim-label)',
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
            fontSize: 'clamp(2.375rem, 9vw, 6.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
            color: 'var(--phosphor-white)',
            margin: 0,
          }}
        >
          404<span style={{ color: 'var(--signal-green)' }}>_</span>
        </h1>

        <p
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 'var(--fs-12)' : 'var(--fs-13)',
            color: 'var(--muted-steel)',
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
            border: '1px solid var(--hairline)',
            backgroundColor: 'var(--panel-black)',
            padding: isMobile ? '16px 18px' : '18px 24px',
            marginBottom: isMobile ? 28 : 36,
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 'var(--fs-10)' : 'var(--fs-11)',
            color: 'var(--muted-steel)',
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
              border: '1px solid var(--hairline)',
              color: 'var(--muted-steel)',
              fontFamily: 'JetBrains Mono',
              fontSize: 'var(--fs-10)',
              padding: isMobile ? '14px 18px' : '10px 18px',
              cursor: 'none',
              letterSpacing: '0.1em',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--phosphor-white)'
              e.currentTarget.style.borderColor = 'var(--active-gray)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted-steel)'
              e.currentTarget.style.borderColor = 'var(--hairline)'
            }}
          >
            ← BACK TO INDEX
          </button>
        </div>
      </div>
    </section>
  )
}
