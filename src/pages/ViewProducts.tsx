import Products from "../reactQuery/Products";

const ViewProducts = () => {
  return (
    <div className="container justify-content-center align-items-center text-center pt-3">
      <div className="product-header text-center py-4 my-5">
        <h1 className="display-5 fw-bold">Current Products</h1>
        <h5 className="text-muted">
          Browse by category and discover new finds
        </h5>
      </div>

      <div className="my-4">
        <Products />
      </div>
    </div>
  );
};

export default ViewProducts;
