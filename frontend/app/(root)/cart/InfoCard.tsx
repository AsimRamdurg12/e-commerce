import React from "react";
import { FaTruckFast } from "react-icons/fa6";

const InfoCard = () => {
  return (
    <div className="rounded-2xl px-4 py-4 flex items-center gap-4 bg-white drop-shadow-lg border border-gray-100 transition hover:shadow-xl">
      {/* Icon Box */}
      <div className="p-3 rounded-xl bg-pink-100 text-pink-600">
        <FaTruckFast className="size-6 md:size-8" />
      </div>

      {/* Text Content */}
      <div>
        <h5 className="font-semibold text-base md:text-lg text-gray-800">
          Free Shipping
        </h5>
        <p className="text-sm md:text-base text-gray-500">
          On orders above ₹500
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
