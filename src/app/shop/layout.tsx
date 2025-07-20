import { getWixServerClient } from "@/src/lib/wix-client.server";
import { getCollections } from "@/src/wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCollections(await getWixServerClient());
  return (
    <SearchFilterLayout collections={collections}>
      {children}
    </SearchFilterLayout>
  );
}
