import { create } from "zustand";

const useHeroStore = create((set) => ({
  inputValue: "",
  inputChange: (e) => set(() => ({ inputValue: e.target.value })),
  addSuggestionToInput: (value) => set(() => ({ inputValue: value })),
  resetInput: (value) => set(() => ({ inputValue: value })),
  isInputFocused: false,
  inputFocused: () => set(() => ({ isInputFocused: true })),
  inputNotFocused: () => set(() => ({ isInputFocused: false })),
  mousePos: {},
  setMousePos: (value) => set(() => ({ mousePos: value })),
  resultSearch: [],
  setResultSearch: (value) => set(() => ({ resultSearch: value })),
  resultSelected: {},
  setResultSelected: (value) => set(() => ({ resultSelected: value })),
  errorSearch: "",
  setErrorSearch: (value) => set(() => ({ errorSearch: value })),
}));

export default useHeroStore;
