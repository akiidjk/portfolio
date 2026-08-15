import { useCallback, useEffect, useState } from 'react'

/**
 * Minimal client-side router based on the History API.
 * The server SSRs whatever path was requested, so any route rendered
 * here is safe to deep-link / refresh into.
 *
 * `initialPath` comes from the SSR request URL — on the server
 * `window` doesn't exist, so it's the only source of truth there. On the
 * client it's only a fallback: `window.location.pathname` is always the
 * real, already-matching URL by the time hydration runs.
 */
export function useRoute(initialPath = '/') {
  const [path, setPath] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : initialPath))

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
      setPath(to)
    }
    window.scrollTo({ top: 0 })
  }, [])

  return { path, navigate }
}
