import { LEVEL_COLORS } from './contribution-utils'

export function ContributionLegend() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: 'JetBrains Mono',
        fontSize: 'var(--fs-8)',
        color: 'var(--dim-label)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <span>Less</span>
      {LEVEL_COLORS.map((color, level) => (
        <span
          key={level}
          style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            backgroundColor: color,
            border: level === 0 ? '1px solid var(--hairline)' : 'none',
          }}
        />
      ))}
      <span>More</span>
    </div>
  )
}
