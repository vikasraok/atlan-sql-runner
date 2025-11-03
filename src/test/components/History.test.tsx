import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import History from '../../components/History'

describe('History Component', () => {
  it('renders without crashing', () => {
    render(<History />)
    const heading = screen.getByText('History')
    expect(heading).toBeInTheDocument()
  })

  it('displays the history heading', () => {
    render(<History />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('History')
  })

  it('renders within a div container', () => {
    render(<History />)
    const heading = screen.getByText('History')
    const container = heading.parentElement
    expect(container?.tagName).toBe('DIV')
  })

  it('has correct component structure', () => {
    const { container } = render(<History />)
    expect(container.firstChild).toBeTruthy()
    expect(container.querySelector('h2')).toBeInTheDocument()
  })
})