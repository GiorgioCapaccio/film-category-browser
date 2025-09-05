import { create } from 'zustand';
import { fetchFilmById, fetchFilmsByCategory } from '../api/api';
import type { Film } from '../types';


interface FilmStore {
  // State
  actionFilms: Film[];
  comedyFilms: Film[];
  dramaFilms: Film[];
  currentFilm: Film | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAllFilms: () => Promise<void>;
  fetchFilmDetails: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useFilmStore = create<FilmStore>((set, get) => ({
  // Initial state
  actionFilms: [],
  comedyFilms: [],
  dramaFilms: [],
  currentFilm: null,
  loading: false,
  error: null,

  fetchAllFilms: async () => {
    set({ loading: true, error: null });
    
    try {
      const [action, comedy, drama] = await Promise.allSettled([
        fetchFilmsByCategory('action'),
        fetchFilmsByCategory('comedy'),
        fetchFilmsByCategory('drama')
      ]);

      set({
        actionFilms: action.status === 'fulfilled' ? action.value : [],
        comedyFilms: comedy.status === 'fulfilled' ? comedy.value : [],
        dramaFilms: drama.status === 'fulfilled' ? drama.value : [],
        loading: false
      });

      // Check if all failed
      const allFailed = [action, comedy, drama].every(result => result.status === 'rejected');
      if (allFailed) {
        set({ error: 'Failed to load films. Please check your internet connection and try again.' });
      }
      
    } catch (error) {
      set({ 
        error: 'Failed to load films. Please try again.',
        loading: false 
      });
    }
  },

  fetchFilmDetails: async (id: number) => {
    set({ loading: true, error: null });
    
    try {
      const { actionFilms, comedyFilms, dramaFilms } = get();
      const allFilms = [...actionFilms, ...comedyFilms, ...dramaFilms];
      // I'll search the selected film by id, a classic
      let film = allFilms.find(f => f.id === id);
      
      if (!film) {
        const fetchedFilm = await fetchFilmById(id);
        film = fetchedFilm === null ? undefined : fetchedFilm;
      }

      set({ 
        currentFilm: film, 
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to load film details.',
        loading: false 
      });
    }
  },

  clearError: () => set({ error: null })
}));