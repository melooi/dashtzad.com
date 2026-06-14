import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
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
      <section className="faq-hero">
        <div className="wrap">
          <div className="faq-hero__inner">
            <span className="faq-hero__kicker">
              <i className="fa-solid fa-handshake" aria-hidden /> همراه کسب‌وکار شما
            </span>
            <h1 className="faq-hero__title">خرید عمده و همکاری</h1>
            <p className="faq-hero__sub">
              برای خرید عمده برنج، حبوبات، خشکبار و سایر محصولات دشت‌زاد، یا تهیه هدایای سازمانی برای
              کارکنان و مشتریان‌تان، درخواست خود را ثبت کنید تا کارشناس فروش سازمانی با شما هماهنگ شود.
            </p>
            <div className="faq-hero__chips">
              <a className="faq-chip" href="tel:02192002661">
                <i className="fa-solid fa-phone" aria-hidden /> ۰۲۱-۹۲۰۰۲۶۶۱
              </a>
              <a className="faq-chip" href="#bulkForm">
                <i className="fa-solid fa-paper-plane" aria-hidden /> ثبت درخواست
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="support-wrap wrap">
        {/* benefits / value proposition */}
        <div className="support-card">
          <div className="support-card__h">
            <span className="support-card__ic">
              <i className="fa-solid fa-box-open" aria-hidden />
            </span>
            <div>
              <h2 className="support-card__t">چرا خرید سازمانی از دشت‌زاد؟</h2>
              <p className="support-card__n">از تامین عمده تا هدایای مناسبتی، کنار شما هستیم</p>
            </div>
          </div>
          <div className="bulk-benefits">
            {BENEFITS.map((b) => (
              <div className="bulk-benefit" key={b.title}>
                <i className={`fa-solid ${b.icon}`} aria-hidden />
                <div>
                  <b>{b.title}</b>
                  <span>{b.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* request form */}
        <div className="support-card" id="bulkForm">
          <div className="support-card__h">
            <span className="support-card__ic support-card__ic--clay">
              <i className="fa-solid fa-paper-plane" aria-hidden />
            </span>
            <div>
              <h2 className="support-card__t">ثبت درخواست خرید عمده / همکاری</h2>
              <p className="support-card__n">
                فرم زیر را پر کنید؛ در کوتاه‌ترین زمان با شما تماس می‌گیریم
              </p>
            </div>
          </div>

          <BulkForm />
        </div>

        {/* direct contact */}
        <div className="support-card">
          <div className="support-card__h">
            <span className="support-card__ic support-card__ic--gold">
              <i className="fa-solid fa-phone-volume" aria-hidden />
            </span>
            <div>
              <h2 className="support-card__t">تماس مستقیم با فروش سازمانی</h2>
              <p className="support-card__n">اگر عجله دارید، همین حالا تماس بگیرید</p>
            </div>
          </div>
          <div className="contact-methods">
            <a className="contact-method" href="tel:02192002661">
              <span className="contact-method__ic">
                <i className="fa-solid fa-phone" aria-hidden />
              </span>
              <span>
                <span className="contact-method__l">تلفن فروش سازمانی</span>
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
          </div>
        </div>
      </main>
    </div>
  );
}
