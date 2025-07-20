import Link from "next/link";
import logo from "@/src/assets/logo.png";
import Image from "next/image";
import { getCart } from "../wix-api/cart";
import { getWixServerClient } from "../lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "../components/UserButton";
import { getLoggedInMember } from "../wix-api/members";
import { getCollections } from "../wix-api/collections";
import MainNavigation from "./MainNavigation";
import SearchField from "../components/SearchField";
import MobileMenu from "./MobileMenu";
import { Suspense } from "react";

export default async function Navbar() {
  // const cart = await getCart(await getWixServerClient());
  const wixClient = await getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Suspense>
          <MobileMenu
            collections={collections}
            loggedInMember={loggedInMember}
          />
        </Suspense>

        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} alt="block boi logo" width={60} height={60} />
            <span className="text-xl font-bold">Block boi</span>
          </Link>
          <MainNavigation
            collections={collections}
            className="hidden lg:flex"
          />
        </div>
        <SearchField className="hidden max-w-96 lg:inline" />
        <div className="flex items-center justify-center gap-3">
          <UserButton
            loggedInMember={loggedInMember}
            className="hidden lg:inline-flex"
          />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
