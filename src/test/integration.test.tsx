import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('Integration Tests', () => {
  it('renders all components together in the correct layout', async () => {
    render(<App />)
    
    // Wait for the app to fully render
    await waitFor(() => {
      expect(screen.getByText('Atlan SQL Runner')).toBeInTheDocument()
    })
    
    // Header elements
    expect(screen.getByTestId('toggle-sidebar-button')).toBeInTheDocument()
    expect(screen.getByTestId('toggle-history-button')).toBeInTheDocument()
    
    // Main content components
    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument() // Sidebar is visible by default
      expect(screen.getByTestId('tabs')).toBeInTheDocument() // Tabs
      expect(screen.getByTestId('sql-editor')).toBeInTheDocument() // Editor
      expect(screen.getByTestId('result')).toBeInTheDocument() // Result
    })
    
    // History should not be visible by default
    expect(screen.queryByTestId('history')).not.toBeInTheDocument()
  })

  it('maintains proper component isolation when toggling sidebar and history', async () => {
    render(<App />)
    
    const savedQueriesButton = screen.getByTestId('toggle-sidebar-button')
    const historyButton = screen.getByTestId('toggle-history-button')
    
    // Initial state: sidebar visible, history hidden
    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('history')).not.toBeInTheDocument()
    
    // Hide sidebar, show history
    fireEvent.click(savedQueriesButton)
    fireEvent.click(historyButton)
    
    // Wait for state changes to be reflected
    await waitFor(() => {
      expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument()
      expect(screen.getByTestId('history')).toBeInTheDocument()
    })
    
    // Main content components should still be visible
    expect(screen.getByTestId('tabs')).toBeInTheDocument()
    expect(screen.getByTestId('sql-editor')).toBeInTheDocument()
    expect(screen.getByTestId('result')).toBeInTheDocument()
  })

  it('can show both sidebar and history simultaneously', async () => {
    render(<App />)
    
    const historyButton = screen.getByTestId('toggle-history-button')
    
    // Sidebar is visible by default, show history too
    fireEvent.click(historyButton)
    
    // Wait for state changes
    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
      expect(screen.getByTestId('history')).toBeInTheDocument()
    })
    
    // Main content should still be there
    expect(screen.getByTestId('tabs')).toBeInTheDocument()
    expect(screen.getByTestId('sql-editor')).toBeInTheDocument()
    expect(screen.getByTestId('result')).toBeInTheDocument()
  })

  it('maintains button states correctly during multiple toggles', async () => {
    render(<App />)
    
    const savedQueriesButton = screen.getByTestId('toggle-sidebar-button')
    const historyButton = screen.getByTestId('toggle-history-button')
    
    // Wait for initial render and check initial states
    await waitFor(() => {
      expect(savedQueriesButton).toHaveClass('bg-blue-50', 'text-blue-700')
      expect(historyButton).toHaveClass('bg-white', 'text-slate-700')
    })
    
    // Toggle both multiple times
    fireEvent.click(savedQueriesButton) // hide sidebar
    fireEvent.click(historyButton) // show history
    fireEvent.click(savedQueriesButton) // show sidebar
    fireEvent.click(historyButton) // hide history
    
    // Wait for final state changes and verify
    await waitFor(() => {
      expect(savedQueriesButton).toHaveClass('bg-blue-50', 'text-blue-700')
      expect(historyButton).toHaveClass('bg-white', 'text-slate-700')
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
      expect(screen.queryByTestId('history')).not.toBeInTheDocument()
    })
  })

  it('editor component remains functional during layout changes', async () => {
    render(<App />)
    
    // Wait for components to render
    const textarea = await screen.findByTestId('sql-editor')
    const savedQueriesButton = screen.getByTestId('toggle-sidebar-button')
    const historyButton = screen.getByTestId('toggle-history-button')
    
    // Focus and check editor
    textarea.focus()
    await waitFor(() => {
      expect(textarea).toHaveFocus()
    })
    
    // Toggle sidebar and history
    fireEvent.click(savedQueriesButton)
    fireEvent.click(historyButton)
    
    // Wait for layout changes and verify editor state
    await waitFor(() => {
      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveFocus()
    })
  })

  it('has proper responsive layout structure', async () => {
    render(<App />)
    
    // Wait for components to render
    await waitFor(() => {
      expect(screen.getByText('Atlan SQL Runner')).toBeInTheDocument()
    })
    
    // Check main layout containers exist with correct classes
    const mainApp = screen.getByText('Atlan SQL Runner').closest('.h-screen')
    expect(mainApp).toHaveClass('h-screen', 'flex', 'flex-col')
    
    const contentArea = screen.getByTestId('tabs').closest('.flex-1')
    expect(contentArea).toHaveClass('flex-1', 'flex', 'overflow-hidden')
    
    const mainContent = screen.getByTestId('tabs').closest('main')
    expect(mainContent).toHaveClass('flex-1', 'flex', 'flex-col', 'overflow-hidden')
  })
})