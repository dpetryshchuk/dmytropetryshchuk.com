'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCanvasStore, PanelType } from '@/store/canvas'

type DragAxis = 'x' | 'y'
interface PanelConfig {
  initial: Record<string, number | string>
  animate: Record<string, number>
  exit: Record<string, number | string>
  className: string
  drag: DragAxis
  dragConstraints: Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shouldClose: (info: any) => boolean
  gripEdge: string
}

const CONFIGS: Record<PanelType, PanelConfig> = {
  library: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    className: 'left-0 top-0 h-full w-[480px]',
    drag: 'x',
    dragConstraints: { left: -480, right: 0 },
    shouldClose: (info) => info.offset.x < -80 || info.velocity.x < -400,
    gripEdge: 'right-0 top-0 h-full w-8',
  },
  writings: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    className: 'right-0 top-0 h-full w-[480px]',
    drag: 'x',
    dragConstraints: { left: 0, right: 480 },
    shouldClose: (info) => info.offset.x > 80 || info.velocity.x > 400,
    gripEdge: 'left-0 top-0 h-full w-8',
  },
  watercolors: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    className: 'top-0 left-0 w-full h-[60vh]',
    drag: 'y',
    dragConstraints: { top: -800, bottom: 0 },
    shouldClose: (info) => info.offset.y < -60 || info.velocity.y < -300,
    gripEdge: 'bottom-0 left-0 w-full h-8',
  },
}

export function Panel({ type, children }: { type: PanelType; children: React.ReactNode }) {
  const activePanel = useCanvasStore((s) => s.activePanel)
  const cfg = CONFIGS[type]
  const isOpen = activePanel === type

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={type}
          initial={cfg.initial}
          animate={cfg.animate}
          exit={cfg.exit}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          drag={cfg.drag}
          dragConstraints={cfg.dragConstraints}
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (cfg.shouldClose(info)) {
              useCanvasStore.getState().setActivePanel(null)
            }
          }}
          className={`absolute ${cfg.className} bg-[#0F0F0F] shadow-[0_0_80px_rgba(0,0,0,0.6)] z-50 overflow-y-auto`}
        >
          {/* Close button */}
          <button
            aria-label="Close panel"
            onClick={() => useCanvasStore.getState().setActivePanel(null)}
            className="absolute top-5 right-5 z-10 font-mono text-[11px] text-white/30 hover:text-white transition-colors duration-150"
          >
            ✕
          </button>

          {/* Drag grip indicator */}
          <div className={`absolute ${cfg.gripEdge} flex items-center justify-center pointer-events-none opacity-20`}>
            {cfg.drag === 'x' ? (
              <div className="flex flex-col gap-[5px]">
                {[0,1,2,3,4].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />)}
              </div>
            ) : (
              <div className="flex flex-row gap-[5px]">
                {[0,1,2,3,4].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />)}
              </div>
            )}
          </div>

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
