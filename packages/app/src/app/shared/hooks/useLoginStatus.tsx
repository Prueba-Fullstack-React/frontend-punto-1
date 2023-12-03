import React from 'react';

type AuthStatus = 'notAuthenticated' | 'loading' | 'authenticated';

interface IAuthContext {
  authStatus: AuthStatus;
  setAuthStatus: (value: AuthStatus) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  authStatus: 'notAuthenticated',
  setAuthStatus: () => {
    console.log('');
  },
});

export const useAuthContext = (): IAuthContext => {
  const [authStatus, setLoginStatus] =
    React.useState<AuthStatus>('notAuthenticated');

  const setAuthStatus = (value: AuthStatus): void => {
    setLoginStatus(value);
  };

  return {
    authStatus,
    setAuthStatus,
  };
};

export const useLoginContext = (): IAuthContext =>
  React.useContext(AuthContext);
