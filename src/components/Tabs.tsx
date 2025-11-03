import { useTranslation } from "../hooks/useTranslation";
import { useAppState } from "../hooks/useAppState";

const Tabs: React.FC = () => {
    const { t } = useTranslation();
    const { tabs, activeId, addTab, closeTab, setActiveId } = useAppState();

    return (
        <div className="flex items-center gap-2 px-2 py-1 bg-white" role="tablist" data-testid="tabs">
            <div className="flex gap-1 overflow-auto min-w-0">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        data-testid={`tab-${tab.id}`}
                        role="tab"
                        aria-selected={tab.id === activeId}
                        aria-label={t("tabLabel")}
                        tabIndex={0}
                        className={`flex items-center gap-3 px-1 py-2 rounded-t-md border-b-2 ${tab.id === activeId ? "border-blue-500" : "border-transparent hover:border-slate-200"} min-w-0`}
                        onClick={() => setActiveId(tab.id)}
                    >
                        <span data-testid={`tab-${tab.id}-label`} className="text-sm font-medium text-slate-800 truncate">
                            {tab.title}
                        </span>

                        <button
                            data-testid={`tab-${tab.id}-close`}
                            aria-label={`${t("delete")} ${t("tab")}`}
                            className="ml-2 text-slate-500 hover:text-slate-700 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeTab(tab.id);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className="ml-2">
                <button
                    data-testid="add-tab-button"
                    aria-label={t("addTab")}
                    onClick={addTab}
                    className="inline-flex items-center gap-2 px-3 py-1 border border-slate-300 rounded-md text-sm font-medium bg-white hover:bg-slate-50"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Tabs;
