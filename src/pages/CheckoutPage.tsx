import React from "react";
import type { Product, ProductId } from "../types";

interface CheckoutPageProps {
  products: Product[];
  cart: Map<ProductId, number>;
  getTotalPrice: (products: Product[]) => number;
  onRemoveFromCart: (productId: ProductId) => void;
  onNavigateToHome: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  products,
  cart,
  getTotalPrice,
  onRemoveFromCart,
  onNavigateToHome,
}) => {
  const cartProducts = products.filter((product) => cart.has(product.id));
  const total = getTotalPrice(products);

  if (cartProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={onNavigateToHome}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="space-y-4 mb-6">
        {cartProducts.map((product) => {
          const quantity = cart.get(product.id) ?? 0;
          const subtotal = product.price * quantity;

          return (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h4 className="font-semibold">{product.title}</h4>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span>Qty: {quantity}</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                <button
                  onClick={() => onRemoveFromCart(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total: ${total.toFixed(2)}</span>
          <div className="space-x-4">
            <button
              onClick={onNavigateToHome}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back to Shop
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
