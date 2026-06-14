import type { Metadata } from "next";
import Link from "next/link";
import { OrderNumberCopy } from "./OrderNumberCopy";
import "./payment-success.css";

export const metadata: Metadata = {
  title: "پرداخت موفق",
  description:
    "صفحه تأیید پرداخت دشت‌زاد — پرداخت شما با موفقیت ثبت شد. خلاصه سفارش، مبلغ پرداخت‌شده و مسیر ارسال را این‌جا مشاهده کنید. (مقادیر نمونه)",
  alternates: { canonical: "/payment-success" },
};

export default function PaymentSuccessPage() {
  return (
    <div className="payment-success-page dz">
      {/* ============== HERO ============== */}
      <header className="hero">
        <div className="wrap">
          <div className="hero__body">
            <div className="medal">
              <span className="medal__halo" />
              <svg className="medal__svg" viewBox="0 0 130 130" aria-hidden="true">
                <defs>
                  <linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f0c252" />
                    <stop offset="1" stopColor="#a9781f" />
                  </linearGradient>
                </defs>
                <circle className="ring-bg" cx="65" cy="65" r="60" />
                <circle className="ring-gold" cx="65" cy="65" r="60" />
                <path className="tick" d="M45 66 L59 80 L86 49" />
              </svg>
              <i className="fa-solid fa-star medal__pip" aria-hidden />
              <i className="fa-solid fa-star medal__pip" aria-hidden />
              <i className="fa-solid fa-star medal__pip" aria-hidden />
            </div>

            <div className="eyebrow hero__eyebrow rise" data-d="1">
              پرداخت با موفقیت تأیید شد
            </div>
            <h1 className="hero__title rise" data-d="2">
              سپاس از خرید شما،
              <br />
              <em>مریم عزیز</em>
            </h1>
            <p className="hero__sub rise" data-d="3">
              سفارشتان ثبت و پرداخت تأیید شد. همین حالا برگه‌های گلابیِ دماوند را برایتان بسته‌بندی
              می‌کنیم؛ هر مرحله از مسیر را با پیامک به شما خبر می‌دهیم.
            </p>

            <OrderNumberCopy orderNumber="DZ-۱۴۰۵۰۳۲۹" />
          </div>
        </div>

        <svg
          className="hero__wave"
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
      <main className="stage">
        <div className="wrap">
          {/* floating quick-facts */}
          <div className="metastrip">
            <div className="metastrip__cell">
              <div className="metastrip__ic metastrip__ic--gold">
                <i className="fa-solid fa-truck-fast" aria-hidden />
              </div>
              <div>
                <div className="metastrip__k">زمان تقریبی ارسال</div>
                <div className="metastrip__v">۲۴ تا ۴۸ ساعت آینده</div>
              </div>
            </div>
            <div className="metastrip__cell">
              <div className="metastrip__ic">
                <i className="fa-solid fa-wallet" aria-hidden />
              </div>
              <div>
                <div className="metastrip__k">مبلغ پرداخت‌شده</div>
                <div className="metastrip__v">
                  <span className="num">۹۹۰٬۰۰۰</span> تومان · پرداخت اینترنتی
                </div>
              </div>
            </div>
            <div className="metastrip__cell">
              <div className="metastrip__ic">
                <i className="fa-solid fa-location-dot" aria-hidden />
              </div>
              <div>
                <div className="metastrip__k">مقصد</div>
                <div className="metastrip__v">تهران، سعادت‌آباد</div>
              </div>
            </div>
          </div>

          <div className="cols">
            {/* خلاصه خرید */}
            <section>
              <div className="seclabel">
                <span className="seclabel__no num">۰۱</span>
                <h2 className="seclabel__t">خلاصه خرید</h2>
                <span className="seclabel__line" />
                <span className="seclabel__aside num">۲ کالا</span>
              </div>

              <div className="lines">
                <div className="line">
                  <div className="line__thumb">
                    <div className="ph">
                      <span className="ph__label">برگه گلابی خشک</span>
                    </div>
                  </div>
                  <div className="line__body">
                    <div className="line__name">برگه گلابی خشک ممتاز</div>
                    <div className="line__meta">
                      <span className="chip">
                        <i className="fa-solid fa-weight-hanging" aria-hidden /> ۵۰۰ گرم
                      </span>
                      <span className="chip">
                        <i className="fa-solid fa-box" aria-hidden /> زیپ‌کیپ کرافت
                      </span>
                    </div>
                  </div>
                  <div className="line__end">
                    <span className="line__qty num">۲ عدد</span>
                    <span className="price num">
                      ۷۴۴٬۰۰۰ <span className="price__unit">تومان</span>
                    </span>
                    <span className="price--strike num">۹۲۰٬۰۰۰</span>
                  </div>
                </div>

                <div className="line">
                  <div className="line__thumb">
                    <div className="ph">
                      <span className="ph__label">برگه زردآلو</span>
                    </div>
                  </div>
                  <div className="line__body">
                    <div className="line__name">برگه زردآلوی طلایی</div>
                    <div className="line__meta">
                      <span className="chip">
                        <i className="fa-solid fa-weight-hanging" aria-hidden /> ۲۵۰ گرم
                      </span>
                      <span className="chip">
                        <i className="fa-solid fa-box" aria-hidden /> زیپ‌کیپ کرافت
                      </span>
                    </div>
                  </div>
                  <div className="line__end">
                    <span className="line__qty num">۱ عدد</span>
                    <span className="price num">
                      ۲۴۶٬۰۰۰ <span className="price__unit">تومان</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="ledger">
                <div className="ledger__row">
                  <span className="k">مجموع قیمت کالاها</span>
                  <span className="v num">
                    ۱٬۱۶۶٬۰۰۰ <span className="price__unit">تومان</span>
                  </span>
                </div>
                <div className="ledger__row ledger__row--save">
                  <span className="k">سود شما از این خرید</span>
                  <span className="v num">
                    −۱۷۶٬۰۰۰ <span className="price__unit">تومان</span>
                  </span>
                </div>
                <div className="ledger__row">
                  <span className="k">هزینه ارسال</span>
                  <span className="ledger__free">
                    <i className="fa-solid fa-truck-fast" aria-hidden /> رایگان
                  </span>
                </div>
                <div className="ledger__grand">
                  <span className="k">مبلغ پرداخت‌شده</span>
                  <span className="v num">
                    ۹۹۰٬۰۰۰ <span className="price__unit">تومان</span>
                  </span>
                </div>
              </div>
              <div className="paidnote">
                <i className="fa-solid fa-circle-check" aria-hidden /> کارت ****۶۲۷۱ · کد پیگیری
                تراکنش <span className="num paidnote__code">۸۲۴۵۱۹۰۳</span>
              </div>
            </section>

            {/* اطلاعات ارسال */}
            <section>
              <div className="seclabel">
                <span className="seclabel__no num">۰۲</span>
                <h2 className="seclabel__t">مسیر سفارش</h2>
                <span className="seclabel__line" />
              </div>

              <div className="eta">
                <div className="eta__big">تحویل تا دوشنبه ۲ تیر</div>
              </div>
              <div className="eta eta--note">
                <div className="eta__small">
                  ارسال با پیک اختصاصی دشت‌زاد در تهران — <b>۲۴ تا ۴۸ ساعت</b> پس از آماده‌سازی.
                </div>
              </div>

              <div className="track">
                <span className="track__fill" />
                <div className="tnode" data-done="true">
                  <span className="tnode__dot">
                    <i className="fa-solid fa-check" aria-hidden />
                  </span>
                  <div className="tnode__t">سفارش ثبت شد</div>
                  <div className="tnode__d">
                    امروز · <span className="num">۱۰:۲۴</span>
                  </div>
                </div>
                <div className="tnode" data-current="true">
                  <span className="tnode__dot">
                    <i className="fa-solid fa-box-open" aria-hidden />
                  </span>
                  <div className="tnode__t">در حال آماده‌سازی</div>
                  <div className="tnode__d">
                    <b>هم‌اکنون</b> · بسته‌بندی در انبار دماوند
                  </div>
                </div>
                <div className="tnode" data-upcoming="true">
                  <span className="tnode__dot">
                    <i className="fa-solid fa-truck" aria-hidden />
                  </span>
                  <div className="tnode__t">تحویل به پیک</div>
                  <div className="tnode__d">۱ تیر</div>
                </div>
                <div className="tnode" data-upcoming="true">
                  <span className="tnode__dot">
                    <i className="fa-solid fa-house" aria-hidden />
                  </span>
                  <div className="tnode__t">تحویل به شما</div>
                  <div className="tnode__d">۲ تیر</div>
                </div>
              </div>

              <div className="addr">
                <div className="addr__row">
                  <div className="addr__ic">
                    <i className="fa-solid fa-user" aria-hidden />
                  </div>
                  <div>
                    <div className="addr__k">گیرنده</div>
                    <div className="addr__v num">مریم احمدی · ۰۹۱۲ ۳۴۵ ۶۷۸۹</div>
                  </div>
                </div>
                <div className="addr__row">
                  <div className="addr__ic">
                    <i className="fa-solid fa-map-location-dot" aria-hidden />
                  </div>
                  <div>
                    <div className="addr__k">نشانی تحویل</div>
                    <div className="addr__v">
                      تهران، سعادت‌آباد، خیابان علامه طباطبایی شمالی، کوچه ۱۸ شرقی، پلاک ۱۲، واحد ۴ —{" "}
                      <span className="num">کد پستی ۱۹۹۷۸۵۴۳۲۱</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* actions */}
          <div className="actions">
            <Link className="btn btn--primary" href="/account">
              <i className="fa-solid fa-location-crosshairs" aria-hidden /> مشاهده سفارش‌ها
            </Link>
            <Link className="btn btn--ghost" href="/products">
              <i className="fa-solid fa-arrow-right-long" aria-hidden /> بازگشت به فروشگاه
            </Link>
          </div>

          <div className="reassure">
            <span className="reassure__item">
              <i className="fa-solid fa-shield-halved" aria-hidden /> ضمانت اصالت و{" "}
              <b>بازگشت ۷ روزه</b>
            </span>
            <span className="reassure__sep" />
            <span className="reassure__item">
              <i className="fa-solid fa-receipt" aria-hidden /> فاکتور به ایمیل شما ارسال شد
            </span>
            <span className="reassure__sep" />
            <span className="reassure__item">
              <i className="fa-solid fa-headset" aria-hidden /> پشتیبانی <b>۹ تا ۲۱</b> همه‌روزه
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
