import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LINKS = [
  { path: '/', label: '[Home]', aria: 'Home' },
  { path: '/projects', label: '[Projects]', aria: 'Projects' },
  { path: '/experience', label: '[Experience]', aria: 'Experience' },
  { path: '/about', label: '[About]', aria: 'About' },
  { path: '/contact', label: '[Contact]', aria: 'Contact' },
]

// DESIGN.md's signature corner-bracket "reticle" device — a target-lock
// frame around the one focal, personal element on the page
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
    <div className="group relative opacity-100 transition-opacity duration-200 group-hover/links:not-hover:opacity-40">
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

// Morphs between three stacked bars and an X — one small, established
// micro-interaction, not a whole animated scene.
function MenuToggle({ open }: { open: boolean }) {
  return (
    <div className="flex h-3.5 w-5 flex-col justify-between">
      <motion.span
        className="h-px w-full bg-phosphor-white"
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="h-px w-full bg-phosphor-white"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="h-px w-full bg-phosphor-white"
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export function Nav({ active, navigate }: { active: string; navigate: (to: string) => void }) {
  const current = LINKS.find((l) => l.path === active)
  const [menuOpen, setMenuOpen] = useState(false)

  // Menu is mobile-only chrome — if the viewport grows past sm while it's
  // open (or a link navigates), don't leave it stuck open.
  useEffect(() => {
    setMenuOpen(false)
  }, [active])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  const handleMobileNavigate = (path: string) => {
    navigate(path)
    setMenuOpen(false)
  }

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

      <div className="group/links hidden items-center gap-7 sm:flex">
        {LINKS.map((l) => (
          <NavLink key={l.path} link={l} active={active === l.path} navigate={navigate} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        className="cursor-none p-1 sm:hidden"
      >
        <MenuToggle open={menuOpen} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-x-0 top-13 bottom-0 z-[999] bg-[rgba(8,8,8,0.92)] backdrop-blur-sm sm:hidden"
          >
            <motion.nav
              id="mobile-nav-menu"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col divide-y divide-hairline border-b border-hairline bg-panel-black"
            >
              {LINKS.map((l) => (
                <a
                  key={l.path}
                  href={l.path}
                  aria-current={active === l.path ? 'page' : undefined}
                  onClick={(e) => {
                    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                    e.preventDefault()
                    handleMobileNavigate(l.path)
                  }}
                  className={`px-5 py-4 font-mono text-fs-13 tracking-[0.05em] uppercase no-underline ${
                    active === l.path ? 'text-phosphor-white' : 'text-dim-label'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
