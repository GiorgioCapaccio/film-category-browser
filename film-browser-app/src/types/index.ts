export interface Film {
  id: number;
  title: string;
  category: 'action' | 'comedy' | 'drama';
  year: number;
  image: string;
  backdrop?: string;
  description: string;
  rating?: number;
  runtime?: number;
  tagline?: string;
  genres?: Genre[];
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface FilmCategory {
  name: string;
  films: Film[];
  loading: boolean;
  error: string | null;
}

export interface TMDBResponse {
  results: TMDBFilm[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface TMDBFilm {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
  runtime?: number;
}

export interface TMDBFilmDetails extends TMDBFilm {
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage?: string;
  imdb_id?: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string;
}

// Store Types
export interface FilmStoreState {
  actionFilms: Film[];
  comedyFilms: Film[];
  dramaFilms: Film[];
  currentFilm: Film | null;
  loading: boolean;
  error: string | null;
}

export interface WishlistStoreState {
  items: Film[];
}

// Component Props Types
export interface FilmCardProps {
  film: Film;
  onClick: () => void;
  showWishlistButton?: boolean;
}

export interface CarouselProps {
  title: string;
  films: Film[];
  category: 'action' | 'comedy' | 'drama';
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
}

export interface LoadingProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

// API Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

export type CategoryType = Film['category'];

export type FilmWithoutId = Omit<Film, 'id'>;

export type PartialFilm = Partial<Film> & Pick<Film, 'id' | 'title' | 'category'>;

export interface GenreMapping {
  [key: number]: CategoryType;
}

export interface CategoryGenreIds {
  action: number[];
  comedy: number[];
  drama: number[];
}