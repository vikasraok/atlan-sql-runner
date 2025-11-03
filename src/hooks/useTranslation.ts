import { useContext } from 'react';
import { LocalizationContext } from '../contexts/LocalizationContext';

export const useTranslation = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LocalizationProvider');
  }
  return context;
};