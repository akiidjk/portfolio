import { useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useBreakpoint'
import { useTypewriter } from '../hooks/useTypewriter'
import { HeroCanvas } from './HeroCanvas'

export function Hero() {
  const typed = useTypewriter('Student at UNISA, CTF player and co-founder of @bytethecookies.', 28)
  const [ts, setTs] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    const tick = () => setTs(new Date().toISOString().replace('T', ' ').slice(0, 19))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="index"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: isMobile ? '0 20px 40px' : '0 40px 56px',
        borderBottom: '1px solid var(--hairline)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <HeroCanvas />

      {/* Top meta */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 72 : 88,
          left: isMobile ? 20 : 40,
          right: isMobile ? 20 : 40,
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'space-between',
          fontFamily: 'JetBrains Mono',
          fontSize: isMobile ? 'var(--fs-9)' : 'var(--fs-10)',
          color: 'var(--dim-label)',
          letterSpacing: '0.1em',
          zIndex: 1,
        }}
      >
        {!isMobile && <span>Eat some cookies pls</span>}
        <span>{ts}</span>
        {!isMobile && <span>I use arch btw</span>}
      </div>

      <img
        src="/assets/black_hole.jpg"
        alt="Black Hole"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.1,
        }}
      />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: isMobile ? 'var(--fs-9)' : 'var(--fs-10)',
            color: 'var(--dim-label)',
            letterSpacing: '0.2em',
            marginBottom: isMobile ? 14 : 20,
            textTransform: 'uppercase',
          }}
        >
          SECURITY / MICROSERVICES / DEVOPS
        </div>

        <h1
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 'clamp(2.625rem, 13vw, 9.75rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.045em',
            color: 'var(--phosphor-white)',
            margin: isMobile ? '0 0 28px' : '0 0 48px',
            overflowWrap: 'break-word',
          }}
        >
          FRANCESCO
          <br />
          MEMOLI
          <span style={{ color: 'var(--signal-green)' }}>™</span>
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 40,
            alignItems: 'flex-end',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: isMobile ? 'var(--fs-14)' : 'var(--fs-15)',
                color: 'var(--body-gray)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 820,
                minHeight: 22,
              }}
            >
              {typed}
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 14,
                  backgroundColor: 'var(--signal-green)',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </p>
            <p
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 'var(--fs-11)',
                color: 'var(--dim-label)',
                margin: '12px 0 0',
                letterSpacing: '0.05em',
              }}
            >
              Learn, learn, learn — never stop, and get better than yesterday.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            right: 40,
            fontFamily: 'JetBrains Mono',
            fontSize: 'var(--fs-9)',
            color: 'var(--dim-label)',
            letterSpacing: '0.15em',
            writingMode: 'vertical-rl',
            zIndex: 1,
          }}
        >
          SCROLL ↓
        </div>
      )}
    </section>
  )
}
