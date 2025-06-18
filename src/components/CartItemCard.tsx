import { Card, Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import type { Product } from "../reactQuery/ProductInterface";

interface Props {
  product: Product;
  quantity: number;
}

const CartItemCard = ({ product, quantity }: Props) => {

    // {product.title.split(" ").slice(0, 5).join(" ")}
    
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <Card className="mb-3 border-0 shadow-sm">
  <Card.Body className="d-flex align-items-center">
    {/* Image left */}
    <Image
      src={product.image}
      alt={product.title}
      style={{ width: "60px", height: "60px", objectFit: "contain" }}
      className="me-3"
    />

    {/* Middle section: title + buttons */}
    <div className="flex-grow-1">
      <h6>{product.title}</h6>
      <div className="d-flex align-items-center mt-2" style={{ gap: ".5rem" }}>
        <Button variant="outline-secondary" size="sm" onClick={handleDecrease}>
          −
        </Button>
        <span className="fw-bold">{quantity}</span>
        <Button variant="outline-secondary" size="sm" onClick={handleIncrease}>
          +
        </Button>
      </div>
    </div>

    {/* Right section: price and remove button stacked */}
    <div className="d-flex flex-column align-items-end ms-3">
      <div className="text-muted small">
        ${product.price.toFixed(2)} × {quantity} ={" "}
        <strong>${(product.price * quantity).toFixed(2)}</strong>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleRemove}
        className="mt-2"
      >
        Remove
      </Button>
    </div>
  </Card.Body>
</Card>

  );
};

export default CartItemCard;
