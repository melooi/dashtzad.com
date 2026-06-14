import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, type FaqItem } from "@/lib/seo/jsonld";
import { FaqAccordion } from "./FaqAccordion";
import { FAQ_GROUPS } from "./faq-data";
import "./faq.css";

export const metadata: Metadata = {
  title: "پرسش‌های متداول",
  description:
    "پاسخ پرسش‌های پرتکرار درباره محصولات و اصالت، نگهداری، ارسال و تحویل، ضمانت و بازگشت کالا، پرداخت، حساب کاربری، باشگاه مشتریان و هدایای سازمانی دشت‌زاد — یک‌جا و شفاف.",
  alternates: { canonical: "/faq" },
};

// Build FAQ JSON-LD from the same data the accordion renders.
const FAQ_LD: FaqItem[] = FAQ_GROUPS.flatMap((g) =>
  g.items.map((it) => ({ question: it.q, answer: it.plain })),
);

export default function FaqPage() {
  return (
    <div className="faq-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "پرسش‌های متداول", path: "/faq" },
        ])}
      />
      <JsonLd data={faqSchema(FAQ_LD)} />

      {/* HERO */}
      <section className="faq-hero">
        <div className="wrap">
          <div className="faq-hero__inner">
            <span className="faq-hero__kicker">
              <i className="fa-solid fa-circle-question" aria-hidden /> مرکز پشتیبانی دشت‌زاد
            </span>
            <h1 className="faq-hero__title">پرسش‌های متداول</h1>
            <p className="faq-hero__sub">
              هر چه باید درباره محصولات، اصالت و نگهداری، ارسال، پرداخت و بازگشت کالا بدانید — یک‌جا و
              شفاف. اگر پاسخ سؤالتان این‌جا نبود، تیم پشتیبانی همیشه در دسترس است.
            </p>
            <div className="faq-hero__chips">
              <a className="faq-chip" href="#g-product">
                <i className="fa-solid fa-wheat-awn" aria-hidden /> محصولات و نگهداری
              </a>
              <a className="faq-chip" href="#g-ship">
                <i className="fa-solid fa-truck-fast" aria-hidden /> ارسال و تحویل
              </a>
              <a className="faq-chip" href="#g-return">
                <i className="fa-solid fa-shield-heart" aria-hidden /> ضمانت و بازگشت
              </a>
              <a className="faq-chip" href="#g-pay">
                <i className="fa-solid fa-credit-card" aria-hidden /> پرداخت و خرید
              </a>
              <a className="faq-chip" href="#g-account">
                <i className="fa-solid fa-circle-user" aria-hidden /> حساب کاربری
              </a>
              <a className="faq-chip" href="#g-club">
                <i className="fa-solid fa-medal" aria-hidden /> باشگاه مشتریان
              </a>
              <a className="faq-chip" href="#g-corporate">
                <i className="fa-solid fa-gift" aria-hidden /> هدایای سازمانی
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BODY — interactive accordion + side nav */}
      <main className="wrap">
        <FaqAccordion />
      </main>

      {/* CONTACT CTA */}
      <section className="sec wrap" id="contact">
        <div className="faq-contact">
          <div className="faq-contact__l">
            <span className="faq-contact__kicker">
              <i className="fa-solid fa-headset" aria-hidden /> هنوز جواب نگرفتید؟
            </span>
            <h2 className="faq-contact__title">تیم پشتیبانی دشت‌زاد کنار شماست</h2>
            <p className="faq-contact__sub">
              هر روز از ساعت ۹ تا ۲۱، از طریق راه‌های زیر پاسخگوی پرسش‌ها و سفارش‌های شما هستیم. هرچه
              باشد، تنهایتان نمی‌گذاریم.
            </p>
          </div>
          <div className="faq-contact__actions">
            <a className="faq-contact__row" href="tel:02192002661">
              <i className="fa-solid fa-phone" aria-hidden />
              <span>
                <b>۰۲۱-۹۲۰۰۲۶۶۱</b>
                <span>تماس تلفنی با پشتیبانی</span>
              </span>
            </a>
            <Link className="faq-contact__row" href="/contact">
              <i className="fa-brands fa-telegram" aria-hidden />
              <span>
                <b>گفت‌وگوی آنلاین در تلگرام</b>
                <span>@dashtzad</span>
              </span>
            </Link>
            <a className="faq-contact__row" href="mailto:info@dashtzad.com">
              <i className="fa-solid fa-envelope" aria-hidden />
              <span>
                <b>info@dashtzad.com</b>
                <span>پاسخ ایمیلی حداکثر تا ۲۴ ساعت</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
