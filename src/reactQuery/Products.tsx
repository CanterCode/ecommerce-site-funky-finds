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

  // Fetch categories once
  const {
    data: categories = [],
    isLoading: loadingCategories,
    error: errorCategories,
  } = useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch products based on selectedCategory
  const {
    data: products = [],
    isLoading: loadingProducts,
    error: errorProducts,
  } = useQuery<Product[], Error>({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  if (loadingCategories || loadingProducts) return <div>Loading...</div>;
  if (errorCategories || errorProducts) return <div>Error loading data.</div>;

  return (
    <div className="container">
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="row">
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
