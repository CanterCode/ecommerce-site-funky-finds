import { Card, Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import type { Product } from "../reactQuery/ProductInterface";
import "../css/cart.css";

interface Props {
  product: Product;
  quantity: number;
}

const CartItemCard = ({ product, quantity }: Props) => {
  const dispatch = useDispatch();

  const handleIncrease = () => dispatch(increaseQuantity(product.id));
  const handleDecrease = () => dispatch(decreaseQuantity(product.id));
  const handleRemove = () => dispatch(removeFromCart(product.id));

  return (
    <Card className="cart-item-card shadow-sm border-0 p-3 rounded-4">
      <div className="d-flex flex-column flex-md-row align-items-center gap-3">
        <Image
          src={product.image}
          alt={product.title}
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
          className="bg-white p-2 rounded"
        />

        <div className="flex-grow-1 text-center text-md-start">
          <h6 className="fw-bold mb-1">{product.title.split(" ").slice(0, 6).join(" ")}</h6>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
            <Button
              variant="outline-dark"
              size="sm"
              onClick={handleDecrease}
              className="rounded-pill px-2"
            >
              −
            </Button>
            <span className="fw-bold fs-5">{quantity}</span>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={handleIncrease}
              className="rounded-pill px-2"
            >
              +
            </Button>
          </div>
        </div>

        <div className="text-center text-md-end">
          <div className="text-muted small mb-2">
            ${product.price.toFixed(2)} × {quantity} ={" "}
            <strong className="text-dark">
              ${(product.price * quantity).toFixed(2)}
            </strong>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            className="rounded-pill"
            onClick={handleRemove}
          >
            🗑️ Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItemCard;
