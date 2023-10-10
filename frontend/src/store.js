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
    const newStatus = !isFavorited;

    if (window.Telegram.WebApp.isVersionAtLeast('6.9')) {
      window.Telegram.WebApp.CloudStorage.setItem(`favorite_${id}`, JSON.stringify(newStatus), (err, success) => {
        if (err) {
          console.error("Error saving to cloud storage", err);
          return;
        }
        // Only update the state if cloud storage update was successful
        set({ favorites: { ...state.favorites, [id]: newStatus } });
      });
    } else {
      return { favorites: { ...state.favorites, [id]: newStatus } };
    }
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
