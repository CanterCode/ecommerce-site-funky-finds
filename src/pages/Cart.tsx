import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/Store";
import CartItemCard from "../components/CartItemCard";
import { clearCart } from "../redux/cartSlice";
import CheckoutModal from "../components/CheckoutModal";
import { useState } from "react";

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
    <div className="container pt-5">
      <h1 className="text-center mb-4">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <CartItemCard key={item.id} product={item} quantity={item.quantity} />
        ))
      )}

      {items.length > 0 && (
        <div className="text-end mt-4">
          <h5>Total: ${totalPrice.toFixed(2)}</h5>
        </div>
      )}

      <div className="d-flex justify-content-center mt-3 mb-3">
        <button
          className="btn btn-success"
          disabled={items.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>

        <div>
          <CheckoutModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
