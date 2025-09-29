import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { APP_NAME } from "../../utils/constants";
import { useCartStore } from "../../useCartStore";

export const Header = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const cartContext = useContext(CartContext);
  const totalItems = cartContext?.getTotalItems() || 0;

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        <div className="flex items-center gap4">
          <nav>
            <a href="#home" className="hover:text-blue-200 mr-4">
              Home
            </a>
            <a href="#checkout" className="hover:text-blue-200 mr-4">
              Checkout
            </a>
          </nav>
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            Cart: {cart.length}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
