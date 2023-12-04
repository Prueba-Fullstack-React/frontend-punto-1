import React, { useEffect, useState } from 'react';
import { Button, ScreenBackground, TextField } from '@frontend/components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { ToggleThemeComponent } from '../../../../shared/components/toggleTheme.component';
import { withRedirectIfBlank } from '../../../../withRedirectIfBlank';
import { useLoginContext } from '../../../../shared/hooks/useLoginStatus';
import { useNavigate } from 'react-router-dom';
import { Movie, getMovies } from '../../../../shared/services/movieService';
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';
import { useMovieIdContext } from '../../../../shared/hooks/useMovieId';

interface MultipleMoviesProps {
  isUserAuthenticated: string;
}

const MultipleMovies: React.FC<MultipleMoviesProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, changeMovieId } = useMovieIdContext();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedToken, setStoredToken] = useLocalStorage('authToken', '');
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fetchData = async (page: number): Promise<void> => {
    try {
      const data = await getMovies(page);
      setMovies(data.results);
      setTotalMovies(data.total_results);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData(page + 1);
  }, [page]);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMovieDetailsClick = (movieId: number): void => {
    changeMovieId(movieId);
    navigate(`/movie/${movieId}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authStatus, setAuthStatus } = useLoginContext();

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchQuery(event.target.value);
  };

  const logout = (): void => {
    setStoredToken('notValid');
    setAuthStatus('notAuthenticated');
    navigate('/');
  };

  const filteredMovies = (): Movie[] => {
    return movies.filter((movie) => {
      const title = movie.title ? movie.title : '';

      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
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
      <TextField
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar por título o nombre"
        sx={{ width: '70%', marginBottom: '20px' }}
      />

      <TableContainer style={{ maxHeight: '70%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ver Detalles</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Año de lanzamiento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMovies().map((movie: Movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  <Button
                    onClick={() => handleMovieDetailsClick(movie.id)}
                    variant="contained"
                    label="Ver Detalles"
                    sx={{ width: '50%' }}
                  />
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>
                  {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={totalMovies}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ScreenBackground>
  );
};

export default withRedirectIfBlank<MultipleMoviesProps>({
  redirectCondition: (props: MultipleMoviesProps) =>
    props.isUserAuthenticated === 'notAuthenticated',
  redirectTo: '/',
})(MultipleMovies);
