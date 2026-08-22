const LINKS = [
  { path: '/', label: '[00]', aria: 'Home' },
  { path: '/projects', label: '[01]', aria: 'Projects' },
  { path: '/experience', label: '[02]', aria: 'Experience' },
  { path: '/about', label: '[03]', aria: 'About' },
  { path: '/contact', label: '[04]', aria: 'Contact' },
]

// DESIGN.md's signature corner-bracket "reticle" device — a target-lock
// frame around the one focal, personal element on the page.
function ReticleCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const sideClasses: Record<typeof position, string> = {
    tl: '-top-1 -left-1 border-t border-l',
    tr: '-top-1 -right-1 border-t border-r',
    bl: '-bottom-1 -left-1 border-b border-l',
    br: '-bottom-1 -right-1 border-b border-r',
  }
  return <div className={`absolute size-2 border-active-gray ${sideClasses[position]}`} />
}

// Bracket codes ([00]-[04]) are the resting state; the real section name
// surfaces only on hover/focus, so sighted first-time visitors get a label
// without the nav losing its terminal-readout look at rest. group/group-focus-within
// drive the reveal in pure CSS — no hover state needed.
function NavLink({
  link,
  active,
  navigate,
}: {
  link: (typeof LINKS)[number]
  active: boolean
  navigate: (to: string) => void
}) {
  return (
    <div className="group relative">
      <a
        href={link.path}
        aria-label={link.aria}
        aria-current={active ? 'page' : undefined}
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
          e.preventDefault()
          navigate(link.path)
        }}
        className={`font-mono text-fs-9 tracking-[0.02em] no-underline transition-colors duration-200 sm:text-fs-10 sm:tracking-[0.1em] ${
          active ? 'text-phosphor-white' : 'text-dim-label'
        }`}
      >
        {link.label}
      </a>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 translate-y-0 border border-hairline bg-panel-black px-1.5 py-[3px] font-mono text-fs-8 tracking-[0.1em] text-phosphor-white uppercase opacity-0 whitespace-nowrap transition duration-150 group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:translate-y-1 group-focus-within:opacity-100"
      >
        {link.aria}
      </span>
    </div>
  )
}

export function Nav({ active, navigate }: { active: string; navigate: (to: string) => void }) {
  const current = LINKS.find((l) => l.path === active)

  return (
    <nav className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between border-b border-hairline bg-[rgba(8,8,8,0.96)] px-4 py-3 backdrop-blur-md sm:px-10 sm:py-[18px]">
      <div className="flex min-w-0 items-center gap-3 sm:gap-[18px]">
        <div className="relative shrink-0">
          <img
            src="/assets/spidy.jpg"
            alt="Logo"
            className="block size-8 -scale-x-100 rounded-full border border-hairline object-cover sm:size-12"
          />
          <ReticleCorner position="tl" />
          <ReticleCorner position="tr" />
          <ReticleCorner position="bl" />
          <ReticleCorner position="br" />
        </div>

        {current && (
          <span className="hidden font-mono text-fs-11 tracking-[0.15em] text-phosphor-white uppercase sm:inline">
            {current.aria}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-7">
        {LINKS.map((l) => (
          <NavLink key={l.path} link={l} active={active === l.path} navigate={navigate} />
        ))}
      </div>
    </nav>
  )
}
