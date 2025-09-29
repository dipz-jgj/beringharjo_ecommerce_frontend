import { type ProductId } from "../types";

// Maps
export class CartManager {
  private cartItems: Map<ProductId, number> = new Map();

  addItem(productId: ProductId, quantity: number = 1): void {
    const currentQty = this.cartItems.get(productId) || 0;
    this.cartItems.set(productId, currentQty + quantity);
  }

  removeItem(productId: ProductId): void {
    this.cartItems.delete(productId);
  }

  getItems(): Map<ProductId, number> {
    return new Map(this.cartItems);
  }

  getTotalItems(): number {
    return Array.from(this.cartItems.values()).reduce(
      (sum, qty) => sum + qty,
      0
    );
  }
}
