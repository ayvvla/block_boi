import { useState } from "react";
import { useToast } from "./use-toast";
import { getCheckOutUrlForCurrentCart } from "../wix-api/checkout";
import { wixBrowserClient } from "../lib/wix-client.browser";

export function useCartCheckout() {
const {toast} = useToast()

const [pending,setPending] = useState(false)

async function startCheckoutFlow(){
setPending(true)
try {
  const checkoutUrl = await getCheckOutUrlForCurrentCart(wixBrowserClient)
  window.location.href = checkoutUrl
} catch (error) {
  setPending(false)
  console.error(error)
  toast({
    variant: "destructive",
    description:  "Failed to load checkout, please try again"
  })
}
}

return {startCheckoutFlow, pending}
}