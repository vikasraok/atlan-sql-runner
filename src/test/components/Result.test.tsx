import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Result from '../../components/Result'

// Mock the useTranslation hook
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as-is for testing
    }),
}))

describe('Result Component', () => {
    it('renders without crashing', () => {
        render(<Result />)
        const heading = screen.getByTestId('result-heading')
        expect(heading).toBeInTheDocument()
    })

    it('displays the result heading', () => {
        render(<Result />)
        const heading = screen.getByRole('heading', { level: 2 })
        expect(heading).toHaveTextContent('result')
    })

    it('renders within a div container', () => {
        render(<Result />)
        const heading = screen.getByTestId('result-heading')
        const container = heading.parentElement
        expect(container?.tagName).toBe('DIV')
    })

    it('has correct component structure', () => {
        const { container } = render(<Result />)
        expect(container.firstChild).toBeTruthy()
        expect(container.querySelector('h2')).toBeInTheDocument()
    })
})