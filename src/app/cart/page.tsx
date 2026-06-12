"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/store/cart";
import { formatToman, toFaDigits } from "@/lib/utils";

export default function CartPage() {
  const { items, setQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <p className="text-dz-muted">سبد خرید شما خالی است.</p>
        <Link href="/products" className="mt-4 inline-block font-bold text-dz-primary">
          مشاهده محصولات
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <h1 className="mb-6 text-3xl font-extrabold">سبد خرید</h1>

      <ul className="divide-y divide-dz-line">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center justify-between gap-4 py-4">
            <div className="flex-1">
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-dz-muted">{formatToman(item.price)}</p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => setQuantity(item.productId, Number(e.target.value))}
              className="w-16 rounded-dz-sm border border-dz-line p-2 text-center"
            />
            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="text-dz-danger"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-lg font-bold">جمع کل: {formatToman(total())}</span>
        <button
          type="button"
          className="rounded-dz bg-dz-primary px-8 py-3 font-bold text-white hover:bg-dz-primary-600"
        >
          ادامه فرآیند خرید ({toFaDigits(items.length)} کالا)
        </button>
      </div>
    </Container>
  );
}
