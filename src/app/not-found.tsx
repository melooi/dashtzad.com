import Link from "next/link";
import { NotFoundSearch } from "./NotFoundSearch";
import "./not-found.css";

const CATEGORIES = [
  { icon: "fa-wheat-awn", label: "خشکبار" },
  { icon: "fa-seedling", label: "آجیل و مغزها" },
  { icon: "fa-mug-hot", label: "چای و دمنوش" },
  { icon: "fa-jar", label: "عسل و فرآورده‌ها" },
];

const SUGGESTIONS = [
  { name: "برگه زردآلوی طلایی", price: "۲۴۶٬۰۰۰", rating: "۴٫۷", tag: "پرفروش", label: "زردآلو خشک" },
  { name: "توت خشک سفید اعلا", price: "۳۱۵٬۰۰۰", rating: "۴٫۹", tag: "تازه", label: "توت خشک" },
  { name: "انجیر خشک پرک", price: "۴۱۰٬۰۰۰", rating: "۴٫۸", tag: null, label: "انجیر خشک" },
  { name: "آلوبخارا بی‌هسته", price: "۱۸۸٬۰۰۰", rating: "۴٫۶", tag: null, label: "آلوبخارا" },
];

export default function NotFound() {
  return (
    <div className="notfound-page dz">
      {/* HERO */}
      <section className="nf">
        <div className="nf-inner">
          <span className="nf-kicker">
            <i className="fa-solid fa-magnifying-glass" aria-hidden /> خطای ۴۰۴ — صفحه پیدا نشد
          </span>

          <div className="nf-code" aria-label="۴۰۴">
            <span className="nf-code__d num">۴</span>
            <span className="nf-seal">
              <i className="fa-solid fa-leaf" aria-hidden />
            </span>
            <span className="nf-code__d num">۴</span>
          </div>

          <h1 className="nf-title">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
          <p className="nf-lead">
            شاید نشانی را اشتباه وارد کرده‌اید، یا این محصول دیگر در باغ ما موجود نیست. نگران نباشید؛
            از همین‌جا جستجو کنید یا به خانه برگردید.
          </p>

          <NotFoundSearch />

          <div className="nf-actions">
            <Link className="btn btn--primary btn--lg" href="/">
              <i className="fa-solid fa-house" aria-hidden /> بازگشت به خانه
            </Link>
            <Link className="btn btn--ghost btn--lg" href="/products">
              <i className="fa-solid fa-cart-shopping" aria-hidden /> مشاهده محصولات
            </Link>
          </div>

          <div className="nf-chips">
            <span className="nf-chips__lead">دسته‌های پرطرفدار:</span>
            {CATEGORIES.map((c) => (
              <Link key={c.label} className="nf-chip" href="/products">
                <i className={`fa-solid ${c.icon}`} aria-hidden /> {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SUGGESTED PRODUCTS */}
      <section className="nf-sugg">
        <div className="nf-sugg__head">
          <h2 className="nf-sugg__t">شاید این‌ها را بپسندید</h2>
          <Link className="nf-sugg__more" href="/products">
            همه محصولات <i className="fa-solid fa-angle-left" aria-hidden />
          </Link>
        </div>
        <div className="nf-grid">
          {SUGGESTIONS.map((p) => (
            <article key={p.name} className="nf-card">
              <div className="nf-card__media">
                {p.tag && <span className="nf-card__tag">{p.tag}</span>}
                <div className="ph">
                  <span className="ph__label">{p.label}</span>
                </div>
              </div>
              <div className="nf-card__body">
                <h3 className="nf-card__name">{p.name}</h3>
                <span className="nf-card__rate">
                  <i className="fa-solid fa-star" aria-hidden /> {p.rating}
                </span>
                <div className="nf-card__foot">
                  <span className="nf-card__price num">
                    {p.price} <span className="nf-card__toman">تومان</span>
                  </span>
                  <Link
                    className="nf-card__add"
                    href="/products"
                    aria-label={`مشاهده ${p.name}`}
                  >
                    <i className="fa-solid fa-plus" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
