import React from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useAppState } from "../hooks/useAppState";

const Result: React.FC = () => {
  const { t } = useTranslation();
  const { tabs, activeId } = useAppState();
  const active = tabs.find((x) => x.id === activeId);

  return (
    <div data-testid="result">
      <h2 data-testid="result-heading">{t('result')}</h2>
      <pre data-testid="result-sql" className="whitespace-pre-wrap p-2 bg-white rounded border border-slate-200">
        {!active?.result?.length && t('noResult')}
      </pre>
    </div>
  );
}

export default Result;