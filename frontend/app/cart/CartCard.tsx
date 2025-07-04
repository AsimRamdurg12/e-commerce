import Image from "next/image";
import React from "react";
import shopping from "@/assets/23254591_christmas_2012_new_2855.jpg";
import Button from "@/components/ui/Button";

const CartCard = () => {
  return (
    <section className="px-4 py-8 bg-white w-full">
      <div className="grid grid-cols-4 w-full">
        <div className="w-fit">
          <Image
            src={shopping}
            width={100}
            height={100}
            alt="s"
            className="drop-shadow border border-gray-200 rounded-lg"
          />
        </div>

        <div className="sm:flex flex-col sm:flex-row col-span-3 justify-between w-full gap-4">
          <div className="line-clamp-1">
            <h4 className="truncate font-medium text-lg">Product Title</h4>
            <p className="font-semibold text-lg">$100</p>
          </div>

          <div className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16 h-fit justify-between">
            <div className="flex bg-gray-200 gap-2 rounded">
              <Button className="px-2 py-0">+</Button>
              <p className="font-medium">5</p>
              <Button className="px-2 py-0">-</Button>
            </div>
            <div>
              <h4 className="hidden sm:flex font-semibold text-lg">$500</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartCard;
