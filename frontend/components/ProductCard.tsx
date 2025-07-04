"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Button from "./ui/Button";

interface ProductCardProps {
  product: Product;
  setModal: React.Dispatch<React.SetStateAction<{ open: boolean; id: number }>>;
}

export default function ProductCard({ product, setModal }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-between p-4 group">
      {/* Image Section */}
      <div
        onClick={() => setModal({ open: true, id: product.id })}
        className="cursor-pointer flex flex-col justify-between gap-2"
      >
        <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={150}
            height={150}
            className="object-contain h-full p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Title and Rating */}
        <div className="mt-3">
          <h2 className="font-poppins text-lg font-semibold text-gray-900 line-clamp-1">
            {product.title}
          </h2>
          <div className="text-sm font-inter text-gray-600 flex items-center gap-2 mt-1">
            <span>{product.rating.rate} ⭐</span>
            <span>•</span>
            <span>{product.rating.count} ratings</span>
          </div>
        </div>

        {/* Price */}
        <p className="text-indigo-600 font-bold text-lg mt-2">
          ${product.price}
        </p>
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => alert("Added to cart")}
        className="mt-4 font-inter bg-indigo-500 hover:bg-indigo-600 text-white w-full py-2 rounded-lg transition"
      >
        Add to Cart
      </Button>
    </div>
  );
}
