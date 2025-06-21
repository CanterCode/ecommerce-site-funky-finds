import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/Store";
import CartItemCard from "../components/CartItemCard";
import { clearCart } from "../redux/cartSlice";
import CheckoutModal from "../components/CheckoutModal";
import { useState } from "react";
import "../css/cart.css"; // Create or update this if needed

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    setShowModal(true);
    dispatch(clearCart());
  };

  return (
    <div className="cart-page d-flex flex-column min-vh-100 py-5 mt-5">
      <div className="container">
        <h1 className="display-5 fw-bold text-center mb-4 funky-gradient-text">
          🛒 Your Funky Cart
        </h1>

        {items.length === 0 ? (
          <p className="text-center text-muted fs-5">
            Your cart is feeling a little empty... go treat yourself.
          </p>
        ) : (
          <div className="cart-items d-flex flex-column gap-4">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                product={item}
                quantity={item.quantity}
              />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-summary d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 p-4 rounded shadow-sm">
            <h4 className="fw-bold mb-3 mb-md-0">
              Total: ${totalPrice.toFixed(2)}
            </h4>
            <button
              className="btn btn-funky px-4 py-2"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}

        <CheckoutModal show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default Cart;
