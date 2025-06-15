import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center text-center flex-grow-1">
      <div>
        <h1>Welcome to the E-Commerce Homepage</h1>
        <p className="lead">Explore our products and enjoy shopping!</p>
        <p>
          This is a basic E-Commerce platform created by Josh Canterbury to demonstrate skills in React, React Query, Redux,
          and more.
        </p>
        <Link to="/products" className="btn btn-primary mt-1">
          View Products
        </Link>
      </div>
    </div>
  );
};

export default HomePage;