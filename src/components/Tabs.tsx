import { useTranslation } from "../hooks/useTranslation";

const Tabs = () => {
    const { t } = useTranslation();

    return (
        <div data-testid="tabs" className="flex">
            <div data-testid="tab-1" className="tab w-32 px-4 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer">{t('tab1')}</div>
            <div data-testid="tab-2" className="tab w-32 px-4 py-2 border-b-2 border-transparent hover:border-blue-500 cursor-pointer">{t('tab2')}</div>
            <div data-testid="tab-3" className="tab w-32 px-4 py-2 border-b-2 border-blue-500 cursor-pointer">{t('tab3')}</div>
        </div>
    );
};

export default Tabs;
