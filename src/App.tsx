import { useState } from 'react';
import { Database } from 'lucide-react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Result from './components/Result';
import History from './components/History';
import Tabs from './components/Tabs';
import { LocalizationProvider } from './contexts/LocalizationContext';
import { useTranslation } from './hooks/useTranslation';
import LanguageSelector from './components/LanguageSelector';

function AppContent() {
  const { t } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-700">
      <header className="bg-white border-b border-slate-200 shadow-md z-10">
        <div className="flex justify-between items-center px-4 h-16">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-500" />
            <h1 data-testid="app-title" className="text-xl font-semibold text-slate-900">{t('appTitle')}</h1>
          </div>

          <div className="flex gap-3">
            <button
              data-testid="toggle-sidebar-button"
              className={`inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium transition-all
                ${showSidebar
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                }`}
              onClick={toggleSidebar}
            >
              {t('savedQueries')}
            </button>
            <button
              data-testid="toggle-history-button"
              className={`inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium transition-all
                ${showHistory
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                }`}
              onClick={toggleHistory}
            >
              {t('history')}
            </button>
            <LanguageSelector />
          </div>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <div data-testid="sidebar-container">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Tabs />
          <section className="bg-white border-b border-slate-200">
            <Editor />
          </section>
          <section className="flex-1 bg-white overflow-hidden">
            <Result />
          </section>
        </main>
        {showHistory && (
          <div data-testid="history-container">
            <History />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <LocalizationProvider>
      <AppContent />
    </LocalizationProvider>
  );
}

export default App;