import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data/projects'
import { isWebGLAvailable } from '../lib/webgl-support'
import type { Project } from '../types'
import { ProjectDetail } from './ProjectDetail'
import { ProjectsList } from './ProjectsList'

// Pulls in three.js + @react-three/fiber + @react-three/drei + framer-motion
// — hundreds of KB only needed on this one WebGL view. Splitting it out
// keeps that weight off every visitor who never leaves the home page.
const ProjectsSphere = lazy(() =>
  import('./projects-sphere/ProjectsSphere').then((m) => ({ default: m.ProjectsSphere })),
)

const activeCount = PROJECTS.filter((p) => /active|maintained/i.test(p.status)).length

export function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null)
  // Starts false to match SSR (no WebGL there), upgraded after mount.
  const [supportsWebGL, setSupportsWebGL] = useState(false)
  const catalogRef = useRef<HTMLDivElement>(null)

  useEffect(() => setSupportsWebGL(isWebGLAvailable()), [])

  return (
    <div className="bg-void-black">
      {/* Hero */}
      <section className="grid items-center gap-8 border-b border-hairline px-5 py-12 sm:grid-cols-[1.1fr_0.9fr] sm:gap-15 sm:px-10 sm:py-20">
        <div>
          <h1 className="mb-7 text-[clamp(2.375rem,9vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.045em] break-words text-phosphor-white uppercase">
            Built
            <br />
            for the
            <br />
            machine<span className="text-signal-green">.</span>
          </h1>

          <p className="mb-8 max-w-[460px] font-mono text-fs-13 leading-[1.7] text-body-gray">
            Every tool, experiment and system I've shipped from CTF infrastructure to emulators and low-level utilities.
            Filter by domain or search to find something specific.
          </p>

          <div className="flex items-center gap-5">
            <button
              onClick={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-none border-none bg-signal-green px-7 py-3.5 font-mono text-fs-11 font-bold tracking-[0.1em] text-void-black"
            >
              OPEN CATALOG ↓
            </button>
          </div>
        </div>

        <div className="relative aspect-[3/4] overflow-hidden border border-hairline bg-panel-black">
          <img
            src="/assets/hands.jpg"
            alt=""
            className="h-full w-full object-cover grayscale contrast-[1.2] brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,var(--scanline-strong)_2px,var(--scanline-strong)_4px)]" />

          {/* Annotation callout */}
          <div className="absolute top-6 right-6 left-6 flex items-center gap-2.5 bg-[rgba(8,8,8,0.75)] px-3 py-2.5">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-green shadow-[0_0_6px_var(--color-signal-green)]" />
            <div>
              <div className="font-mono text-fs-10 tracking-[0.1em] text-signal-green">ACTIVELY MAINTAINED</div>
              <div className="font-mono text-fs-10 tracking-[0.05em] text-body-gray">
                {activeCount} project{activeCount === 1 ? '' : 's'} still evolving
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section ref={catalogRef} className="px-5 pt-10 pb-20 sm:px-10 sm:pt-15 sm:pb-35">
        <div className="mb-8 font-mono text-fs-10 tracking-[0.15em] text-dim-label">
          [ {PROJECTS.length} RESULT{PROJECTS.length === 1 ? '' : 'S'} ]
        </div>

        {supportsWebGL ? (
          <Suspense fallback={<ProjectsList projects={PROJECTS} onSelect={setSelected} />}>
            <ProjectsSphere projects={PROJECTS} onOpen={setSelected} />
          </Suspense>
        ) : (
          <ProjectsList projects={PROJECTS} onSelect={setSelected} />
        )}
      </section>

      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
