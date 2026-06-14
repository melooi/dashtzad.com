"use client";

import { useState } from "react";

const REQUEST_TYPES = [
  "خرید عمده محصولات",
  "هدایای سازمانی (نوروز/یلدا)",
  "همکاری و نمایندگی",
  "سفارش سفارشی‌سازی‌شده",
  "سایر موارد",
];

export function BulkForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        setDone(true);
        window.setTimeout(() => setDone(false), 6000);
      }}
    >
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="bName">
            نام و نام خانوادگی <span className="req">*</span>
          </label>
          <input type="text" id="bName" required placeholder="مثلا زهرا رحیمی" />
        </div>
        <div className="cf-field">
          <label htmlFor="bCompany">نام کسب‌وکار / سازمان</label>
          <input type="text" id="bCompany" placeholder="نام شرکت یا برند شما" />
        </div>
      </div>

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="bPhone">
            شماره تماس <span className="req">*</span>
          </label>
          <input type="tel" id="bPhone" required inputMode="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
        </div>
        <div className="cf-field">
          <label htmlFor="bType">
            نوع درخواست <span className="req">*</span>
          </label>
          <select id="bType" required defaultValue="">
            <option value="" disabled>
              یک گزینه را انتخاب کنید
            </option>
            {REQUEST_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="cf-field">
        <label htmlFor="bText">
          توضیحات درخواست <span className="req">*</span>
        </label>
        <textarea
          id="bText"
          required
          placeholder="تعداد تقریبی، مناسبت، بودجه و هر نکته‌ای که به ما کمک می‌کند…"
        />
      </div>

      <p className="cf-note">
        <i className="fa-solid fa-shield-heart" aria-hidden /> اطلاعات شما نزد ما محفوظ است و تنها برای
        هماهنگی استفاده می‌شود.
      </p>

      <button className="btn btn--primary" type="submit">
        <i className="fa-solid fa-paper-plane" aria-hidden /> ارسال درخواست
      </button>

      <div className={`cf-ok${done ? " show" : ""}`}>
        <i className="fa-solid fa-circle-check" aria-hidden /> درخواست شما ثبت شد! کارشناس فروش
        سازمانی به‌زودی با شما تماس می‌گیرد.
      </div>
    </form>
  );
}
