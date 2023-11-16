import { create } from "zustand";

const useRegisterStore = create((set) => ({
  isSMSTokenOpen: false,
  SMSTokenOpened: () => set(() => ({ isSMSTokenOpen: true })),
  SMSTokenNotOpened: () => set(() => ({ isSMSTokenOpen: false })),
  sendAgainTimer: 0,
  setSendAgainTimer: (value) => set(() => ({ sendAgainTimer: value })),
  sendAgain: false,
  toSendAgain: () => set(() => ({ sendAgain: true })),
  toDontSendAgain: () => set(() => ({ sendAgain: false })),
  nameValue: "",
  setNameValue: (value) => set(() => ({ nameValue: value })),
  celValue: "",
  setCelValue: (value) => set(() => ({ celValue: value })),
  emailValue: "",
  setEmailValue: (value) => set(() => ({ emailValue: value })),
}));

export default useRegisterStore;
