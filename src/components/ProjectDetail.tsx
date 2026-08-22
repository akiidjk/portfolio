import { useEffect, useState } from 'react'
import type { Project } from '../types'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

const CLOSE_DURATION = 220

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imageError, setImageError] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const repoPath = project.detail.find((d) => d.label === 'Repository')?.value
  const githubUrl = repoPath ? `https://github.com/${repoPath}` : undefined

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, CLOSE_DURATION)
  }

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-[5000] cursor-none overflow-y-auto bg-[rgba(8,8,8,0.96)] ${
        isClosing ? 'animate-[overlayFadeIn_220ms_ease_reverse_forwards]' : 'animate-[overlayFadeIn_0.25s_ease]'
      }`}
    >
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-[1] cursor-none border border-hairline bg-[rgba(8,8,8,0.9)] px-3 py-2 font-mono text-fs-11 tracking-[0.1em] text-muted-steel sm:top-6 sm:right-6 sm:px-4"
      >
        × CLOSE
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`mx-auto max-w-[860px] px-5 pt-[90px] pb-15 sm:px-10 sm:pt-20 sm:pb-30 ${
          isClosing
            ? 'animate-[modalSlideUp_220ms_cubic-bezier(0.16,1,0.3,1)_reverse_forwards]'
            : 'animate-modal-slide-up'
        }`}
      >
        {/* Header */}
        <div className="mb-8 pr-[90px] sm:mb-12 sm:pr-30">
          <div className="mb-3 font-mono text-fs-10 tracking-[0.15em] text-dim-label">
            {project.id} ──────────────────────── {project.year}
          </div>
          <h2 className="text-[clamp(1.75rem,8vw,4rem)] leading-[1.05] font-bold tracking-[-0.045em] break-words text-phosphor-white">
            {project.title}
          </h2>
          <div className="mt-2 font-mono text-fs-12 text-muted-steel">{project.subtitle}</div>
        </div>

        {/* Meta table */}
        <div className="mb-12 border-t border-hairline">
          {project.detail.map((d) => (
            <div key={d.label} className="flex justify-between border-b border-hairline py-3.5">
              <span className="font-mono text-fs-10 tracking-[0.12em] text-dim-label">{d.label}</span>
              <span className="font-mono text-fs-11 tracking-[0.05em] text-phosphor-white">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="group relative mb-12 overflow-hidden border border-transparent transition-colors duration-300 hover:border-active-gray">
          {imageError ? (
            <div className="flex h-[200px] w-full items-center justify-center bg-panel-black font-mono text-fs-11 tracking-[0.15em] text-dim-label sm:h-[320px]">
              [ IMAGE UNAVAILABLE ]
            </div>
          ) : (
            <>
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImageError(true)}
                className="block h-[200px] w-full scale-100 object-cover grayscale contrast-[1.3] transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-[60%] group-hover:contrast-[1.15] group-hover:brightness-95 sm:h-[320px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,var(--scanline-light)_3px,var(--scanline-light)_6px)]" />
            </>
          )}

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:bg-[linear-gradient(to_top,rgba(8,8,8,0.85)_0%,transparent_55%)] group-hover:opacity-100 sm:p-5">
            <div className="font-mono text-fs-10 leading-[2] tracking-[0.1em] text-signal-green">
              <div>DOMAIN · {project.domain}</div>
              <div>STATUS · {project.status}</div>
            </div>
          </div>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} on GitHub`}
              className="absolute right-3 bottom-3 flex h-9 w-9 translate-y-0 items-center justify-center border border-hairline bg-[rgba(8,8,8,0.85)] text-muted-steel opacity-100 transition-all duration-300 sm:right-4 sm:bottom-4 sm:translate-y-1.5 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:border-signal-green sm:group-hover:text-signal-green sm:group-hover:opacity-100"
            >
              <GitHubIcon />
            </a>
          )}
        </div>

        {/* Problem / Approach / Outcome */}
        {[
          { label: 'PROBLEM', content: project.problem },
          { label: 'APPROACH', content: project.approach },
          { label: 'OUTCOME', content: project.outcome },
        ].map((section) => (
          <div key={section.label} className="mb-10">
            <div className="mb-4 font-mono text-fs-10 tracking-[0.2em] text-dim-label">── {section.label}</div>
            <p className="text-fs-16 leading-[1.7] font-light text-body-gray">{section.content}</p>
          </div>
        ))}

        {/* Stack */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-hairline pt-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className="border border-active-gray px-3 py-1 font-mono text-fs-10 tracking-[0.1em] text-muted-steel"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
