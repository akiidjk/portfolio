import { ARCHIVE_ENTRIES } from '../data/archive-entries'
import { SectionHeader } from './SectionHeader'

const STATS = [
  { label: 'CTF WINS', value: '12+' },
  { label: 'TOOLS SHIPPED', value: '07' },
  { label: 'YEARS ACTIVE', value: '04' },
  { label: 'COFFEE ∞', value: '∞' },
]

export function Archive() {
  return (
    <section id="archive" style={{ padding: '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="03" title="ARCHIVE" right="CHRONOLOGICAL" />

      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 260px', gap: 60 }}>
        {/* Timeline */}
        <div style={{ borderLeft: '1px solid #1a1a1a', paddingLeft: 36 }}>
          {ARCHIVE_ENTRIES.map((entry, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                display: 'flex',
                gap: 36,
                paddingBottom: i < ARCHIVE_ENTRIES.length - 1 ? 36 : 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: -41,
                  top: 5,
                  width: 7,
                  height: 7,
                  border: '1px solid #292929',
                  backgroundColor: '#080808',
                }}
              />
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: 10,
                  color: '#3D3D3D',
                  minWidth: 40,
                  paddingTop: 1,
                }}
              >
                {entry.year}
              </div>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 500, color: '#E8E8E3', letterSpacing: '-0.01em' }}>
                  {entry.event}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 5 }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D' }}>
                    {entry.org}
                  </span>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: 8,
                      color: '#292929',
                      border: '1px solid #1a1a1a',
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
            <div key={s.label} style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: 28 }}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#3D3D3D', letterSpacing: '0.18em', marginBottom: 10 }}>
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  fontSize: 56,
                  color: '#E8E8E3',
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
