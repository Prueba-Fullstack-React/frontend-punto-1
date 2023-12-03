import React from 'react';

interface IThemeMode {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const ThemeContext = React.createContext<IThemeMode>({
  mode: 'light',
  toggleMode: () => {
    console.log('');
  },
});

export const useThemeMode = (): IThemeMode => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const toggleMode = (): void => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  return {
    mode,
    toggleMode,
  };
};

export const useModeContext = (): IThemeMode => React.useContext(ThemeContext);
