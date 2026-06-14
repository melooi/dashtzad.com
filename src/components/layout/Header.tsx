"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/store/cart";
import { toFaDigits } from "@/lib/utils";

interface Cat {
  n: string;
  i: string;
  s: string[];
}

// Megamenu categories (ported from the design's shop-header.js).
const CATS: Cat[] = [
  { n: "آجیل و مغزها", i: "fa-bowl-food", s: ["پسته", "بادام", "گردو", "فندق", "بادام‌زمینی", "تخمه"] },
  { n: "خشکبار", i: "fa-seedling", s: ["انجیر خشک", "توت خشک", "کشمش", "خرما", "آلو خشک", "نخودچی"] },
  { n: "میوه خشک", i: "fa-apple-whole", s: ["برگه گلابی", "برگه زردآلو", "برگه هلو", "چیپس میوه", "موز خشک"] },
  { n: "قهوه", i: "fa-mug-saucer", s: ["دانه قهوه", "قهوه آسیاب‌شده", "اسپرسو", "کپسول قهوه"] },
  { n: "چای و دمنوش", i: "fa-mug-hot", s: ["چای سیاه", "چای سبز", "دمنوش گیاهی", "چای ترش"] },
  { n: "کره، ارده و روغن", i: "fa-bottle-droplet", s: ["کره بادام‌زمینی", "ارده", "روغن زیتون", "عسل طبیعی"] },
  { n: "مزه و تنقلات", i: "fa-cookie-bite", s: ["چیپس میوه", "کرانچ", "تنقلات سالم"] },
  { n: "شیرینی و شکلات", i: "fa-cookie", s: ["شکلات تلخ", "گز", "سوهان", "باقلوا"] },
  { n: "مهمانی و پذیرایی", i: "fa-champagne-glasses", s: ["بسته پذیرایی", "سینی آجیل", "جعبه مناسبتی"] },
  { n: "آشپزی و شیرینی‌پزی", i: "fa-mortar-pestle", s: ["زعفران", "گلاب", "پودر پسته", "ادویه"] },
  { n: "هدایا و سوغاتی", i: "fa-gift", s: ["هدایا", "سوغاتی", "هدایای اقتصادی", "هدایای لوکس"] },
  { n: "لوازم کاربردی", i: "fa-screwdriver-wrench", s: ["ظرف نگهدارنده", "سینی سرو", "آسیاب دستی"] },
  { n: "کارت هدیه", i: "fa-credit-card", s: ["کارت هدیه ۵۰۰ هزار", "کارت هدیه ۱ میلیون", "کارت هدیه دلخواه"] },
  { n: "بسته‌های آماده", i: "fa-box-open", s: ["بسته صبحانه", "بسته آجیل شب", "بسته سالم"] },
];

const NAV = [
  { href: "/special-sale", label: "فروش ویژه", icon: "fa-bolt", key: "sale" },
  { href: "/blog", label: "مجله", icon: "fa-book-open", key: "magazine" },
  { href: "/bulk-order", label: "خرید عمده", icon: "fa-box-open", key: "bulk" },
  { href: "/corporate-gifts", label: "هدایای سازمانی", icon: "fa-gift", key: "gifts" },
  { href: "/about", label: "درباره ما", icon: "fa-leaf", key: "about" },
  { href: "/contact", label: "تماس با ما", icon: "fa-headset", key: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [activeCat, setActiveCat] = useState(0);
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const cat = CATS[activeCat]!;

  return (
    <header className="hdr dz">
      <div className="hdr-promo">
        <div className="hdr-promo__inner">
          <span className="hdr-promo__note">
            <i className="fa-solid fa-truck-fast" aria-hidden /> ارسال رایگان برای سفارش‌های بالای{" "}
            <b>۷۰۰٬۰۰۰ تومان</b> در سراسر کشور
          </span>
          <span className="hdr-promo__note">
            <span>
              مستقیم از باغ‌های دماوند — <b>بدون واسطه</b>
            </span>
          </span>
        </div>
      </div>

      <div className="hdr-main">
        <Link className="brandmark" href="/">
          <span className="brandmark__seal">د</span>
          <span>
            <span className="brandmark__name">دشت‌زاد</span>
            <span className="brandmark__tag">از باغ خانوادگی تا سفره شما — ۱۳۰۵</span>
          </span>
        </Link>
        <form className="hdr-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <i className="fa-solid fa-magnifying-glass" aria-hidden />
          <input type="search" placeholder="جستجو در فروشگاه دشت‌زاد…" aria-label="جستجو" />
        </form>
        <div className="hdr-actions">
          <Link className="hdr-cart" href="/cart">
            <i className="fa-solid fa-cart-shopping" aria-hidden />
            <span className="hdr-cart__txt">سبد خرید</span>
            {count > 0 && <span className="hdr-cart__n">{toFaDigits(count)}</span>}
          </Link>
          <Link className="hdr-login" href="/login">
            <i className="fa-regular fa-user" aria-hidden /> ورود
          </Link>
        </div>
      </div>

      <nav className="hdr-menu">
        <Link href="/" className={`is-home${pathname === "/" ? " is-active" : ""}`}>
          <i className="fa-solid fa-house" aria-hidden /> خانه
        </Link>

        <div className="megawrap">
          <button className="hdr-menu__cat" type="button">
            <i className="fa-solid fa-store" aria-hidden /> فروشگاه{" "}
            <i className="fa-solid fa-angle-down" style={{ fontSize: "1rem" }} aria-hidden />
          </button>
          <div className="mega">
            <div className="mega__list">
              {CATS.map((c, idx) => (
                <button
                  key={c.n}
                  className="mega__cat"
                  type="button"
                  data-active={idx === activeCat}
                  onMouseEnter={() => setActiveCat(idx)}
                  onFocus={() => setActiveCat(idx)}
                >
                  <i className={`fa-solid ${c.i}`} aria-hidden />
                  <span style={{ flex: 1 }}>{c.n}</span>
                  <i className="fa-solid fa-angle-left" aria-hidden />
                </button>
              ))}
            </div>
            <div className="mega__panel">
              <div className="mega__head">دسته‌بندی‌های {cat.n}</div>
              <div className="mega__sub">
                {cat.s.map((s) => (
                  <Link key={s} href="/products">
                    <i
                      className="fa-solid fa-angle-left"
                      style={{ color: "var(--green)", fontSize: "1rem" }}
                      aria-hidden
                    />{" "}
                    {s}
                  </Link>
                ))}
                <Link href="/products" style={{ color: "var(--green)", fontWeight: 700 }}>
                  مشاهده همه {cat.n}
                </Link>
              </div>
              <div className="mega__promo" />
            </div>
          </div>
        </div>

        {NAV.map((item) => (
          <Link key={item.key} href={item.href} className={isActive(item.href) ? "is-active" : ""}>
            <i className={`fa-solid ${item.icon}`} aria-hidden /> {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
