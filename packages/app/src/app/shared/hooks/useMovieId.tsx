import React from 'react';

interface IMovieId {
  id: number;
  changeMovieId: (id: number) => void;
}

export const MovieContext = React.createContext<IMovieId>({
  id: 0,
  changeMovieId: (id: number) => {
    console.log(id);
  },
});

export const useMovieId = (): IMovieId => {
  const [id, setMovieId] = React.useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const changeMovieId = (id: number): void => {
    setMovieId(id);
  };

  return {
    id,
    changeMovieId,
  };
};

export const useMovieIdContext = (): IMovieId => React.useContext(MovieContext);
