// services/movieService.ts
import { urlServer } from '../config/config';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number; // Change to number
  title: string; // Remove quotes
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDBResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface OneMovieResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | unknown; // You may want to define a more specific type here
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovies = async (page: number): Promise<MovieDBResponse> => {
  try {
    const response = await fetch(`${urlServer.url}api/v1/movies/${page}`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMovie = async (id: number): Promise<OneMovieResponse> => {
  try {
    const response = await fetch(`${urlServer.url}api/v1/movies/id/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
