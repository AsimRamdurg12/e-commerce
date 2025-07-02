"use client";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";
import { RiLoader4Line } from "react-icons/ri";
import ProductCard from "./ProductCard";
import { useStore } from "../store/store";

const Products = () => {
  const { products, isLoading, isError, error } = useProduct(
    "products",
    "/products"
  );
  const { searchTerm, selectedCategory } = useStore();

  const filteredProducts = products
    .filter((product: Product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product: Product) =>
      selectedCategory ? product.category === selectedCategory : true
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
      <RiLoader4Line className="animate-spin" />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20 pb-10">
      {filteredProducts.map((product: Product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Products;
