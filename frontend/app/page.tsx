import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Products />
    </div>
  );
}
