import React, { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { mockSavedQueries } from "../mock/savedQueries";
import { useAppState } from '../hooks/useAppState';
import type { SavedQuery } from "../types";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { showSidebar, updateTab } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedQueries = async () => {
      setLoading(true);
      const response = await new Promise<SavedQuery[]>((resolve) => {
        setTimeout(() => resolve(mockSavedQueries), 1000);
      });
      setSavedQueries(response);
      setLoading(false);
    };

    fetchSavedQueries();
  }, []);

  const filteredQueries = savedQueries.filter((query) =>
    query.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQueryClick = (query: SavedQuery) => {
    updateTab(query.title, query.query); // Pass title as tab title
  };

  return (
    <div className="w-[300px] bg-slate-100 border-r border-slate-300 h-full">
      <div className="px-4 py-2" data-testid="sidebar">
        {showSidebar && (
          <div >
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
                  <span className="sr-only">{t('loading')}</span>
                </div>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder={t('searchQueries')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded mb-2 bg-white"
                />
                <ul className="pl-0">
                  {filteredQueries.map((query, index) => (
                    <li
                      key={index}
                      className="text-gray-600 mb-2 cursor-pointer hover:bg-slate-200 p-2 rounded border border-slate-200"
                      onClick={() => handleQueryClick(query)}
                    >
                      <div className="font-bold">{query.title}</div>
                      <div className="text-sm text-gray-500">{query.query}</div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;