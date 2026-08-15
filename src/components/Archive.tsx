import { ARCHIVE_ENTRIES } from '../data/archive-entries'
import { useIsMobile } from '../hooks/useBreakpoint'
import { SectionHeader } from './SectionHeader'

const STATS = [
  { label: 'CTF PARTICIPATIONS', value: '100+' },
  { label: 'PROJECT SHIPPED', value: '10+' },
  { label: 'YEARS ACTIVE', value: '04' },
  { label: 'COFFEE', value: 'A lot' },
]

export function Archive() {
  const isMobile = useIsMobile()

  return (
    <section
      id="archive"
      style={{ padding: isMobile ? '56px 20px' : '80px 40px', borderBottom: '1px solid var(--hairline)' }}
    >
      <SectionHeader index="02" title="ARCHIVE" right="CHRONOLOGICAL" />

      <div
        style={{
          marginTop: isMobile ? 32 : 48,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 260px',
          gap: isMobile ? 40 : 60,
        }}
      >
        {/* Timeline */}
        <div style={{ borderLeft: '1px solid var(--hairline)', paddingLeft: isMobile ? 24 : 36 }}>
          {ARCHIVE_ENTRIES.map((entry, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                display: 'flex',
                gap: isMobile ? 20 : 36,
                paddingBottom: i < ARCHIVE_ENTRIES.length - 1 ? 36 : 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: isMobile ? -29 : -41,
                  top: 5,
                  width: 7,
                  height: 7,
                  border: '1px solid var(--active-gray)',
                  backgroundColor: 'var(--void-black)',
                }}
              />
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 10,
                  color: 'var(--dim-label)',
                  minWidth: 40,
                  paddingTop: 1,
                }}
              >
                {entry.year}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--phosphor-white)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {entry.event}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 5 }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: 'var(--dim-label)' }}>
                    {entry.org}
                  </span>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: 8,
                      color: 'var(--active-gray)',
                      border: '1px solid var(--hairline)',
                      padding: '1px 6px',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {entry.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: 28 }}>
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 9,
                  color: 'var(--dim-label)',
                  letterSpacing: '0.18em',
                  marginBottom: 10,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 56,
                  color: 'var(--phosphor-white)',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
