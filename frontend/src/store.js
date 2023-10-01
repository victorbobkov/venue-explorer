import create from 'zustand';

const useAppStore = create((set) => ({
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
  animations: {},
  setAnimation: (name, state) => set((prev) => ({ animations: { ...prev.animations, [name]: state } })),
}));

export default useAppStore;
