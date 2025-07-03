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
    <div className="relative rounded-3xl p-2 drop-shadow-2xl hover:shadow-xl bg-white flex flex-col justify-between mx-4">
      <div
        onClick={() => setModal({ open: true, id: product.id })}
        className="flex flex-col justify-between cursor-pointer"
      >
        <div className="w-full h-48 flex items-center justify-center bg-white rounded-3xl drop-shadow-lg border border-gray-200">
          <Image
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
            width={100}
            height={100}
          />
        </div>
        <div className="px-4 py-2">
          <div>
            <h2 className="font-bold text-lg mt-2 line-clamp-1">
              {product.title}
            </h2>
            <div className="flex gap-3 items-center">
              <p className="text-sm font-medium">{product.rating.rate} ⭐</p> |
              <p>{product.rating.count} ratings</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="text-orange-400 font-semibold my-2">${product.price}</p>
        </div>
      </div>
      <Button
        onClick={() => alert("Asim")}
        className="rounded-full drop-shadow-2xl px-4 py-2"
      >
        Add to Cart
      </Button>
    </div>
  );
}
