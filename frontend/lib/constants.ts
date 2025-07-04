import { FaTruckFast } from "react-icons/fa6";
import { MdCardGiftcard, MdPeopleAlt } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

export const colors = ["bg-red-300", "bg-white", "bg-black", "bg-purple-400"];
export const size = ["M", "L", "XL", "XXL", "3XL", "4XL"];
export const InfoCardConstants = [
  {
    title: "Free Shipping",
    description: "For orders above $499",
    Icon: FaTruckFast,
    bg: "bg-pink-300",
  },
  {
    title: "Call us Anytime",
    description: "+91-9988776655",
    Icon: RiCustomerService2Fill,
    bg: "bg-orange-300",
  },
  {
    title: "Chat with us",
    description: "24-hour chat support",
    Icon: MdPeopleAlt,
    bg: "bg-green-300",
  },
  {
    title: "Gift Cards",
    description: "For your loved ones, in any amount",
    Icon: MdCardGiftcard,
    bg: "bg-yellow-300",
  },
];
