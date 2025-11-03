import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Editor from '../../components/Editor'

// Mock the useTranslation hook
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as-is for testing
    }),
}))

describe('Editor Component', () => {
    it('renders without crashing', () => {
        render(<Editor />)
        const textarea = screen.getByRole('textbox')
        expect(textarea).toBeInTheDocument()
    })

    it('renders a textarea element', () => {
        render(<Editor />)
        const textarea = screen.getByRole('textbox')
        expect(textarea.tagName).toBe('TEXTAREA')
    })

    it('is focusable and accepts input', () => {
        render(<Editor />)
        const textarea = screen.getByRole('textbox')

        // Focus the textarea
        textarea.focus()
        expect(textarea).toHaveFocus()
    })
})