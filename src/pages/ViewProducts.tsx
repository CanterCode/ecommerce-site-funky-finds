import Products from "../reactQuery/Products";

const ViewProducts = () => {
  return (
    <div className="container justify-content-center align-items-center text-center pt-5">
      <h1>Current Products</h1>

      <h5>View by Category</h5>

      <Products />
      
    </div>
  );
};

export default ViewProducts;
