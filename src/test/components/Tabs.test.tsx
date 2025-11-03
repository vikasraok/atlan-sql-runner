import { vi } from 'vitest'

// Mock the useTranslation hook before importing components so the mock is applied to providers/components on import
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}))

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import Tabs from '../../components/Tabs'
import { LocalizationProvider } from '../../contexts/LocalizationContext'
import { AppStateProvider } from '../../contexts/AppStateProvider'

const renderWithProviders = (ui: ReactElement) => {
    return render(
        <LocalizationProvider>
            <AppStateProvider>{ui}</AppStateProvider>
        </LocalizationProvider>
    )
}

describe('Tabs Component (provider-backed)', () => {
    it('renders initial tab', () => {
        renderWithProviders(<Tabs />)
        expect(screen.getByTestId('tab-1')).toBeInTheDocument()
    })

    it('adds a new tab when add button is clicked', () => {
        renderWithProviders(<Tabs />)
        const add = screen.getByTestId('add-tab-button')
        fireEvent.click(add)
        // New tab should be present (id 2)
        expect(screen.getByTestId('tab-2')).toBeInTheDocument()
    })

    it('closes a tab when close button is clicked', () => {
        renderWithProviders(<Tabs />)
        const add = screen.getByTestId('add-tab-button')
        fireEvent.click(add)

        const tab2 = screen.getByTestId('tab-2')
        expect(tab2).toBeInTheDocument()

        const close = screen.getByTestId('tab-2-close')
        fireEvent.click(close)

        // tab-2 should be removed
        expect(screen.queryByTestId('tab-2')).not.toBeInTheDocument()
    })

    it('sets active tab when clicking a tab', () => {
        renderWithProviders(<Tabs />)
        const add = screen.getByTestId('add-tab-button')
        fireEvent.click(add) // create tab-2

        const tab1 = screen.getByTestId('tab-1')
        const tab2 = screen.getByTestId('tab-2')

        // Initially activeId should be 2 (last added)
        expect(tab2).toHaveAttribute('aria-selected', 'true')

        // Click tab1 -> becomes active
        fireEvent.click(tab1)
        expect(tab1).toHaveAttribute('aria-selected', 'true')
        expect(tab2).toHaveAttribute('aria-selected', 'false')
    })
})
// (mock hoisted to top)