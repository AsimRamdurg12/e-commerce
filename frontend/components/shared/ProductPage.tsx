"use client";

import { useProduct } from "@/hooks/useProduct";
import { colors, size } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import CartControls from "./CartControls";

const ProductPage = ({ id }: { id: number }) => {
  const { products, isLoading, isError, error } = useProduct(
    ["productbyId", id],
    `/products/${id}`
  );

  const [variants, setVariants] = useState({
    c: "bg-black",
    s: "XL",
  });

  if (isError) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <p className="text-red-500 font-semibold">{error?.message}</p>
      </div>
    );
  }

  if (isLoading || !products) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <RiLoader4Line size={30} className="animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <section className="space-y-6 font-poppins">
      <p className="text-sm text-gray-500">{`Home > ${products.category}`}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="h-96 flex justify-center items-center border border-gray-300 bg-white rounded-xl">
          <Image
            src={products.image}
            alt={products.title}
            width={300}
            height={300}
            className="h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{products.title}</h2>
          <div className="flex justify-between items-center">
            <h4 className="text-2xl font-semibold text-yellow-600">
              ${products.price}
            </h4>
            <div className="text-sm text-gray-600">
              <p>{products.rating.rate} ⭐</p>
              <p>{products.rating.count} ratings</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {products.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {/* Color */}
            <div>
              <h5 className="font-medium mb-1">Color</h5>
              <div className="flex items-center gap-3">
                {colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() =>
                      setVariants((prev) => ({ ...prev, c: color }))
                    }
                    className={`p-1 rounded-full ${
                      variants.c === color ? "ring-2 ring-yellow-500" : ""
                    }`}
                  >
                    <div className={`${color} rounded-full size-8 shadow`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h5 className="font-medium mb-1">Size</h5>
              <div className="flex items-center gap-2">
                {size.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setVariants((prev) => ({ ...prev, s: s }))}
                    className={`px-4 py-1 rounded-lg border ${
                      variants.s === s
                        ? "bg-yellow-500 text-white border-yellow-600"
                        : "bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <CartControls product={products} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
