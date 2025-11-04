import { createContext } from 'react';

export type Tab = { id: number; title: string; sql?: string; result?: unknown[]; };

export type AppState = {
    tabs: Tab[];
    activeId: number;
    addTab: (query: string, title: string) => void;
    closeTab: (id: number) => void;
    setActiveId: (id: number) => void;
    updateTabSql: (id: number, sql: string) => void;
    setTabResult: (id: number, result: unknown[]) => void;
    showSidebar: boolean;
    toggleSidebar: () => void;
    showHistory: boolean;
    toggleHistory: () => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);


