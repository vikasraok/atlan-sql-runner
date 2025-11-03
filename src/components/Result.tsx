import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const Result: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div data-testid="result">
      <h2 data-testid="result-heading">{t('result')}</h2>
      {/* Render result here */}
    </div>
  );
}

export default Result;
