'use client'

import { projects } from '@/data/projects'

interface Props {
  selectedProject: string | null
  setSelectedProject: (id: string | null) => void
}

export function ProjectCard({ selectedProject, setSelectedProject }: Props) {
  if (selectedProject === null) return null

  const project = projects.find(p => p.id === selectedProject)
  if (!project) return null

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 w-[40vw] min-w-[280px] bg-white rounded-xl shadow-2xl z-50 p-6 transition-all duration-150">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 font-mono text-xs text-neutral-400 hover:text-ink cursor-pointer bg-transparent border-none p-0"
        onClick={() => setSelectedProject(null)}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Project name with color accent */}
      <div style={{ borderLeft: `3px solid ${project.color}`, paddingLeft: '12px' }}>
        <h3 className="font-fraunces text-xl text-ink mt-0">{project.name}</h3>
        <p className="font-mono text-xs text-neutral-400 mt-1">
          {project.role}{project.role && project.dates ? ' · ' : ''}{project.dates}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-neutral-100 mt-4 mb-4" />

      {/* Bullets or coming soon */}
      {project.bullets.length === 0 ? (
        <p className="font-inter text-sm text-neutral-500 italic">Coming soon.</p>
      ) : (
        <ul className="list-disc pl-4">
          {project.bullets.map((bullet, i) => (
            <li key={i} className="font-inter text-sm text-neutral-600">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
