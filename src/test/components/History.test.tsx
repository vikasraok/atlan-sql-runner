import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import History from '../../components/History'

// Mock the useTranslation hook
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as-is for testing
    }),
}))

describe('History Component', () => {
    it('renders without crashing', () => {
        render(<History />)
        const heading = screen.getByTestId('history-heading')
        expect(heading).toBeInTheDocument()
    })

    it('displays the history heading', () => {
        render(<History />)
        const heading = screen.getByRole('heading', { level: 2 })
        expect(heading).toHaveTextContent('historyTitle')
    })

    it('renders within a div container', () => {
        render(<History />)
        const heading = screen.getByTestId('history-heading')
        const container = heading.parentElement
        expect(container?.tagName).toBe('DIV')
    })

    it('has correct component structure', () => {
        const { container } = render(<History />)
        expect(container.firstChild).toBeTruthy()
        expect(container.querySelector('h2')).toBeInTheDocument()
    })
})