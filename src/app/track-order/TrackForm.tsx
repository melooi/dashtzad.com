"use client";

import { useState } from "react";
import { Field, Input, Button, Chip, Steps } from "@/components/ui";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Build a stable-looking demo order id from the user's input. */
function buildDemoId(value: string): string {
  const norm = value.replace(/[^۰-۹0-9]/g, "");
  const hasDigit = /[0-9۰-۹]/.test(value);
  if (hasDigit) {
    const tail = norm.slice(-6).padStart(6, "1");
    return "DZ-" + tail.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)] ?? d);
  }
  return "DZ-۱۰۴۵۹۲";
}

export function TrackForm() {
  const [orderId, setOrderId] = useState("DZ-۱۰۴۵۹۲");
  const [shown, setShown] = useState(false);

  return (
    <>
      <form
        className="track-order-lookup"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem("trackInput") as HTMLInputElement | null;
          const v = input?.value.trim() ?? "";
          if (!v) return;
          setOrderId(buildDemoId(v));
          setShown(true);
        }}
      >
        <Field label="شماره سفارش یا موبایل" htmlFor="trackInput" className="track-order-lookup__field">
          <Input
            id="trackInput"
            name="trackInput"
            type="text"
            placeholder="شماره سفارش یا شماره موبایل"
            aria-label="شماره سفارش یا موبایل"
          />
        </Field>
        <Button type="submit" variant="primary">
          <i className="fa-solid fa-magnifying-glass" aria-hidden /> پیگیری
        </Button>
      </form>

      {shown && (
        <div className="track-order-result">
          <div className="track-order-meta">
            <Chip tone="green" icon="fa-receipt">
              شماره سفارش: <b className="num">{orderId}</b>
            </Chip>
            <Chip tone="green" icon="fa-box">
              ۳ قلم کالا
            </Chip>
            <Chip tone="green" icon="fa-location-dot">
              تهران
            </Chip>
          </div>

          <Steps
            items={[
              {
                num: <i className="fa-solid fa-check" aria-hidden />,
                title: "سفارش ثبت و تأیید شد",
                desc: "۱۲ خرداد ۱۴۰۵ — ۱۰:۲۴",
                state: "done",
              },
              {
                num: <i className="fa-solid fa-check" aria-hidden />,
                title: "در حال بسته‌بندی",
                desc: "۱۲ خرداد ۱۴۰۵ — ۱۳:۱۰",
                state: "done",
              },
              {
                num: <i className="fa-solid fa-truck" aria-hidden />,
                title: "تحویل پست/پیک شد",
                desc: "کد رهگیری برای شما پیامک شد — در مسیر تحویل",
              },
              {
                num: <i className="fa-solid fa-house" aria-hidden />,
                title: "تحویل به شما",
                desc: "برآورد: ۱ تا ۲ روز کاری",
                state: "pending",
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
