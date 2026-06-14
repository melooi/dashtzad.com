import Link from "next/link";

const CATEGORIES = [
  { label: "برنج", href: "/category/rice" },
  { label: "حبوبات", href: "/category/legume" },
  { label: "خشکبار", href: "/category/nuts" },
  { label: "چای و دمنوش", href: "/category/tea" },
  { label: "ادویه و زعفران", href: "/category/spice" },
  { label: "آجیل", href: "/category/ajil" },
];

const SUPPORT = [
  { label: "پرسش‌های متداول", href: "/faq" },
  { label: "قوانین و مقررات", href: "/terms" },
  { label: "تماس با ما", href: "/contact" },
  { label: "پیگیری سفارش", href: "/track-order" },
  { label: "سبد خرید", href: "/cart" },
];

const ABOUT = [
  { label: "داستان ما", href: "/brand-story" },
  { label: "باغ‌های دماوند", href: "/about" },
  { label: "فروشگاه دشت‌زاد", href: "/products" },
  { label: "مجله دشت‌زاد", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="ftr dz">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <div className="brandmark" style={{ marginBottom: "1.6rem" }}>
              <span className="brandmark__seal">د</span>
              <span className="brandmark__name">دشت‌زاد</span>
            </div>
            <p className="ftr-intro">
              دشت‌زاد؛ روایت چهار نسل از ۱۳۰۵. برنج، حبوبات، خشکبار، چای، ادویه و آجیل مرغوب — از باغ
              خانوادگی تا سفره شما، بدون واسطه.
            </p>
            <div className="ftr-social">
              <a href="#" aria-label="اینستاگرام">
                <i className="fa-brands fa-instagram" aria-hidden />
              </a>
              <a href="#" aria-label="تلگرام">
                <i className="fa-brands fa-telegram" aria-hidden />
              </a>
              <a href="#" aria-label="واتساپ">
                <i className="fa-brands fa-whatsapp" aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h4 className="ftr-h">دسته‌بندی‌ها</h4>
            <ul className="ftr-links">
              {CATEGORIES.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="ftr-h">راهنما و پشتیبانی</h4>
            <ul className="ftr-links">
              {SUPPORT.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="ftr-h">درباره دشت‌زاد</h4>
            <ul className="ftr-links">
              {ABOUT.map((c) => (
                <li key={c.label}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ftr-trust">
          <a className="ftr-trust__badge" href="#" rel="nofollow" aria-label="نماد اعتماد الکترونیکی">
            <span className="ftr-trust__seal">
              <i className="fa-solid fa-certificate" aria-hidden />
            </span>
            <span>
              <b>نماد اعتماد الکترونیکی</b>
              <span>کد اینماد این‌جا قرار می‌گیرد</span>
            </span>
          </a>
          <p className="ftr-trust__note">
            <b>دشت‌زاد تجارت ایرانیان</b> — دارای نماد اعتماد الکترونیکی (اینماد) از مرکز توسعه تجارت
            الکترونیکی. خرید شما در دشت‌زاد، خریدی مطمئن و قابل پیگیری است.
          </p>
        </div>
      </div>

      <div className="ftr-darkbar">
        <div className="ftr-darkbar__inner">
          <span>© ۱۴۰۵ دشت‌زاد تجارت ایرانیان — تمام حقوق محفوظ است.</span>
          <span>ساخته‌شده با ریشه در زمین ایران</span>
        </div>
      </div>
    </footer>
  );
}
