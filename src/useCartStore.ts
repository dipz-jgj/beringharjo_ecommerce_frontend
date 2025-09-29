import { create } from "zustand";
import type { Product } from "../src/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Simpan & ambil dari localStorage
const getStoredCart = (): CartItem[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: getStoredCart(),

  addToCart: (product) => {
    const currentCart = get().cart;
    const existing = currentCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existing) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  removeFromCart: (id) => {
    // const updatedCart = get().cart.filter((item) => item.id !== id);
    const updatedCart = get().cart.filter((item) => item.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
}));
