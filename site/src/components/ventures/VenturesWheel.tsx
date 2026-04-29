'use client'

import { useState } from 'react'
import { useOrbitalAnimation } from './useOrbitalAnimation'
import { projects } from '@/data/projects'

interface Props {
  selectedProject: string | null
  setSelectedProject: (id: string | null) => void
}

export function VenturesWheel({ selectedProject, setSelectedProject }: Props) {
  const { angle, pause, resume } = useOrbitalAnimation()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const primaryProjects = projects.filter(p => p.tier === 'primary')
  const secondaryProjects = projects.filter(p => p.tier === 'secondary')

  const primaryRadius = 130
  const secondaryRadius = 185
  const nodeOffset = angle

  // Primary: 5 nodes at 72° intervals
  const primaryAngleStep = (2 * Math.PI) / 5

  // Secondary: 2 nodes at 180° apart, offset 36° from primary start
  const secondaryAngleStep = Math.PI
  const secondaryStartOffset = Math.PI / 5

  const getPrimaryPos = (index: number) => {
    const a = index * primaryAngleStep + nodeOffset
    return {
      x: 200 + primaryRadius * Math.cos(a),
      y: 200 + primaryRadius * Math.sin(a),
    }
  }

  const getSecondaryPos = (index: number) => {
    const a = index * secondaryAngleStep + secondaryStartOffset + nodeOffset
    return {
      x: 200 + secondaryRadius * Math.cos(a),
      y: 200 + secondaryRadius * Math.sin(a),
    }
  }

  return (
    <svg
      viewBox="0 0 400 400"
      width={580}
      height={580}
      className={selectedProject !== null ? 'opacity-40 transition-opacity duration-200' : 'transition-opacity duration-200'}
    >
      {/* Fix 4: Accessibility title */}
      <title>Ventures — projects orbital visualization</title>

      {/* Fix 1: Transparent hit-rect for dismiss when a project is selected */}
      {selectedProject !== null && (
        <rect
          x={0} y={0} width={400} height={400}
          fill="transparent"
          onMouseDown={() => setSelectedProject(null)}
        />
      )}

      <defs>
        {/* Normal node drop shadow */}
        <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx={0} dy={2} stdDeviation={3} floodOpacity={0.15} />
        </filter>
        {/* Hover node stronger shadow */}
        <filter id="node-shadow-hover" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx={0} dy={2} stdDeviation={5} floodOpacity={0.25} />
        </filter>
        {/* Avatar clip path */}
        <clipPath id="avatar-clip">
          <circle cx={200} cy={200} r={48} />
        </clipPath>
      </defs>

      {/* Layer 1: Orbit rings */}
      <circle
        cx={200}
        cy={200}
        r={primaryRadius}
        stroke="#E5E7EB"
        strokeDasharray="4 8"
        fill="none"
        strokeWidth={1}
      />
      <circle
        cx={200}
        cy={200}
        r={secondaryRadius}
        stroke="#E5E7EB"
        strokeDasharray="4 8"
        fill="none"
        strokeWidth={1}
      />

      {/* Layer 2: Secondary nodes */}
      {secondaryProjects.map((project, index) => {
        const pos = getSecondaryPos(index)
        const isHovered = hoveredId === project.id
        return (
          <g
            key={project.id}
            opacity={0.65}
            transform={isHovered ? `translate(0, -10)` : undefined}
            style={{ transition: 'transform 150ms ease', cursor: 'pointer' }}
            role="button"
            aria-label={project.name}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project.id)
            }}
            onMouseEnter={() => { pause(); setHoveredId(project.id) }}
            onMouseLeave={() => { resume(); setHoveredId(null) }}
            onMouseDown={() => setSelectedProject(project.id)}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={16}
              fill={project.color}
              fillOpacity={0.4}
              stroke="white"
              strokeWidth={1}
              filter={isHovered ? 'url(#node-shadow-hover)' : undefined}
            />
          </g>
        )
      })}

      {/* Layer 3: Primary nodes */}
      {primaryProjects.map((project, index) => {
        const pos = getPrimaryPos(index)
        const isHovered = hoveredId === project.id
        return (
          <g
            key={project.id}
            transform={isHovered ? `translate(0, -10)` : undefined}
            style={{ transition: 'transform 150ms ease', cursor: 'pointer' }}
            role="button"
            aria-label={project.name}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project.id)
            }}
            onMouseEnter={() => { pause(); setHoveredId(project.id) }}
            onMouseLeave={() => { resume(); setHoveredId(null) }}
            onMouseDown={() => setSelectedProject(project.id)}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={28}
              fill="white"
              stroke={project.color}
              strokeWidth={2}
              filter={isHovered ? 'url(#node-shadow-hover)' : 'url(#node-shadow)'}
            />
            <text
              x={pos.x}
              y={pos.y + 28 + 14}
              textAnchor="middle"
              fontSize={9}
              fill="#6B7280"
              fontFamily="var(--font-inter)"
            >
              {project.name}
            </text>
          </g>
        )
      })}

      {/* Layer 4: Center anchor ring (avatar floats freely as its own card) */}
      <circle cx={200} cy={200} r={48} fill="rgba(248,244,238,0.6)" stroke="#C4781A" strokeWidth={2} strokeDasharray="4 4" />
    </svg>
  )
}
