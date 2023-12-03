import React from 'react';
import { useThemeMode, ThemeContext } from './app/shared/hooks/useThemeMode';
import { useAuthContext, AuthContext } from './app/shared/hooks/useLoginStatus';
import { useMovieId, MovieContext } from './app/shared/hooks/useMovieId';

interface AppContextProviderProps {}

export const AppContextProvider: React.FC<
  React.PropsWithChildren<AppContextProviderProps>
> = (props) => {
  const { children } = props;
  const { mode, toggleMode } = useThemeMode();
  const { authStatus, setAuthStatus } = useAuthContext();
  const { id, changeMovieId } = useMovieId();

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        <MovieContext.Provider value={{ id, changeMovieId }}>
          {children}
        </MovieContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};
