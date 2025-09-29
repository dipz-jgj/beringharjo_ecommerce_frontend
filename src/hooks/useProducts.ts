import { useState, useEffect } from "react";
import { type Product, type LoadingState, ProductCategory } from "../types";
import { ApiService } from "../services/ApiService";
import { isError } from "../utils/typeGuards";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");

  useEffect(() => {
    const loadProducts = async () => {
      setLoadingState("loading");

      try {
        const result = await ApiService.fetchProducts();

        if (isError(result)) {
          setLoadingState("error");
          console.error("Failed to load products: ", result.error);
          return;
        }

        setProducts(result);
        setLoadingState("success");
      } catch (error) {
        setLoadingState("error");
        console.error("Unexpected error: ", error);
      }
    };

    loadProducts();
  }, []);

  return { products, loadingState };
};
