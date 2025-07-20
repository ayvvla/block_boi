import Image from "next/image";
import banner from "../assets/banner.jpg";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import Product from "../components/Product";
import { Skeleton } from "../components/ui/skeleton";
import { getCollectionBySlug } from "../wix-api/collections";
import { queryProducts } from "../wix-api/products";
import { getWixServerClient } from "../lib/wix-client.server";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Fresh Finds, Just For You
          </h1>
          <p>
            Experience curated collections and exclusive pieces. Indulge in the
            extraordinary. Discover the latest trends and must-have arrivals.
            Elevate your style today
          </p>
          <Button asChild>
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="block boi banner"
            className="h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  const wixClient = getWixServerClient();
  const collection = await getCollectionBySlug(
    await wixClient,
    "featured-products",
  );

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(await wixClient, {
    collectionIds: collection._id,
  });

  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[25rem] w-full" />
      ))}
    </div>
  );
}
