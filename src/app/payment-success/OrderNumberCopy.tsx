"use client";

import { useRef, useState } from "react";

/** Demo order number with copy-to-clipboard + a transient toast (no backend). */
export function OrderNumberCopy({ orderNumber }: { orderNumber: string }) {
  const [shown, setShown] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = () => {
    setShown(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown(false), 1900);
  };

  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(orderNumber).then(flash, flash);
    } else {
      flash();
    }
  };

  return (
    <>
      <div className="ordernum rise" data-d="3">
        <span className="ordernum__label">شماره سفارش</span>
        <span className="ordernum__val num">{orderNumber}</span>
        <button className="ordernum__copy" type="button" onClick={copy}>
          <i className="fa-regular fa-copy" aria-hidden /> کپی
        </button>
      </div>

      <div className="toast" data-show={shown ? "true" : undefined} role="status" aria-live="polite">
        <i className="fa-solid fa-check" aria-hidden /> شماره سفارش کپی شد
      </div>
    </>
  );
}
