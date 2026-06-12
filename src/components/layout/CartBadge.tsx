"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { toFaDigits } from "@/lib/utils";

export function CartBadge() {
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <Link href="/cart" className="relative hover:text-dz-ink">
      سبد خرید
      {count > 0 && (
        <span className="absolute -top-2 -left-3 grid h-5 w-5 place-items-center rounded-full bg-dz-primary text-xs text-white">
          {toFaDigits(count)}
        </span>
      )}
    </Link>
  );
}
