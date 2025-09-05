import axios from 'axios';
import type { Film, TMDBResponse } from '../types';

// I have to cut off the api key for security reason and handle with env variables if i have time

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'd3cf21b0c53192c69ead8f2117de3569';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY }
});

const GENRE_IDS = {
  action: [28, 53, 12], 
  comedy: [35],       
  drama: [18, 80, 99]   
};

const transformFilm = (tmdbFilm: any, category: Film['category']): Film => ({
  id: tmdbFilm.id,
  title: tmdbFilm.title,
  category,
  year: new Date(tmdbFilm.release_date).getFullYear(),
  image: `${IMAGE_URL}${tmdbFilm.poster_path}`,
  backdrop: `${IMAGE_URL}${tmdbFilm.backdrop_path}`,
  description: tmdbFilm.overview,
  rating: tmdbFilm.vote_average,
  runtime: tmdbFilm.runtime
});

export const fetchFilmsByCategory = async (category: Film['category']): Promise<Film[]> => {
  try {
    const genreIds = GENRE_IDS[category].join(',');
    const response = await api.get<TMDBResponse>('/discover/movie', {
      params: {
        with_genres: genreIds, 
        sort_by: 'popularity.desc',
        include_adult: false,
        'vote_count.gte': 50
      }
    });

    // I'll take only the first 15 results and then only the results with the poster path and the overview
    return response.data.results
      .slice(0, 15)
      .filter(film => film.poster_path && film.overview)
      .map(film => transformFilm(film, category));
  } catch (error) {
    console.error(`Error fetching ${category} films:`, error);
    throw error;
  }
};

export const fetchFilmById = async (id: number): Promise<Film | null> => {
  try {
    const response = await api.get(`/movie/${id}`);
    const film = response.data;
    
    // Determina categoria dal genere principale
    const genreId = film.genres?.[0]?.id;
    let category: Film['category'] = 'drama';
    
    if (GENRE_IDS.action.includes(genreId)) category = 'action';
    else if (GENRE_IDS.comedy.includes(genreId)) category = 'comedy';
    
    return transformFilm(film, category);
  } catch (error) {
    console.error('Error fetching film by ID:', error);
    return null;
  }
};