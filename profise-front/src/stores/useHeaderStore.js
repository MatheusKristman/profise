import { create } from "zustand";

const useHeaderStore = create((set) => ({
  isMenuClicked: false,
  openMenu: () => set(() => ({ isMenuClicked: true })),
  closeMenu: () => set(() => ({ isMenuClicked: false })),
  isLoginMenuOpen: false,
  openLoginMenu: () => set(() => ({ isLoginMenuOpen: true })),
  closeLoginMenu: () => set(() => ({ isLoginMenuOpen: false })),
  isUserMenuOpen: false,
  openUserMenu: () => set(() => ({ isUserMenuOpen: true })),
  closeUserMenu: () => set(() => ({ isUserMenuOpen: false })),
  isMenuShowed: false,
  showMenu: () => set(() => ({ isMenuShowed: true })),
  dontShowMenu: () => set(() => ({ isMenuShowed: false })),
}));

export default useHeaderStore;
