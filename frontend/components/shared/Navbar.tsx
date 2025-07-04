"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { useProduct } from "@/hooks/useProduct";
import { CgSearch, CgShoppingCart } from "react-icons/cg";
import Button from "../ui/Button";
import { useCartStore, useStore } from "@/store/store";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { products } = useProduct("categories", "/products/categories");
  const { searchTerm, selectedCategory, setSearchTerm, setSelectedCategory } =
    useStore();
  const { cart } = useCartStore();
  const router = useRouter();

  return (
    <nav className="font-inter fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          priority
          src={logo}
          alt="logo"
          height={36}
          width={36}
          className="rounded-full"
        />
        <span className="text-lg font-bold hidden md:block text-gray-800">
          ShopEasy
        </span>
      </Link>

      {/* Search + Filter */}
      <div className="hidden sm:flex border border-gray-300 w-1/2 rounded-lg overflow-hidden shadow-sm">
        <select
          className="bg-white text-sm px-3 py-2 border-r border-gray-200 outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {products?.map((p: string) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="w-full px-3 py-2 text-sm outline-none"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4">
          <CgSearch size={20} />
        </Button>
      </div>

      {/* Cart */}
      <Button
        className="relative flex items-center gap-1 px-3 py-2 bg-gray-900 hover:bg-black text-white rounded-lg"
        onClick={() => router.push("/cart")}
      >
        <CgShoppingCart size={20} />
        {cart.length > -1 && (
          <span className="font-poppins absolute -top-1 -right-1 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </Button>
    </nav>
  );
};

export default Navbar;
