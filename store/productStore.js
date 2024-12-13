import { create } from "zustand";

export const useProductStore = create((set) => ({
  currentProduct: null,
  setCurrentProduct: (product) => set({ currentProduct: product }),
}));
