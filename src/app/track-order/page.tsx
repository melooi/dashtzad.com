import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { Card, IconBox, Hero, Steps, Note } from "@/components/ui";
import { TrackForm } from "./TrackForm";
import "./track-order.css";

export const metadata: Metadata = {
  title: "پیگیری سفارش",
  description:
    "وضعیت لحظه‌ای سفارش دشت‌زاد را با شماره سفارش یا شماره موبایلِ ثبت‌شده دنبال کنید — از ثبت و بسته‌بندی تا ارسال و تحویل درِ خانه.",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <div className="track-order-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "پیگیری سفارش", path: "/track-order" },
        ])}
      />

      {/* HERO */}
      <Hero
        kicker={
          <>
            <i className="fa-solid fa-truck-fast" aria-hidden /> از انبار تا درِ خانه شما
          </>
        }
        title="پیگیری سفارش"
        sub="شماره سفارش یا شماره موبایلِ ثبت‌شده را وارد کنید تا وضعیت لحظه‌ایِ سفارش‌تان را ببینید. برای دیدن تاریخچه کامل، وارد حساب کاربری شوید."
      />

      {/* BODY */}
      <main className="wrap track-order-body">
        <Card pad>
          <div className="track-order-card-head">
            <IconBox icon="fa-magnifying-glass-location" tone="green" size="lg" />
            <div>
              <h2 className="track-order-card-head__t">وضعیت سفارش را ببینید</h2>
              <p className="track-order-card-head__n">
                شماره سفارش (مثلاً DZ-104592) یا شماره موبایل خود را وارد کنید
              </p>
            </div>
          </div>

          <TrackForm />
        </Card>

        <Card pad>
          <div className="track-order-card-head">
            <IconBox icon="fa-circle-question" tone="clay" size="lg" />
            <div>
              <h2 className="track-order-card-head__t">چطور سفارشم را پیگیری کنم؟</h2>
              <p className="track-order-card-head__n">دو راه ساده برای دنبال‌کردن مرسوله</p>
            </div>
          </div>

          <Steps
            items={[
              {
                num: "۱",
                title:
                  "وارد حساب کاربری شوید و به بخش سفارش‌های من بروید تا وضعیت مرحله‌به‌مرحله را ببینید.",
              },
              {
                num: "۲",
                title:
                  "کد رهگیریِ پیامک‌شده را در سامانه شرکت پست/پیک وارد کنید تا موقعیت دقیق مرسوله را دنبال کنید.",
              },
            ]}
          />

          <Note tone="green" icon="fa-bell" className="track-order-help-note">
            در هر مرحله — تأیید، بسته‌بندی، ارسال و تحویل — یک پیامک به‌روزرسانی دریافت می‌کنید. اگر
            پیگیری به نتیجه نرسید، با <Link href="/contact">پشتیبانی</Link> تماس بگیرید.
          </Note>
        </Card>

        {/* HELP / CONTACT CTA */}
        <div className="track-order-cta">
          <Link className="link-card" href="/contact">
            <span className="link-card__ic">
              <i className="fa-solid fa-headset" aria-hidden />
            </span>
            <span className="link-card__b">
              <span className="link-card__t">پیگیری به نتیجه نرسید؟</span>
              <span className="link-card__d">
                با پشتیبانی دشت‌زاد تماس بگیرید تا وضعیت سفارش شما را دستی بررسی کنیم.
              </span>
            </span>
            <i className="fa-solid fa-angle-left link-card__arrow" aria-hidden />
          </Link>

          <Link className="link-card link-card--clay" href="/faq">
            <span className="link-card__ic">
              <i className="fa-solid fa-circle-question" aria-hidden />
            </span>
            <span className="link-card__b">
              <span className="link-card__t">پرسش‌های متداول</span>
              <span className="link-card__d">
                پاسخ سؤال‌های رایج درباره ارسال، زمان تحویل و مرجوعی کالا.
              </span>
            </span>
            <i className="fa-solid fa-angle-left link-card__arrow" aria-hidden />
          </Link>
        </div>
      </main>
    </div>
  );
}
