"use client";

import { useState } from "react";
import Image from "next/image";
import type { WooImage } from "@/lib/woo/types";

/** Product image gallery: main image + thumbnails. Falls back to a placeholder. */
export function ProductGallery({ images, name }: { images: WooImage[]; name: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery__main">
          <div className="ph gallery__ph">
            <span className="ph__label">تصویر محصول — به‌زودی</span>
          </div>
        </div>
      </div>
    );
  }

  const main = images[active] ?? images[0]!;

  return (
    <div className="gallery">
      <div className="gallery__main">
        <Image
          src={main.src}
          alt={main.alt || name}
          fill
          priority
          sizes="(max-width: 980px) 100vw, 45vw"
          className="gallery__img"
        />
      </div>

      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((im, i) => (
            <button
              key={im.id || i}
              type="button"
              className={`gallery__thumb${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`تصویر ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image src={im.src} alt={im.alt || name} fill sizes="84px" className="gallery__img" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
