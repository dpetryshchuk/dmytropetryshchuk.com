import { render, screen, fireEvent } from '@testing-library/react'
import { Panel } from './Panel'
import { useCanvasStore } from '@/store/canvas'

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} style={style} {...props}>{children}</div>
    ),
  },
}))

describe('Panel', () => {
  beforeEach(() => {
    useCanvasStore.setState({ activePanel: null })
  })

  it('does not render children when panel is inactive', () => {
    useCanvasStore.setState({ activePanel: null })
    render(<Panel type="library"><div data-testid="content">content</div></Panel>)
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('renders children when panel is active', () => {
    useCanvasStore.setState({ activePanel: 'library' })
    render(<Panel type="library"><div data-testid="content">content</div></Panel>)
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('does not render for a different active panel', () => {
    useCanvasStore.setState({ activePanel: 'writings' })
    render(<Panel type="library"><div data-testid="content">content</div></Panel>)
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('close button sets activePanel to null', () => {
    useCanvasStore.setState({ activePanel: 'library' })
    render(<Panel type="library"><div>content</div></Panel>)
    fireEvent.click(screen.getByLabelText('Close panel'))
    expect(useCanvasStore.getState().activePanel).toBeNull()
  })
})
