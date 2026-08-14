import { useState } from 'react'
import type { LabItem } from '../types'

export function LabRow({ item, last, minWidth }: { item: LabItem; last: boolean; minWidth?: number }) {
  const [hov, setHov] = useState(false)
  const isWip = item.result === 'WIP'
  const isAbandoned = item.result === 'ABANDONED'

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr 120px 100px 72px',
        alignItems: 'center',
        padding: '15px 24px',
        borderBottom: last ? 'none' : '1px solid #111',
        backgroundColor: hov ? '#0d0d0d' : 'transparent',
        transition: 'background 0.15s',
        cursor: 'none',
        gap: 16,
        minWidth,
      }}
    >
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#3D3D3D', letterSpacing: '0.1em' }}>
        {item.id}
      </span>
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: 14,
          color: hov ? '#E8E8E3' : '#888',
          transition: 'color 0.2s',
          letterSpacing: '-0.01em',
        }}
      >
        {item.title}
      </span>
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#3D3D3D', letterSpacing: '0.08em' }}>
        {item.type}
      </span>
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 10,
          letterSpacing: '0.08em',
          color: isWip ? '#C7FF2E' : isAbandoned ? '#292929' : '#5D5D5D',
        }}
      >
        {item.result}
      </span>
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#292929', textAlign: 'right' }}>
        {item.year}
      </span>
    </div>
  )
}
