import { render, screen, fireEvent } from '@testing-library/react'
import { EdgeHandle } from './EdgeHandle'
import { useCanvasStore } from '@/store/canvas'

describe('EdgeHandle', () => {
  beforeEach(() => {
    useCanvasStore.setState({ activePanel: null })
  })

  it('renders the panel label', () => {
    render(<EdgeHandle panel="library" />)
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('calls setActivePanel with the panel type on click', () => {
    render(<EdgeHandle panel="library" />)
    fireEvent.click(screen.getByText('Library'))
    expect(useCanvasStore.getState().activePanel).toBe('library')
  })

  it('closes panel when clicking the active handle', () => {
    useCanvasStore.setState({ activePanel: 'library' })
    render(<EdgeHandle panel="library" />)
    fireEvent.click(screen.getByText('Library'))
    expect(useCanvasStore.getState().activePanel).toBeNull()
  })
})
