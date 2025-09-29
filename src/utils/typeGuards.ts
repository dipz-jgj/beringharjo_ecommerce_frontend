// bisa digunakan seperti ini karena pada folder type terdapat index.ts
import { type ApiResponse, type Product } from "../types";

// Kedua kode di bawah disebut Type Guard/Type Predicate
// Type Predicates: Function yang mengembalikan boolean dan menyaring tipe pada runtime.

// Memeriksa apakah sebuah objek yang awalnya memiliki tipe unknown (tipe yang paling tidak aman)
// benar-benar memiliki struktur data yang sesuai dengan tipe Product.
// TypeScript akan secara otomatis mempersempit tipe data menjadi Product di dalam blok if,
// sehingga dapat mengakses properti seperti data.id atau data.title tanpa error.
export function isProduct(obj: unknown): obj is Product {
  // unknown memaksa Anda untuk melakukan pemeriksaan tipe sebelum
  // dapat menggunakan nilai tersebut, sementara any tidak.
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "title" in obj &&
    "price" in obj &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).title === "string" &&
    typeof (obj as any).price === "number"
  );
}

// Fungsi ini memeriksa apakah respons yang diterima adalah objek kesalahan standar yang berisi properti error.
export function isError<T>(
  response: ApiResponse<T>
): response is { error: string } {
  return (
    typeof response === "object" && response !== null && "error" in response
  );
}
