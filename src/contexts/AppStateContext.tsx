import { createContext } from 'react';
import type { QueryResult } from '../types';

export type Tab = { id: number; title: string; sql?: string; result?: QueryResult; };

export type AppState = {
    tabs: Tab[];
    activeId: number;
    addTab: (query: string, title: string) => void;
    closeTab: (id: number) => void;
    setActiveId: (id: number) => void;
    updateTab: (title: string, sql: string) => void;
    updateTabSql: (id: number, sql: string) => void;
    setTabResult: (id: number, result: QueryResult) => void;
    showSidebar: boolean;
    toggleSidebar: () => void;
    showHistory: boolean;
    toggleHistory: () => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);


