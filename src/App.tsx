import { useState } from "react";
import "./App.css";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import type { CartContextType } from "./types";
import { CartContext } from "./contexts/CartContext";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "checkout">("home");

  const { products, loadingState } = useProducts();
  const {
    cart,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  const cartContextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    ...{},
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1">
          {currentPage === "home" ? (
            <HomePage
              products={products}
              loadingState={loadingState}
              onAddToCart={addToCart}
              onNavigateToCheckout={() => setCurrentPage("checkout")}
              getTotalItems={getTotalItems}
              onClearCart={clearCart}
            />
          ) : (
            <CheckoutPage
              products={products}
              cart={cart}
              getTotalPrice={getTotalPrice}
              onRemoveFromCart={removeFromCart}
              onNavigateToHome={() => setCurrentPage("home")}
            />
          )}
        </main>
        <Footer />
      </div>
    </CartContext.Provider>
  );
}

export default App;
