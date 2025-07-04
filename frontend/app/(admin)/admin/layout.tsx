export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 font-bold text-xl">Admin Panel</div>
        <ul className="space-y-2 px-4">
          <li className="hover:text-yellow-600 cursor-pointer">Dashboard</li>
          <li className="hover:text-yellow-600 cursor-pointer">Products</li>
          <li className="hover:text-yellow-600 cursor-pointer">Orders</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Navbar */}
        <header className="bg-white px-6 py-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add Product</h1>
          <div className="text-sm">Admin User</div>
        </header>

        {/* Page Content */}
        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}
