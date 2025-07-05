"use client";

import { useProduct } from "@/hooks/useProduct";
import { useStore } from "@/store/store";

const CategorySidebar = () => {
  const { products, isLoading, isError } = useProduct(
    "categories",
    "/products/categories"
  );
  const { selectedCategory, setSelectedCategory } = useStore();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load</div>;

  return (
    <aside className="w-full md:w-64 bg-white border rounded-lg p-4 sticky top-20 h-fit shadow-md">
      <h3 className="text-xl font-semibold mb-4 font-poppins">Categories</h3>
      <ul className="space-y-2">
        <li
          onClick={() => setSelectedCategory("")}
          className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-yellow-100 ${
            selectedCategory === "" ? "bg-yellow-200 font-semibold" : ""
          }`}
        >
          All
        </li>
        {products?.map((category: string) => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-yellow-100 capitalize ${
              selectedCategory === category ? "bg-yellow-200 font-semibold" : ""
            }`}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
