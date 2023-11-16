import { create } from "zustand";

const useAccountStore = create((set) => ({
  isUserLogged: false,
  userLogged: () => set(() => ({ isUserLogged: true })),
  userNotLogged: () => set(() => ({ isUserLogged: false })),
  user: {},
  setUser: (value) => set(() => ({ user: value })),
}));

export default useAccountStore;
