import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import type { Product } from "./ProductInterface";
import CategoryDropdown from "../components/CategoryDropdown";

const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return response.data;
};

const fetchProducts = async (category?: string): Promise<Product[]> => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : `https://fakestoreapi.com/products`;
  const response = await axios.get(url);
  return response.data;
};

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: categories = [],
    isLoading: loadingCategories,
    error: errorCategories,
  } = useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products = [],
    isLoading: loadingProducts,
    error: errorProducts,
  } = useQuery<Product[], Error>({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  if (loadingCategories || loadingProducts) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (errorCategories || errorProducts) return <div>Error loading data.</div>;

  return (
    <div className="container">
      <div className="category-dropdown-wrapper mb-4 pb-1">
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="row g-4">
        {products.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          products.map((product: Product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
