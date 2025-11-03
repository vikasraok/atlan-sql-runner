import React, { useCallback, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useAppState } from '../hooks/useAppState';

const validateSql = (sql: string) => {
  const s = sql.trim().toLowerCase();
  if (!s) return 'SQL is empty';
  if (!/(select|insert|update|delete|create|with)\b/.test(s))
    return 'Unrecognized SQL (missing SELECT/INSERT/UPDATE/DELETE/CREATE)';
  return null;
};

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const { tabs, activeId, updateTabSql } = useAppState();
  const active = tabs.find((x) => x.id === activeId);

  const [error, setError] = useState<string | null>(null);
  const onChange = useCallback(
    (next: string) => {
      if (!active) return;
      updateTabSql(active.id, next);
      setError(validateSql(next ?? ''));
    },
    [active, updateTabSql]
  );

  return (
    <div>
      <textarea
        data-testid="sql-editor"
        value={active?.sql ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('sqlEditorPlaceholder')}
        className="bg-white w-full p-2 min-h-[300px] h-full border border-slate-200 rounded-md focus:outline-none  focus:border-blue-500 focus:ring-inset font-mono text-sm box-border resize-y overflow-auto min-w-0"
        aria-label={t('sqlEditorPlaceholder')}
        name="editor"
      />
      {error && <div className="text-sm text-red-600 mt-1" data-testid="sql-error">{error}</div>}
    </div>
  );
};

export default Editor;