import { create } from "zustand";

export interface Store {
  searchTerm: string;
  selectedCategory: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<Store>((set) => ({
  searchTerm: "",
  selectedCategory: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
