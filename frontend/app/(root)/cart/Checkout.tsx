import Button from "@/components/ui/Button";

const Checkout = () => {
  return (
    <div className="fixed md:relative bottom-0 w-full px-4 py-6 md:py-8 bg-white h-fit rounded-t-3xl md:rounded-3xl drop-shadow-2xl space-y-4 border-t md:border md:border-gray-200">
      {/* Items Summary */}
      <div className="font-inter flex justify-between text-gray-600 text-sm md:text-base">
        <p>5 items</p>
        <p>$500</p>
      </div>

      <hr className="border-gray-300" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg md:text-xl font-semibold font-poppins">Total</h4>
        <h4 className="text-xl md:text-2xl font-bold text-orange-500">$500</h4>
      </div>

      {/* Checkout Button */}
      <Button className="w-full py-3 text-lg rounded-xl font-inter">
        Go to checkout
      </Button>
    </div>
  );
};

export default Checkout;
