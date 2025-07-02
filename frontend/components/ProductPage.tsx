"use client";

import { useProduct } from "@/hooks/useProduct";
import { colors, size } from "@/lib/constants";
import Image from "next/image";
import { BiLoader } from "react-icons/bi";
import Button from "./ui/Button";

const ProductPage = ({ id }: { id: string }) => {
  const { products, isLoading, isError, error } = useProduct(
    "productbyId",
    `/products/${id}`
  );

  if (isError) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center animate-spin">
        {error?.message}
      </div>
    );
  }

  return isLoading ? (
    <div className="min-h-screen w-full flex justify-center items-center animate-spin">
      <BiLoader size={30} />
    </div>
  ) : (
    <section className="pt-20 px-4 py-8 space-y-4">
      <div>
        <p className="font-bold font-serif">{`Home > ${products.category}`}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="h-96 flex justify-center items-center border border-gray-300 bg-white rounded-xl w-full">
          <Image
            src={products.image}
            alt={products.title}
            width={200}
            height={200}
            className="h-full object-contain"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-semibold">{products.title}</h2>
          <div className="flex justify-between">
            <h4 className="text-2xl font-semibold">${products.price}</h4>
            <div>
              <p>{products.rating.rate}</p>
              <p>{products.rating.count} ratings</p>
            </div>
          </div>
          <h3 className="text-xl font-medium">Description:</h3>
          <p className="text-gray-700">{products.description}</p>
          <div>
            <div className="flex flex-col gap-2">
              <h5 className="font-medium">Color:</h5>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`${color} shadow rounded-lg size-10`}
                  ></div>
                ))}
              </div>

              <h5 className="font-medium">Size:</h5>
              <div className="flex items-center gap-4">
                {size.map((s) => (
                  <div
                    key={s}
                    className="size-10 p-2 rounded border text-center"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 w-full mt-4">
              <Button className="w-full">Add to Cart</Button>
              <Button className="text-black hover:bg-white/50 bg-white border border-neutral-700 w-3/4">
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
