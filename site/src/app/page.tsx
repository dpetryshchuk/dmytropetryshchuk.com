'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@/components/canvas/Canvas'
import { DraggableCard } from '@/components/cards/DraggableCard'
import { IntroCard } from '@/components/cards/IntroCard'
import { EdgeHandle } from '@/components/canvas/EdgeHandle'
import { Panel } from '@/components/panels/Panel'
import { WatercolorsPanel } from '@/components/panels/WatercolorsPanel'
import { LibraryPanel } from '@/components/panels/LibraryPanel'
import { WritingsPanel } from '@/components/panels/WritingsPanel'
import { VenturesWheel } from '@/components/ventures/VenturesWheel'
import { ProjectCard } from '@/components/ventures/ProjectCard'

function getDefaultPositions() {
  if (typeof window === 'undefined') return {
    intro:    { x: 80,  y: 300 },
    ventures: { x: 900, y: 200 },
  }
  const w = window.innerWidth
  const h = window.innerHeight
  return {
    intro:    { x: Math.round(w * 0.05),  y: Math.round((h - 180) * 0.45) },
    ventures: { x: Math.round(w * 0.52),  y: Math.round((h - 420) * 0.42) },
  }
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [defaultPositions, setDefaultPositions] = useState(getDefaultPositions)

  useEffect(() => {
    setDefaultPositions(getDefaultPositions())
  }, [])

  return (
    <Canvas>
      <DraggableCard id="intro" defaultPosition={defaultPositions.intro}>
        <IntroCard />
      </DraggableCard>

      <DraggableCard id="ventures" defaultPosition={defaultPositions.ventures}>
        <VenturesWheel
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </DraggableCard>

      <ProjectCard
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      <EdgeHandle panel="library" />
      <EdgeHandle panel="writings" />
      <EdgeHandle panel="watercolors" />

      <Panel type="library">
        <LibraryPanel />
      </Panel>

      <Panel type="writings">
        <WritingsPanel />
      </Panel>

      <Panel type="watercolors">
        <WatercolorsPanel />
      </Panel>
    </Canvas>
  )
}
