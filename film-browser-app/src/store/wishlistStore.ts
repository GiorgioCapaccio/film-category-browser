import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Film } from '../types';

interface WishlistStore {
  items: Film[];
  addToWishlist: (film: Film) => void;
  removeFromWishlist: (filmId: number) => void;
  isInWishlist: (filmId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (film: Film) => {
        const { items, isInWishlist } = get();
        if (!isInWishlist(film.id)) {
          set({ items: [...items, film] });
        }
      },

      removeFromWishlist: (filmId: number) => {
        set(state => ({
          items: state.items.filter(item => item.id !== filmId)
        }));
      },

      isInWishlist: (filmId: number) => {
        return get().items.some(item => item.id === filmId);
      },

      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage'
    }
  )
);