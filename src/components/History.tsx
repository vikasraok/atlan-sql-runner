import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const History: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div data-testid="history">
      <h2 data-testid="history-heading">{t('historyTitle')}</h2>
      {/* Render history items here */}
    </div>
  );
}

export default History;
