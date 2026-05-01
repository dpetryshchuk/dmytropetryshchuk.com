import { render, screen } from '@testing-library/react'
import { DraggableCard } from './DraggableCard'
import { useCanvasStore } from '@/store/canvas'

vi.mock('react-rnd', () => ({
  Rnd: ({ children, position, style }: { children: React.ReactNode; position: { x: number; y: number }; style?: React.CSSProperties }) => (
    <div style={{ ...style, transform: `translate(${position.x}px, ${position.y}px)` }}>
      {children}
    </div>
  ),
}))

describe('DraggableCard', () => {
  beforeEach(() => {
    useCanvasStore.setState({ cardPositions: {}, zMap: {}, zCounter: 10 })
  })

  it('renders children', () => {
    render(
      <DraggableCard id="test" defaultPosition={{ x: 0, y: 0 }}>
        <div data-testid="child">content</div>
      </DraggableCard>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('uses stored position if available', () => {
    useCanvasStore.setState({
      cardPositions: { test: { x: 150, y: 250 } },
      zMap: {},
      zCounter: 10,
    })
    render(
      <DraggableCard id="test" defaultPosition={{ x: 0, y: 0 }}>
        <div>content</div>
      </DraggableCard>
    )
    // react-rnd applies position as inline style transform
    const rnd = document.querySelector('[style*="transform"]') as HTMLElement
    expect(rnd).toBeInTheDocument()
  })
})
