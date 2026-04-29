'use client'

import { useCanvasStore, PanelType } from '@/store/canvas'

const CONFIG: Record<PanelType, { label: string; position: string; writing: string }> = {
  library: {
    label: 'Library',
    position: 'left-0 top-1/2 -translate-y-1/2',
    writing: 'vertical-rl',
  },
  writings: {
    label: 'Writings',
    position: 'right-0 top-1/2 -translate-y-1/2',
    writing: 'vertical-rl',
  },
  watercolors: {
    label: 'Watercolors',
    position: 'top-0 left-1/2 -translate-x-1/2',
    writing: 'horizontal-tb',
  },
}

export function EdgeHandle({ panel }: { panel: PanelType }) {
  const activePanel = useCanvasStore((s) => s.activePanel)
  const setActivePanel = useCanvasStore((s) => s.setActivePanel)
  const { label, position, writing } = CONFIG[panel]
  const isActive = activePanel === panel

  return (
    <button
      onClick={() => setActivePanel(isActive ? null : panel)}
      className={`absolute ${position} z-40 bg-white border border-neutral-200 rounded-sm px-2 py-3 font-mono text-[10px] uppercase tracking-widest shadow-sm transition-colors ${
        isActive
          ? 'text-accent border-accent'
          : 'text-neutral-400 hover:text-accent hover:border-accent'
      }`}
      style={{ writingMode: writing as React.CSSProperties['writingMode'] }}
    >
      {label}
    </button>
  )
}
