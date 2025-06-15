import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "./Product";
import ProductCard from "../components/ProductCard";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

const Products = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products</div>;
  }

  return (
    <div>
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
