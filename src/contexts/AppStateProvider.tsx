import { useReducer, useRef, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { AppStateContext } from './AppStateContext';
import type { Tab } from './AppStateContext';
import { useTranslation } from '../hooks/useTranslation';

type State = {
    tabs: Tab[];
    activeId: number;
    showSidebar: boolean;
    showHistory: boolean;
};

type Action =
    | { type: 'ADD_TAB'; title: string; id: number }
    | { type: 'CLOSE_TAB'; id: number }
    | { type: 'SET_ACTIVE'; id: number }
    | { type: 'UPDATE_SQL'; id: number; sql: string }
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'TOGGLE_HISTORY' };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TAB':
            return { ...state, tabs: [...state.tabs, { id: action.id, title: action.title }], activeId: action.id };
        case 'CLOSE_TAB': {
            const filtered = state.tabs.filter((t) => t.id !== action.id);
            if (filtered.length === 0) {
                // fallback: create a new tab with id from action (caller should ensure unique id)
                return { ...state, tabs: [{ id: action.id, title: 'tab' }], activeId: action.id };
            }
            if (action.id === state.activeId) {
                const idx = state.tabs.findIndex((x) => x.id === action.id);
                const prev = state.tabs[idx - 1] ?? filtered[0];
                return { ...state, tabs: filtered, activeId: prev.id };
            }
            return { ...state, tabs: filtered };
        }
        case 'SET_ACTIVE':
            return { ...state, activeId: action.id };
        case 'UPDATE_SQL': {
            const { id, sql } = action;
            const tabs = state.tabs.map((t) => (t.id === id ? { ...t, sql } : t));
            return { ...state, tabs };
        }
        case 'TOGGLE_SIDEBAR':
            return { ...state, showSidebar: !state.showSidebar };
        case 'TOGGLE_HISTORY':
            return { ...state, showHistory: !state.showHistory };
        default:
            return state;
    }
};
export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { t } = useTranslation();

    const nextId = useRef(2);

    const initialState: State = {
        tabs: [{ id: 1, title: t('tab'), sql: '' }],
        activeId: 1,
        showSidebar: true,
        showHistory: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const addTab = useCallback(() => {
        const id = nextId.current++;
        dispatch({ type: 'ADD_TAB', id, title: t('tab') });
    }, [t]);

    const closeTab = useCallback(
        (id: number) => dispatch({ type: 'CLOSE_TAB', id }),
        []
    );

    const setActiveId = useCallback((id: number) => dispatch({ type: 'SET_ACTIVE', id }), []);

    const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), []);
    const toggleHistory = useCallback(() => dispatch({ type: 'TOGGLE_HISTORY' }), []);
    const updateTabSql = useCallback((id: number, sql: string) => dispatch({ type: 'UPDATE_SQL', id, sql }), []);
    const updateTabCursor = useCallback((id: number, start: number | null, end: number | null) => dispatch({ type: 'UPDATE_CURSOR', id, start, end }), []);

    const value = useMemo(
        () => ({
            tabs: state.tabs,
            activeId: state.activeId,
            addTab,
            closeTab,
            setActiveId,
            updateTabSql,
            updateTabCursor,
            showSidebar: state.showSidebar,
            toggleSidebar,
            showHistory: state.showHistory,
            toggleHistory,
        }),
        [state, addTab, closeTab, setActiveId, toggleSidebar, toggleHistory, updateTabSql, updateTabCursor]
    );

    return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};
