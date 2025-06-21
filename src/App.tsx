import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewProducts from "./pages/ViewProducts";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/Store";

function App() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
