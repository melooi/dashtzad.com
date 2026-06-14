"use client";

import { useEffect, useRef, useState } from "react";

/* فروش ویژه: شمارش معکوس فلیپ‌کلاک.
   برای ماندن قطعی روی سرور، ساعت فقط داخل useEffect خوانده می‌شود؛
   تا قبل از mount، ارقام ثابت «۰۰» نمایش داده می‌شوند. */

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const SALE_DURATION = 2 * 24 * 60 * 60 * 1000; // دو روز

function toFa(n: number): string {
  return String(n)
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? FA_DIGITS[Number(c)] : c))
    .join("");
}

function pad(n: number): string {
  return toFa(n < 10 ? Number("0" + n) : n).padStart(2, "۰");
}

interface FlipUnit {
  key: string;
  label: string;
}

const UNITS: FlipUnit[] = [
  { key: "d", label: "روز" },
  { key: "h", label: "ساعت" },
  { key: "m", label: "دقیقه" },
  { key: "s", label: "ثانیه" },
];

function Flip({ value, label }: { value: string; label: string }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // reduced motion: update without the flip animation (deferred, not synchronous)
      const t0 = window.setTimeout(() => {
        prev.current = value;
        setDisplay(value);
      }, 0);
      return () => window.clearTimeout(t0);
    }
    const raf = window.requestAnimationFrame(() => setFlipping(true));
    const t = window.setTimeout(() => {
      prev.current = value;
      setDisplay(value);
      setFlipping(false);
    }, 600);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [value]);

  return (
    <div className="flip">
      <div className={`flip__card${flipping ? " is-flipping" : ""}`}>
        <div className="flip__half flip__top">
          <span>{value}</span>
        </div>
        <div className="flip__half flip__bot">
          <span>{display}</span>
        </div>
        <div className="flip__leaf flip__leaf--top">
          <span>{display}</span>
        </div>
        <div className="flip__leaf flip__leaf--bot">
          <span>{value}</span>
        </div>
      </div>
      <span className="flip__label">{label}</span>
    </div>
  );
}

export function SaleCountdown() {
  // ارقام ثابت پیش از mount — قطعی روی سرور.
  const [parts, setParts] = useState<Record<string, string>>({
    d: "۰۰",
    h: "۰۰",
    m: "۰۰",
    s: "۰۰",
  });
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const KEY = "dz_sale_end";
    let end = Number.parseInt(window.localStorage.getItem(KEY) || "0", 10);
    if (!end || end < Date.now()) {
      end = Date.now() + SALE_DURATION;
      window.localStorage.setItem(KEY, String(end));
    }

    function tick() {
      const ms = end - Date.now();
      if (ms <= 0) {
        setParts({ d: "۰۰", h: "۰۰", m: "۰۰", s: "۰۰" });
        setEnded(true);
        return false;
      }
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setParts({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
      return true;
    }

    if (!tick()) return;
    const id = window.setInterval(() => {
      if (!tick()) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <div
        className={`countdown${ended ? " ended" : ""}`}
        role="timer"
        aria-label="زمان باقی‌مانده تا پایان فروش ویژه"
      >
        {UNITS.map((u) => (
          <Flip key={u.key} value={parts[u.key] ?? "۰۰"} label={u.label} />
        ))}
      </div>
      <span className="sale-hero__note">
        {ended ? (
          <>
            <i className="fa-solid fa-circle-info" aria-hidden /> این دوره فروش ویژه به پایان رسید —
            به‌زودی با پیشنهادهای تازه بازمی‌گردیم
          </>
        ) : (
          <>
            <i className="fa-solid fa-clock" aria-hidden /> فرصت محدود است — تخفیف‌ها با پایان زمان
            حذف می‌شوند
          </>
        )}
      </span>
    </>
  );
}
