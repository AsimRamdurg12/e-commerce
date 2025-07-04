import Image from "next/image";
import { Product } from "@/types/product";
import CartControls from "@/components/shared/CartControls";

interface CartCardProps {
  product: Product & { quantity: number };
}

const CartCard = ({ product }: CartCardProps) => {
  return (
    <div className="px-4 py-6 border-b last:border-none flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={80}
          height={80}
          className="rounded-lg border border-gray-300 object-contain"
        />
        <div>
          <h4 className="font-semibold line-clamp-1 font-poppins">
            {product.title}
          </h4>
          <p className="text-gray-600 font-inter">${product.price}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <CartControls product={product} />
        <p className="text-sm text-gray-700 font-inter">
          Subtotal: ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
