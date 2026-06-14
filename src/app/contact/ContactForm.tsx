"use client";

import { useState } from "react";

const TYPES = [
  "پیگیری سفارش",
  "مشاوره خرید",
  "خرید عمده",
  "همکاری با دشت‌زاد",
  "انتقاد و پیشنهاد",
  "مشکل پرداخت",
  "سایر موارد",
];

export function ContactForm() {
  const [done, setDone] = useState(false);

  return (
    <section className="contact-form-card">
      <h2 className="contact-form-card__h">فرم تماس با ما</h2>
      <p className="contact-form-card__sub">
        برای ارسال پیام، فرم زیر را کامل کنید. اگر موضوع پیام شما مربوط به سفارش است، شماره سفارش یا
        شماره موبایل ثبت‌شده را هم در متن وارد کنید تا سریع‌تر بررسی شود.
      </p>

      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          setDone(true);
          window.setTimeout(() => setDone(false), 8000);
        }}
      >
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="cfName">
              نام و نام خانوادگی <span className="req">*</span>
            </label>
            <input type="text" id="cfName" required placeholder="مثلاً زهرا رحیمی" />
          </div>
          <div className="cf-field">
            <label htmlFor="cfPhone">
              شماره موبایل <span className="req">*</span>
            </label>
            <input type="tel" id="cfPhone" required inputMode="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
          </div>
        </div>
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="cfSubject">
              موضوع پیام <span className="req">*</span>
            </label>
            <input type="text" id="cfSubject" required placeholder="موضوع پیام خود را بنویسید" />
          </div>
          <div className="cf-field">
            <label htmlFor="cfType">
              نوع درخواست <span className="req">*</span>
            </label>
            <select id="cfType" required defaultValue="">
              <option value="" disabled>
                یک گزینه را انتخاب کنید
              </option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="cf-field">
          <label htmlFor="cfText">
            متن پیام <span className="req">*</span>
          </label>
          <textarea id="cfText" required placeholder="پیام خود را این‌جا بنویسید…" />
        </div>
        <p className="cf-note">
          <i className="fa-solid fa-shield-heart" aria-hidden /> اطلاعات شما نزد ما محفوظ است و تنها
          برای پاسخ‌گویی استفاده می‌شود.
        </p>
        <button className="btn btn--primary" type="submit">
          <i className="fa-solid fa-paper-plane" aria-hidden /> ارسال پیام
        </button>
        <div className={`cf-ok${done ? " show" : ""}`}>
          <i className="fa-solid fa-circle-check" aria-hidden /> پیام شما ثبت شد! کارشناسان ما به‌زودی
          با شما تماس می‌گیرند.
        </div>
      </form>
    </section>
  );
}
