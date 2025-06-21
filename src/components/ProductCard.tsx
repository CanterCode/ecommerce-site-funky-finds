import { Card, Button } from "react-bootstrap";
import type { Product } from "../reactQuery/ProductInterface";
import { useState } from "react";
import type { RootState } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import "../css/products.css";

type Props = {
  product: Product;
  quantity?: number;
};

const ProductCard = ({ product }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const quantity = cartItem?.quantity || 0;

  const toggleDescription = () => setExpanded((prev) => !prev);

  const displayedDescription = expanded
    ? product.description
    : product.description.slice(0, 80) +
      (product.description.length > 80 ? "..." : "");

  return (
    <Card className="h-100 shadow-sm border-0 product-card py-3">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.title} className="product-img" />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          {product.title.split(" ").slice(0, 5).join(" ")}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ${product.price.toFixed(2)}
        </Card.Subtitle>
        <Card.Text>
          {displayedDescription}
          {product.description.length > 80 && (
            <Button
              variant="link"
              size="sm"
              onClick={toggleDescription}
              className="p-0 ps-1 align-baseline"
            >
              {expanded ? "Hide" : "More"}
            </Button>
          )}
        </Card.Text>

        <div className="mt-auto">
          <small className="text-warning">
            {"★".repeat(Math.round(product.rating.rate))}{" "}
            <span className="text-muted">
              ({product.rating.rate.toFixed(1)})
            </span>
          </small>
        </div>

        <div className="mt-3">
          {quantity === 0 ? (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => dispatch(addItem(product))}
            >
              + Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  size="sm"
                  onClick={() => dispatch(decreaseQuantity(product.id))}
                >
                  -
                </Button>
                <div>
                  <span className="fs-2">{quantity}</span> in cart
                </div>
                <Button
                  size="sm"
                  onClick={() => dispatch(increaseQuantity(product.id))}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
