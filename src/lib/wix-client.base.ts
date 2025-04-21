import { createClient, OAuthStrategy } from "@wix/sdk";
import { env } from "../env";
import {
  backInStockNotifications,
  checkout,
  currentCart,
  orders,
  recommendations,
} from "@wix/ecom";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { reviews } from "@wix/reviews";
import { collections, products } from "@wix/stores";

export function getwixClient() {
  return createClient({
    modules: {
      products,
      collections,
      currentCart,
      checkout,
      redirects,
      recommendations,
      orders,
      backInStockNotifications,
      files,
      members,
      reviews,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
    }),
  });
}
