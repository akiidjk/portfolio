import { formatActivityDate, getMonthLabels, groupByWeeks, LEVEL_COLORS, type Activity } from './contribution-utils'

const LABEL_HEIGHT = 16

export function ContributionGrid({
  activities,
  blockSize = 11,
  gap = 3,
}: {
  activities: Activity[]
  blockSize?: number
  gap?: number
}) {
  const weeks = groupByWeeks(activities)
  const monthLabels = getMonthLabels(weeks)
  const width = weeks.length * (blockSize + gap) - gap
  const height = LABEL_HEIGHT + (blockSize + gap) * 7 - gap

  if (weeks.length === 0) return null

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
        <title>GitHub contribution activity</title>

        {monthLabels.map(({ label, weekIndex }) => (
          <text
            key={weekIndex}
            x={(blockSize + gap) * weekIndex}
            y={0}
            dominantBaseline="hanging"
            style={{ fontFamily: 'JetBrains Mono', fontSize: 9, fill: 'var(--dim-label)', letterSpacing: '0.05em' }}
          >
            {label}
          </text>
        ))}

        {weeks.map((week, weekIndex) =>
          week.map((activity, dayIndex) => {
            if (!activity) return null
            const color = LEVEL_COLORS[Math.min(activity.level, LEVEL_COLORS.length - 1)]

            return (
              <rect
                key={`${weekIndex}-${dayIndex}`}
                x={(blockSize + gap) * weekIndex}
                y={LABEL_HEIGHT + (blockSize + gap) * dayIndex}
                width={blockSize}
                height={blockSize}
                rx={2}
                ry={2}
                fill={color}
                stroke={activity.level === 0 ? 'var(--hairline)' : 'none'}
                style={activity.level === 4 ? { filter: 'drop-shadow(0 0 3px var(--signal-green))' } : undefined}
              >
                <title>
                  {activity.count} contribution{activity.count === 1 ? '' : 's'} on {formatActivityDate(activity.date)}
                </title>
              </rect>
            )
          }),
        )}
      </svg>
    </div>
  )
}
