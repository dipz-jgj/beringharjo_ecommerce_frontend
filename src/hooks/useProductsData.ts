import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import APIClient, { type GetAllResponse } from "../services/api-client";
import type Product from "../entities/Product";
import type { useProducts } from "./useProducts";

const apiClient = new APIClient<Product>("/product");

const getApiClient = <T>(path: string) => {
  return new APIClient<T>(path);
};

interface UpdateProductParams {
  id: string | number;
  data: Partial<Product> | FormData;
}

const useProductsData = () => {
  const queryClient = useQueryClient();

  const getAllProduct = (params?: Record<string, any>) =>
    useQuery({
      queryKey: ["product", params],
      queryFn: async () => {
        const apiClient = getApiClient<Product>("/");
        const response = await apiClient.getWithPath<Product>(
          ["product"],
          params,
          true
        );

        // pengecekan apakah response mengandung meta (pagination)?
        if (
          response &&
          Array.isArray((response as GetAllResponse<Product>).results)
        ) {
          return response as GetAllResponse<Product>;
        } else {
          throw new Error("Unexpected response format");
        }
      },
      enabled: true,
    });

  const createProduct = useMutation({
    mutationFn: (product: any) => apiClient.post(product),
    onSuccess: () => {
      // Invalidate query untuk memperbarui cache
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const updateProduct = useMutation<Product, Error, UpdateProductParams>({
    mutationFn: ({ id, data }) => apiClient.put(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string | number) => apiClient.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.removeQueries({ queryKey: ["product", id] }); // remove from cache
    },
  });

  return {
    getAllProduct,
    createProduct: createProduct.mutateAsync,
    updateProduct: updateProduct.mutateAsync,
    deleteProduct: deleteProduct.mutateAsync,
  };
};

export default useProductsData;
