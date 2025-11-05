import { createContext } from 'react';
import type { QueryResult, QueryTab } from '../types';


export type AppState = {
    tabs: QueryTab[];
    activeId: number;
    addTab: (query: string, title: string, id?: number) => void;
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


