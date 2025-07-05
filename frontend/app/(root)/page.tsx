import Products from "@/components/shared/Products";
import CategorySidebar from "@/components/shared/Sidebar";

export default function Home() {
  return (
    <div className="flex gap-6 mt-20 px-4 max-w-7xl mx-auto">
      {/* Sidebar */}
      <div className="hidden md:block w-64">
        <CategorySidebar />
      </div>

      {/* Main Product Grid */}
      <div className="flex-1">
        <Products />
      </div>
    </div>
  );
}
