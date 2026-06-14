"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { toFaDigits } from "@/lib/utils";

interface Props {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image?: string;
  inStock: boolean;
  hasPrice: boolean;
  /** stock cap for the quantity stepper */
  maxQty: number;
}

/** Quantity stepper + add-to-cart, handling the no-price and out-of-stock states. */
export function ProductBuy({ productId, slug, name, price, image, inStock, hasPrice, maxQty }: Props) {
  const addItem = useCart((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!hasPrice) {
    return (
      <a className="btn btn--ghost btn--block" href="tel:02192002661">
        <i className="fa-solid fa-phone" aria-hidden /> تماس برای استعلام قیمت
      </a>
    );
  }

  if (!inStock) {
    return (
      <button type="button" className="btn btn--ghost btn--block buy-box__soldout" disabled>
        <i className="fa-solid fa-bell-slash" aria-hidden /> فعلاً ناموجود
      </button>
    );
  }

  const cap = Math.max(1, maxQty);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(cap, q + 1));

  function add() {
    addItem({ productId, slug, name, price, image }, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="buy-actions">
      <div className="qty" role="group" aria-label="تعداد">
        <button type="button" className="qty__btn" onClick={dec} disabled={qty <= 1} aria-label="کاهش تعداد">
          <i className="fa-solid fa-minus" aria-hidden />
        </button>
        <span className="qty__n num">{toFaDigits(qty)}</span>
        <button type="button" className="qty__btn" onClick={inc} disabled={qty >= cap} aria-label="افزایش تعداد">
          <i className="fa-solid fa-plus" aria-hidden />
        </button>
      </div>

      <button type="button" className="btn btn--primary btn--block" onClick={add}>
        <i className="fa-solid fa-cart-plus" aria-hidden /> افزودن به سبد خرید
      </button>

      <div className={`buy-ok${added ? " show" : ""}`} role="status" aria-live="polite">
        <i className="fa-solid fa-circle-check" aria-hidden /> به سبد خرید افزوده شد
      </div>
    </div>
  );
}
