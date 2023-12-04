import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import React, { useEffect } from 'react';
import { AppContextProvider } from './AppContextProvider';
import Login from './app/components/auth/login/login';
import SignupForm from './app/components/auth/signup/signup';
import Tasks from './app/components/users/tasks/tasks';
import MultipleMovies from './app/components/users/movies/multipleMovies/multipleMovies';
import { loginWithToken } from './app/shared/services/loginService';
import { Theme } from './app/theme/theme';
import { useLocalStorage } from './app/shared/hooks/useLocalStorage';
import { useLoginContext } from './app/shared/hooks/useLoginStatus';
import OneMovie from './app/components/users/movies/oneMovie/oneMovie';

const RoutesAndTheme: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedToken, setStoredToken] = useLocalStorage('authToken', '');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authStatus, setAuthStatus } = useLoginContext();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkTokenAndLogin = async (): Promise<void> => {
      if (storedToken) {
        try {
          if (location.pathname == '/' || location.pathname == '/signup') {
            const response = await loginWithToken(storedToken);

            if (response.ok) {
              setAuthStatus('authenticated');
              navigate('/tasks');
            }
          }
        } catch (error) {
          alert('Token no válido!');
        }
      }
    };

    checkTokenAndLogin();
  }, []);

  return (
    <Theme>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/tasks"
          element={<Tasks isUserAuthenticated={authStatus} />}
        />
        <Route
          path="/movies"
          element={<MultipleMovies isUserAuthenticated={authStatus} />}
        />
        <Route
          path="/movie/:id"
          element={<OneMovie isUserAuthenticated={authStatus} />}
        />
      </Routes>
    </Theme>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContextProvider>
        <RoutesAndTheme />
      </AppContextProvider>
    </Router>
  );
};
