import React, { useEffect, useState } from 'react';
import { Button, ScreenBackground } from '@frontend/components';
import { ToggleThemeComponent } from '../../../../shared/components/toggleTheme.component';
import { withRedirectIfBlank } from '../../../../withRedirectIfBlank';
import { useLoginContext } from '../../../../shared/hooks/useLoginStatus';
import { useNavigate } from 'react-router-dom';
import {
  OneMovieResponse,
  getMovie,
} from '../../../../shared/services/movieService';
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';
import { useMovieIdContext } from '../../../../shared/hooks/useMovieId';
import { Card, CardContent, Typography } from '@mui/material';

interface OneMovieProps {
  isUserAuthenticated: string;
}

const OneMovie: React.FC<OneMovieProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, changeMovieId } = useMovieIdContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [movie, setMovie] = useState<OneMovieResponse | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedToken, setStoredToken] = useLocalStorage('authToken', '');
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchData = async (id: number): Promise<void> => {
    try {
      const data = await getMovie(id);
      setMovie(data);
      console.log('MOVIE ', data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authStatus, setAuthStatus } = useLoginContext();

  const logout = (): void => {
    setStoredToken('notValid');
    setAuthStatus('notAuthenticated');
    navigate('/');
  };

  const goToMoviesPage = (): void => {
    navigate('/movies');
  };

  return (
    <ScreenBackground>
      <ToggleThemeComponent />
      <Button
        onClick={logout}
        variant="contained"
        label="Cerrar Sesión"
        sx={{ width: '50%', marginBottom: '20px' }}
      />
      <Button
        onClick={goToMoviesPage}
        variant="contained"
        label="Volver a página de peliculas"
        sx={{ width: '50%', marginBottom: '20px' }}
      />

      {movie && (
        <Card sx={{ maxWidth: 400, marginTop: '20px', overflow: 'auto' }}>
          <CardContent>
            <Typography variant="h2" component="div">
              {movie.title}
            </Typography>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
            <Typography variant="body2" color="text.secondary">
              {movie.release_date
                ? `Año de lanzamiento: ${movie.release_date.slice(0, 4)}`
                : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview
                ? `Descripción: ${movie.overview}`
                : 'Descripción no disponible'}
            </Typography>
            <Typography variant="h3">Géneros</Typography>
            {movie.genres &&
              movie.genres.map((genres) => (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  key={genres.id}
                >
                  {genres.name}
                </Typography>
              ))}
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average
                ? `Calificación: ${movie.vote_average}`
                : 'Calificación no disponible'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </ScreenBackground>
  );
};

export default withRedirectIfBlank<OneMovieProps>({
  redirectCondition: (props: OneMovieProps) =>
    props.isUserAuthenticated === 'notAuthenticated',
  redirectTo: '/',
})(OneMovie);
