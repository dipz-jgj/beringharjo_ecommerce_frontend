import { BaseEntity } from "./BaseEntity";
import { ProductCategory } from "../types";

// Class with Getter, Setter & Inheritance
export class ProductEntity extends BaseEntity {
  private _title: string;
  private _price: number;
  private _category: ProductCategory;

  constructor(title: string, price: number, category: ProductCategory) {
    // super: digunakan untuk memanggil constructor class induk
    super(BaseEntity.generateId());
    this._title = title;
    this._price = price;
    this._category = category;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    if (value.length < 3) {
      throw new Error("Title must be at least 3 character");
    }
    this._title = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }

  getInfo(): string {
    return `Product: ${this._title} - ${this._price}`;
  }

  // Polymorphism - method that can be overridden
  getDisplayName(): string {
    return this._title;
  }
}
