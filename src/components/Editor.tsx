import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Editor: React.FC<unknown> = () => {
  const { t } = useTranslation();

  return (
    <textarea
      data-testid="sql-editor"
      placeholder={t('sqlEditorPlaceholder')}
      className="bg-white w-full p-2 min-h-[300px] h-full border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-inset font-mono text-sm box-border resize-y overflow-auto min-w-0"
      aria-label={t('sqlEditorPlaceholder')}
      name="editor"
    />
  );
}
export default Editor;