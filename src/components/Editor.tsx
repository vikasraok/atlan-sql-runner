import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Editor: React.FC<unknown> = () => {
  const { t } = useTranslation();

  return (
    <textarea
      data-testid="sql-editor"
      placeholder={t('sqlEditorPlaceholder')}
      style={{ width: '100%', height: '300px' }}
    />
  );
}
export default Editor;