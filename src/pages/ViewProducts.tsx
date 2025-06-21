import Products from "../reactQuery/Products";
import "../css/products.css";

const ViewProducts = () => {
  return (
    <div className="products-page d-flex flex-column min-vh-100 mt-5">
      <div className="container text-center flex-grow-1">
        <div className="product-header text-center py-4 mt-3">
          <h1 className="display-5 fw-bold">🛍️ Funky Finds</h1>
          <h5 className="text-muted pt-2">Scroll. Click. Love it. Repeat. </h5>
        </div>

        <div className="my-4">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
