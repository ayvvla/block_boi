import { products } from "@wix/stores"
import Badge from "./ui/Badge";

interface DiscountBadgeprops {
  data: products.Discount;
}

export default function DiscountBadge({data} : DiscountBadgeprops) {
  if (data.type !== "PERCENT") {
    return null
  }

  return (
    <Badge>-{data.value}%</Badge>
  )
}
