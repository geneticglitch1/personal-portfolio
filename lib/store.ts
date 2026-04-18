"use client";

import { create } from "zustand";

interface AppState {
  activeSection: string;
  setActiveSection: (s: string) => void;
}

export const useApp = create<AppState>()((set) => ({
  activeSection: "home",
  setActiveSection: (activeSection) => set({ activeSection }),
}));
