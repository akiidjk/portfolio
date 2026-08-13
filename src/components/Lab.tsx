import { LAB_ITEMS } from '../data/lab-items'
import { LabRow } from './LabRow'
import { SectionHeader } from './SectionHeader'

export function Lab() {
  return (
    <section id="lab" style={{ padding: '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="02" title="LAB" right="EXPERIMENTS + COMPETITIONS + TOOLS" />

      <div style={{ marginTop: 40, border: '1px solid #1a1a1a' }}>
        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '72px 1fr 120px 100px 72px',
            padding: '10px 24px',
            borderBottom: '1px solid #1a1a1a',
            gap: 16,
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
          <LabRow key={item.id} item={item} last={i === LAB_ITEMS.length - 1} />
        ))}
      </div>
    </section>
  )
}
