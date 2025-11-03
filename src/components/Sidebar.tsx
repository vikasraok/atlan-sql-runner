import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div data-testid="sidebar">
      <h2 data-testid="sidebar-heading">{t('sidebar')}</h2>
      {/* Render sidebar content here */}
    </div>
  );
}

export default Sidebar;