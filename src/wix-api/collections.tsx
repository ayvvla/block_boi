import { collections } from "@wix/stores";
import { WixClient } from "../lib/wix-client.base";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    const { collection } =
      await wixClient.collections.getCollectionBySlug(slug);

    return collection || null;
  },
);

export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001")
      .ne("_id", "c6d5f266-90db-4663-9ca1-fe16a002782a")
      .find();

    return collections.items;
  },
);
