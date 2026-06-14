"use client";

import { useState } from "react";
import type { FaqQA } from "@/lib/woo/view";

/** Product FAQ accordion (single-open). */
export function ProductFaqList({ items }: { items: FaqQA[] }) {
  const [open, setOpen] = useState(0);
  if (items.length === 0) return null;
  return (
    <div className="pfaq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`pfaq__item${isOpen ? " is-open" : ""}`}>
            <button type="button" className="pfaq__q" onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{it.q}</span>
              <i className="fa-solid fa-angle-down pfaq__chev" aria-hidden />
            </button>
            <div className="pfaq__a">
              <p className="muted">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
