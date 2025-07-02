"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-3xl p-2 drop-shadow-2xl hover:shadow-lg bg-white flex flex-col justify-between mx-4">
      <Link
        href={`/product/${product.id}`}
        className="flex flex-col justify-between"
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
      </Link>
      <button
        onClick={() => alert("Asim")}
        className="text-lg font-medium rounded-full drop-shadow-2xl bg-black text-white px-4 py-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
