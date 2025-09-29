import { type ProductId, type Product } from ".";

export type CartContextType = {
  cart: Map<ProductId, number>;
  addToCart: (Product: Product) => void;
  removeFromCart: (productId: ProductId) => void;
  getTotalItems: () => number;
  getTotalPrice: (products: Product[]) => number;
} | null;
