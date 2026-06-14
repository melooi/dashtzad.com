"use client";

import { useCallback, useEffect, useState } from "react";
import { Stars } from "@/components/ui";

export interface Review {
  stars: number;
  text: string;
  initial: string;
  name: string;
  city: string;
}

/** Stacked, auto-advancing customer-review card deck. Layout lives in home.css. */
export function ReviewDeck({ reviews }: { reviews: Review[] }) {
  const n = reviews.length;
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = () => setActive((a) => (a - 1 + n) % n);

  useEffect(() => {
    if (n <= 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setInterval(next, 6500);
    return () => window.clearInterval(t);
  }, [n, next, active]);

  const poseFor = (i: number): React.CSSProperties => {
    const pos = (i - active + n) % n;
    if (pos === 0) {
      return { transform: "translateY(0) scale(1) rotate(0deg)", opacity: 1, zIndex: n + 1 };
    }
    const dir = pos % 2 ? -1 : 1;
    return {
      transform: `translateY(${pos * 1.5}rem) scale(${1 - pos * 0.05}) rotate(${dir * 2.6}deg)`,
      opacity: pos >= 3 ? 0 : 1 - pos * 0.3,
      zIndex: n - pos,
    };
  };

  return (
    <div className="review-deck">
      <div className="review-deck__stage">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className={`review-card${(i - active + n) % n === 0 ? " is-front" : ""}`}
            style={poseFor(i)}
            onClick={() => (i - active + n) % n === 0 && next()}
          >
            <Stars value={r.stars} />
            <blockquote className="review-card__text">{r.text}</blockquote>
            <figcaption className="review-card__by">
              <span className="avatar review-card__avatar">{r.initial}</span>
              <span>
                <span className="review-card__name">{r.name}</span>
                <span className="review-card__role faint">
                  {r.city} ·{" "}
                  <span className="review-card__verified">
                    <i className="fa-solid fa-circle-check" aria-hidden /> خرید تأییدشده
                  </span>
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="review-deck__nav">
        <button className="review-deck__arrow" type="button" aria-label="نظر قبلی" onClick={prev}>
          <i className="fa-solid fa-chevron-right" aria-hidden />
        </button>
        <div className="review-deck__dots">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className={`review-deck__dot${i === active ? " is-on" : ""}`}
              aria-label={`نظر ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button className="review-deck__arrow" type="button" aria-label="نظر بعدی" onClick={next}>
          <i className="fa-solid fa-chevron-left" aria-hidden />
        </button>
      </div>
      <span className="review-deck__hint">
        <i className="fa-solid fa-hand-pointer" aria-hidden /> برای دیدن نظر بعدی، کارت را کلیک کنید یا
        از فلش‌ها استفاده کنید
      </span>
    </div>
  );
}
