import { Canvas } from '@/components/canvas/Canvas'
import { DraggableCard } from '@/components/cards/DraggableCard'
import { IntroCard } from '@/components/cards/IntroCard'
import { EdgeHandle } from '@/components/canvas/EdgeHandle'
import { Panel } from '@/components/panels/Panel'

export default function Home() {
  return (
    <Canvas>
      <DraggableCard id="intro" defaultPosition={{ x: 40, y: 60 }}>
        <IntroCard />
      </DraggableCard>

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
        <div className="p-6 pt-12">
          <h2 className="font-fraunces text-xl text-ink">Watercolors</h2>
          <p className="mt-1 font-inter text-sm text-neutral-400">Coming soon.</p>
        </div>
      </Panel>
    </Canvas>
  )
}
