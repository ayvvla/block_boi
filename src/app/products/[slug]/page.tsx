import { getProductBySlug } from "@/src/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetails";
import { Metadata } from "next";
import { getWixServerClient } from "@/src/lib/wix-client.server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(await getWixServerClient(), slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: `Get this ${product.name} from Block_boi`,
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(await getWixServerClient(), slug);

  if (!product?._id) notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetail product={product} />
    </main>
  );
}
