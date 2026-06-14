"use client";

import { useEffect, useState } from "react";
import { IconBox } from "@/components/ui";

const DUR_MS = 15 * 60 * 1000; // 15 دقیقه

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toFa(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)] ?? d);
}
function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function HoldCartTimer() {
  // تا زمانی که کلاینت سوار نشده، مقدار اولیه ثابت ۱۵:۰۰ نمایش داده می‌شود.
  const [msLeft, setMsLeft] = useState<number>(DUR_MS);

  useEffect(() => {
    const deadline = Date.now() + DUR_MS;
    const update = () => setMsLeft(Math.max(0, deadline - Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const expired = msLeft <= 0;
  const minutes = Math.floor(msLeft / 60000);
  const seconds = Math.floor((msLeft % 60000) / 1000);
  const clock = `${toFa(pad(minutes))}:${toFa(pad(seconds))}`;

  return (
    <div className={`pf-holdcart${expired ? " is-expired" : ""}`}>
      <IconBox icon="fa-clock" tone="clay" className="pf-holdcart__ic" />
      <div className="pf-holdcart__b">
        {expired ? (
          <>
            <div className="pf-holdcart__t">
              زمان نگه‌داری سبد به پایان رسید — برای ادامه دوباره تلاش کنید
            </div>
            <div className="pf-holdcart__s">
              ممکن است برخی قیمت‌ها و موجودی‌ها به‌روزرسانی شده باشند.
            </div>
          </>
        ) : (
          <>
            <div className="pf-holdcart__t">
              سبد خرید و قیمت‌ها تا{" "}
              <b className="num">
                {toFa(minutes)} دقیقه و {toFa(seconds)} ثانیه
              </b>{" "}
              دیگر برای شما محفوظ است
            </div>
            <div className="pf-holdcart__s">
              پیش از پایان زمان، پرداخت را کامل کنید تا تخفیف‌ها از دست نرود.
            </div>
          </>
        )}
      </div>
      <span className="pf-holdcart__clock num">{clock}</span>
    </div>
  );
}
