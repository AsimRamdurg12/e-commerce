import CartCard from "./CartCard";
import Checkout from "./Checkout";

const Cartpage = () => {
  return (
    <div className="pt-20 min-h-screen max-w-7xl mx-auto">
      <h2 className="text-4xl font-medium">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:w-full justify-center my-4 md:px-4">
        <div className="col-span-2 bg-white rounded-3xl drop-shadow-2xl p-2 max-md:mx-4">
          <CartCard />
        </div>
        <div className="">
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
