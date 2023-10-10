import { create } from 'zustand';
import { add } from 'date-fns';

const today = new Date();
const tomorrow = add(today, { days: 1 });

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
    const newFavorites = { ...state.favorites, [id]: !isFavorited };

    // Save to Cloud Storage
    if (window.Telegram.WebApp.isVersionAtLeast('6.9')) {
      window.Telegram.WebApp.CloudStorage.setItem(`favorite_${id}`, JSON.stringify(!isFavorited), (err, success) => {
        if (err) {
          console.error("Error saving to cloud storage", err);
        }
      });
    }

    return { favorites: newFavorites };
  }),

  selectedDates: { start: today, end: tomorrow },
  setSelectedDates: (start, end) => set({ selectedDates: { start, end } }),

  guestInfo: {},

  venueTypes: [],
  setVenueTypes: (venueTypes) => set({ venueTypes }),

  venues: [],
  setVenues: (venues) => set({ venues }),
}));

export default useAppStore;
