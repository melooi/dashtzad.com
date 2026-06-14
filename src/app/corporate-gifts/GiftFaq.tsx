"use client";

import { useState } from "react";

const ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: "حداقل تعداد سفارش چقدر است؟",
    a: (
      <p>
        حداقل سفارش برای پک‌های سازمانی از <strong>۲۵ عدد</strong> آغاز می‌شود. هرچه تعداد بیشتر باشد،
        قیمت هر پک به‌صورت پلکانی کاهش می‌یابد. برای تعداد کمتر هم می‌توانید از فروشگاه آنلاین دشت‌زاد
        خرید کنید.
      </p>
    ),
  },
  {
    q: "سفارشی‌سازی و درج لوگو چقدر زمان می‌برد؟",
    a: (
      <p>
        پس از تأیید طرح، آماده‌سازی سفارش‌های سفارشی‌سازی‌شده معمولاً <strong>۵ تا ۱۰ روز کاری</strong>{" "}
        طول می‌کشد. در ایام پرتقاضا مانند نوروز و یلدا توصیه می‌کنیم سفارش را زودتر ثبت کنید.
      </p>
    ),
  },
  {
    q: "آیا فاکتور رسمی صادر می‌کنید؟",
    a: (
      <p>
        بله. برای همه سفارش‌های سازمانی، <strong>فاکتور رسمی</strong> با اطلاعات حقوقی و احتساب مالیات
        بر ارزش‌افزوده صادر می‌شود تا فرایند مالی شما بدون دغدغه باشد.
      </p>
    ),
  },
  {
    q: "امکان توزیع خانه‌به‌خانه به گیرندگان وجود دارد؟",
    a: (
      <p>
        بله. می‌توانید فهرست نام و آدرس گیرندگان را در اختیار ما بگذارید تا هر پک را مستقیماً به دست
        گیرنده در <strong>سراسر کشور</strong> برسانیم؛ یا کل سفارش را یک‌جا به سازمان شما تحویل دهیم.
      </p>
    ),
  },
  {
    q: "قبل از سفارش انبوه می‌توانم نمونه ببینم؟",
    a: (
      <p>
        بله. پیش از تولید انبوه، یک <strong>نمونه نهایی</strong> از پک و طرح لوگو برای تأیید شما آماده
        می‌شود تا با خیال راحت سفارش را قطعی کنید.
      </p>
    ),
  },
];

export function GiftFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="cg-faq">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
            <button
              className="faq-q"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="faq-q__txt">{item.q}</span>
              <span className="faq-q__ic">
                <i className="fa-solid fa-plus" aria-hidden />
              </span>
            </button>
            <div className="faq-a">
              <div className="faq-a__inner">
                <div className="faq-a__body">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
