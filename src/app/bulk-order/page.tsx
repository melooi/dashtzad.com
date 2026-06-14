import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { Card, IconBox } from "@/components/ui";
import { BulkForm } from "./BulkForm";
import "./bulk-order.css";

export const metadata: Metadata = {
  title: "خرید عمده و همکاری",
  description:
    "خرید عمده برنج، حبوبات، خشکبار و سایر محصولات دشت‌زاد با قیمت ویژه، فاکتور رسمی و هدایای سازمانی نوروز و یلدا. درخواست خرید سازمانی و همکاری خود را ثبت کنید تا کارشناس فروش با شما هماهنگ شود.",
  alternates: { canonical: "/bulk-order" },
};

const BENEFITS = [
  {
    icon: "fa-tags",
    title: "قیمت ویژه عمده",
    text: "تخفیف پلکانی متناسب با حجم سفارش.",
  },
  {
    icon: "fa-file-invoice",
    title: "فاکتور رسمی",
    text: "صدور فاکتور رسمی با اطلاعات حقوقی و ارزش افزوده.",
  },
  {
    icon: "fa-gift",
    title: "هدایای سازمانی",
    text: "پک‌های مناسبتی نوروز و یلدا با بسته‌بندی شیک.",
  },
  {
    icon: "fa-stamp",
    title: "بسته‌بندی اختصاصی",
    text: "درج لوگو، کارت و پیام اختصاصی برند شما.",
  },
  {
    icon: "fa-truck-ramp-box",
    title: "ارسال و توزیع هماهنگ",
    text: "تحویل یک‌جا یا توزیع خانه‌به‌خانه به گیرندگان.",
  },
  {
    icon: "fa-headset",
    title: "مشاوره رایگان",
    text: "کارشناس اختصاصی برای چیدمان بهترین سبد.",
  },
];

const CONTACT_METHODS = [
  {
    icon: "fa-phone",
    label: "تلفن فروش سازمانی",
    value: "۰۲۱-۹۲۰۰۲۶۶۱",
    href: "tel:02192002661",
  },
  {
    icon: "fa-envelope",
    label: "ایمیل",
    value: "info@dashtzad.com",
    href: "mailto:info@dashtzad.com",
  },
];

export default function BulkOrderPage() {
  return (
    <div className="bulk-order-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "خرید عمده و همکاری", path: "/bulk-order" },
        ])}
      />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__inner">
            <span className="hero__kicker">
              <i className="fa-solid fa-handshake" aria-hidden /> همراه کسب‌وکار شما
            </span>
            <h1 className="hero__title">خرید عمده و همکاری</h1>
            <p className="hero__sub">
              برای خرید عمده برنج، حبوبات، خشکبار و سایر محصولات دشت‌زاد، یا تهیه هدایای سازمانی برای
              کارکنان و مشتریان‌تان، درخواست خود را ثبت کنید تا کارشناس فروش سازمانی با شما هماهنگ شود.
            </p>
            <div className="hero__chips">
              <a className="hero__chip" href="tel:02192002661">
                <i className="fa-solid fa-phone" aria-hidden /> ۰۲۱-۹۲۰۰۲۶۶۱
              </a>
              <a className="hero__chip" href="#bulkForm">
                <i className="fa-solid fa-paper-plane" aria-hidden /> ثبت درخواست
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="bulk-body wrap">
        {/* benefits / value proposition */}
        <Card pad>
          <div className="card__head bulk-cardhead">
            <IconBox icon="fa-box-open" tone="green" size="lg" />
            <div>
              <h2 className="card__title bulk-cardhead__t">چرا خرید سازمانی از دشت‌زاد؟</h2>
              <p className="card__text">از تامین عمده تا هدایای مناسبتی، کنار شما هستیم</p>
            </div>
          </div>
          <div className="grid--2 bulk-benefits">
            {BENEFITS.map((b) => (
              <Card pad key={b.title} className="bulk-benefit">
                <IconBox icon={b.icon} tone="green" size="md" />
                <div>
                  <b className="bulk-benefit__t">{b.title}</b>
                  <span className="bulk-benefit__d">{b.text}</span>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* request form */}
        <section id="bulkForm">
          <Card pad>
            <div className="card__head bulk-cardhead">
              <IconBox icon="fa-paper-plane" tone="clay" size="lg" />
              <div>
                <h2 className="card__title bulk-cardhead__t">ثبت درخواست خرید عمده / همکاری</h2>
                <p className="card__text">
                  فرم زیر را پر کنید؛ در کوتاه‌ترین زمان با شما تماس می‌گیریم
                </p>
              </div>
            </div>

            <BulkForm />
          </Card>
        </section>

        {/* direct contact */}
        <Card pad>
          <div className="card__head bulk-cardhead">
            <IconBox icon="fa-phone-volume" tone="gold" size="lg" />
            <div>
              <h2 className="card__title bulk-cardhead__t">تماس مستقیم با فروش سازمانی</h2>
              <p className="card__text">اگر عجله دارید، همین حالا تماس بگیرید</p>
            </div>
          </div>
          <div className="bulk-methods">
            {CONTACT_METHODS.map((m) => (
              <a className="link-card" href={m.href} key={m.href}>
                <span className="link-card__ic">
                  <i className={`fa-solid ${m.icon}`} aria-hidden />
                </span>
                <span className="link-card__b">
                  <span className="link-card__d">{m.label}</span>
                  <span className="link-card__t num">{m.value}</span>
                </span>
                <i className="fa-solid fa-angle-left link-card__arrow" aria-hidden />
              </a>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
