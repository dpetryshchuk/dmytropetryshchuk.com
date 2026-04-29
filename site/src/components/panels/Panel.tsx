'use client'

import { AnimatePresence, motion, TargetAndTransition } from 'framer-motion'
import { useCanvasStore, PanelType } from '@/store/canvas'

const VARIANTS: Record<PanelType, {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit: TargetAndTransition
  className: string
}> = {
  library: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    className: 'left-0 top-0 h-full w-[440px]',
  },
  writings: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    className: 'right-0 top-0 h-full w-[440px]',
  },
  watercolors: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    className: 'top-0 left-0 w-full h-[60vh]',
  },
}

export function Panel({ type, children }: { type: PanelType; children: React.ReactNode }) {
  const activePanel = useCanvasStore((s) => s.activePanel)
  const { initial, animate, exit, className } = VARIANTS[type]
  const isOpen = activePanel === type

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={type}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className={`absolute ${className} bg-white shadow-2xl z-50 overflow-y-auto`}
        >
          <button
            aria-label="Close panel"
            onClick={() => useCanvasStore.getState().setActivePanel(null)}
            className="absolute top-4 right-4 font-mono text-xs text-neutral-400 hover:text-ink transition-colors"
          >
            ✕
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
