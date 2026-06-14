"use client";

import { useState } from "react";

/** دشت‌زاد newsletter signup (shared partial). Submit is a local stub for now. */
export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="sec wrap" id="newsletter">
      <div className="news">
        <div className="news__l">
          <span className="news__kicker">
            <i className="fa-solid fa-envelope-open-text" aria-hidden /> خبرنامه دشت‌زاد
          </span>
          <h2 className="news__title">هر هفته، یک دستور تازه در ایمیلت</h2>
          <p className="news__sub">
            به خبرنامه دشت‌زاد بپیوند و گزیده بهترین مقاله‌ها، دستورهای فصلی و تخفیف‌های ویژه فروشگاه
            را اول از همه دریافت کن.
          </p>
        </div>
        <div>
          <form
            className="news__form"
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
              setDone(true);
              window.setTimeout(() => setDone(false), 6000);
            }}
          >
            <input
              type="text"
              required
              autoComplete="off"
              placeholder="شماره موبایل خود را وارد کنید"
              aria-label="شماره موبایل یا ایمیل"
            />
            <button className="btn btn--primary" type="submit">
              <i className="fa-solid fa-paper-plane" aria-hidden /> عضویت
            </button>
          </form>
          <p className="news__note">
            <i className="fa-solid fa-lock" aria-hidden /> شماره یا ایمیلت پیش ما امن است؛ هر وقت
            بخواهی لغو اشتراک کن.
          </p>
          <p className={`news__ok${done ? " show" : ""}`}>
            <i className="fa-solid fa-circle-check" aria-hidden /> عضویت‌ات ثبت شد! اولین شماره
            به‌زودی می‌رسد.
          </p>
        </div>
      </div>
    </section>
  );
}
