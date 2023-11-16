import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  coinQuant: 0,
  setCoinQuant: (value) => set({ coinQuant: value }),
  cost: 0,
  setCost: (value) => set({ cost: value }),
}));

export default useCheckoutStore;
