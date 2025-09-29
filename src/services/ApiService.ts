import { type Product, ProductCategory, type ApiResponse } from "../types";
import { isProduct, isError } from "../utils/typeGuards";
import { API_BASE_URL } from "../utils/constants";

export class ApiService {
  private static baseUrl = API_BASE_URL;

  static async fetchProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/product`);
      const data: unknown = await response.json();

      console.log("datanya ", data);

      // verifikasi product data
      // if (Array.isArray(data) && data.every(isProduct)) {
      return data as Product[];
      // }

      // return { error: "Invalid product data format" };
    } catch (error: any) {
      return { error: error.message || "Failed to fetch products" };
    }
  }

  static async fetchProductsByCategory(
    category: ProductCategory
  ): Promise<Product[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/products/category/${category}`
      );
      const data: unknown = await response.json();

      if (Array.isArray(data) && data.every(isProduct)) {
        return data as Product[];
      }

      return [];
    } catch {
      return [];
    }
  }
}
