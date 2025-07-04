"use client";

import { useCartStore } from "@/store/store";
import Button from "../ui/Button";
import { Product } from "@/types/product";

interface CartControlsProps {
  product: Product;
}

const CartControls = ({ product }: CartControlsProps) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const cartItem = cart.find((item) => item.id === product.id);

  if (!cartItem) {
    return (
      <Button onClick={() => addToCart(product)} className="w-full">
        Add to Cart
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4 w-full justify-between">
      <Button
        onClick={() => removeFromCart(product.id)}
        className=" bg-red-500 text-white w-full"
      >
        Remove
      </Button>

      <div className="flex items-center gap-2 rounded px-3 py-1 w-full">
        <Button
          onClick={() => decreaseQuantity(product.id)}
          className="px-3 py-1"
        >
          -
        </Button>
        <span className="font-semibold">{cartItem.quantity}</span>
        <Button
          onClick={() => increaseQuantity(product.id)}
          className="px-3 py-1"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CartControls;
