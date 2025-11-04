import { useTranslation } from "../hooks/useTranslation";
import { useAppState } from "../hooks/useAppState";

const Tabs: React.FC = () => {
    const { t } = useTranslation();
    const { tabs, activeId, addTab, closeTab, setActiveId } = useAppState();

    return (
        <div className=" flex items-center gap-x-2 overflow-x-auto [&::-webkit-scrollbar]:hidden hover:[&::-webkit-scrollbar]:block hover:[&::-webkit-scrollbar]:h-1.5 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 hover:[&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-track]:bg-transparent" role="tablist" data-testid="tabs">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    data-testid={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={tab.id === activeId}
                    aria-label={t("tabLabel")}
                    tabIndex={0}
                    className={`flex items-center gap-2 py-1 px-3   ${tab.id === activeId ? "bg-white border-blue-500 border-1 border-b-transparent z-15" : "bg-white border-b border border-slate-200 hover:border-blue-400"} rounded-t-md cursor-pointer select-none `}
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

            <button
                data-testid="add-tab-button"
                aria-label={t("addTab")}
                onClick={addTab}
                className="inline-flex items-center gap-2 px-3 py-1 border border-slate-300 rounded-md text-sm font-medium bg-white hover:bg-slate-50"
            >
                +
            </button>

        </div>
    );
};

export default Tabs;
