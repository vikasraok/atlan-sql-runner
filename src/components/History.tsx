import React, { useEffect, useState } from "react";
import { useAppState } from "../hooks/useAppState";
import { historyMockData } from "../mock/historyMockData";
import { useTranslation } from "../hooks/useTranslation";

interface HistoryItem {
  query: string;
  resultRows: number;
  executor: string;
  dateExecuted: string;
}

const History: React.FC = () => {
  const { t } = useTranslation();
  const { addTab, showHistory } = useAppState(); // Added showHistory from AppState
  const [searchTerm, setSearchTerm] = useState("");
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistoryData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      setHistoryData(historyMockData);
      setLoading(false);
    };
    fetchHistoryData();
  }, []);

  const filteredHistory = historyData.filter((item) => {
    if (searchTerm.startsWith("@query:")) {
      const querySearch = searchTerm.replace("@query:", "").toLowerCase();
      return item.query.toLowerCase().includes(querySearch);
    } else if (searchTerm.startsWith("@user:")) {
      const userSearch = searchTerm.replace("@user:", "").toLowerCase();
      return item.executor.toLowerCase().includes(userSearch);
    } else if (searchTerm.startsWith("@at:")) {
      const dateSearch = searchTerm.replace("@at:", "");
      return item.dateExecuted === dateSearch;
    } else {
      return (
        item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.executor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dateExecuted.includes(searchTerm)
      );
    }
  });

  const handleCardClick = (query: string) => {
    addTab(query);
  };

  return (
    <>
      {showHistory && (
        <div className="fixed top-16 right-0 w-1/2 h-[calc(100%-64px)] bg-white shadow-lg border-l border-slate-300 overflow-y-auto z-16">
          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder={t("searchQueries")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                {filteredHistory.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(item.query)}
                    className="p-4 mb-4 border border-slate-300 rounded shadow-sm cursor-pointer hover:bg-gray-100"
                  >
                    <div className="text-sm text-slate-700 mb-2">
                      {item.query.length > 500
                        ? `${item.query.substring(0, 500)}...`
                        : item.query}
                    </div>
                    <div className="text-sm text-slate-500">
                      {t("result")}: {item.resultRows}
                    </div>
                    <div className="text-sm text-slate-500">
                      {t("executor")}: {item.executor}
                    </div>
                    <div className="text-sm text-slate-500">
                      {t("date")}: {item.dateExecuted}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default History;
