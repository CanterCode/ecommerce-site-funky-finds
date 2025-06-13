import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewProducts from "./pages/ViewProducts";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ViewProducts />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
