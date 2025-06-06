"use client"
import { create } from 'zustand';

interface RefreshStore {
  refresh: boolean;
  setRefresh: () => void;
}

export const useRefreshStore = create<RefreshStore>((set, get) => ({
  refresh: false,
  setRefresh: () => {
    set({ refresh: !get().refresh });
  },
}));