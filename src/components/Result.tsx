import React, { useEffect, useRef } from "react";
import "slickgrid/dist/styles/css/slick-alpine-theme.css";
import { SlickGrid, SlickDataView } from "slickgrid";
import { useTranslation } from "../hooks/useTranslation";
import { useAppState } from "../hooks/useAppState";

const Result: React.FC = () => {
  const { t } = useTranslation();
  const { activeId, tabs } = useAppState();

  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.id === activeId);
    if (gridContainerRef.current && activeTab?.result?.result?.length) {
      const result = activeTab.result.result;
      const columns = activeTab.result.columns.map((col) => ({
        id: col,
        name: col,
        field: col,
      }));

      const options = {
        enableColumnReorder: false,
        headerRowHeight: 40,
        rowHeight: 40,
      };
      const dataView = new SlickDataView();
      dataView.setItems(result);
      new SlickGrid(gridContainerRef.current, dataView, columns, options);
    }
  }, [activeId, tabs]);
  const rowCount = tabs.find((tab) => tab.id === activeId)?.result?.result?.length || 0;
  return (
    <div data-testid="result" className="py-4 overflow-auto flex flex-1 flex-col">

      {!activeId || !tabs.find((tab) => tab.id === activeId)?.result?.result?.length ? (
        <pre
          data-testid="result-sql"
          className="whitespace-pre-wrap p-2 bg-white rounded border border-slate-200"
        >
          {t("noResult")}
        </pre>
      ) : (
        <>
          <p className="text-md mb-2">{t("result")}: {rowCount}</p>
          <div
            ref={gridContainerRef}
            className="w-full h-full"
            data-testid="result-grid"
          />
        </>
      )}
    </div>
  );
};

export default Result;