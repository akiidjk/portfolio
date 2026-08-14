import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Archive } from './components/Archive'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { Lab } from './components/Lab'
import { LoadingScreen } from './components/LoadingScreen'
import { Nav } from './components/Nav'
import { ProjectsPage } from './components/ProjectsPage'
import { Work } from './components/Work'
import { useIsMobile } from './hooks/useBreakpoint'
import { useRoute } from './hooks/useRoute'

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Francesco Memoli (akiidjk) — Software Engineer & Security Researcher',
    description:
      'Portfolio of Francesco Memoli (akiidjk), software engineer and security researcher focused on systems programming, binary exploitation, reverse engineering, and CTF infrastructure. Co-founder of ByteTheCookies.',
  },
  '/projects': {
    title: 'Projects — Francesco Memoli (akiidjk)',
    description:
      'Catalog of open-source projects by Francesco Memoli (akiidjk): CTF infrastructure, emulators, and low-level tools including CookieFarm and Discord CTF Helper.',
  },
}

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const [active, setActive] = useState('index')
  const [isLoading, setIsLoading] = useState(true)
  const { path, navigate } = useRoute(initialPath)
  const isProjectsPage = path === '/projects'
  const isMobile = useIsMobile()
  const meta = ROUTE_META[path] ?? ROUTE_META['/']!

  useEffect(() => {
    if (isProjectsPage) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25 }
    )
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [isProjectsPage])

  return (
    <div style={{ margin: '0 auto', position: 'relative' }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={`https://akiidjk.dev${path === '/' ? '' : path}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={`https://akiidjk.dev${path === '/' ? '' : path}`} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />

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
            <Lab />
            <Archive />
            <About />
            <Contact />
          </div>
        </>
      )}
    </div>
  )
}
