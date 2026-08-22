import { useEffect, useState } from 'react'
import type { Activity } from './contribution-utils'

interface ContributionsResponse {
  total: Record<string, number>
  contributions: Activity[]
}

interface ContributionsState {
  status: 'loading' | 'success' | 'error'
  activities: Activity[]
  totalCount: number
}

// Client-only by design: SSR never runs this effect, so the server render
// stays independent of a third-party API being up.
export function useGithubContributions(username: string): ContributionsState {
  const [state, setState] = useState<ContributionsState>({ status: 'loading', activities: [], totalCount: 0 })

  useEffect(() => {
    let cancelled = false

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub contributions request failed: ${res.status}`)
        return res.json() as Promise<ContributionsResponse>
      })
      .then((data) => {
        if (cancelled) return
        setState({
          status: 'success',
          activities: data.contributions,
          totalCount: data.total.lastYear ?? Object.values(data.total)[0] ?? 0,
        })
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, status: 'error' }))
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return state
}
