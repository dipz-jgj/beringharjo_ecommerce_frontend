import { ProductEntity } from "./ProductEntity";
import { ProductCategory } from "../types";

// Inheritance & Polymorph
export class DiscountedProduct extends ProductEntity {
  private discount: number;

  constructor(
    title: string,
    price: number,
    category: ProductCategory,
    discount: number
  ) {
    super(title, price, category);
    this.discount = discount;
  }

  // Override parent method
  getDisplayName(): string {
    return `${this.title} (${this.discount}% OFF)`;
  }

  getDiscountedPrice(): number {
    return this.price * (1 - this.discount / 100);
  }
}
