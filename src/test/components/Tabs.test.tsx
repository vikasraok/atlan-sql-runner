import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Tabs from '../../components/Tabs'

// Mock the useTranslation hook
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // Return the key as-is for testing
    }),
}))

describe('Tabs Component', () => {
    it('renders without crashing', () => {
        render(<Tabs />)
        const tab1 = screen.getByTestId('tab-1')
        expect(tab1).toBeInTheDocument()
    })

    it('renders all three tabs', () => {
        render(<Tabs />)

        expect(screen.getByTestId('tab-1')).toBeInTheDocument()
        expect(screen.getByTestId('tab-2')).toBeInTheDocument()
        expect(screen.getByTestId('tab-3')).toBeInTheDocument()
    })

    it('has correct flex layout container', () => {
        render(<Tabs />)
        const container = screen.getByTestId('tab-1').parentElement
        expect(container).toHaveClass('flex')
    })

    it('applies correct CSS classes to tabs', () => {
        render(<Tabs />)

        const tab1 = screen.getByTestId('tab-1')
        const tab2 = screen.getByTestId('tab-2')
        const tab3 = screen.getByTestId('tab-3')

        // Check that all tabs have the basic tab classes
        expect(tab1).toHaveClass('tab', 'w-32', 'px-4', 'py-2', 'cursor-pointer')
        expect(tab2).toHaveClass('tab', 'w-32', 'px-4', 'py-2', 'cursor-pointer')
        expect(tab3).toHaveClass('tab', 'w-32', 'px-4', 'py-2', 'cursor-pointer')
    })

    it('shows Tab 3 as active (with blue border)', () => {
        render(<Tabs />)

        const tab1 = screen.getByTestId('tab-1')
        const tab2 = screen.getByTestId('tab-2')
        const tab3 = screen.getByTestId('tab-3')

        // Tab 3 should have the active border
        expect(tab3).toHaveClass('border-b-2', 'border-blue-500')

        // Tab 1 and Tab 2 should have transparent border
        expect(tab1).toHaveClass('border-b-2', 'border-transparent')
        expect(tab2).toHaveClass('border-b-2', 'border-transparent')
    })

    it('has hover effects on tabs', () => {
        render(<Tabs />)

        const tab1 = screen.getByTestId('tab-1')
        expect(tab1).toHaveClass('hover:border-blue-500')
    })

    it('renders exactly 3 tab elements', () => {
        render(<Tabs />)

        const tabs = screen.getAllByTestId(/^tab-\d+$/)
        expect(tabs).toHaveLength(3)
    })
})