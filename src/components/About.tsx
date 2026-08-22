import { useIsMobile } from '../hooks/useBreakpoint'
import { SectionHeader } from './SectionHeader'

const FOCUS_AREAS = [
  { area: 'Web Exploitation', tools: 'Burp Suite · CTF' },
  { area: 'Microservices & Distributed Systems', tools: 'Go · Python · TypeScript' },
  { area: 'DevOps & Scalability', tools: 'Docker · Linux · Postgres' },
]

export function About() {
  const isMobile = useIsMobile()

  return (
    <section
      id="about"
      style={{ padding: isMobile ? '56px 20px' : '80px 40px', borderBottom: '1px solid var(--hairline)' }}
    >
      <SectionHeader index="03" title="ABOUT" />

      <div
        style={{
          marginTop: isMobile ? 32 : 48,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'Inter',
              fontWeight: 300,
              fontSize: 'clamp(1.0625rem, 5vw, 1.3125rem)',
              color: 'var(--phosphor-white)',
              lineHeight: 1.5,
              letterSpacing: '-0.025em',
              margin: '0 0 28px',
            }}
          >
            First-year Computer Science student at UNISA, split between breaking web applications in CTFs and studying
            how large-scale systems are designed, deployed, and kept alive.
          </p>
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: 'var(--fs-14)',
              color: 'var(--soft-gray)',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            I know Python, Go well and I've picked up bits of everything else along the way. Most of my time goes to CTFs,
            mainly web exploitation, and to microservices: API design, event-driven pipelines, deployment,
            observability.
          </p>
        </div>

        <div>
          <div
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 'var(--fs-9)',
              color: 'var(--dim-label)',
              letterSpacing: '0.18em',
              marginBottom: 24,
            }}
          >
            ── TECHNICAL FOCUS ──────────────
          </div>
          {FOCUS_AREAS.map((item) => (
            <div
              key={item.area}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 14,
                marginBottom: 14,
                borderBottom: '1px solid var(--divider-black)',
              }}
            >
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: 'var(--fs-13)',
                  color: 'var(--phosphor-white)',
                  fontWeight: 500,
                }}
              >
                {item.area}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 'var(--fs-10)', color: 'var(--dim-label)' }}>
                {item.tools}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
