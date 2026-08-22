import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { CookieBanner } from './components/CookieBanner'
import { Cursor } from './components/Cursor'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LoadingScreen } from './components/LoadingScreen'
import { Nav } from './components/Nav'
import { NotFound } from './components/NotFound'
import { ProjectsPage } from './components/ProjectsPage'
import { useRoute } from './hooks/useRoute'
import { canonicalUrl, getRouteMeta, isKnownRoute } from './route-meta'

// One fade + slight rise per page, kept short so navigating between the
// five pages reads as instant rather than as a slideshow.
const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: 'easeInOut' as const },
}

function renderPage(path: string) {
  switch (path) {
    case '/':
      return <Hero />
    case '/about':
      return <About />
    case '/experience':
      return <Experience />
    case '/contact':
      return <Contact />
    default:
      return null
  }
}

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const { path, navigate } = useRoute(initialPath)
  const isProjectsPage = path === '/projects'
  const isNotFound = !isKnownRoute(path)

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
    <div className="relative flex min-h-screen flex-col">
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      <Cursor />
      <CookieBanner />

      <Nav active={path} navigate={navigate} />
      <div className="flex flex-[1_0_auto] flex-col pt-13 sm:pt-[57px]">
        <AnimatePresence mode="wait">
          <motion.div key={path} {...pageTransition} className="flex flex-[1_0_auto] flex-col">
            <ErrorBoundary>
              {isProjectsPage ? (
                <ProjectsPage />
              ) : isNotFound ? (
                <NotFound path={path} onNavigateHome={() => navigate('/')} />
              ) : (
                renderPage(path)
              )}
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}
