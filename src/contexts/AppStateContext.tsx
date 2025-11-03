
import { createContext } from 'react';

type Tab = { id: number; title: string };

export type AppState = {
    tabs: Tab[];
    activeId: number;
    addTab: () => void;
    closeTab: (id: number) => void;
    setActiveId: (id: number) => void;
    showSidebar: boolean;
    toggleSidebar: () => void;
    showHistory: boolean;
    toggleHistory: () => void;
};

export const AppStateContext = createContext<AppState | undefined>(undefined);


