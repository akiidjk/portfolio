import type { Activity } from '../components/github/contribution-graph'

const GITHUB_API = 'https://github-contributions-api.jogruber.de/v4'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24h, same cadence the original's unstable_cache used

let cache: { promise: Promise<Activity[]>; fetchedAt: number } | null = null

// No Next.js unstable_cache/server-only here — this app's Bun server is one
// long-running process, so a plain module-scope cache already persists
// across requests the same way. The same function works unchanged
// client-side too (fetch is universal), which is what actually serves this
// SPA's in-app navigations after the first SSR paint.
export function getGithubContributions(username: string): Promise<Activity[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.promise
  }

  const promise = fetch(`${GITHUB_API}/${username}?y=last`)
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub contributions request failed: ${res.status}`)
      return res.json() as Promise<{ contributions: Activity[] }>
    })
    .then((data) => data.contributions)

  promise.catch(() => {
    cache = null // don't let a failure poison the cache for 24h — retry next call
  })

  cache = { promise, fetchedAt: Date.now() }
  return promise
}
