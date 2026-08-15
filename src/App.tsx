import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Archive } from './components/Archive'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { LoadingScreen } from './components/LoadingScreen'
import { Nav } from './components/Nav'
import { ProjectsPage } from './components/ProjectsPage'
import { Work } from './components/Work'
import { useIsMobile } from './hooks/useBreakpoint'
import { useRoute } from './hooks/useRoute'
import { canonicalUrl, getRouteMeta } from './route-meta'

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const [active, setActive] = useState('index')
  const [isLoading, setIsLoading] = useState(true)
  const { path, navigate } = useRoute(initialPath)
  const isProjectsPage = path === '/projects'
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isProjectsPage) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25 }
    )
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [isProjectsPage])

  // The initial <head> for each route is rendered server-side straight into
  // the static template (see index.tsx) — SSR streams into #root only, and
  // React's <title>/<meta> hoisting would land inside #root, not <head>, if
  // used here. In-app navigation (no reload) still needs the tab title and
  // OG/description tags to follow the route, hence the imperative update.
  useEffect(() => {
    const meta = getRouteMeta(path)
    const url = canonicalUrl(path)
    document.title = meta.title
    const setMetaContent = (selector: string, value: string) => {
      document.querySelector(selector)?.setAttribute('content', value)
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    setMetaContent('meta[name="description"]', meta.description)
    setMetaContent('meta[property="og:title"]', meta.title)
    setMetaContent('meta[property="og:description"]', meta.description)
    setMetaContent('meta[property="og:url"]', url)
    setMetaContent('meta[name="twitter:title"]', meta.title)
    setMetaContent('meta[name="twitter:description"]', meta.description)
  }, [path])

  return (
    <div style={{ margin: '0 auto', position: 'relative' }}>
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      <Cursor />

      {isProjectsPage ? (
        <ProjectsPage onNavigateHome={() => navigate('/')} />
      ) : (
        <>
          <Nav active={active} />
          <div style={{ paddingTop: isMobile ? 52 : 57 }}>
            <Hero />
            <Work onViewAll={() => navigate('/projects')} />
            <Archive />
            <About />
            <Contact />
          </div>
        </>
      )}
    </div>
  )
}
