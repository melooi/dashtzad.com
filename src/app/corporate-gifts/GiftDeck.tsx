"use client";

import { useState } from "react";

const QUOTES = [
  {
    logo: "آ",
    text:
      "برای عید امسال ۳۲۰ پک سفارش دادیم با لوگوی شرکت روی جعبه. کیفیت محصول و نظم ارسال عالی بود؛ بازخورد همکارها فوق‌العاده مثبت بود.",
    name: "آرمان احمدی",
    role: "مدیر منابع انسانی، شرکت آرین‌تک",
  },
  {
    logo: "س",
    text:
      "هدیه یلدای مشتریان کلیدی‌مان را از دشت‌زاد گرفتیم. توزیع خانه‌به‌خانه در چند شهر را خودشان هماهنگ کردند و ما فقط فهرست را دادیم.",
    name: "سحر موسوی",
    role: "مدیر بازاریابی، هلدینگ سپهر",
  },
  {
    logo: "ر",
    text:
      "دنبال هدیه‌ای سالم و اصیل بودیم که حس برند ما را منتقل کند. پک سپاس دقیقاً همان بود؛ فاکتور رسمی هم بی‌دردسر صادر شد.",
    name: "رضا کریمی",
    role: "مدیرعامل، استودیو رسام",
  },
];

export function GiftDeck() {
  const [active, setActive] = useState(0);
  const n = QUOTES.length;

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  return (
    <div className="cg-deck">
      <div className="cg-deck__stage">
        {QUOTES.map((q, i) => {
          const pos = (i - active + n) % n;
          const isFront = pos === 0;
          const dir = pos % 2 ? -1 : 1;
          const style: React.CSSProperties = isFront
            ? { transform: "translateY(0) scale(1) rotate(0deg)", opacity: 1, zIndex: n + 1 }
            : {
                transform: `translateY(${pos * 1.5}rem) scale(${1 - pos * 0.05}) rotate(${dir * 2.6}deg)`,
                opacity: pos >= 3 ? 0 : 1 - pos * 0.3,
                zIndex: n - pos,
              };
          return (
            <figure
              className={`card cg-quote${isFront ? " is-front" : ""}`}
              key={q.name}
              style={style}
              onClick={isFront ? () => go(1) : undefined}
            >
              <div className="cg-quote__mark">&rdquo;</div>
              <blockquote className="cg-quote__t">{q.text}</blockquote>
              <figcaption className="cg-quote__by">
                <span className="avatar avatar--green">{q.logo}</span>
                <span>
                  <span className="cg-quote__name">{q.name}</span>
                  <span className="cg-quote__role">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="cg-deck__nav">
        <button
          className="cg-deck__arrow"
          type="button"
          aria-label="نظر قبلی"
          onClick={() => go(-1)}
        >
          <i className="fa-solid fa-chevron-right" aria-hidden />
        </button>
        <div className="cg-deck__dots">
          {QUOTES.map((q, i) => (
            <button
              className={`cg-dot${i === active ? " is-on" : ""}`}
              type="button"
              key={q.name}
              aria-label={`نظر ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button
          className="cg-deck__arrow"
          type="button"
          aria-label="نظر بعدی"
          onClick={() => go(1)}
        >
          <i className="fa-solid fa-chevron-left" aria-hidden />
        </button>
      </div>
      <span className="cg-deck__hint">
        <i className="fa-solid fa-hand-pointer" aria-hidden /> برای دیدن نظر بعدی، روی کارت یا دکمه‌ها
        بزنید
      </span>
    </div>
  );
}
