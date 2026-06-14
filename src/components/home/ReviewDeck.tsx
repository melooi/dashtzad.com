"use client";

import { useCallback, useEffect, useState } from "react";

export interface Review {
  stars: number;
  text: string;
  initial: string;
  name: string;
  city: string;
}

/** Stacked, auto-advancing customer-review card deck (ported from the design's cg-deck). */
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
    <div className="cg-deck">
      <div className="cg-deck__stage">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className={`cg-quote${(i - active + n) % n === 0 ? " is-front" : ""}`}
            style={poseFor(i)}
            onClick={() => (i - active + n) % n === 0 && next()}
          >
            <span className="hm-rev__stars" aria-hidden>
              {Array.from({ length: r.stars }).map((_, s) => (
                <i key={s} className="fa-solid fa-star" />
              ))}
            </span>
            <blockquote className="cg-quote__t">{r.text}</blockquote>
            <figcaption className="cg-quote__by">
              <span className="cg-quote__logo">{r.initial}</span>
              <span>
                <span className="cg-quote__name">{r.name}</span>
                <span className="cg-quote__role">
                  {r.city} ·{" "}
                  <span className="hm-rev__verified">
                    <i className="fa-solid fa-circle-check" aria-hidden /> خرید تأییدشده
                  </span>
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="cg-deck__nav">
        <button className="cg-deck__prev" type="button" aria-label="نظر قبلی" onClick={prev}>
          <i className="fa-solid fa-chevron-right" aria-hidden />
        </button>
        <div className="cg-deck__dots">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className={`cg-dot${i === active ? " is-on" : ""}`}
              aria-label={`نظر ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button className="cg-deck__next" type="button" aria-label="نظر بعدی" onClick={next}>
          <i className="fa-solid fa-chevron-left" aria-hidden />
        </button>
      </div>
      <span className="cg-deck__hint">
        <i className="fa-solid fa-hand-pointer" aria-hidden /> برای دیدن نظر بعدی، کارت را کلیک کنید یا
        از فلش‌ها استفاده کنید
      </span>
    </div>
  );
}
