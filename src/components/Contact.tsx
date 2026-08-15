import { useIsMobile } from '../hooks/useBreakpoint'
import { SectionHeader } from './SectionHeader'

const SOCIAL_LINKS = [
  { label: 'GITHUB / INSTAGRAM / X', handle: 'akiidjk' },
  { label: 'LINKEDIN', handle: 'akiidjk', url: 'https://www.linkedin.com/in/francesco-memoli-b05a542ab/' },
  { label: 'CTF TEAM', handle: 'ByteTheCookies', url: 'https://bytethecookies.org' },
]

export function Contact() {
  const isMobile = useIsMobile()

  return (
    <section id="contact" style={{ padding: isMobile ? '56px 20px 60px' : '80px 40px 100px' }}>
      <SectionHeader index="04" title="CONTACT" />

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
              fontSize: 'clamp(36px, 12vw, 96px)',
              letterSpacing: '-0.045em',
              color: 'var(--phosphor-white)',
              margin: '0 0 24px',
              lineHeight: 1,
            }}
          >
            LET'S TALK.
          </h2>
          <a
            href="mailto:akiidjk@proton.me"
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 14,
              color: 'var(--signal-green)',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              display: 'inline-block',
            }}
          >
            akiidjk@proton.me ↗
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
                  fontSize: 9,
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
                  style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: 'var(--body-gray)' }}
                >
                  {link.handle}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: isMobile ? 48 : 80,
          paddingTop: 24,
          borderTop: '1px solid var(--hairline)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 8 : 0,
          justifyContent: 'space-between',
          fontFamily: 'JetBrains Mono',
          fontSize: 9,
          color: 'var(--active-gray)',
          letterSpacing: '0.12em',
        }}
      >
        <span>akiidjk@2026</span>
        <span>TRYING TO DO BETTER</span>
        <span>SALERNO, ITALY — 41.89° N</span>
      </div>
    </section>
  )
}
