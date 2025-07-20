import { products } from "@wix/stores";
import { WixClient } from "../lib/wix-client.base";
import { findVariant } from "../lib/utils";
import { WIX_STORES_APP_ID } from "../lib/constants";

export async function getCart(wixClient: WixClient) {
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
export interface AddToCartValues {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export async function addToCart(
  wixClient: WixClient,
  { product, selectedOptions, quantity }: AddToCartValues,
) {
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

export interface updateCartItemQuantityValues {
  productId: string;
  newQuantity: number;
}

export async function updateCartItemQuantity(
  wixClient: WixClient,
  { newQuantity, productId }: updateCartItemQuantityValues,
) {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([
    {
      _id: productId,
      quantity: newQuantity,
    }
  ])
}

export async function removeCartItem(
  wixClient: WixClient,
  productId: string,
) {
  return wixClient.currentCart.removeLineItemsFromCurrentCart([productId]);
}
