import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { HeroCanvas } from './HeroCanvas'

export function Hero() {
  const typed = useTypewriter('I build software and break things to understand how they work.', 28)
  const [ts, setTs] = useState('')

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
        padding: '0 40px 56px',
        borderBottom: '1px solid #1a1a1a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <HeroCanvas />

      {/* Top meta */}
      <div
        style={{
          position: 'absolute',
          top: 88,
          left: 40,
          right: 40,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'JetBrains Mono',
          fontSize: 10,
          color: '#3D3D3D',
          letterSpacing: '0.1em',
          zIndex: 1,
        }}
      >
        <span>41.8919° N — 12.5113° E</span>
        <span>{ts}</span>
        <span>SYS.ONLINE</span>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: 10,
            color: '#3D3D3D',
            letterSpacing: '0.2em',
            marginBottom: 20,
            textTransform: 'uppercase',
          }}
        >
          SOFTWARE / SECURITY / LOW-LEVEL SYSTEMS
        </div>

        <h1
          style={{
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 'clamp(72px, 11vw, 156px)',
            lineHeight: 0.88,
            letterSpacing: '-0.045em',
            color: '#E8E8E3',
            margin: '0 0 48px',
          }}
        >
          FRANCESCO
          <br />
          MEMOLI
          <span style={{ color: '#C7FF2E' }}>™</span>
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
                fontSize: 13,
                color: '#999',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 520,
                minHeight: 22,
              }}
            >
              {typed}
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 14,
                  backgroundColor: '#C7FF2E',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </p>
            <p
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 11,
                color: '#3D3D3D',
                margin: '12px 0 0',
                letterSpacing: '0.05em',
              }}
            >
              based in italy — building things that live close to the machine.
            </p>
          </div>

          <div
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: 10,
              color: '#3D3D3D',
              lineHeight: 2.2,
              textAlign: 'right',
              letterSpacing: '0.08em',
            }}
          >
            <div>→ LOW-LEVEL SYSTEMS</div>
            <div>→ CYBERSECURITY</div>
            <div>→ ZIG · C · PYTHON</div>
            <div style={{ color: '#5D5D5D' }}>→ OPEN TO WORK</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          right: 40,
          fontFamily: 'JetBrains Mono',
          fontSize: 9,
          color: '#3D3D3D',
          letterSpacing: '0.15em',
          writingMode: 'vertical-rl',
          zIndex: 1,
        }}
      >
        SCROLL ↓
      </div>
    </section>
  )
}
