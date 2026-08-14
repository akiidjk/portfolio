import { useCallback, useEffect, useState } from 'react'

/**
 * Minimal client-side router based on the History API.
 * The server always falls back to index.html for unmatched paths,
 * so any route rendered here is safe to deep-link / refresh into.
 */
export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname)

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
