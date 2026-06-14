import type { Metadata } from "next";
import {
  ButtonLink,
  Card,
  Chip,
  Hero,
  IconBox,
  Placeholder,
  Price,
  Steps,
  type StepItem,
} from "@/components/ui";
import { OrderNumberCopy } from "./OrderNumberCopy";
import "./payment-success.css";

// Font Awesome is loaded site-wide in app/layout.tsx.

export const metadata: Metadata = {
  title: "پرداخت موفق",
  description:
    "صفحه تأیید پرداخت دشت‌زاد — پرداخت شما با موفقیت ثبت شد. خلاصه سفارش، مبلغ پرداخت‌شده و مسیر ارسال را این‌جا مشاهده کنید. (مقادیر نمونه)",
  alternates: { canonical: "/payment-success" },
};

// Static demo data (no backend).
const TRACK: StepItem[] = [
  {
    num: <i className="fa-solid fa-check" aria-hidden />,
    title: "سفارش ثبت شد",
    desc: (
      <>
        امروز · <span className="num">۱۰:۲۴</span>
      </>
    ),
    state: "done",
  },
  {
    num: <i className="fa-solid fa-box-open" aria-hidden />,
    title: "در حال آماده‌سازی",
    desc: (
      <>
        <b>هم‌اکنون</b> · بسته‌بندی در انبار دماوند
      </>
    ),
  },
  {
    num: <i className="fa-solid fa-truck" aria-hidden />,
    title: "تحویل به پیک",
    desc: "۱ تیر",
    state: "pending",
  },
  {
    num: <i className="fa-solid fa-house" aria-hidden />,
    title: "تحویل به شما",
    desc: "۲ تیر",
    state: "pending",
  },
];

export default function PaymentSuccessPage() {
  return (
    <div className="payment-success-page dz">
      {/* ============== HERO ============== */}
      <Hero
        kicker={
          <>
            <i className="fa-solid fa-circle-check" aria-hidden /> پرداخت با موفقیت تأیید شد
          </>
        }
        title={
          <>
            سپاس از خرید شما،
            <br />
            <em>مریم عزیز</em>
          </>
        }
        sub="سفارشتان ثبت و پرداخت تأیید شد. همین حالا برگه‌های گلابیِ دماوند را برایتان بسته‌بندی می‌کنیم؛ هر مرحله از مسیر را با پیامک به شما خبر می‌دهیم."
      >
        <span className="ps-seal" aria-hidden>
          <i className="fa-solid fa-check" />
        </span>
        <OrderNumberCopy orderNumber="DZ-۱۴۰۵۰۳۲۹" />
      </Hero>

      {/* ============== STAGE ============== */}
      <main className="ps-stage">
        <div className="wrap">
          {/* floating quick-facts */}
          <Card className="ps-metastrip">
            <div className="ps-meta-cell">
              <IconBox icon="fa-truck-fast" tone="gold" />
              <div>
                <div className="ps-meta-k">زمان تقریبی ارسال</div>
                <div className="ps-meta-v">۲۴ تا ۴۸ ساعت آینده</div>
              </div>
            </div>
            <div className="ps-meta-cell">
              <IconBox icon="fa-wallet" tone="green" />
              <div>
                <div className="ps-meta-k">مبلغ پرداخت‌شده</div>
                <div className="ps-meta-v">
                  <span className="num">۹۹۰٬۰۰۰</span> تومان · پرداخت اینترنتی
                </div>
              </div>
            </div>
            <div className="ps-meta-cell">
              <IconBox icon="fa-location-dot" tone="green" />
              <div>
                <div className="ps-meta-k">مقصد</div>
                <div className="ps-meta-v">تهران، سعادت‌آباد</div>
              </div>
            </div>
          </Card>

          <div className="ps-cols">
            {/* خلاصه خرید */}
            <section>
              <div className="ps-seclabel">
                <span className="ps-seclabel__no num">۰۱</span>
                <h2 className="ps-seclabel__t">خلاصه خرید</h2>
                <span className="ps-seclabel__line" />
                <span className="ps-seclabel__aside num">۲ کالا</span>
              </div>

              <div>
                <div className="ps-line">
                  <Placeholder className="ps-line__thumb" label="برگه گلابی خشک" />
                  <div className="ps-line__body">
                    <div className="ps-line__name">برگه گلابی خشک ممتاز</div>
                    <div className="ps-line__meta">
                      <Chip icon="fa-weight-hanging">۵۰۰ گرم</Chip>
                      <Chip icon="fa-box">زیپ‌کیپ کرافت</Chip>
                    </div>
                  </div>
                  <div className="ps-line__end">
                    <span className="ps-line__qty num">۲ عدد</span>
                    <Price now={744000} old={920000} />
                  </div>
                </div>

                <div className="ps-line">
                  <Placeholder className="ps-line__thumb" label="برگه زردآلو" />
                  <div className="ps-line__body">
                    <div className="ps-line__name">برگه زردآلوی طلایی</div>
                    <div className="ps-line__meta">
                      <Chip icon="fa-weight-hanging">۲۵۰ گرم</Chip>
                      <Chip icon="fa-box">زیپ‌کیپ کرافت</Chip>
                    </div>
                  </div>
                  <div className="ps-line__end">
                    <span className="ps-line__qty num">۱ عدد</span>
                    <Price now={246000} />
                  </div>
                </div>
              </div>

              <div className="ps-ledger">
                <div className="ps-ledger__row">
                  <span className="k">مجموع قیمت کالاها</span>
                  <span className="v num">۱٬۱۶۶٬۰۰۰ تومان</span>
                </div>
                <div className="ps-ledger__row ps-ledger__row--save">
                  <span className="k">سود شما از این خرید</span>
                  <span className="v num">−۱۷۶٬۰۰۰ تومان</span>
                </div>
                <div className="ps-ledger__row">
                  <span className="k">هزینه ارسال</span>
                  <Chip tone="green" icon="fa-truck-fast">
                    رایگان
                  </Chip>
                </div>
                <div className="ps-ledger__grand">
                  <span className="k">مبلغ پرداخت‌شده</span>
                  <span className="v num">۹۹۰٬۰۰۰ تومان</span>
                </div>
              </div>
              <p className="ps-paidnote faint">
                <i className="fa-solid fa-circle-check" aria-hidden /> کارت ****۶۲۷۱ · کد پیگیری
                تراکنش <span className="num">۸۲۴۵۱۹۰۳</span>
              </p>
            </section>

            {/* مسیر سفارش */}
            <section>
              <div className="ps-seclabel">
                <span className="ps-seclabel__no num">۰۲</span>
                <h2 className="ps-seclabel__t">مسیر سفارش</h2>
                <span className="ps-seclabel__line" />
              </div>

              <div className="ps-eta">تحویل تا دوشنبه ۲ تیر</div>
              <p className="ps-eta__small">
                ارسال با پیک اختصاصی دشت‌زاد در تهران — <b>۲۴ تا ۴۸ ساعت</b> پس از آماده‌سازی.
              </p>

              <Steps items={TRACK} />

              <div className="ps-addr">
                <div className="ps-addr__row">
                  <IconBox icon="fa-user" tone="green" size="sm" />
                  <div>
                    <div className="ps-addr__k">گیرنده</div>
                    <div className="ps-addr__v num">مریم احمدی · ۰۹۱۲ ۳۴۵ ۶۷۸۹</div>
                  </div>
                </div>
                <div className="ps-addr__row">
                  <IconBox icon="fa-map-location-dot" tone="green" size="sm" />
                  <div>
                    <div className="ps-addr__k">نشانی تحویل</div>
                    <div className="ps-addr__v">
                      تهران، سعادت‌آباد، خیابان علامه طباطبایی شمالی، کوچه ۱۸ شرقی، پلاک ۱۲، واحد ۴ —{" "}
                      <span className="num">کد پستی ۱۹۹۷۸۵۴۳۲۱</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* actions */}
          <div className="ps-actions">
            <ButtonLink href="/account" variant="primary" size="lg">
              <i className="fa-solid fa-location-crosshairs" aria-hidden /> مشاهده سفارش‌ها
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost" size="lg">
              <i className="fa-solid fa-arrow-right-long" aria-hidden /> بازگشت به فروشگاه
            </ButtonLink>
          </div>

          <div className="ps-reassure">
            <span>
              <i className="fa-solid fa-shield-halved" aria-hidden /> ضمانت اصالت و{" "}
              <b>بازگشت ۷ روزه</b>
            </span>
            <span>
              <i className="fa-solid fa-receipt" aria-hidden /> فاکتور به ایمیل شما ارسال شد
            </span>
            <span>
              <i className="fa-solid fa-headset" aria-hidden /> پشتیبانی <b>۹ تا ۲۱</b> همه‌روزه
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
