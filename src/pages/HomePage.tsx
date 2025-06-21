import { Link } from "react-router-dom";
import "../css/homepage.css";

const HomePage = () => {
  return (
    <div>
      <div className=" home-hero d-flex justify-content-center align-items-center text-center px-0 mt-5">
        <div className="hero-content">
          <h1 className="display-4">Welcome to Josh's Funky Shop</h1>
          <h3 className="lead">
            Explore our curated products and enjoy a bold shopping experience!
          </h3>
          <p className="mb-5">
            This is a basic E-Commerce platform created by Josh Canterbury to
            demonstrate skills in React, React Query, Redux, and more.
          </p>
          <Link to="/products" className="btn btn-lg hero-btn">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
