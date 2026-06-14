import type { Metadata } from "next";
import Link from "next/link";
import { HoldCartTimer } from "./HoldCartTimer";
import "./payment-failed.css";

export const metadata: Metadata = {
  title: "پرداخت ناموفق",
  description:
    "پرداخت شما تأیید نشد و سفارش ثبت نشده است. هیچ مبلغی از حساب شما کسر نشده و سبد خریدتان محفوظ مانده است؛ می‌توانید دوباره تلاش کنید یا با پشتیبانی دشت‌زاد تماس بگیرید.",
  alternates: { canonical: "/payment-failed" },
  robots: { index: false, follow: false },
};

export default function PaymentFailedPage() {
  return (
    <div className="payment-failed-page dz">
      {/* ============== HERO ============== */}
      <header className="pf-hero">
        <div className="wrap">
          <div className="pf-hero__top">
            <Link className="pf-brand" href="/">
              <span className="pf-brand__seal">د</span>
              <span>
                <span className="pf-brand__name">دشت‌زاد</span>
                <span className="pf-brand__tag">روایت یک نسل از ۱۳۰۵</span>
              </span>
            </Link>
            <a className="pf-hero__support" href="tel:02191002400">
              <i className="fa-solid fa-headset" aria-hidden /> پشتیبانی سفارش‌ها —{" "}
              <span className="num">۰۲۱ ۹۱۰۰۲۴۰۰</span>
            </a>
          </div>

          <div className="pf-hero__body">
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

            <div className="pf-eyebrow">پرداخت ناتمام ماند</div>
            <h1 className="pf-hero__title">
              پرداخت کامل نشد،
              <br />
              <em>مریم عزیز</em>
            </h1>
            <p className="pf-hero__sub">
              تراکنش شما از سوی بانک تأیید نشد و سفارش هنوز ثبت نشده است. نگران نباشید — کافی است یک بار
              دیگر تلاش کنید؛ همه‌چیز دقیقاً همان‌طور که بود آماده شماست.
            </p>

            <div className="pf-safepill">
              <i className="fa-solid fa-shield-check" aria-hidden /> هیچ مبلغی از حساب شما کسر نشده است
            </div>
          </div>
        </div>

        <svg
          className="pf-hero__wave"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,80 L0,40 C240,72 480,80 720,72 C960,64 1200,32 1440,44 L1440,80 Z"
          />
        </svg>
      </header>

      {/* ============== STAGE ============== */}
      <main className="pf-stage">
        <div className="wrap">
          {/* quick facts */}
          <div className="pf-metastrip">
            <div className="pf-metastrip__cell">
              <div className="pf-metastrip__ic">
                <i className="fa-solid fa-circle-exclamation" aria-hidden />
              </div>
              <div>
                <div className="pf-metastrip__k">وضعیت پرداخت</div>
                <div className="pf-metastrip__v">ناموفق · تأیید نشد</div>
              </div>
            </div>
            <div className="pf-metastrip__cell">
              <div className="pf-metastrip__ic pf-metastrip__ic--gold">
                <i className="fa-solid fa-wallet" aria-hidden />
              </div>
              <div>
                <div className="pf-metastrip__k">مبلغ قابل پرداخت</div>
                <div className="pf-metastrip__v">
                  <span className="num">۹۹۰٬۰۰۰</span> تومان · پرداخت اینترنتی
                </div>
              </div>
            </div>
            <div className="pf-metastrip__cell">
              <div className="pf-metastrip__ic pf-metastrip__ic--green">
                <i className="fa-solid fa-basket-shopping" aria-hidden />
              </div>
              <div>
                <div className="pf-metastrip__k">سبد خرید شما</div>
                <div className="pf-metastrip__v">
                  <span className="pf-ok">محفوظ ماند</span> · <span className="num">۲ کالا</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pf-cols">
            {/* چه اتفاقی افتاد */}
            <section>
              <div className="pf-seclabel">
                <span className="pf-seclabel__no num">۰۱</span>
                <h2 className="pf-seclabel__t">چه پیش آمد؟</h2>
                <span className="pf-seclabel__line" />
              </div>

              <div className="pf-explain">
                <div className="pf-explain__ic">
                  <i className="fa-solid fa-credit-card" aria-hidden />
                </div>
                <div>
                  <div className="pf-explain__t">پرداخت توسط درگاه بانک تأیید نشد</div>
                  <div className="pf-explain__d">
                    روند پرداخت پیش از تکمیل متوقف شد، بنابراین سفارش ثبت نشد و وجهی هم برداشت نشد. این
                    اتفاق معمولاً موقتی است و تلاش دوباره مشکل را حل می‌کند.
                  </div>
                  <div className="pf-explain__code">
                    <i className="fa-solid fa-hashtag" aria-hidden /> کد پیگیری تراکنش:{" "}
                    <b className="num">PSP-۴۰۲۱۷</b>
                  </div>
                </div>
              </div>

              <div className="pf-seclabel pf-seclabel--gap">
                <span className="pf-seclabel__no num">۰۲</span>
                <h2 className="pf-seclabel__t">چند علت رایج</h2>
                <span className="pf-seclabel__line" />
              </div>

              <div className="pf-reasons">
                <div className="pf-reason">
                  <div className="pf-reason__ic">
                    <i className="fa-solid fa-coins" aria-hidden />
                  </div>
                  <div>
                    <div className="pf-reason__t">موجودی کافی نبود</div>
                    <div className="pf-reason__d">
                      مانده حساب یا سقف مجاز خرید روزانه کارت کفاف مبلغ سفارش را نداده است.
                    </div>
                  </div>
                </div>
                <div className="pf-reason">
                  <div className="pf-reason__ic">
                    <i className="fa-solid fa-clock" aria-hidden />
                  </div>
                  <div>
                    <div className="pf-reason__t">رمز پویا منقضی شد</div>
                    <div className="pf-reason__d">
                      رمز دوم یک‌بارمصرف (OTP) دیر وارد شد یا زمان آن به پایان رسید.
                    </div>
                  </div>
                </div>
                <div className="pf-reason">
                  <div className="pf-reason__ic">
                    <i className="fa-solid fa-wifi" aria-hidden />
                  </div>
                  <div>
                    <div className="pf-reason__t">قطع ارتباط لحظه‌ای</div>
                    <div className="pf-reason__d">
                      اتصال اینترنت یا درگاه بانک در میانه پرداخت دچار وقفه شده است.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* سبد خرید محفوظ */}
            <section>
              <div className="pf-seclabel">
                <span className="pf-seclabel__no num">۰۳</span>
                <h2 className="pf-seclabel__t">سبد خرید شما</h2>
                <span className="pf-seclabel__line" />
              </div>

              <div className="pf-savedcard">
                <div className="pf-savedcard__head">
                  <i className="fa-solid fa-circle-check" aria-hidden />
                  <span className="pf-savedcard__t">دست‌نخورده باقی ماند</span>
                  <span className="pf-savedcard__sub num">۲ کالا</span>
                </div>
                <div className="pf-savedcard__body">
                  <div className="pf-lines">
                    <div className="pf-line">
                      <div className="pf-line__thumb">
                        <div className="ph">
                          <span className="ph__label">برگه گلابی خشک</span>
                        </div>
                      </div>
                      <div className="pf-line__body">
                        <div className="pf-line__name">برگه گلابی خشک ممتاز</div>
                        <div className="pf-line__sub">۵۰۰ گرم · زیپ‌کیپ کرافت</div>
                      </div>
                      <div className="pf-line__end">
                        <span className="pf-line__qty num">۲ عدد</span>
                        <span className="pf-price num">۷۴۴٬۰۰۰ تومان</span>
                      </div>
                    </div>
                    <div className="pf-line">
                      <div className="pf-line__thumb">
                        <div className="ph">
                          <span className="ph__label">برگه زردآلو</span>
                        </div>
                      </div>
                      <div className="pf-line__body">
                        <div className="pf-line__name">برگه زردآلوی طلایی</div>
                        <div className="pf-line__sub">۲۵۰ گرم · زیپ‌کیپ کرافت</div>
                      </div>
                      <div className="pf-line__end">
                        <span className="pf-line__qty num">۱ عدد</span>
                        <span className="pf-price num">۲۴۶٬۰۰۰ تومان</span>
                      </div>
                    </div>
                  </div>

                  <div className="pf-savedtotal">
                    <span className="pf-savedtotal__k">جمع قابل پرداخت</span>
                    <span className="pf-savedtotal__v num">۹۹۰٬۰۰۰ تومان</span>
                  </div>

                  <HoldCartTimer />
                </div>
              </div>
            </section>
          </div>

          {/* actions */}
          <div className="pf-actions">
            <Link className="pf-btn pf-btn--primary" href="/cart">
              <i className="fa-solid fa-rotate-right" aria-hidden /> تلاش دوباره برای پرداخت
            </Link>
            <Link className="pf-btn pf-btn--ghost" href="/contact">
              <i className="fa-solid fa-headset" aria-hidden /> تماس با پشتیبانی
            </Link>
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
        </div>
      </main>
    </div>
  );
}
