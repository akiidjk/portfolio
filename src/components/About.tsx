import { GithubActivity } from './github/GithubActivity'

const FOCUS_AREAS = [
  { area: 'Web Exploitation & CTF', tools: 'Python, pwntools, Binary Analysis, Android RE (Smali), Attack/Defense' },
  { area: 'Systems Programming', tools: 'Zig, C, Rust, Emulators (NES / Chip-8), Algorithms' },
  { area: 'Offensive Security & Maldev', tools: 'Zig, Windows Internals, Process Injection, WebRTC' },
  { area: 'Network Security', tools: 'Go, eBPF, XDP, NGFW' },
  { area: 'Backend & APIs', tools: 'Go (Gin), FastAPI, Webhooks, PostgreSQL, SQLite' },
  { area: 'Full-Stack Web', tools: 'TypeScript, Next.js, React, Nuxt, Svelte, Astro, Bun, Tailwind' },
  { area: 'DevTools & CLI', tools: 'Rust, Python, VS Code / Zed Extensions' },
  { area: 'Linux & DevOps', tools: 'Arch, Hyprland, Docker, Bash, Git, VPS' },
  { area: 'Automation & Scraping', tools: 'Python, yt-dlp, Spotify API, Data Extraction' },
]

export function About() {
  return (
    <section id="about">
      <div className="grid gap-10 px-5 py-14 sm:grid-cols-2 sm:gap-20 sm:px-10 sm:py-20">
        <div>
          <p className="mb-7 text-[clamp(1.0625rem,5vw,1.3125rem)] leading-normal font-light tracking-tight text-phosphor-white">
            First-year Computer Science student at UNISA, split between breaking web applications in CTFs and studying
            how large-scale systems are designed, deployed, and kept alive.
          </p>
          <p className="text-fs-14 leading-[1.75] text-soft-gray">
            I know Python and Go well and I've picked up bits of everything else along the way. Most of my time goes to
            CTFs, mainly web exploitation, and to microservices: API design, event-driven pipelines, deployment,
            observability.
          </p>
          <p className="mt-4 text-fs-14 leading-[1.75] text-soft-gray">
            Right now: client projects, weekly CTFs with ByteTheCookies, and{' '}
            <span className="text-signal-green">WIP</span> microservices.
          </p>
        </div>

        <div>
          <div className="mb-6 font-mono text-fs-9 tracking-[0.18em] text-dim-label">SKILLS</div>
          {FOCUS_AREAS.map((item) => (
            <div
              key={item.area}
              className="mb-3.5 flex items-center justify-between border-b border-divider-black pb-3.5"
            >
              <span className="text-fs-13 font-medium text-phosphor-white">{item.area}</span>
              <span className="font-mono text-fs-10 text-dim-label">{item.tools}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden px-5 pt-12 pb-14 sm:px-10 sm:pt-14 sm:pb-20">
        <img
          src="/assets/hand.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-10 grayscale contrast-[1.2] brightness-[0.85]"
        />
        <div className="relative z-10">
          <GithubActivity />
        </div>
      </div>
    </section>
  )
}
