'use client'

import { useState } from 'react'
import { Canvas } from '@/components/canvas/Canvas'
import { DraggableCard } from '@/components/cards/DraggableCard'
import { IntroCard } from '@/components/cards/IntroCard'
import { EdgeHandle } from '@/components/canvas/EdgeHandle'
import { Panel } from '@/components/panels/Panel'
import { WatercolorsPanel } from '@/components/panels/WatercolorsPanel'
import { VenturesWheel } from '@/components/ventures/VenturesWheel'
import { ProjectCard } from '@/components/ventures/ProjectCard'

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <Canvas>
      <DraggableCard id="intro" defaultPosition={{ x: 40, y: 60 }}>
        <IntroCard />
      </DraggableCard>

      <DraggableCard id="ventures" defaultPosition={{ x: 420, y: 60 }}>
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
        <div className="p-6 pt-12">
          <h2 className="font-fraunces text-xl text-ink">Library</h2>
          <p className="mt-1 font-inter text-sm text-neutral-400">Coming soon.</p>
        </div>
      </Panel>

      <Panel type="writings">
        <div className="p-6 pt-12">
          <h2 className="font-fraunces text-xl text-ink">Writings</h2>
          <p className="mt-1 font-inter text-sm text-neutral-400">Coming soon.</p>
        </div>
      </Panel>

      <Panel type="watercolors">
        <WatercolorsPanel />
      </Panel>
    </Canvas>
  )
}
