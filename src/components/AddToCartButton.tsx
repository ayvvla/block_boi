import { products } from "@wix/stores";
import { addToCart } from "../wix-api/cart";
import { Button, ButtonProps } from "./ui/button";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  ...props
}: AddToCartButtonProps) {
  return (
    <Button
      onClick={() =>
        addToCart({
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
    >
      Add to Cart
    </Button>
  );
}
