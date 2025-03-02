import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  stock: number;
};

interface CartState {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => ({
          items: [...state.items, product],
        })),

      removeFromCart: (productId) =>
        set((state) => ({
          items: (() => {
            const index = state.items.findIndex(
              (item) => item.id === productId
            );
            if (index === -1) return state.items;
            return [
              ...state.items.slice(0, index),
              ...state.items.slice(index + 1),
            ];
          })(),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // Key for local storage
    }
  )
);

export default useCartStore;
