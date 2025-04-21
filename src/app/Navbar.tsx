import Link from "next/link";
import logo from "@/src/assets/logo.png"
import Image from "next/image";
import { getCart } from "../wix-api/cart";



export default async function Navbar() {
  const cart = await getCart();
  const totalQuantity = cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0 ) || 0

  return <header className="bg-background shadow-sm">
    <div className="max-w-7xl mx-auto p-5 flex items-center justify-between gap-5 ">
      <Link href="/" className="flex items-center gap-3">
      <Image src={logo} alt="block boi logo" width={60} height={60}/>
      <span className="text-xl font-bold">Block boi</span>
      </Link> 
      {totalQuantity} items in cart
    </div>
  </header>;
}
