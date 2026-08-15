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
                fontSize: 10,
                color: '#3D3D3D',
                letterSpacing: '0.1em',
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              [ {projects.length} PROGETT{projects.length === 1 ? 'O' : 'I'} ] — TOCCA UN PUNTO SULLA SFERA O UNA VOCE
              QUI SOTTO
            </div>
            <div style={{ border: '1px solid #1a1a1a', maxHeight: 480, overflowY: 'auto' }}>
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
                    borderBottom: i === projects.length - 1 ? 'none' : '1px solid #111',
                    padding: '14px 16px',
                    cursor: 'none',
                    fontFamily: 'Inter',
                    fontSize: 13,
                    color: '#999',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#3D3D3D', marginRight: 10 }}>
                    {p.id}
                  </span>
                  {p.title}
                </button>
              ))}
              {projects.length === 0 && (
                <div style={{ padding: 20, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#3D3D3D' }}>
                  NESSUN PROGETTO CORRISPONDENTE.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
