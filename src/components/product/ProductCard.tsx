import React from "react";
import type { Product } from "../../types";
import { useCartStore } from "../../useCartStore";

interface ProductCardProps {
  product: Product;
  // onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  // onAddToCart,
}) => {
  // const handleAddToCart = () => onAddToCart(product);
  // const handleAddToCart = () => {
  //   alert("Menambahkan ke cart untuk produk " + product.name);
  //   console.log("Menambahkan ke cart untuk produk " + product.name);
  // };

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} ditambahkan ke cart`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.product_image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-3">
        {product.description}
      </p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold text-green-600">
          ${product.price}
        </span>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
