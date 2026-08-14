import { LAB_ITEMS } from '../data/lab-items'
import { useIsMobile } from '../hooks/useBreakpoint'
import { LabRow } from './LabRow'
import { SectionHeader } from './SectionHeader'

const TABLE_MIN_WIDTH = 560

export function Lab() {
  const isMobile = useIsMobile()

  return (
    <section id="lab" style={{ padding: isMobile ? '56px 20px' : '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="02" title="LAB" right="EXPERIMENTS + COMPETITIONS + TOOLS" />

      <div style={{ marginTop: isMobile ? 24 : 40, border: '1px solid #1a1a1a', overflowX: 'auto' }}>
        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '72px 1fr 120px 100px 72px',
            padding: '10px 24px',
            borderBottom: '1px solid #1a1a1a',
            gap: 16,
            minWidth: TABLE_MIN_WIDTH,
          }}
        >
          {['ID', 'PROJECT', 'TYPE', 'STATUS', 'YEAR'].map((h) => (
            <span
              key={h}
              style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#292929', letterSpacing: '0.15em' }}
            >
              {h}
            </span>
          ))}
        </div>

        {LAB_ITEMS.map((item, i) => (
          <LabRow key={item.id} item={item} last={i === LAB_ITEMS.length - 1} minWidth={TABLE_MIN_WIDTH} />
        ))}
      </div>
      {isMobile && (
        <div
          style={{
            marginTop: 10,
            fontFamily: 'JetBrains Mono',
            fontSize: 9,
            color: '#292929',
            letterSpacing: '0.1em',
          }}
        >
          ← SCROLL FOR MORE →
        </div>
      )}
    </section>
  )
}
