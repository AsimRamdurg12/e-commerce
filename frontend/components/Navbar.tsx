"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { useProduct } from "@/hooks/useProduct";
import { BiSearch } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";

const Navbar = () => {
  const { products } = useProduct("categories", "/products/categories");

  console.log(products);

  return (
    <nav className="flex justify-between items-center px-4 py-2 border-b">
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
      <div className="flex">
        <select name="" id="" className="">
          <option value="">All</option>
          {products?.map((product: string) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
        <input className="border" />
        <BiSearch />
      </div>

      <div className="flex">
        <CgShoppingCart />
        <p className="">5</p>
      </div>
    </nav>
  );
};

export default Navbar;
