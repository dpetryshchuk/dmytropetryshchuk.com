import { render, screen } from '@testing-library/react'
import { Canvas } from './Canvas'

describe('Canvas', () => {
  it('renders children', () => {
    render(<Canvas><div data-testid="child">hello</div></Canvas>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('has noise-overlay layer', () => {
    const { container } = render(<Canvas><div /></Canvas>)
    expect(container.querySelector('.noise-overlay')).toBeInTheDocument()
  })
})
