import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component', () => {
    it('renders without crashing', async () => {
        render(<App />)
        await waitFor(() => {
            expect(screen.getByTestId('app-title')).toBeInTheDocument()
        })
    })

    it('renders the main header with database icon and title', async () => {
        render(<App />)

        // Wait for render and check for the title
        const title = await screen.findByTestId('app-title')
        expect(title).toBeInTheDocument()
        expect(title).toHaveClass('text-xl', 'font-semibold', 'text-slate-900')

        // Check for the database icon (by checking the lucide-react Database component)
        await waitFor(() => {
            const databaseIcon = title.parentElement?.querySelector('svg')
            expect(databaseIcon).toBeInTheDocument()
        })
    })

    it('renders toggle buttons for Saved Queries and History', () => {
        render(<App />)

        const savedQueriesButton = screen.getByTestId('toggle-sidebar-button')
        const historyButton = screen.getByTestId('toggle-history-button')

        expect(savedQueriesButton).toBeInTheDocument()
        expect(historyButton).toBeInTheDocument()
    })

    it('shows sidebar by default', () => {
        render(<App />)

        // The sidebar should be visible by default
        const sidebar = screen.getByTestId('sidebar')
        expect(sidebar).toBeInTheDocument()
    })

    it('does not show history by default', () => {
        render(<App />)

        // The history should not be visible by default
        const history = screen.queryByTestId('history')
        expect(history).not.toBeInTheDocument()
    })

    it('toggles sidebar visibility when Saved Queries button is clicked', async () => {
        render(<App />)

        const savedQueriesButton = screen.getByTestId('toggle-sidebar-button')
        const sidebar = screen.getByTestId('sidebar')

        // Sidebar is visible by default
        expect(sidebar).toBeInTheDocument()

        // Click to hide sidebar
        fireEvent.click(savedQueriesButton)
        await waitFor(() => {
            expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
        })

        // Click to show sidebar again
        fireEvent.click(savedQueriesButton)
        await waitFor(() => {
            expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        })
    })

    it('toggles history visibility when History button is clicked', async () => {
        render(<App />)

        const historyButton = screen.getByTestId('toggle-history-button')

        // History is not visible by default
        expect(screen.queryByTestId('history')).not.toBeInTheDocument()

        // Click to show history
        fireEvent.click(historyButton)
        await waitFor(() => {
            expect(screen.getByTestId('history')).toBeInTheDocument()
        })

        // Click to hide history
        fireEvent.click(historyButton)
        await waitFor(() => {
            expect(screen.queryByTestId('history')).not.toBeInTheDocument()
        })
    })

    it('applies correct CSS classes to toggle buttons based on state', async () => {
        render(<App />)

        const savedQueriesButton = screen.getByTestId('toggle-sidebar-button')
        const historyButton = screen.getByTestId('toggle-history-button')

        // Initial state: sidebar shown (active), history hidden (inactive)
        await waitFor(() => {
            expect(savedQueriesButton).toHaveClass('bg-blue-50', 'text-blue-700', 'border-blue-300')
            expect(historyButton).toHaveClass('bg-white', 'text-slate-700')
        })

        // Toggle sidebar off
        fireEvent.click(savedQueriesButton)
        await waitFor(() => {
            expect(savedQueriesButton).toHaveClass('bg-white', 'text-slate-700')
        })

        // Toggle history on
        fireEvent.click(historyButton)
        await waitFor(() => {
            expect(historyButton).toHaveClass('bg-blue-50', 'text-blue-700', 'border-blue-300')
        })
    })

    it('renders all main components', async () => {
        render(<App />)

        // Check that all main components are rendered
        await waitFor(() => {
            expect(screen.getByTestId('sidebar')).toBeInTheDocument() // Sidebar component
            expect(screen.getByTestId('tabs')).toBeInTheDocument() // Tabs component
            expect(screen.getByTestId('sql-editor')).toBeInTheDocument() // Editor component (textarea)
            expect(screen.getByTestId('result')).toBeInTheDocument() // Result component
        })
    })

    it('has proper layout structure with correct CSS classes', async () => {
        render(<App />)

        // Check main container
        await waitFor(() => {
            const mainContainer = screen.getByTestId('app-title').closest('.h-screen')
            expect(mainContainer).toHaveClass('h-screen', 'flex', 'flex-col', 'bg-slate-50', 'text-slate-700')

            // Check header
            const header = screen.getByTestId('app-title').closest('header')
            expect(header).toHaveClass('bg-white', 'border-b', 'border-slate-200', 'shadow-md', 'z-10')
        })
    })
})