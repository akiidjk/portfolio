import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  // Always start false so the first client render matches the SSR
  // output — the real value is measured after mount instead.
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
