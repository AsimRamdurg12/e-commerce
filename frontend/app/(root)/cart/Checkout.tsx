import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/store";

const Checkout = () => {
  const { cart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="sticky md:relative bottom-0 bg-white rounded-t-2xl md:rounded-2xl p-6 shadow-md">
      <div className="flex justify-between font-inter mb-2">
        <p>{totalItems} item(s)</p>
        <p>${totalPrice}</p>
      </div>
      <hr />
      <div className="flex justify-between text-xl font-poppins font-bold mt-2 mb-4">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
      <Button className="w-full">Go to Checkout</Button>
    </div>
  );
};

export default Checkout;
