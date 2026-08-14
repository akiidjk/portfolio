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

export default function App() {
  const [active, setActive] = useState('index')
  const [isLoading, setIsLoading] = useState(true)
  const { path, navigate } = useRoute()
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
