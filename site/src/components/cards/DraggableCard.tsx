'use client'

import { Rnd } from 'react-rnd'
import { useCanvasStore } from '@/store/canvas'

interface Props {
  id: string
  defaultPosition: { x: number; y: number }
  defaultSize?: { width: number | string; height: number | string }
  children: React.ReactNode
}

export function DraggableCard({
  id,
  defaultPosition,
  defaultSize,
  children,
}: Props) {
  const position = useCanvasStore((s) => s.cardPositions[id]) ?? defaultPosition
  const z = useCanvasStore((s) => s.zMap[id]) ?? 10

  return (
    <Rnd
      position={position}
      {...(defaultSize ? { size: defaultSize } : {})}
      enableResizing={false}
      dragHandleClassName="drag-handle"
      bounds="parent"
      style={{ zIndex: z }}
      onMouseDown={() => useCanvasStore.getState().bringToFront(id)}
      onDragStop={(_, d) => useCanvasStore.getState().setCardPosition(id, { x: d.x, y: d.y })}
    >
      {children}
    </Rnd>
  )
}
