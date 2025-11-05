import { useReducer, useRef, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { AppStateContext } from './AppStateContext';
import type { QueryTab } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import type { QueryResult } from '../types';

type State = {
    tabs: QueryTab[];
    activeId: number;
    showSidebar: boolean;
    showHistory: boolean;
};

type Action =
    | { type: 'ADD_TAB'; title: string; id: number; sql: string } // Added 'sql' property
    | { type: 'UPDATE_TAB'; title: string; sql: string } // sql property added here
    | { type: 'CLOSE_TAB'; id: number }
    | { type: 'SET_ACTIVE'; id: number }
    | { type: 'UPDATE_SQL'; id: number; sql: string }
    | { type: 'SET_RESULT'; id: number; result: QueryResult }
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'TOGGLE_HISTORY' };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TAB':
            if (state.tabs.find((tab) => tab.id === action.id)) {
                return { ...state, activeId: action.id };
            }
            return { ...state, tabs: [...state.tabs, { id: action.id, title: action.title, sql: action.sql }], activeId: action.id };
        case 'UPDATE_TAB': {
            const updatedTabs = state.tabs.map((tab) =>
                tab.id === state.activeId ? { ...tab, title: action.title, sql: action.sql } : tab
            );
            return { ...state, tabs: updatedTabs };
        }
        case 'CLOSE_TAB': {
            const filtered = state.tabs.filter((t) => t.id !== action.id);
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
        case 'SET_RESULT': {
            const { id, result } = action;
            const tabs = state.tabs.map((t) => (t.id === id ? { ...t, result } : t));
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

    const addTab = useCallback(
        (query: string, title: string, id: number = nextId.current++) => {
            dispatch({ type: 'ADD_TAB', id, title, sql: query });
        },
        []
    );

    const closeTab = useCallback(
        (id: number) => dispatch({ type: 'CLOSE_TAB', id }),
        []
    );

    const setActiveId = useCallback((id: number) => dispatch({ type: 'SET_ACTIVE', id }), []);

    const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), []);
    const toggleHistory = useCallback(() => dispatch({ type: 'TOGGLE_HISTORY' }), []);
    const updateTabSql = useCallback((id: number, sql: string) => dispatch({ type: 'UPDATE_SQL', id, sql }), []);
    const updateTab = useCallback((title: string, sql: string) => dispatch({ type: 'UPDATE_TAB', title, sql }), []);
    const setTabResult = useCallback((id: number, result: QueryResult) => dispatch({ type: 'SET_RESULT', id, result }), []);

    const value = useMemo(
        () => ({
            tabs: state.tabs,
            activeId: state.activeId,
            addTab,
            closeTab,
            setActiveId,
            updateTab,
            updateTabSql,
            setTabResult,
            showSidebar: state.showSidebar,
            toggleSidebar,
            showHistory: state.showHistory,
            toggleHistory,
        }),
        [state.tabs, state.activeId, state.showSidebar, state.showHistory, addTab, closeTab, setActiveId, updateTab, updateTabSql, setTabResult, toggleSidebar, toggleHistory]
    );

    return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};
