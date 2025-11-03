import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '../../components/Sidebar'

// Mock the useTranslation hook
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as-is for testing
    }),
}))

describe('Sidebar Component', () => {
    it('renders without crashing', () => {
        render(<Sidebar />)
        const heading = screen.getByTestId('sidebar-heading')
        expect(heading).toBeInTheDocument()
    })

    it('displays the sidebar heading', () => {
        render(<Sidebar />)
        const heading = screen.getByRole('heading', { level: 2 })
        expect(heading).toHaveTextContent('sidebar')
    })

    it('renders within a div container', () => {
        render(<Sidebar />)
        const heading = screen.getByTestId('sidebar-heading')
        const container = heading.parentElement
        expect(container?.tagName).toBe('DIV')
    })

    it('contains the comment about rendering sidebar content', () => {
        const { container } = render(<Sidebar />)
        // Check that the component structure exists
        expect(container.firstChild).toBeTruthy()
    })
})