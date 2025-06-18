import { Card, Button } from "react-bootstrap";
import type { Product } from "../reactQuery/Product";
import { useState } from "react";

type Props = {
  product: Product;
  quantity?: number;
};

const ProductCard = ({ product, quantity = 0 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => setExpanded((prev) => !prev);

  const displayedDescription = expanded
    ? product.description
    : product.description.slice(0, 80) +
      (product.description.length > 80 ? "..." : "");

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ objectFit: "cover", height: "180px" }}
      />
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
            <Button variant="primary" className="w-100">
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
                <Button>-</Button>
                <div>
                  <span className="fs-2">{quantity}</span> in cart
                </div>
                <Button>+</Button>
              </div>
              <Button variant="danger" size="sm">
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
