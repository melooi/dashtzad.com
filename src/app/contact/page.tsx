import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { ContactForm } from "./ContactForm";
import "./contact.css";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباط با دشت‌زاد — تلفن، ایمیل، شبکه‌های اجتماعی و فرم تماس. برای پیگیری سفارش، مشاوره خرید، خرید عمده و همکاری در کنار شما هستیم.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="contact-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "تماس با ما", path: "/contact" },
        ])}
      />

      {/* HERO */}
      <section className="faq-hero">
        <div className="wrap">
          <div className="faq-hero__inner">
            <span className="faq-hero__kicker">
              <i className="fa-solid fa-headset" aria-hidden /> همیشه کنار شما
            </span>
            <h1 className="faq-hero__title">تماس با دشت‌زاد</h1>
            <p className="faq-hero__sub">
              برای پیگیری سفارش، مشاوره خرید، خرید عمده یا همکاری با دشت‌زاد، از راه‌های زیر با ما در
              ارتباط باشید. تلاش می‌کنیم در کوتاه‌ترین زمان پاسخ‌گوی شما باشیم.
            </p>
            <div className="faq-hero__chips">
              <a className="faq-chip" href="tel:02192002661">
                <i className="fa-solid fa-phone" aria-hidden /> ۰۲۱-۹۲۰۰۲۶۶۱
              </a>
              <a className="faq-chip" href="mailto:info@dashtzad.com">
                <i className="fa-solid fa-envelope" aria-hidden /> info@dashtzad.com
              </a>
              <Link className="faq-chip" href="/faq">
                <i className="fa-solid fa-circle-question" aria-hidden /> پرسش‌های متداول
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="wrap">
        <div className="contact-layout">
          <ContactForm />

          <aside className="contact-aside">
            <div className="contact-methods">
              <a className="contact-method" href="tel:02192002661">
                <span className="contact-method__ic">
                  <i className="fa-solid fa-phone" aria-hidden />
                </span>
                <span>
                  <span className="contact-method__l">تلفن تماس</span>
                  <span className="contact-method__v">۰۲۱-۹۲۰۰۲۶۶۱</span>
                </span>
              </a>
              <a className="contact-method" href="mailto:info@dashtzad.com">
                <span className="contact-method__ic">
                  <i className="fa-solid fa-envelope" aria-hidden />
                </span>
                <span>
                  <span className="contact-method__l">ایمیل</span>
                  <span className="contact-method__v">info@dashtzad.com</span>
                </span>
              </a>
              <a className="contact-method" href="https://dashtzad.com" rel="nofollow">
                <span className="contact-method__ic">
                  <i className="fa-solid fa-globe" aria-hidden />
                </span>
                <span>
                  <span className="contact-method__l">وب‌سایت</span>
                  <span className="contact-method__v">dashtzad.com</span>
                </span>
              </a>
            </div>

            <div className="contact-social">
              <div className="contact-social__h">
                <i className="fa-solid fa-share-nodes" aria-hidden /> ما را در شبکه‌های اجتماعی دنبال
                کنید
              </div>
              <div className="contact-social__grid">
                <a className="social-chip" href="#" rel="nofollow">
                  <span className="social-chip__ic">
                    <i className="fa-brands fa-telegram" aria-hidden />
                  </span>{" "}
                  تلگرام
                </a>
                <a className="social-chip" href="#" rel="nofollow">
                  <span className="social-chip__ic">ا</span> ایتا
                </a>
                <a className="social-chip" href="#" rel="nofollow">
                  <span className="social-chip__ic">ب</span> بله
                </a>
                <a className="social-chip" href="#" rel="nofollow">
                  <span className="social-chip__ic">ر</span> روبیکا
                </a>
                <a className="social-chip" href="#" rel="nofollow">
                  <span className="social-chip__ic">
                    <i className="fa-brands fa-instagram" aria-hidden />
                  </span>{" "}
                  اینستاگرام
                </a>
              </div>
              <p className="contact-social__id">
                شناسه ما در همه شبکه‌ها: <b>@dashtzad</b>
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-card__h">
                <i className="fa-solid fa-location-dot" aria-hidden /> آدرس دشت‌زاد
              </div>
              <p>تهران، پیروزی، خیابان نبرد شمالی، کوچه خزایی، پلاک ۱، واحد ۶</p>
              <div className="contact-hours">
                <i className="fa-regular fa-clock" aria-hidden /> ساعت پاسخ‌گویی: شنبه تا پنج‌شنبه، ۹
                تا ۲۱
              </div>
              <div className="contact-map">
                <div className="ph">
                  <span className="ph__label">نقشه موقعیت دشت‌زاد — این‌جا قرار می‌گیرد</span>
                </div>
              </div>
            </div>

            <Link className="link-card" href="/track-order">
              <span className="link-card__ic">
                <i className="fa-solid fa-truck-fast" aria-hidden />
              </span>
              <span className="link-card__b">
                <span className="link-card__t">پیگیری سریع سفارش</span>
                <span className="link-card__d">
                  وضعیت سفارش خود را با شماره سفارش یا موبایل دنبال کنید.
                </span>
              </span>
              <i className="fa-solid fa-angle-left link-card__arrow" aria-hidden />
            </Link>

            <Link className="link-card link-card--clay" href="/bulk-order">
              <span className="link-card__ic">
                <i className="fa-solid fa-handshake" aria-hidden />
              </span>
              <span className="link-card__b">
                <span className="link-card__t">خرید عمده و همکاری</span>
                <span className="link-card__d">
                  قیمت ویژه، فاکتور رسمی و هدایای سازمانی برای کسب‌وکارها.
                </span>
              </span>
              <i className="fa-solid fa-angle-left link-card__arrow" aria-hidden />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
