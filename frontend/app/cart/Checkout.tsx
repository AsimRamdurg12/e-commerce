import Button from "@/components/ui/Button";

const Checkout = () => {
  return (
    <div className="fixed md:relative px-4 py-8 space-y-4 bg-white drop-shadow-2xl bottom-0 rounded-t-3xl md:rounded-3xl w-full h-fit">
      <div className="relative flex justify-between ">
        <p>5 items</p>
        <p>$500</p>
      </div>
      <hr />
      <div className="flex justify-between items-center text-2xl font-bold">
        <h4>Total</h4>
        <h4>$500</h4>
      </div>
      <Button className="w-full">Go to checkout</Button>
    </div>
  );
};

export default Checkout;
