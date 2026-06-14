import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { SaleCountdown } from "./SaleCountdown";
import "./special-sale.css";

export const metadata: Metadata = {
  title: "فروش ویژه و تخفیف‌ها",
  description:
    "فروش ویژه دشت‌زاد؛ تخفیف‌های مدت‌دار روی برنج، خشکبار، آجیل، چای و ادویه. تا پایان شمارش معکوس، با بهترین قیمت سفارش دهید.",
  alternates: { canonical: "/special-sale" },
};

type Tone = "" | "clay" | "gold";

interface SaleProd {
  name: string;
  cat: string;
  catIcon: string;
  tone: Tone;
  rate: string;
  count: string;
  now: string;
  old: string;
  discount: number;
  weight: string;
  hot?: boolean;
  inStock: boolean;
  stock?: number;
}

const SALE: SaleProd[] = [
  {
    name: "خرمای مضافتی درجه‌یک بم",
    cat: "خشکبار",
    catIcon: "fa-bowl-food",
    tone: "clay",
    rate: "۴٫۸",
    count: "۱۲۴",
    now: "۱۸۵٬۰۰۰",
    old: "۲۶۴٬۰۰۰",
    discount: 30,
    weight: "۷۰۰ گرم",
    hot: true,
    inStock: true,
    stock: 4,
  },
  {
    name: "انجیر خشک پرک استهبان",
    cat: "خشکبار",
    catIcon: "fa-apple-whole",
    tone: "clay",
    rate: "۴٫۸",
    count: "۱۳۹",
    now: "۲۷۵٬۰۰۰",
    old: "۳۸۰٬۰۰۰",
    discount: 28,
    weight: "۵۰۰ گرم",
    hot: true,
    inStock: true,
    stock: 12,
  },
  {
    name: "آجیل مخصوص پنج‌مغز ممتاز",
    cat: "آجیل",
    catIcon: "fa-bowl-food",
    tone: "clay",
    rate: "۴٫۹",
    count: "۳۱۸",
    now: "۵۵۰٬۰۰۰",
    old: "۷۳۳٬۰۰۰",
    discount: 25,
    weight: "۵۰۰ گرم",
    hot: true,
    inStock: true,
    stock: 9,
  },
  {
    name: "پسته اکبری خندان شور",
    cat: "آجیل",
    catIcon: "fa-bowl-food",
    tone: "clay",
    rate: "۴٫۹",
    count: "۳۱۸",
    now: "۵۲۰٬۰۰۰",
    old: "۶۸۴٬۰۰۰",
    discount: 24,
    weight: "۵۰۰ گرم",
    hot: true,
    inStock: true,
    stock: 6,
  },
  {
    name: "چای سیاه ممتاز لاهیجان",
    cat: "چای",
    catIcon: "fa-mug-hot",
    tone: "gold",
    rate: "۴٫۷",
    count: "۸۹",
    now: "۲۶۰٬۰۰۰",
    old: "۳۳۳٬۰۰۰",
    discount: 22,
    weight: "۴۵۰ گرم",
    inStock: true,
    stock: 18,
  },
  {
    name: "زعفران سرگل قائنات (یک مثقال)",
    cat: "ادویه",
    catIcon: "fa-mortar-pestle",
    tone: "clay",
    rate: "۴٫۸",
    count: "۱۴۲",
    now: "۴۹۰٬۰۰۰",
    old: "۶۱۲٬۰۰۰",
    discount: 20,
    weight: "۴٫۶ گرم",
    inStock: true,
    stock: 3,
  },
  {
    name: "برنج دم‌سیاه معطر اصیل",
    cat: "برنج",
    catIcon: "fa-bowl-rice",
    tone: "",
    rate: "۴٫۹",
    count: "۷۶",
    now: "۴۷۰٬۰۰۰",
    old: "۵۸۰٬۰۰۰",
    discount: 19,
    weight: "۵ کیلوگرم",
    inStock: true,
    stock: 22,
  },
  {
    name: "برنج هاشمی ممتاز معطر",
    cat: "برنج",
    catIcon: "fa-bowl-rice",
    tone: "",
    rate: "۴٫۹",
    count: "۳۱۲",
    now: "۴۲۰٬۰۰۰",
    old: "۵۰۶٬۰۰۰",
    discount: 17,
    weight: "۵ کیلوگرم",
    hot: true,
    inStock: true,
    stock: 30,
  },
  {
    name: "مغز گردوی تازهٔ تویسرکان",
    cat: "خشکبار",
    catIcon: "fa-apple-whole",
    tone: "clay",
    rate: "۴٫۸",
    count: "۱۳۹",
    now: "۳۸۰٬۰۰۰",
    old: "۴۵۲٬۰۰۰",
    discount: 16,
    weight: "۵۰۰ گرم",
    inStock: true,
    stock: 14,
  },
  {
    name: "لوبیا چیتی درشت درجه‌یک",
    cat: "حبوبات",
    catIcon: "fa-seedling",
    tone: "",
    rate: "۴٫۶",
    count: "۲۰۷",
    now: "۹۵٬۰۰۰",
    old: "۱۱۲٬۰۰۰",
    discount: 15,
    weight: "۹۰۰ گرم",
    inStock: false,
  },
  {
    name: "باسلوق زعفرانی پسته‌ای",
    cat: "خشکبار",
    catIcon: "fa-bowl-food",
    tone: "clay",
    rate: "۴٫۷",
    count: "۶۴",
    now: "۲۱۰٬۰۰۰",
    old: "۲۴۷٬۰۰۰",
    discount: 15,
    weight: "۴۰۰ گرم",
    inStock: true,
    stock: 11,
  },
  {
    name: "چای سبز ممتاز سرگل",
    cat: "چای",
    catIcon: "fa-mug-hot",
    tone: "gold",
    rate: "۴٫۶",
    count: "۵۸",
    now: "۲۳۰٬۰۰۰",
    old: "۲۶۴٬۰۰۰",
    discount: 13,
    weight: "۴۵۰ گرم",
    inStock: true,
    stock: 16,
  },
];

function SaleCard({ p }: { p: SaleProd }) {
  const catClass = p.tone ? `cat-label cat-label--${p.tone}` : "cat-label";
  const lowStock = p.inStock && (p.stock ?? 99) <= 5;
  return (
    <article className={`pcard${p.inStock ? "" : " is-out"}`}>
      <div className="pcard__media">
        <div className="ph">
          <span className="ph__label">عکس {p.name}</span>
        </div>
        <div className="pcard__flags">
          <span className="badge badge--clay">
            <i className="fa-solid fa-tag" aria-hidden /> ٪{toFa(p.discount)} تخفیف
          </span>
          {p.hot && (
            <span className="badge badge--gold">
              <i className="fa-solid fa-fire" aria-hidden /> پرفروش
            </span>
          )}
        </div>
        <div className="pcard__bm">
          <button className="bookmark" type="button" aria-label="افزودن به علاقه‌مندی‌ها">
            <i className="fa-regular fa-heart" aria-hidden />
          </button>
        </div>
      </div>
      <div className="pcard__body">
        <span className={catClass}>
          <i className={`fa-solid ${p.catIcon}`} aria-hidden /> {p.cat}
        </span>
        <h3 className="pcard__name">{p.name}</h3>
        <span className="pcard__rate">
          <i className="fa-solid fa-star" aria-hidden /> {p.rate} <span>({p.count})</span>
        </span>
        <div className="pcard__meta">
          <span>
            <i className="fa-solid fa-weight-hanging" aria-hidden /> {p.weight}
          </span>
        </div>
        {p.inStock ? (
          lowStock ? (
            <span className="pcard__stockline low">
              <i className="fa-solid fa-bolt" aria-hidden /> تنها {toFa(p.stock ?? 0)} عدد باقی مانده
            </span>
          ) : (
            <span className="pcard__stockline in">
              <i className="fa-solid fa-circle-check" aria-hidden /> موجود در انبار
            </span>
          )
        ) : (
          <span className="pcard__stockline out">
            <i className="fa-solid fa-circle-xmark" aria-hidden /> ناموجود
          </span>
        )}
        <div className="pcard__foot">
          <div className="pcard__price">
            <span className="pcard__old num">{p.old}</span>
            <span className="pcard__now num">
              {p.now} <span className="toman">تومان</span>
            </span>
          </div>
          {p.inStock ? (
            <button className="pcard__add" type="button" aria-label="افزودن به سبد">
              <i className="fa-solid fa-plus" aria-hidden />
            </button>
          ) : (
            <button
              className="pcard__add pcard__add--off"
              type="button"
              disabled
              aria-label="اطلاع از موجودی"
            >
              <i className="fa-solid fa-bell" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
function toFa(n: number): string {
  return String(n)
    .split("")
    .map((c) => (c >= "0" && c <= "9" ? FA_DIGITS[Number(c)] : c))
    .join("");
}

const TERMS = [
  {
    icon: "fa-clock",
    t: "تخفیف مدت‌دار",
    d: "قیمت‌های ویژه فقط تا پایان شمارش معکوس معتبرند و پس از آن به نرخ عادی بازمی‌گردند.",
  },
  {
    icon: "fa-box-open",
    t: "تا اتمام موجودی",
    d: "هر کالا تا زمان موجود بودن در انبار با قیمت تخفیف‌خورده ارائه می‌شود.",
  },
  {
    icon: "fa-shield-halved",
    t: "همان ضمانت اصالت",
    d: "محصولات فروش ویژه هم با همان تضمین کیفیت و اصالت دشت‌زاد عرضه می‌شوند.",
  },
  {
    icon: "fa-truck-fast",
    t: "ارسال سریع",
    d: "تهران در ۲۴ ساعت و سایر شهرها ۲ تا ۴ روز کاری؛ بسته‌بندی امن و سالم.",
  },
];

export default function SpecialSalePage() {
  const saleSorted = [...SALE].sort(
    (a, b) => Number(b.inStock) - Number(a.inStock) || b.discount - a.discount,
  );

  return (
    <div className="special-sale-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "فروش ویژه", path: "/special-sale" },
        ])}
      />

      {/* HERO + COUNTDOWN */}
      <section className="sale-hero">
        <div className="wrap">
          <div className="sale-hero__inner">
            <span className="sale-hero__kicker">
              <i className="fa-solid fa-bolt" aria-hidden /> پیشنهاد شگفت‌انگیز دشت‌زاد
            </span>
            <h1 className="sale-hero__title">
              فروش ویژه،
              <br />
              <em>تا پایان فرصت</em>
            </h1>
            <p className="sale-hero__sub">
              گزیده‌ای از محصولات مرغوب دشت‌زاد با تخفیف‌های مدت‌دار. تا پایان شمارش معکوس، با بهترین
              قیمت سفارش دهید.
            </p>
            <SaleCountdown />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">سبد تخفیف‌ها</span>
              <h2 className="sec__title">محصولات فروش ویژه</h2>
              <p className="sec__sub">
                همه کالاهای تخفیف‌دار دشت‌زاد، مرتب‌شده بر اساس بیشترین درصد تخفیف.
              </p>
            </div>
            <span className="sale-count">
              <b className="num">{toFa(saleSorted.length)}</b> پیشنهاد ویژه
            </span>
          </div>
          <div className="sale-grid">
            {saleSorted.map((p) => (
              <SaleCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* TERMS / ENDS SOON STRIP */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">قبل از خرید بدانید</span>
              <h2 className="sec__title">شرایط فروش ویژه</h2>
            </div>
          </div>
          <div className="sale-terms">
            {TERMS.map((t) => (
              <div key={t.t} className="sale-term">
                <span className="sale-term__ic">
                  <i className={`fa-solid ${t.icon}`} aria-hidden />
                </span>
                <h3 className="sale-term__t">{t.t}</h3>
                <p className="sale-term__d">{t.d}</p>
              </div>
            ))}
          </div>

          <div className="sale-cta">
            <div className="sale-cta__l">
              <span className="sale-cta__tag">
                <i className="fa-solid fa-bolt" aria-hidden /> فرصت محدود
              </span>
              <h3 className="sale-cta__t">تخفیف‌ها با پایان زمان حذف می‌شوند</h3>
              <p className="sale-cta__d">
                پیش از پایان شمارش معکوس، سبد خود را تکمیل کنید. برای خرید عمده با قیمت پلکانی هم می‌توانید
                درخواست استعلام ثبت کنید.
              </p>
            </div>
            <div className="sale-cta__btns">
              <Link className="btn btn--primary btn--lg" href="/products">
                <i className="fa-solid fa-bag-shopping" aria-hidden /> مشاهده همه محصولات
              </Link>
              <Link className="btn btn--ghost btn--lg" href="/bulk-order">
                <i className="fa-solid fa-box-open" aria-hidden /> استعلام قیمت عمده
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
