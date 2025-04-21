import { getwixClient } from "../lib/wix-client.base";

export async function getCollectionBySlug(slug: string) {
const wixClient = getwixClient()
const {collection} = await wixClient.collections.getCollectionBySlug(slug)

return collection || null
}