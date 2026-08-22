import { useIsMobile } from '../hooks/useBreakpoint'

const SOCIAL_LINKS = [
  { label: 'GITHUB / INSTAGRAM / X', handle: 'akiidjk' },
  { label: 'LINKEDIN', handle: 'akiidjk', url: 'https://www.linkedin.com/in/francesco-memoli-b05a542ab/' },
  { label: 'CTF TEAM', handle: 'ByteTheCookies', url: 'https://bytethecookies.org' },
]

export function Contact() {
  const isMobile = useIsMobile()

  return (
    <section id="contact" style={{ padding: isMobile ? '48px 20px 60px' : '80px 40px 100px' }}>
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
        [ SEND SIGNAL ]
      </div>

      <div
        style={{
          marginTop: isMobile ? 48 : 80,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          gap: isMobile ? 40 : 80,
          alignItems: isMobile ? 'flex-start' : 'flex-end',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 'clamp(2.25rem, 12vw, 6rem)',
              letterSpacing: '-0.045em',
              color: 'var(--phosphor-white)',
              margin: '0 0 24px',
              lineHeight: 1,
            }}
          >
            LET'S TALK.
          </h2>
          <a
            href="mailto:me@akiidjk.dev"
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 'var(--fs-14)',
              color: 'var(--signal-green)',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              display: 'inline-block',
            }}
          >
            me@akiidjk.dev ↗
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SOCIAL_LINKS.map((link) => (
            <div
              key={link.label}
              style={{
                display: 'flex',
                gap: 28,
                justifyContent: isMobile ? 'space-between' : 'flex-end',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 'var(--fs-9)',
                  color: 'var(--dim-label)',
                  letterSpacing: '0.15em',
                }}
              >
                {link.label}
              </span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'var(--body-gray)' }}
              >
                <span
                  className="hover:underline transition-all animation"
                  style={{ fontFamily: 'JetBrains Mono', fontSize: 'var(--fs-13)', color: 'var(--body-gray)' }}
                >
                  {link.handle}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
