import { LEVEL_COLORS } from './contribution-utils'

export function ContributionLegend() {
  return (
    <div className="flex items-center gap-[5px] font-mono text-fs-8 tracking-[0.08em] text-dim-label uppercase">
      <span>Less</span>
      {LEVEL_COLORS.map((color, level) => (
        <span
          key={level}
          className={`h-2.5 w-2.5 rounded-sm ${level === 0 ? 'border border-hairline' : ''}`}
          style={{ backgroundColor: color }}
        />
      ))}
      <span>More</span>
    </div>
  )
}
