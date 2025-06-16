import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewProducts from "./pages/ViewProducts";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar />
      <Container className="container flex-grow-1 mb-">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
