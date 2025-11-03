import en from './en.json';
import es from './es.json';

export const locales = {
  en,
  es,
} as const;

export type Locale = keyof typeof locales;
export type TranslationKey = keyof typeof en;