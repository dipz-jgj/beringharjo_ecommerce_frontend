import { ProductCategory, type ProductId } from "./Common";

export interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  product_image?: string;
  product_stock?: number;
  createdAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
}

// Utility types:
// Built-in types untuk transformasi tipe yang common.
export type PartialProduct = Partial<Product>; // Semua property optional
export type RequiredProduct = Required<Product>; // Semua property wajib
export type ProductPreview = Pick<Product, "id" | "name" | "price">; // Hanya ambil property tertentu
export type ProductWithoutId = Omit<Product, "id">; // membuat tipe baru dengan membuang properti "id"
