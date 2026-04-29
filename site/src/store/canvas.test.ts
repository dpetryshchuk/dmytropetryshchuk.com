import { describe, it, expect, beforeEach } from 'vitest'
import { useCanvasStore } from './canvas'

describe('useCanvasStore', () => {
  beforeEach(() => {
    useCanvasStore.setState({
      cardPositions: {},
      activePanel: null,
      zCounter: 10,
      zMap: {},
    })
  })

  it('setCardPosition stores position by id', () => {
    useCanvasStore.getState().setCardPosition('intro', { x: 100, y: 200 })
    expect(useCanvasStore.getState().cardPositions['intro']).toEqual({ x: 100, y: 200 })
  })

  it('setCardPosition does not overwrite other positions', () => {
    useCanvasStore.getState().setCardPosition('intro', { x: 10, y: 20 })
    useCanvasStore.getState().setCardPosition('other', { x: 50, y: 60 })
    expect(useCanvasStore.getState().cardPositions['intro']).toEqual({ x: 10, y: 20 })
  })

  it('setActivePanel updates activePanel', () => {
    useCanvasStore.getState().setActivePanel('library')
    expect(useCanvasStore.getState().activePanel).toBe('library')
  })

  it('setActivePanel accepts null to close panels', () => {
    useCanvasStore.getState().setActivePanel('library')
    useCanvasStore.getState().setActivePanel(null)
    expect(useCanvasStore.getState().activePanel).toBeNull()
  })

  it('bringToFront increments zCounter and sets zMap entry', () => {
    useCanvasStore.getState().bringToFront('intro')
    expect(useCanvasStore.getState().zCounter).toBe(11)
    expect(useCanvasStore.getState().zMap['intro']).toBe(11)
  })

  it('bringToFront gives the latest card the highest z', () => {
    useCanvasStore.getState().bringToFront('a')
    useCanvasStore.getState().bringToFront('b')
    const { zMap } = useCanvasStore.getState()
    expect(zMap['b']).toBeGreaterThan(zMap['a'])
  })
})
