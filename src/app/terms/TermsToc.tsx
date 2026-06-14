"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface TocItem {
  id: string;
  label: string;
  icon: string;
}

const ITEMS: TocItem[] = [
  { id: "t-general", label: "کلیات و تعاریف", icon: "fa-book-open" },
  { id: "t-account", label: "حساب کاربری و ثبت‌نام", icon: "fa-circle-user" },
  { id: "t-buy", label: "شرایط خرید و سفارش", icon: "fa-bag-shopping" },
  { id: "t-pay", label: "تسویه حساب", icon: "fa-credit-card" },
  { id: "t-ship", label: "حمل، تحویل و دریافت", icon: "fa-truck-fast" },
  { id: "t-return", label: "مرجوعی و استرداد", icon: "fa-rotate-left" },
  { id: "t-address", label: "مسئولیت ثبت آدرس", icon: "fa-location-dot" },
  { id: "t-coupon", label: "کد تخفیف", icon: "fa-ticket" },
  { id: "t-ip", label: "مالکیت معنوی", icon: "fa-copyright" },
  { id: "t-privacy", label: "حریم خصوصی", icon: "fa-user-shield" },
  { id: "t-comments", label: "قوانین ارسال نظر", icon: "fa-comments" },
  { id: "t-force", label: "قوه قهریه", icon: "fa-cloud-bolt" },
  { id: "t-change", label: "تغییر قوانین و اختلاف", icon: "fa-gavel" },
];

function headerHeight(): number {
  if (typeof document === "undefined") return 90;
  const hdr = document.querySelector(".hdr") as HTMLElement | null;
  return hdr ? hdr.offsetHeight : 90;
}

export function TermsToc() {
  const [active, setActive] = useState<string>(ITEMS[0]?.id ?? "");
  const tickingRef = useRef(false);

  useEffect(() => {
    const sections = ITEMS.map((it) => document.getElementById(it.id));

    function paint() {
      const trigger = headerHeight() + 60;
      let current = ITEMS[0]?.id ?? "";
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top < trigger) current = ITEMS[i]?.id ?? current;
      });
      setActive(current);
      tickingRef.current = false;
    }

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(paint);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    paint();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function jump(id: string) {
    const target = document.getElementById(id);
    if (!target) return false;
    const y = target.getBoundingClientRect().top + window.scrollY - headerHeight() - 16;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
    return true;
  }

  return (
    <aside className="faq-nav">
      <div className="faq-nav__h">
        <i className="fa-solid fa-list-ol" aria-hidden /> فهرست مقررات
      </div>
      {ITEMS.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={active === it.id ? "is-active" : undefined}
          onClick={(e) => {
            if (jump(it.id)) e.preventDefault();
          }}
        >
          <span className="faq-nav__ic">
            <i className={`fa-solid ${it.icon}`} aria-hidden />
          </span>{" "}
          {it.label}
        </a>
      ))}
      <div className="faq-nav__sep" />
      <Link className="faq-nav__contact" href="/faq">
        <i className="fa-solid fa-circle-question" aria-hidden />
        <span>
          <b>پرسشی دارید؟</b>
          <span>به پرسش‌های متداول بروید</span>
        </span>
      </Link>
    </aside>
  );
}
