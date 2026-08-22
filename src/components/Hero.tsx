import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { HeroCanvas } from './HeroCanvas'

export function Hero() {
  const typed = useTypewriter('Student at UNISA, CTF player and co-founder of @bytethecookies.', 28)
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
      className="relative flex min-h-[95vh] flex-col justify-end overflow-hidden px-5 pb-10 sm:px-10 sm:pb-14"
    >
      <HeroCanvas />

      {/* Top meta */}
      <div className="absolute top-18 right-5 left-5 z-[1] flex justify-center font-mono text-fs-9 tracking-[0.1em] text-dim-label sm:top-22 sm:right-10 sm:left-10 sm:justify-between sm:text-fs-10">
        <span className="hidden sm:inline">Eat some cookies pls</span>
        <span>{ts}</span>
        <span className="hidden sm:inline">I use arch btw</span>
      </div>

      <img
        src="/assets/black_hole.jpg"
        alt="Black Hole"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-10"
      />

      {/* Main content */}
      <div className="relative z-[1]">
        <div className="mb-3.5 font-mono text-fs-9 tracking-[0.2em] text-dim-label uppercase sm:mb-5 sm:text-fs-10">
          SECURITY / MICROSERVICES / DEVOPS
        </div>

        <h1 className="mb-7 text-[clamp(2.625rem,13vw,9.75rem)] leading-[0.9] font-bold tracking-[-0.045em] break-words text-phosphor-white sm:mb-12">
          FRANCESCO
          <br />
          MEMOLI
          <span className="text-signal-green">™</span>
        </h1>

        <div className="grid grid-cols-[1fr_auto] items-end gap-10">
          <div>
            <p className="min-h-[22px] max-w-[820px] font-mono text-fs-9 leading-[1.6] text-body-gray sm:text-fs-13">
              {typed}
              <span className="ml-0.5 inline-block h-3.5 w-2 animate-blink bg-signal-green align-middle" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
