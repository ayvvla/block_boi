import { useCartCheckout } from "../hooks/checkout";
import LoadingButton from "./LoadingButton";
import { ButtonProps } from "./ui/button";

export default function CheckOutButton(props: ButtonProps) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} loading={pending} {...props}>
      Checkout
    </LoadingButton>
  );
}
