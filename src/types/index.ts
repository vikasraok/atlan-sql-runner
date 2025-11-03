type SQLStatusValues = 'idle' | 'running' | 'success' | 'error' | 'cancelled';

export interface QueryResult{
    id: string;
    query: string;
    columns: string[];
    result: Record<string, unknown>[];
    executedAt: number;
    executionTime: number;
    rowCount: number;
}
export interface HistoryItem{
    id: string;
    query: string;
    result: QueryResult | null;
    executedAt: number;
    executionTime: number;
    rowCount: number;
    status: SQLStatusValues;
}

export interface SavedQuery{
    id: string;
    name: string;
    query: string;
    description?: string;
    createdAt: number;
}

export interface QueryTab{
    id: string;
    name: string;
    query: string;
    result: QueryResult | null;
    isActive: boolean;
    isSaved: boolean;
}