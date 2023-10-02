import { create } from 'zustand';

const useAppStore = create((set) => ({
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
  animations: {},
  setAnimation: (name, state) => set((prev) => ({ animations: { ...prev.animations, [name]: state } })),
  selectedType: '',
  setSelectedType: (type) => set({ selectedType: type }),
  favorites: {},
  toggleFavorite: (id) => set((state) => {
    const isFavorited = !!state.favorites[id];
    return { favorites: { ...state.favorites, [id]: !isFavorited } };
  }),
}));

export default useAppStore;
