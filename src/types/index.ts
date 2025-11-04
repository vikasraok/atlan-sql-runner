export type SQLStatusValues = 'idle' | 'running' | 'success' | 'error' | 'cancelled';

export interface QueryResult{
    id: string;
    query: string;
    columns: string[];
    result: { [key: string]: unknown }[];
    executedAt: number;
    executionTime: number;
    rowCount: number;
}
export interface HistoryItem{
    id: string;
    query: string;
    result: QueryResult | null;
    executedAt: string;
    executionTime: number;
    executor: string;
    rowCount: number;
    status: SQLStatusValues;
}

export interface SavedQuery{
    id: string;
    title: string;
    query: string;
    description?: string;
    createdAt?: number;
}

export interface QueryTab{
    id: number;
    title: string;
    sql: string;
    result?: QueryResult ;
    isSaved?: boolean;
}