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
    <div style={{ position: 'relative', minHeight: 420 }}>
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
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: 'var(--fs-10)',
                color: 'var(--dim-label)',
                letterSpacing: '0.1em',
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              [ {projects.length} PROJECT{projects.length === 1 ? '' : 'S'} ] — TAP A POINT ON THE SPHERE OR AN ENTRY
              BELOW
            </div>
            <div style={{ border: '1px solid var(--hairline)', maxHeight: 480, overflowY: 'auto' }}>
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => onSelectList(p)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    borderBottom: i === projects.length - 1 ? 'none' : '1px solid var(--divider-black)',
                    padding: '14px 16px',
                    cursor: 'none',
                    fontFamily: 'Inter',
                    fontSize: 'var(--fs-13)',
                    color: 'var(--body-gray)',
                  }}
                >

                  {p.title}
                  <span
                    style={{ fontFamily: 'JetBrains Mono', fontSize: 'var(--fs-9)', color: 'var(--dim-label)', marginLeft: 10 }}
                  >
                    {p.domain}
                  </span>
                </button>
              ))}
              {projects.length === 0 && (
                <div style={{ padding: 20, fontFamily: 'JetBrains Mono', fontSize: 'var(--fs-11)', color: 'var(--dim-label)' }}>
                  NO MATCHING PROJECTS.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
