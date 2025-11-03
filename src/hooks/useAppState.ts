import { useContext } from 'react';
import { AppStateContext } from '../contexts/AppStateContext';

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
};

export default useAppState;
