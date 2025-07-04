"use client";

import { useCartStore } from "@/store/store";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
import InfoCard from "./InfoCard";
import Link from "next/link";
import { InfoCardConstants } from "@/lib/constants";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 font-medium py-16">
          <p className="text-xl font-poppins">Your cart is empty 🛒</p>
          <Link
            href="/"
            className="text-yellow-500 font-semibold underline mt-2 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Cart Items */}
            <div className="col-span-2 bg-white rounded-3xl drop-shadow-md border border-gray-300">
              {cart.map((item) => (
                <CartCard key={item.id} product={item} />
              ))}
            </div>

            {/* Checkout */}
            <div className="w-full">
              <Checkout />
            </div>
          </div>

          {/* Info Section */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {InfoCardConstants.map((info) => (
              <InfoCard key={info.title} info={info} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;
