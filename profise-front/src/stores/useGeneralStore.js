import { create } from "zustand";

const useGeneralStore = create((set) => ({
  isFetching: false,
  setIsFetching: () => set(() => ({ isFetching: true })),
  setIsNotFetching: () => set(() => ({ isFetching: false })),
}));

export default useGeneralStore;
