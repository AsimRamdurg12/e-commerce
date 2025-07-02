"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { useProduct } from "@/hooks/useProduct";
import { CgSearch, CgShoppingCart } from "react-icons/cg";
import Button from "./ui/Button";
import { useStore } from "@/store/store";

const Navbar = () => {
  const { products } = useProduct("categories", "/products/categories");

  const { searchTerm, selectedCategory, setSearchTerm, setSelectedCategory } =
    useStore();

  return (
    <nav className="fixed z-1 bg-white w-full flex justify-between items-center px-4 py-2 border-b">
      <Link href="/">
        <Image
          priority
          src={logo}
          alt="logo"
          height={40}
          width={40}
          className="rounded-full"
        />
      </Link>
      <div className="flex border w-1/2 rounded-lg focus-within:ring-2 focus-within:ring-yellow-500">
        <select
          className="w-1/4 px-2 py-1 focus:outline-none"
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
          className="w-full focus-within:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="">
          <CgSearch />
        </Button>
      </div>

      <div className="flex items-center">
        <CgShoppingCart />
        <p className="">5</p>
      </div>
    </nav>
  );
};

export default Navbar;
