import { Product } from "@/types/product";
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

export interface CartItem extends Product {
  addToCart: (s: string) => void;
  removeFromCart: (s: string) => void;
  increaseQuantity: (s: string) => void;
  decreaseQuantity: (s: string) => void;
}

const;
