import Image from "next/image";
import shopping from "@/assets/23254591_christmas_2012_new_2855.jpg";
import Button from "@/components/ui/Button";

const CartCard = () => {
  return (
    <section className="px-4 py-6 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        {/* Product Image */}
        <div className="sm:col-span-1 w-fit mx-auto sm:mx-0">
          <Image
            src={shopping}
            width={100}
            height={100}
            alt="Product"
            className="drop-shadow border border-gray-200 rounded-lg"
          />
        </div>

        {/* Product Info + Actions */}
        <div className="sm:col-span-3 flex flex-col sm:flex-row justify-between gap-4 sm:items-center w-full">
          {/* Title + Price */}
          <div className="w-full sm:w-1/2">
            <h4 className="font-semibold text-lg truncate font-poppins">
              Product Title
            </h4>
            <p className="text-gray-700 font-medium text-md font-inter">$100</p>
          </div>

          {/* Quantity + Total */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12">
            {/* Quantity Controls */}
            <div className="flex items-center bg-gray-100 rounded-lg gap-2">
              <Button className="px-2 py-0">-</Button>
              <p className="font-semibold text-md font-inter">5</p>
              <Button className="px-2 py-0">+</Button>
            </div>

            {/* Total */}
            <div className="text-right">
              <h4 className="font-bold text-lg text-orange-500">$500</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartCard;
