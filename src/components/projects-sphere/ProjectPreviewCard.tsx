import { useState } from 'react'
import type { Project } from '../../types'

export function ProjectPreviewCard({
  project,
  onOpen,
  onDismiss,
}: {
  project: Project
  onOpen: () => void
  onDismiss: () => void
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex h-full flex-col border border-hairline bg-panel-black">
      <div className="relative h-[200px] shrink-0 overflow-hidden bg-divider-black">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center font-mono text-fs-10 tracking-[0.12em] text-dim-label">
            [ IMAGE UNAVAILABLE ]
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover grayscale contrast-[1.3] brightness-80"
          />
        )}
        <button
          onClick={onDismiss}
          aria-label="Close preview"
          className="absolute top-2.5 right-2.5 flex h-[26px] w-[26px] cursor-none items-center justify-center border border-hairline bg-[rgba(8,8,8,0.85)] font-mono text-fs-13 leading-none text-body-gray"
        >
          ×
        </button>
        <div className="absolute top-2.5 left-2.5 border border-hairline bg-[rgba(8,8,8,0.8)] px-2 py-[3px] font-mono text-fs-9 tracking-[0.12em] text-muted-steel">
          {project.id}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 font-mono text-fs-9 tracking-[0.1em] text-dim-label">{project.domain}</div>
        <h3 className="mb-1.5 text-fs-24 font-bold tracking-[-0.03em] text-phosphor-white">{project.title}</h3>
        <div className="mb-4 font-mono text-fs-11 text-muted-steel">{project.subtitle}</div>
        <p className="mb-5 flex-1 text-fs-13 leading-[1.6] text-body-gray">{project.description}</p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span
              key={s}
              className="border border-hairline px-[7px] py-0.5 font-mono text-fs-9 tracking-[0.1em] text-dim-label"
            >
              {s}
            </span>
          ))}
        </div>
        <button
          onClick={onOpen}
          className="cursor-none border-none bg-signal-green px-5 py-3 font-mono text-fs-11 font-bold tracking-[0.1em] text-void-black"
        >
          OPEN PROJECT ↗
        </button>
      </div>
    </div>
  )
}
