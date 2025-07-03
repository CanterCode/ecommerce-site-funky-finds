import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewProducts from "./pages/ViewProducts";
import Cart from "./pages/Cart";
import Navbar from "./components/NavBar.tsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/Store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import "./css/products.css"
import { useAuthListener } from "./firebase/useAuthListener.ts";
import ViewOrder from "./pages/ViewOrder.tsx";
import FirestoreProducts from "./pages/FirestoreProducts.tsx";


function App() {

  useAuthListener();

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/view-order/:orderId" element={<ViewOrder />} />
          <Route path="firestore-products" element={<FirestoreProducts />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
