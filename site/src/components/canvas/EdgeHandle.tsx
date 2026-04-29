'use client'

import { useCanvasStore, PanelType } from '@/store/canvas'

const CONFIG: Record<PanelType, {
  label: string
  position: string
  writing: React.CSSProperties['writingMode']
  arrow: string
  arrowDir: string
}> = {
  library: {
    label: 'Library',
    position: 'left-0 top-1/2 -translate-y-1/2',
    writing: 'vertical-rl',
    arrow: '›',
    arrowDir: 'rotate-0',
  },
  writings: {
    label: 'Writings',
    position: 'right-0 top-1/2 -translate-y-1/2',
    writing: 'vertical-rl',
    arrow: '‹',
    arrowDir: 'rotate-0',
  },
  watercolors: {
    label: 'Watercolors',
    position: 'top-0 left-1/2 -translate-x-1/2',
    writing: 'horizontal-tb',
    arrow: '›',
    arrowDir: 'rotate-90',
  },
}

export function EdgeHandle({ panel }: { panel: PanelType }) {
  const activePanel = useCanvasStore((s) => s.activePanel)
  const setActivePanel = useCanvasStore((s) => s.setActivePanel)
  const { label, position, writing, arrow, arrowDir } = CONFIG[panel]
  const isActive = activePanel === panel

  return (
    <button
      onClick={() => setActivePanel(isActive ? null : panel)}
      className={`
        absolute ${position} z-40
        flex items-center gap-2
        px-3 py-5
        font-mono text-[10px] uppercase tracking-[0.18em]
        transition-all duration-200 ease-out
        group
        ${isActive
          ? 'bg-accent text-white shadow-[0_0_24px_rgba(196,120,26,0.4)]'
          : 'bg-[#111] text-white/70 hover:text-white hover:bg-[#1a1a1a] shadow-lg'
        }
      `}
      style={{ writingMode: writing }}
      aria-label={`Open ${label}`}
    >
      <span className={`
        text-[14px] leading-none transition-transform duration-200
        ${arrowDir}
        ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}
      `}>
        {arrow}
      </span>
      {label}
    </button>
  )
}
