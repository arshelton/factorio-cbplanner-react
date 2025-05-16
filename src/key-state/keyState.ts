import { create } from "zustand";

type KeyState = {
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  setKey: (key: "shift" | "ctrl" | "alt", value: boolean) => void;
};

export const useKeyState = create<KeyState>()((set) => ({
  shift: false,
  ctrl: false,
  alt: false,
  setKey: (key, value) => set({ [key]: value }),
}));
