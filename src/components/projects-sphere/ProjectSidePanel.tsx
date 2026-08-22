import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../../types'
import { ProjectPreviewCard } from './ProjectPreviewCard'

export function ProjectSidePanel({
  projects,
  activeProject,
  onSelectList,
  onOpen,
  onDismiss,
}: {
  projects: Project[]
  activeProject: Project | null
  onSelectList: (project: Project) => void
  onOpen: (project: Project) => void
  onDismiss: () => void
}) {
  return (
    <div className="relative min-h-[420px]">
      <AnimatePresence mode="wait" initial={false}>
        {activeProject ? (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ProjectPreviewCard project={activeProject} onOpen={() => onOpen(activeProject)} onDismiss={onDismiss} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 font-mono text-fs-10 leading-[1.6] tracking-[0.1em] text-dim-label">
              TAP A POINT ON THE SPHERE OR AN ENTRY
            </div>
            <div className="max-h-[480px] overflow-y-auto border border-hairline">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => onSelectList(p)}
                  className={`block w-full cursor-none border-none bg-transparent px-4 py-3.5 text-left text-fs-13 text-body-gray ${
                    i === projects.length - 1 ? '' : 'border-b border-divider-black'
                  }`}
                >
                  {p.title}
                  <span className="ml-2.5 font-mono text-fs-9 text-dim-label">{p.domain}</span>
                </button>
              ))}
              {projects.length === 0 && (
                <div className="p-5 font-mono text-fs-11 text-dim-label">NO MATCHING PROJECTS.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
