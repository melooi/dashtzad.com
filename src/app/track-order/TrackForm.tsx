"use client";

import { useState } from "react";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Build a stable-looking demo order id from the user's input. */
function buildDemoId(value: string): string {
  const norm = value.replace(/[^۰-۹0-9]/g, "");
  const hasDigit = /[0-9۰-۹]/.test(value);
  if (hasDigit) {
    const tail = norm.slice(-6).padStart(6, "1");
    return "DZ-" + tail.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)] ?? d);
  }
  return "DZ-۱۰۴۵۹۲";
}

export function TrackForm() {
  const [orderId, setOrderId] = useState("DZ-۱۰۴۵۹۲");
  const [shown, setShown] = useState(false);

  return (
    <>
      <form
        className="track-form"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem("trackInput") as HTMLInputElement | null;
          const v = input?.value.trim() ?? "";
          if (!v) return;
          setOrderId(buildDemoId(v));
          setShown(true);
        }}
      >
        <input
          type="text"
          name="trackInput"
          placeholder="شماره سفارش یا شماره موبایل"
          aria-label="شماره سفارش یا موبایل"
        />
        <button className="btn btn--primary" type="submit">
          <i className="fa-solid fa-magnifying-glass" aria-hidden /> پیگیری
        </button>
      </form>

      <div className={`track-result${shown ? " show" : ""}`}>
        <div className="track-meta">
          <span className="faq-fact">
            <i className="fa-solid fa-receipt" aria-hidden /> شماره سفارش: <b>{orderId}</b>
          </span>
          <span className="faq-fact">
            <i className="fa-solid fa-box" aria-hidden /> ۳ قلم کالا
          </span>
          <span className="faq-fact">
            <i className="fa-solid fa-location-dot" aria-hidden /> تهران
          </span>
        </div>
        <ul className="track-timeline">
          <li className="track-step is-done">
            <span className="track-step__dot">
              <i className="fa-solid fa-check" aria-hidden />
            </span>
            <div className="track-step__b">
              <div className="track-step__t">سفارش ثبت و تأیید شد</div>
              <div className="track-step__d">۱۲ خرداد ۱۴۰۵ — ۱۰:۲۴</div>
            </div>
          </li>
          <li className="track-step is-done">
            <span className="track-step__dot">
              <i className="fa-solid fa-check" aria-hidden />
            </span>
            <div className="track-step__b">
              <div className="track-step__t">در حال بسته‌بندی</div>
              <div className="track-step__d">۱۲ خرداد ۱۴۰۵ — ۱۳:۱۰</div>
            </div>
          </li>
          <li className="track-step is-current">
            <span className="track-step__dot">
              <i className="fa-solid fa-truck" aria-hidden />
            </span>
            <div className="track-step__b">
              <div className="track-step__t">تحویل پست/پیک شد</div>
              <div className="track-step__d">کد رهگیری برای شما پیامک شد — در مسیر تحویل</div>
            </div>
          </li>
          <li className="track-step is-pending">
            <span className="track-step__dot">
              <i className="fa-solid fa-house" aria-hidden />
            </span>
            <div className="track-step__b">
              <div className="track-step__t">تحویل به شما</div>
              <div className="track-step__d">برآورد: ۱ تا ۲ روز کاری</div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
