"use client";

import { useCart, type CartItem } from "@/store/cart";

export function AddToCartButton({ item }: { item: Omit<CartItem, "quantity"> }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(item, 1)}
      className="rounded-dz bg-dz-primary px-6 py-3 font-bold text-white transition hover:bg-dz-primary-600"
    >
      افزودن به سبد خرید
    </button>
  );
}
