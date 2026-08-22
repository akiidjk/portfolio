import { CalBookingButton } from './CalBookingButton'

const SOCIAL_LINKS = [
  { label: 'GITHUB / INSTAGRAM / X', handle: 'akiidjk' },
  { label: 'LINKEDIN', handle: 'akiidjk', url: 'https://www.linkedin.com/in/francesco-memoli-b05a542ab/' },
  { label: 'CTF TEAM', handle: 'ByteTheCookies', url: 'https://bytethecookies.org' },
]

const STATUS = [
  { label: 'AVAILABILITY', value: 'Open to freelance work & CTF collabs' },
  { label: 'RESPONSE TIME', value: 'Usually within 24-48h' },
  { label: 'CURRENTLY', value: 'Client projects, weekly CTFs, microservices experiments' },
]

const GHOST_BUTTON =
  'cursor-none border border-hairline bg-transparent px-6 py-3 font-mono text-fs-11 tracking-[0.1em] text-muted-steel transition-colors duration-200 hover:border-active-gray hover:text-phosphor-white'

export function Contact() {
  return (
    <section id="contact" className="px-5 pt-12 pb-15 sm:px-10 sm:pt-20 sm:pb-25">
      <div className="mb-4 font-mono text-fs-9 tracking-[0.2em] text-dim-label uppercase sm:mb-6 sm:text-fs-10">
        [ SEND SIGNAL ]
      </div>

      <div className="mt-12 grid items-start gap-10 sm:mt-20 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-20">
        <div>
          <h2 className="mb-6 text-[clamp(2.25rem,12vw,6rem)] leading-none font-bold tracking-[-0.045em] text-phosphor-white">
            LET'S TALK.
          </h2>
          <a
            href="mailto:me@akiidjk.dev"
            className="mb-6 inline-block font-mono text-fs-14 tracking-[0.03em] text-signal-green no-underline"
          >
            me@akiidjk.dev ↗
          </a>

          <div className="flex flex-wrap gap-3">
            <CalBookingButton className="cursor-none border-none bg-signal-green px-6 py-3 font-mono text-fs-11 font-bold tracking-[0.1em] text-void-black" />
            <a href="/cv.pdf" download className={GHOST_BUTTON}>
              DOWNLOAD CV ↓
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          {SOCIAL_LINKS.map((link) => (
            <div key={link.label} className="flex items-center justify-between gap-7 sm:justify-end">
              <span className="font-mono text-fs-9 tracking-[0.15em] text-dim-label">{link.label}</span>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-body-gray no-underline">
                <span className="font-mono text-fs-13 text-body-gray transition-all hover:underline">
                  {link.handle}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 border border-hairline bg-panel-black p-6 sm:mt-20 sm:p-8">
        <div className="mb-6 font-mono text-fs-9 tracking-[0.18em] text-dim-label uppercase sm:mb-8">[ STATUS ]</div>
        <div className="grid gap-6 sm:grid-cols-3 sm:gap-10">
          {STATUS.map((s) => (
            <div key={s.label}>
              <div className="mb-2 font-mono text-fs-9 tracking-[0.15em] text-dim-label uppercase">{s.label}</div>
              <div className="text-fs-13 text-body-gray">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
