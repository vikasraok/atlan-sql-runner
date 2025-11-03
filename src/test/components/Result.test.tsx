import { vi } from 'vitest'

// Mock the useTranslation hook before importing components
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as-is for testing
    }),
}))

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Result from '../../components/Result'
import { LocalizationProvider } from '../../contexts/LocalizationContext'
import { AppStateProvider } from '../../contexts/AppStateProvider'

const renderWithProviders = (ui: React.ReactElement) =>
    render(
        <LocalizationProvider>
            <AppStateProvider>{ui}</AppStateProvider>
        </LocalizationProvider>
    )

describe('Result Component', () => {
    it('renders without crashing', () => {
        renderWithProviders(<Result />)
        const heading = screen.getByTestId('result-heading')
        expect(heading).toBeInTheDocument()
    })

    it('displays the result heading', () => {
        renderWithProviders(<Result />)
        const heading = screen.getByRole('heading', { level: 2 })
        expect(heading).toHaveTextContent('result')
    })

    it('renders within a div container', () => {
        renderWithProviders(<Result />)
        const heading = screen.getByTestId('result-heading')
        const container = heading.parentElement
        expect(container?.tagName).toBe('DIV')
    })

    it('has correct component structure', () => {
        const { container } = renderWithProviders(<Result />)
        expect(container.firstChild).toBeTruthy()
        expect(container.querySelector('h2')).toBeInTheDocument()
    })
})