"use client";

import { useState } from "react";

const OCCASIONS = [
  "نوروز",
  "شب یلدا",
  "قدردانی از کارکنان",
  "تقدیر از مشتریان",
  "سالگرد تأسیس",
  "سایر مناسبت‌ها",
];

const PACKS = ["پک دلگرمی", "پک مهرورزی", "پک سپاس", "سبد سفارشی"];

export function GiftForm() {
  const [done, setDone] = useState(false);

  return (
    <div className="cg-form-card">
      <h3 className="cg-form-card__h">ثبت درخواست هدیه سازمانی</h3>
      <p className="cg-form-card__n">هرچه دقیق‌تر بنویسید، پیشنهاد ما دقیق‌تر خواهد بود.</p>
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
            <label htmlFor="cgName">
              نام و نام خانوادگی <span className="req">*</span>
            </label>
            <input type="text" id="cgName" required placeholder="مثلاً زهرا رحیمی" />
          </div>
          <div className="cf-field">
            <label htmlFor="cgCompany">
              نام سازمان / برند <span className="req">*</span>
            </label>
            <input type="text" id="cgCompany" required placeholder="نام شرکت یا برند شما" />
          </div>
        </div>
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="cgPhone">
              شماره تماس <span className="req">*</span>
            </label>
            <input type="tel" id="cgPhone" required inputMode="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
          </div>
          <div className="cf-field">
            <label htmlFor="cgOcc">
              مناسبت <span className="req">*</span>
            </label>
            <select id="cgOcc" required defaultValue="">
              <option value="" disabled>
                یک گزینه را انتخاب کنید
              </option>
              {OCCASIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="cgPack">پک مورد نظر</label>
            <select id="cgPack" defaultValue="">
              <option value="" disabled>
                انتخاب کنید (اختیاری)
              </option>
              {PACKS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="cf-field">
            <label htmlFor="cgQty">
              تعداد تقریبی <span className="req">*</span>
            </label>
            <input type="text" id="cgQty" required inputMode="numeric" placeholder="مثلاً ۱۵۰ پک" />
          </div>
        </div>
        <div className="cf-field">
          <label htmlFor="cgText">توضیحات</label>
          <textarea
            id="cgText"
            placeholder="بودجه تقریبی هر پک، نیاز به درج لوگو، نوع توزیع و هر نکته دیگری که کمک می‌کند…"
          />
        </div>
        <p className="cf-note">
          <i className="fa-solid fa-shield-heart" aria-hidden /> اطلاعات شما نزد ما محفوظ است و تنها
          برای هماهنگی استفاده می‌شود.
        </p>
        <button className="btn btn--primary" type="submit">
          <i className="fa-solid fa-paper-plane" aria-hidden /> ارسال درخواست و دریافت پیش‌فاکتور
        </button>
        <div className={`cf-ok${done ? " show" : ""}`}>
          <i className="fa-solid fa-circle-check" aria-hidden /> درخواست شما ثبت شد! کارشناس فروش
          سازمانی به‌زودی با شما تماس می‌گیرد.
        </div>
      </form>
    </div>
  );
}
