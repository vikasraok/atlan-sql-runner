import React, { useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useAppState } from '../hooks/useAppState';

const Editor: React.FC<unknown> = () => {
  const { t } = useTranslation();
  const { tabs, activeId, updateTabSql } = useAppState();

  const active = tabs.find((x) => x.id === activeId);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!active) return;
      updateTabSql(active.id, e.target.value);
    },
    [active, updateTabSql]
  );



  return (
    <textarea
      data-testid="sql-editor"
      value={active?.sql ?? ''}
      onChange={onChange}
      placeholder={t('sqlEditorPlaceholder')}
      className="bg-white w-full p-2 min-h-[300px] h-full border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-inset font-mono text-sm box-border resize-y overflow-auto min-w-0"
      aria-label={t('sqlEditorPlaceholder')}
      name="editor"
    />
  );
}
export default Editor;