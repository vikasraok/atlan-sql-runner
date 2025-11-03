import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Result from '../../components/Result'

describe('Result Component', () => {
  it('renders without crashing', () => {
    render(<Result />)
    const heading = screen.getByText('Result')
    expect(heading).toBeInTheDocument()
  })

  it('displays the result heading', () => {
    render(<Result />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Result')
  })

  it('renders within a div container', () => {
    render(<Result />)
    const heading = screen.getByText('Result')
    const container = heading.parentElement
    expect(container?.tagName).toBe('DIV')
  })

  it('has correct component structure', () => {
    const { container } = render(<Result />)
    expect(container.firstChild).toBeTruthy()
    expect(container.querySelector('h2')).toBeInTheDocument()
  })
})