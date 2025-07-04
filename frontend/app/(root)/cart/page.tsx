import CartCard from "./CartCard";
import Checkout from "./Checkout";
import InfoCard from "./InfoCard";

const Cartpage = () => {
  return (
    <div className="pt-24 pb-16 px-4 md:px-8 min-h-screen max-w-7xl mx-auto space-y-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 font-poppins">
        Checkout
      </h2>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-h-[70vh] overflow-y-auto">
          {[...Array(10).keys()].map((a) => (
            <CartCard key={a} />
          ))}
        </div>

        {/* Checkout Section */}
        <Checkout />
      </div>

      {/* Info Cards */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  );
};

export default Cartpage;
