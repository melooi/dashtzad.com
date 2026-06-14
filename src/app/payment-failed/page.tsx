import type { Metadata } from "next";
import { ButtonLink, Card, Chip, IconBox, Placeholder, Price } from "@/components/ui";
import { HoldCartTimer } from "./HoldCartTimer";
import "./payment-failed.css";

// Font Awesome is loaded site-wide in app/layout.tsx.

export const metadata: Metadata = {
  title: "پرداخت ناموفق",
  description:
    "پرداخت شما تأیید نشد و سفارش ثبت نشده است. هیچ مبلغی از حساب شما کسر نشده و سبد خریدتان محفوظ مانده است؛ می‌توانید دوباره تلاش کنید یا با پشتیبانی دشت‌زاد تماس بگیرید.",
  alternates: { canonical: "/payment-failed" },
  robots: { index: false, follow: false },
};

const META_FACTS = [
  {
    icon: "fa-circle-exclamation",
    tone: "clay" as const,
    label: "وضعیت پرداخت",
    value: <>ناموفق · تأیید نشد</>,
  },
  {
    icon: "fa-wallet",
    tone: "gold" as const,
    label: "مبلغ قابل پرداخت",
    value: (
      <>
        <span className="num">۹۹۰٬۰۰۰</span> تومان · پرداخت اینترنتی
      </>
    ),
  },
  {
    icon: "fa-basket-shopping",
    tone: "green" as const,
    label: "سبد خرید شما",
    value: (
      <>
        <span className="pf-ok">محفوظ ماند</span> · <span className="num">۲ کالا</span>
      </>
    ),
  },
];

const REASONS = [
  {
    icon: "fa-coins",
    title: "موجودی کافی نبود",
    desc: "مانده حساب یا سقف مجاز خرید روزانه کارت کفاف مبلغ سفارش را نداده است.",
  },
  {
    icon: "fa-clock",
    title: "رمز پویا منقضی شد",
    desc: "رمز دوم یک‌بارمصرف (OTP) دیر وارد شد یا زمان آن به پایان رسید.",
  },
  {
    icon: "fa-wifi",
    title: "قطع ارتباط لحظه‌ای",
    desc: "اتصال اینترنت یا درگاه بانک در میانه پرداخت دچار وقفه شده است.",
  },
];

const CART_LINES = [
  {
    name: "برگه گلابی خشک ممتاز",
    spec: "۵۰۰ گرم · زیپ‌کیپ کرافت",
    qty: "۲ عدد",
    now: 744000,
    thumb: "برگه گلابی خشک",
  },
  {
    name: "برگه زردآلوی طلایی",
    spec: "۲۵۰ گرم · زیپ‌کیپ کرافت",
    qty: "۱ عدد",
    now: 246000,
    thumb: "برگه زردآلو",
  },
];

export default function PaymentFailedPage() {
  return (
    <div className="payment-failed-page dz">
      {/* ============== HERO ============== */}
      <section className="hero hero--clay pf-hero">
        <div className="wrap">
          <div className="hero__inner pf-hero__inner">
            <div className="pf-medal" aria-hidden>
              <span className="pf-medal__halo" />
              <svg className="pf-medal__svg" viewBox="0 0 130 130" aria-hidden="true">
                <defs>
                  <linearGradient id="pfClayGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f0a52e" />
                    <stop offset="1" stopColor="#c2410c" />
                  </linearGradient>
                </defs>
                <circle className="pf-ring-bg" cx="65" cy="65" r="60" />
                <circle className="pf-ring-clay" cx="65" cy="65" r="60" />
                <line className="pf-bang" x1="65" y1="42" x2="65" y2="72" />
                <circle className="pf-bang-dot" cx="65" cy="88" r="0.6" />
              </svg>
            </div>

            <span className="hero__kicker pf-hero__kicker">پرداخت ناتمام ماند</span>
            <h1 className="hero__title">
              پرداخت کامل نشد،
              <br />
              <em className="pf-hero__em">مریم عزیز</em>
            </h1>
            <p className="hero__sub">
              تراکنش شما از سوی بانک تأیید نشد و سفارش هنوز ثبت نشده است. نگران نباشید — کافی است یک بار
              دیگر تلاش کنید؛ همه‌چیز دقیقاً همان‌طور که بود آماده شماست.
            </p>

            <div className="pf-hero__chips">
              <Chip tone="green" icon="fa-shield-check" className="pf-safepill">
                هیچ مبلغی از حساب شما کسر نشده است
              </Chip>
            </div>
          </div>
        </div>
      </section>

      {/* ============== STAGE ============== */}
      <main className="wrap pf-stage">
        {/* quick facts */}
        <Card className="pf-metastrip">
          {META_FACTS.map((f) => (
            <div className="pf-metastrip__cell" key={f.label}>
              <IconBox icon={f.icon} tone={f.tone} />
              <div>
                <div className="pf-metastrip__k">{f.label}</div>
                <div className="pf-metastrip__v">{f.value}</div>
              </div>
            </div>
          ))}
        </Card>

        <div className="pf-cols">
          {/* چه اتفاقی افتاد */}
          <section>
            <div className="pf-seclabel">
              <span className="pf-seclabel__no num">۰۱</span>
              <h2 className="pf-seclabel__t">چه پیش آمد؟</h2>
              <span className="pf-seclabel__line" />
            </div>

            <Card pad className="pf-explain">
              <IconBox icon="fa-credit-card" tone="clay" size="lg" />
              <div>
                <div className="pf-explain__t">پرداخت توسط درگاه بانک تأیید نشد</div>
                <p className="pf-explain__d">
                  روند پرداخت پیش از تکمیل متوقف شد، بنابراین سفارش ثبت نشد و وجهی هم برداشت نشد. این
                  اتفاق معمولاً موقتی است و تلاش دوباره مشکل را حل می‌کند.
                </p>
                <div className="pf-explain__code">
                  <i className="fa-solid fa-hashtag" aria-hidden /> کد پیگیری تراکنش:{" "}
                  <b className="num">PSP-۴۰۲۱۷</b>
                </div>
              </div>
            </Card>

            <div className="pf-seclabel pf-seclabel--gap">
              <span className="pf-seclabel__no num">۰۲</span>
              <h2 className="pf-seclabel__t">چند علت رایج</h2>
              <span className="pf-seclabel__line" />
            </div>

            <div className="pf-reasons">
              {REASONS.map((r) => (
                <div className="pf-reason" key={r.title}>
                  <IconBox icon={r.icon} tone="ink" size="sm" className="pf-reason__ic" />
                  <div>
                    <div className="pf-reason__t">{r.title}</div>
                    <p className="pf-reason__d">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* سبد خرید محفوظ */}
          <section>
            <div className="pf-seclabel">
              <span className="pf-seclabel__no num">۰۳</span>
              <h2 className="pf-seclabel__t">سبد خرید شما</h2>
              <span className="pf-seclabel__line" />
            </div>

            <Card className="pf-savedcard">
              <div className="pf-savedcard__head">
                <i className="fa-solid fa-circle-check" aria-hidden />
                <span className="pf-savedcard__t">دست‌نخورده باقی ماند</span>
                <span className="pf-savedcard__sub num">۲ کالا</span>
              </div>
              <div className="pf-savedcard__body">
                <div className="pf-lines">
                  {CART_LINES.map((l) => (
                    <div className="pf-line" key={l.name}>
                      <Placeholder className="pf-line__thumb" label={l.thumb} />
                      <div className="pf-line__body">
                        <div className="pf-line__name">{l.name}</div>
                        <div className="pf-line__sub">{l.spec}</div>
                      </div>
                      <div className="pf-line__end">
                        <span className="pf-line__qty num">{l.qty}</span>
                        <Price now={l.now} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pf-savedtotal">
                  <span className="pf-savedtotal__k">جمع قابل پرداخت</span>
                  <Price now={990000} size="md" className="pf-savedtotal__v" />
                </div>

                <HoldCartTimer />
              </div>
            </Card>
          </section>
        </div>

        {/* actions */}
        <div className="pf-actions">
          <ButtonLink href="/cart" variant="clay" size="lg" className="pf-action">
            <i className="fa-solid fa-rotate-right" aria-hidden /> تلاش دوباره برای پرداخت
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" size="lg" className="pf-action">
            <i className="fa-solid fa-headset" aria-hidden /> تماس با پشتیبانی
          </ButtonLink>
        </div>

        <div className="pf-reassure">
          <span className="pf-reassure__item">
            <i className="fa-solid fa-shield-halved" aria-hidden /> پرداخت امن از طریق{" "}
            <b>درگاه بانکی</b>
          </span>
          <span className="pf-reassure__sep" />
          <span className="pf-reassure__item">
            <i className="fa-solid fa-basket-shopping" aria-hidden /> سبد خرید شما <b>ذخیره شد</b>
          </span>
          <span className="pf-reassure__sep" />
          <span className="pf-reassure__item">
            <i className="fa-solid fa-headset" aria-hidden /> پشتیبانی <b>۹ تا ۲۱</b> همه‌روزه
          </span>
        </div>
      </main>
    </div>
  );
}
