import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Locale } from '../locales';

const LanguageSelector: React.FC = () => {
    const { locale, setLocale, t } = useTranslation();

    const languages: { code: Locale; name: string }[] = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
    ];

    return (
        <div className="relative">
            <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium transition-all bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                data-testid="language-selector"
                name="localization"
                aria-label={t('selectLanguage')}
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default LanguageSelector;