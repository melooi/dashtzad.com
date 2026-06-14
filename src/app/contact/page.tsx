import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { Card, Hero, IconBox, Placeholder } from "@/components/ui";
import { ContactForm } from "./ContactForm";
import "./contact.css";

// Font Awesome is loaded site-wide in app/layout.tsx.

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباط با دشت‌زاد — تلفن، ایمیل، شبکه‌های اجتماعی و فرم تماس. برای پیگیری سفارش، مشاوره خرید، خرید عمده و همکاری در کنار شما هستیم.",
  alternates: { canonical: "/contact" },
};

const METHODS = [
  {
    href: "tel:02192002661",
    icon: "fa-phone",
    tone: "green" as const,
    label: "تلفن تماس",
    value: "۰۲۱-۹۲۰۰۲۶۶۱",
  },
  {
    href: "mailto:info@dashtzad.com",
    icon: "fa-envelope",
    tone: "clay" as const,
    label: "ایمیل",
    value: "info@dashtzad.com",
  },
  {
    href: "https://dashtzad.com",
    icon: "fa-globe",
    tone: "gold" as const,
    label: "وب‌سایت",
    value: "dashtzad.com",
    external: true,
  },
];

const SOCIALS = [
  { id: "telegram", label: "تلگرام", icon: "fa-brands fa-telegram", glyph: null },
  { id: "eitaa", label: "ایتا", icon: null, glyph: "ا" },
  { id: "bale", label: "بله", icon: null, glyph: "ب" },
  { id: "rubika", label: "روبیکا", icon: null, glyph: "ر" },
  { id: "instagram", label: "اینستاگرام", icon: "fa-brands fa-instagram", glyph: null },
];

export default function ContactPage() {
  return (
    <div className="contact-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "تماس با ما", path: "/contact" },
        ])}
      />

      <Hero
        kicker={
          <>
            <i className="fa-solid fa-headset" aria-hidden /> همیشه کنار شما
          </>
        }
        title="تماس با دشت‌زاد"
        sub="برای پیگیری سفارش، مشاوره خرید، خرید عمده یا همکاری با دشت‌زاد، از راه‌های زیر با ما در ارتباط باشید. تلاش می‌کنیم در کوتاه‌ترین زمان پاسخ‌گوی شما باشیم."
        chips={
          <>
            <a className="hero__chip" href="tel:02192002661">
              <i className="fa-solid fa-phone" aria-hidden /> ۰۲۱-۹۲۰۰۲۶۶۱
            </a>
            <a className="hero__chip" href="mailto:info@dashtzad.com">
              <i className="fa-solid fa-envelope" aria-hidden /> info@dashtzad.com
            </a>
            <Link className="hero__chip" href="/faq">
              <i className="fa-solid fa-circle-question" aria-hidden /> پرسش‌های متداول
            </Link>
          </>
        }
      />

      <div className="wrap">
        <div className="contact-layout">
          <ContactForm />

          <aside className="contact-aside">
            {/* contact methods */}
            <div className="contact-methods">
              {METHODS.map((m) => (
                <Card
                  as="article"
                  pad
                  hover
                  key={m.href}
                  className="contact-method"
                >
                  <a
                    className="contact-method__link"
                    href={m.href}
                    {...(m.external ? { rel: "nofollow" } : {})}
                  >
                    <IconBox icon={m.icon} tone={m.tone} />
                    <span className="contact-method__b">
                      <span className="muted contact-method__l">{m.label}</span>
                      <span className="num contact-method__v">{m.value}</span>
                    </span>
                  </a>
                </Card>
              ))}
            </div>

            {/* social networks */}
            <Card pad className="contact-social">
              <div className="contact-social__h">
                <i className="fa-solid fa-share-nodes" aria-hidden /> ما را در شبکه‌های اجتماعی دنبال
                کنید
              </div>
              <div className="contact-social__grid">
                {SOCIALS.map((s) => (
                  <a
                    className={`social-chip social-chip--${s.id}`}
                    href="#"
                    rel="nofollow"
                    key={s.id}
                  >
                    <span className="avatar avatar--sm social-chip__ic">
                      {s.icon ? <i className={s.icon} aria-hidden /> : s.glyph}
                    </span>
                    {s.label}
                  </a>
                ))}
              </div>
              <p className="muted contact-social__id">
                شناسه ما در همه شبکه‌ها: <b>@dashtzad</b>
              </p>
            </Card>

            {/* address + hours + map */}
            <Card pad className="contact-info-card">
              <div className="contact-info-card__h">
                <i className="fa-solid fa-location-dot" aria-hidden /> آدرس دشت‌زاد
              </div>
              <p className="muted">
                تهران، پیروزی، خیابان نبرد شمالی، کوچه خزایی، پلاک ۱، واحد ۶
              </p>
              <div className="contact-hours">
                <i className="fa-regular fa-clock" aria-hidden /> ساعت پاسخ‌گویی: شنبه تا پنج‌شنبه، ۹
                تا ۲۱
              </div>
              <Placeholder
                className="contact-map"
                label="نقشه موقعیت دشت‌زاد — این‌جا قرار می‌گیرد"
              />
            </Card>

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
