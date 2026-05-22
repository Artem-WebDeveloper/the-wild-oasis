import React, { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<null | DarkModeContextType>(null);

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const isDarkUserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(isDarkUserTheme, 'isDarkMode');

  function toggleDarkMode() {
    setIsDarkMode(isDark => !isDark);
  }

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
      }
    },
    [isDarkMode],
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
