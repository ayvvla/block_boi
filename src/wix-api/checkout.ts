import { checkout } from "@wix/ecom";
import { WixClient } from "../lib/wix-client.base";
import { env } from "../env";

export async function getCheckOutUrlForCurrentCart(wixClient: WixClient ){
  const {checkoutId} = await wixClient.currentCart.createCheckoutFromCurrentCart({
    channelType: checkout.ChannelType.WEB
  })

  const {redirectSession} = await wixClient.redirects.createRedirectSession({
    ecomCheckout: {checkoutId},
    callbacks: {
      postFlowUrl: window.location.href,
      thankYouPageUrl: env.NEXT_PUBLIC_BASE_URL + "/checkout-success"
    }
  })

  if(!redirectSession) {
    throw Error("failed to create redirect session")
  }
  return redirectSession.fullUrl
}

