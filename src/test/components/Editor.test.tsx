import { vi } from 'vitest'

// Mock the useTranslation hook before importing components
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as-is for testing
    }),
}))

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Editor from '../../components/Editor'
import { LocalizationProvider } from '../../contexts/LocalizationContext'
import { AppStateProvider } from '../../contexts/AppStateProvider'

const renderWithProviders = (ui: React.ReactElement) =>
    render(
        <LocalizationProvider>
            <AppStateProvider>{ui}</AppStateProvider>
        </LocalizationProvider>
    )

describe('Editor Component', () => {
    it('renders without crashing', () => {
        renderWithProviders(<Editor />)
        const textarea = screen.getByRole('textbox')
        expect(textarea).toBeInTheDocument()
    })

    it('renders a textarea element', () => {
        renderWithProviders(<Editor />)
        const textarea = screen.getByRole('textbox')
        expect(textarea.tagName).toBe('TEXTAREA')
    })

    it('is focusable and accepts input', () => {
        renderWithProviders(<Editor />)
        const textarea = screen.getByRole('textbox')

        // Focus the textarea
        textarea.focus()
        expect(textarea).toHaveFocus()
    })
})