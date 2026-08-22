import type { Project } from '../types'

const STACK_PREVIEW_COUNT = 3

function StackChip({ label }: { label: string }) {
  return (
    <span className="border border-hairline px-2 py-0.5 font-mono text-fs-9 tracking-[0.08em] whitespace-nowrap text-muted-steel">
      {label}
    </span>
  )
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`h-[5px] w-[5px] shrink-0 rounded-full ${
        active ? 'bg-signal-green shadow-[0_0_5px_var(--color-signal-green)]' : 'bg-dim-label'
      }`}
    />
  )
}

// Hover state drives an accent bar, index color, arrow, and (desktop only)
// a stack-chip reveal — all pure CSS via `group`/`group-hover:` now, no
// JS hover state needed. Mobile has no hover, so its status+stack line
// renders unconditionally and is just hidden at the sm breakpoint instead.
function ProjectRow({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const isActive = /active|maintained/i.test(project.status)

  return (
    <div
      onClick={onClick}
      className="group relative grid cursor-none grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-hairline pt-4 pr-1 pb-4 pl-3.5 transition-colors duration-[250ms] hover:bg-panel-black sm:grid-cols-[48px_1fr_auto_auto_24px] sm:gap-6 sm:p-5"
    >
      {/* Accent bar */}
      <div className="absolute top-0 bottom-0 left-0 w-[3px] origin-top scale-y-0 bg-signal-green transition-transform duration-300 ease-in-out group-hover:scale-y-100" />

      {/* Index */}
      <span className="font-mono text-fs-11 tracking-[0.05em] text-dim-label transition-colors duration-[250ms] group-hover:text-signal-green">
        {String(index + 1).padStart(3, '0')}
      </span>

      {/* Title + meta */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <h3 className="m-0 truncate text-fs-15 font-bold tracking-[-0.02em] text-phosphor-white sm:text-fs-17">
            {project.title}
          </h3>
          <span className="font-mono text-fs-10 tracking-[0.05em] whitespace-nowrap text-dim-label">
            {project.domain.split('/')[0]?.trim()}
          </span>
        </div>

        {/* Mobile-only compact line */}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:hidden">
          <span className="flex items-center gap-[5px] font-mono text-fs-9 tracking-[0.05em] text-muted-steel">
            <StatusDot active={isActive} />
            {project.year}
          </span>
          {project.stack.slice(0, 2).map((s) => (
            <StackChip key={s} label={s} />
          ))}
        </div>

        {/* Desktop-only hover reveal */}
        <div className="hidden sm:mt-2 sm:grid sm:grid-rows-[0fr] sm:opacity-0 sm:transition-[grid-template-rows,opacity] sm:duration-300 sm:ease-in-out sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100">
          <div className="flex gap-2 overflow-hidden">
            {project.stack.slice(0, STACK_PREVIEW_COUNT).map((s) => (
              <StackChip key={s} label={s} />
            ))}
          </div>
        </div>
      </div>

      {/* Status + year — desktop only; mobile shows this inline above */}
      <div className="hidden items-center gap-2 font-mono text-fs-10 tracking-[0.05em] whitespace-nowrap text-muted-steel sm:flex">
        <StatusDot active={isActive} />
        {project.year}
      </div>

      {/* Arrow */}
      <span className="-translate-x-1 font-mono text-fs-14 text-active-gray opacity-60 transition-all duration-[250ms] ease-in-out group-hover:translate-x-0 group-hover:text-phosphor-white group-hover:opacity-100">
        →
      </span>
    </div>
  )
}

export function ProjectsList({ projects, onSelect }: { projects: Project[]; onSelect: (project: Project) => void }) {
  return (
    <div className="border-t border-hairline">
      {projects.map((project, i) => (
        <ProjectRow key={project.id} project={project} index={i} onClick={() => onSelect(project)} />
      ))}
    </div>
  )
}
