import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type PanelType = 'library' | 'writings' | 'watercolors'

interface CardPosition { x: number; y: number }

interface CanvasStore {
  cardPositions: Record<string, CardPosition>
  activePanel: PanelType | null
  zCounter: number
  zMap: Record<string, number>
  setCardPosition: (id: string, pos: CardPosition) => void
  setActivePanel: (panel: PanelType | null) => void
  bringToFront: (id: string) => void
}

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set) => ({
      cardPositions: {},
      activePanel: null,
      zCounter: 10,
      zMap: {},
      setCardPosition: (id, pos) =>
        set((state) => ({ cardPositions: { ...state.cardPositions, [id]: pos } })),
      setActivePanel: (panel) => set({ activePanel: panel }),
      bringToFront: (id) =>
        set((state) => {
          const z = state.zCounter + 1
          return { zCounter: z, zMap: { ...state.zMap, [id]: z } }
        }),
    }),
    {
      name: 'canvas-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cardPositions: state.cardPositions }),
    }
  )
)
