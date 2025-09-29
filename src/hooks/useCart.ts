import { useState } from "react";
import { type Product, type ProductId } from "../types";

export const useCart = () => {
  const [cart, setCart] = useState<Map<ProductId, number>>(new Map());

  const addToCart = (product: Product): void => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const currentQty = newCart.get(product.id) || 0;
      newCart.set(product.id, currentQty + 1);
      return newCart;
    });
  };

  const removeFromCart = (productId: ProductId): void => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      newCart.delete(productId);
      return newCart;
    });
  };

  const getTotalItems = (): number => {
    return Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = (products: Product[]): number => {
    let total = 0;
    for (const [productId, quantity] of cart.entries()) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  };

  const clearCart = (): void => {
    setCart(new Map());
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  };
};
