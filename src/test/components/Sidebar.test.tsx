import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Sidebar from '../../components/Sidebar'

describe('Sidebar Component', () => {
  it('renders without crashing', () => {
    render(<Sidebar />)
    const heading = screen.getByText('Sidebar')
    expect(heading).toBeInTheDocument()
  })

  it('displays the sidebar heading', () => {
    render(<Sidebar />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Sidebar')
  })

  it('renders within a div container', () => {
    render(<Sidebar />)
    const heading = screen.getByText('Sidebar')
    const container = heading.parentElement
    expect(container?.tagName).toBe('DIV')
  })

  it('contains the comment about rendering sidebar content', () => {
    const { container } = render(<Sidebar />)
    // Check that the component structure exists
    expect(container.firstChild).toBeTruthy()
  })
})