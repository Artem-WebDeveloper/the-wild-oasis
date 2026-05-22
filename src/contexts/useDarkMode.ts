import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) throw new Error('useDarkMode must be used inside DarkModeProvider');

  return context;
}

export default useDarkMode;
