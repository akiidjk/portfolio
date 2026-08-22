export interface Activity {
  date: string
  count: number
  level: number
}

export type Week = (Activity | undefined)[]

export interface MonthLabel {
  weekIndex: number
  label: string
}

// Level 0 stays void-black (an "off" cell, per the design system's neutral
// ramp) with a hairline stroke so the grid structure still reads; levels
// 1-4 climb the same ramp and peak in signal green — the busiest days are
// the one thing on this widget that earns the accent.
export const LEVEL_COLORS = [
  'var(--color-void-black)',
  'var(--color-hairline)',
  'var(--color-active-gray)',
  'var(--color-muted-steel)',
  'var(--color-signal-green)',
]

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function dayOfWeek(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay()
}

function monthOf(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCMonth()
}

export function formatActivityDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// Pads the first week so day-of-week columns line up, then chunks into
// 7-day weeks — the same layout GitHub's own calendar uses.
export function groupByWeeks(activities: Activity[]): Week[] {
  if (activities.length === 0) return []

  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date))
  const leadingGap = dayOfWeek(sorted[0]!.date)
  const padded: Week = [...Array(leadingGap).fill(undefined), ...sorted]

  const weeks: Week[] = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }
  return weeks
}

export function getMonthLabels(weeks: Week[]): MonthLabel[] {
  const labels: MonthLabel[] = []

  for (const [weekIndex, week] of weeks.entries()) {
    const first = week.find((activity) => activity !== undefined)
    if (!first) continue

    const label = MONTH_NAMES[monthOf(first.date)]!
    if (labels.at(-1)?.label !== label) labels.push({ label, weekIndex })
  }

  return labels
}
