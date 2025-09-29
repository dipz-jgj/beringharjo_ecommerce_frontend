import React, { useEffect, useRef, useState } from "react";
import { ProductCategory, type Product } from "../types";
import ProductCard from "../components/product/ProductCard";
import { SearchBar } from "../components/product/SearchBar";
import CategoryFilter from "../components/product/CategoryFilter";
import useProductsData from "../hooks/useProductsData";

interface HomePageProps {
  products: Product[];
  loadingState: "idle" | "loading" | "success" | "error";
  onAddToCart: (product: Product) => void;
  onNavigateToCheckout: () => void;
  getTotalItems: () => number;
  onClearCart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  loadingState,
  onAddToCart,
  onNavigateToCheckout,
  getTotalItems,
  onClearCart,
}) => {
  // const { getAllProduct } = useProductsData();

  // const {
  //   data: product,
  //   error: productError,
  //   isLoading: productIsLoading,
  // } = getAllProduct();

  // console.log("Produknya ", product);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Array Operations
  const categories: ProductCategory[] = Object.values(ProductCategory);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product: any) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory]);

  const handleCategorySelect = (category: ProductCategory | null): void => {
    setSelectedCategory(category);

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearch = (searchTerm: string): void => {
    if (!searchTerm.trim()) {
      setFilteredProducts(
        selectedCategory
          ? products.filter((p) => p.category === selectedCategory)
          : products
      );
      return;
    }

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
    });

    setFilteredProducts(filtered);
  };

  const renderContent = () => {
    switch (loadingState) {
      case "loading":
        return <div className="text-center py-8">Loading products...</div>;
      case "error":
        return (
          <div className="text-center py-8 text-red-800">
            Failed to load products
          </div>
        );
      case "success":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* <SearchBar ref={searchInputRef} onSearch={handleSearch} /> */}

      <div className="flex-gap-6">
        <div className="flex-1">
          {/* <h2 className="text-2xl font-bold mb-6">
            {selectedCategory ? `${selectedCategory} Products` : `All Products`}
            ({filteredProducts.length})
          </h2> */}
          <h2 className="text-2xl font-bold mb-6">`All Products`</h2>
          {renderContent()}
        </div>

        <div className="w-64">
          {/* <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          /> */}

          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
            <button
              onClick={onNavigateToCheckout}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-2"
            >
              View Cart ({getTotalItems()})
            </button>
            <button
              onClick={() => {
                onClearCart();
                alert("Cart cleared!");
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
