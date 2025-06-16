import type { Product } from "../reactQuery/Product";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          ${product.price.toFixed(2)}
        </h6>
        <p className="card-text">{product.description}</p>
        <div className="mt-auto">
          <small className="text-warning">
            {"★".repeat(Math.round(product.rating.rate))}{" "}
            <span className="text-muted">
              ({product.rating.rate.toFixed(1)})
            </span>
          </small>
        </div>
        <button className="btn btn-primary mt-3">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
