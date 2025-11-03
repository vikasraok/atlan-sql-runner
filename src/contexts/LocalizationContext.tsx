import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { locales } from '../locales';
import type { Locale, TranslationKey } from '../locales';

interface LocalizationContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export { LocalizationContext };

interface LocalizationProviderProps {
    children: ReactNode;
    defaultLocale?: Locale;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
    children,
    defaultLocale = 'en'
}) => {
    const [locale, setLocale] = useState<Locale>(defaultLocale);

    const t = (key: TranslationKey): string => {
        return locales[locale][key as keyof typeof locales[typeof locale]];
    };

    return (
        <LocalizationContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LocalizationContext.Provider>
    );
};