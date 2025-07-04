"use client";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";
import { RiLoader4Line } from "react-icons/ri";
import ProductCard from "./ProductCard";
import { useStore } from "../../store/store";
import { useState } from "react";
import ProductPage from "./ProductPage";

const Products = () => {
  const { products, isLoading, isError, error } = useProduct(
    "products",
    "/products"
  );
  const { searchTerm, selectedCategory } = useStore();
  const [modal, setModal] = useState({
    open: false,
    id: 0,
  });

  const filteredProducts = products
    ?.filter((product: Product) =>
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
      <RiLoader4Line size={50} className="animate-spin" />
    </div>
  ) : (
    <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20 pb-10 mx-4">
      {filteredProducts.map((product: Product) => (
        <ProductCard product={product} key={product.id} setModal={setModal} />
      ))}

      {modal.open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center ">
          <div className="bg-white max-w-lg h-4/5 md:h-full md:max-w-4xl w-full rounded-lg p-6 relative my-10 mx-2 overflow-y-auto">
            <button
              className="absolute px-4 top-2 right-2 text-gray-600 hover:text-black text-2xl"
              onClick={() => setModal({ open: false, id: 0 })}
            >
              x
            </button>

            <ProductPage key={modal.id} id={modal.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
