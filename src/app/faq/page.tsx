import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, type FaqItem } from "@/lib/seo/jsonld";
import { Hero, IconBox } from "@/components/ui";
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

const HERO_CHIPS = [
  { href: "#g-product", icon: "fa-wheat-awn", label: "محصولات و نگهداری" },
  { href: "#g-ship", icon: "fa-truck-fast", label: "ارسال و تحویل" },
  { href: "#g-return", icon: "fa-shield-heart", label: "ضمانت و بازگشت" },
  { href: "#g-pay", icon: "fa-credit-card", label: "پرداخت و خرید" },
  { href: "#g-account", icon: "fa-circle-user", label: "حساب کاربری" },
  { href: "#g-club", icon: "fa-medal", label: "باشگاه مشتریان" },
  { href: "#g-corporate", icon: "fa-gift", label: "هدایای سازمانی" },
];

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
      <Hero
        kicker={
          <>
            <i className="fa-solid fa-circle-question" aria-hidden /> مرکز پشتیبانی دشت‌زاد
          </>
        }
        title="پرسش‌های متداول"
        sub="هر چه باید درباره محصولات، اصالت و نگهداری، ارسال، پرداخت و بازگشت کالا بدانید — یک‌جا و شفاف. اگر پاسخ سؤالتان این‌جا نبود، تیم پشتیبانی همیشه در دسترس است."
        chips={HERO_CHIPS.map((c) => (
          <a key={c.href} className="hero__chip" href={c.href}>
            <i className={`fa-solid ${c.icon}`} aria-hidden /> {c.label}
          </a>
        ))}
      />

      {/* BODY — interactive accordion + side nav */}
      <main className="wrap">
        <FaqAccordion />
      </main>

      {/* CONTACT CTA */}
      <section className="sec wrap" id="contact">
        <div className="faq-page__cta">
          <div className="faq-page__cta-l">
            <span className="faq-page__cta-kicker">
              <i className="fa-solid fa-headset" aria-hidden /> هنوز جواب نگرفتید؟
            </span>
            <h2 className="faq-page__cta-title">تیم پشتیبانی دشت‌زاد کنار شماست</h2>
            <p className="faq-page__cta-sub">
              هر روز از ساعت ۹ تا ۲۱، از طریق راه‌های زیر پاسخگوی پرسش‌ها و سفارش‌های شما هستیم. هرچه
              باشد، تنهایتان نمی‌گذاریم.
            </p>
          </div>
          <div className="faq-page__cta-actions">
            <a className="faq-page__cta-row" href="tel:02192002661">
              <IconBox icon="fa-phone" tone="ink" round className="faq-page__cta-ic" />
              <span>
                <b>۰۲۱-۹۲۰۰۲۶۶۱</b>
                <span>تماس تلفنی با پشتیبانی</span>
              </span>
            </a>
            <Link className="faq-page__cta-row" href="/contact">
              <span className="icon-box icon-box--ink icon-box--round faq-page__cta-ic">
                <i className="fa-brands fa-telegram" aria-hidden />
              </span>
              <span>
                <b>گفت‌وگوی آنلاین در تلگرام</b>
                <span>@dashtzad</span>
              </span>
            </Link>
            <a className="faq-page__cta-row" href="mailto:info@dashtzad.com">
              <IconBox icon="fa-envelope" tone="ink" round className="faq-page__cta-ic" />
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
