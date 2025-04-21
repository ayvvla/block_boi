import { products } from "@wix/stores";
import { getwixClient } from "../lib/wix-client.base";
import { findVariant } from "../lib/utils";
import { WIX_STORES_APP_ID } from "../lib/constants";

export async function getCart() {
  const wixClient = getwixClient();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    if (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND"
    ) {
      return null;
    } else {
      throw error;
    }
  }
}
interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export async function addToCart({
  product,
  selectedOptions,
  quantity,
}: AddToCartValues) {
  const wixClient = getwixClient();
  const selectedVariant = findVariant(product, selectedOptions);

  return wixClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product._id,
          options: selectedVariant
            ? {
                variantId: selectedVariant._id,
              }
            : {
                options: selectedOptions,
              },
        },
        quantity,
      },
    ],
  });
}
