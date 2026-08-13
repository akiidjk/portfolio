import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Archive } from './components/Archive'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { Lab } from './components/Lab'
import { Nav } from './components/Nav'
import { Work } from './components/Work'

export default function App() {
  const [active, setActive] = useState('index')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25 }
    )
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
      <Cursor />
      <Nav active={active} />

      <div style={{ paddingTop: 57 }}>
        <Hero />
        <Work />
        <Lab />
        <Archive />
        <About />
        <Contact />
      </div>
    </div>
  )
}
