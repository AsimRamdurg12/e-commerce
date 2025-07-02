"use client";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";
import { RiLoader4Line } from "react-icons/ri";
import ProductCard from "./ProductCard";

const Products = () => {
  const { products, isLoading, isError, error } = useProduct(
    "products",
    "/products"
  );

  if (isError) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        {error?.message}
      </div>
    );
  }

  return isLoading ? (
    <div className="min-h-screen w-full flex justify-center items-center">
      <RiLoader4Line />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {products.map((product: Product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
