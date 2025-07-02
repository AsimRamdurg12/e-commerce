"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="border rounded-lg p-4 shadow hover:shadow-md bg-white flex flex-col"
    >
      <div className="w-full h-48 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
          style={{ width: "auto", height: "auto" }}
          width={100}
          height={100}
        />
      </div>
      <h2 className="font-bold text-lg mt-2 line-clamp-2">{product.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
    </Link>
  );
}
