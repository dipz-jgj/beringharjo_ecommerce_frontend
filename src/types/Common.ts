// Literal Type & Type Aliases:
// Membatasi nilai ke literal tertentu (Hanya accept nilai specific), meningkatkan type safety.
export type Theme = "Light" | "Dark";
export type ProductId = string;
export type LoadingState = "idle" | "loading" | "success" | "error";
export type ApiResponse<T> = T | { error: string };

// Tuples: Array dengan panjang dan tipe elemen yang tetap.
export type CartItem = [ProductId, number];
export type Coordinates = [number, number];

// Enum
export const ProductCategory = {
  ELECTRONIC: "electronics",
  CLOTHING: "clothing",
  BOOKS: "books",
  HOME: "home",
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

export const OderStatus = {
  PENDING: "pending",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};
