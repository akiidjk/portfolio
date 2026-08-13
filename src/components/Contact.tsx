import { SectionHeader } from './SectionHeader'

const SOCIAL_LINKS = [
  { label: 'GITHUB', handle: 'akiidjk' },
  { label: 'LINKEDIN', handle: 'akiidjk' },
  { label: 'HACKTHEBOX', handle: 'akiidjk' },
  { label: 'CTF TEAM', handle: 'ByteTheCookies' },
]

export function Contact() {
  return (
    <section id="contact" style={{ padding: '80px 40px 100px' }}>
      <SectionHeader index="05" title="CONTACT" />

      <div
        style={{
          marginTop: 80,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 80,
          alignItems: 'flex-end',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: 'clamp(48px, 7vw, 96px)',
              letterSpacing: '-0.045em',
              color: '#E8E8E3',
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
              color: '#C7FF2E',
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
            <div key={link.label} style={{ display: 'flex', gap: 28, justifyContent: 'flex-end', alignItems: 'center' }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#3D3D3D', letterSpacing: '0.15em' }}>
                {link.label}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#999' }}>{link.handle}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 80,
          paddingTop: 24,
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'JetBrains Mono',
          fontSize: 9,
          color: '#292929',
          letterSpacing: '0.12em',
        }}
      >
        <span>akiidjk™ — 2026</span>
        <span>BUILT CLOSE TO THE MACHINE</span>
        <span>SALERNO, ITALY — 41.89° N</span>
      </div>
    </section>
  )
}
