import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useAppState } from '../hooks/useAppState';
import { generateLargeMockData } from '../mock/data';
import type { QueryResult } from '../types';

const fetchQueryResult = async (queryId: string): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = generateLargeMockData(Math.floor(100000 + Math.random() * 900000));
      if (result) {
        resolve({
          id: queryId.toString(),
          query: '',
          columns: result?.columns,
          result: result?.data,
          executedAt: new Date().getTime() - 1000,
          executionTime: 500,
          rowCount: result?.data?.length,

        });
      } else {
        reject(new Error(`Query with ID ${queryId} not found.`));
      }
    }, 500);
  });
};

const validateSql = (sql: string) => {
  const s = sql.trim().toLowerCase();
  if (!s) return 'SQL is empty';
  if (!/(select|insert|update|delete|create|with)\b/.test(s))
    return 'Unrecognized SQL (missing SELECT/INSERT/UPDATE/DELETE/CREATE)';
  return null;
};

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { tabs, activeId, updateTabSql, setTabResult, updateTab } = useAppState();
  const active = tabs.find((x) => x.id === activeId);

  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [queryId, setQueryId] = useState<number | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChange = useCallback(
    (next: string) => {
      if (!active) return;
      setIsDirty(true);
      updateTabSql(active.id, next);
      setError(validateSql(next ?? ''));
      setQueryId(Math.random());
    },
    [active, updateTabSql]
  );

  const lines = useMemo(() => {
    const text = active?.sql ?? '';
    return Math.max(1, text.split('\n').length);
  }, [active?.sql]);

  const gutterRef = useRef<HTMLDivElement | null>(null);

  const handleOuterDivClick = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const runQuery = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!active) return;
      setIsDirty(true);
      const validationError = validateSql(active.sql ?? '');
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsExecuting(true);
      try {
        const result = await fetchQueryResult(String(queryId));
        setTabResult(active.id, result);
        updateTab(active.sql ?? '', active.sql ?? '');
      } catch (error) {
        console.error(error);
      } finally {
        setIsExecuting(false);
      }
    },
    [active, setTabResult, queryId, updateTab]
  );

  const isButtonDisabled = !active?.sql || !!error;

  return (
    <form onSubmit={runQuery} className="flex flex-col h-1/3" data-testid="editor">
      <div
        onClick={handleOuterDivClick}
        className="flex flex-row flex-1/3 relative overflow-x-hidden overflow-y-auto bg-white border-slate-200 border -my-px focus-within:border-blue-500"
      >
        <div ref={gutterRef} className="bg-slate-50 px-2 text-right text-sm text-slate-500 select-none overflow-visible leading-5 shrink-0" style={{ width: 48, paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="h-5">{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          data-testid="sql-editor"
          value={active?.sql ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('sqlEditorPlaceholder')}
          className="flex-1 font-mono text-sm leading-5 resize-none outline-none bg-white p-2 overflow-hidden"
          style={{ height: `${lines * 20 + 16}px` }}
          aria-label={t('sqlEditorPlaceholder')}
          name="editor"
        />

        {isExecuting ? (
          <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <button
            type="submit"
            data-testid="run-button"
            className={`absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-md text-sm shadow focus:outline-none focus:ring-2 ${isButtonDisabled ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'}`}
            aria-label={t('run')}
            disabled={isButtonDisabled}
          >
            <svg className="h-4 w-4" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>

      {isDirty && error && <div className="text-sm text-red-600 mt-1 px-2" data-testid="sql-error">{error}</div>}
    </form>
  );
};

export default Editor;