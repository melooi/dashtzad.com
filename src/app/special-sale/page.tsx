import type { Metadata } from "next";
import {
  Badge,
  ButtonLink,
  Card,
  Chip,
  Hero,
  IconBox,
  Placeholder,
  Price,
  RatingChip,
  SectionHead,
} from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { toFaDigits } from "@/lib/utils";
import { SaleCountdown } from "./SaleCountdown";
import "./special-sale.css";

export const metadata: Metadata = {
  title: "فروش ویژه و تخفیف‌ها",
  description:
    "فروش ویژه دشت‌زاد؛ تخفیف‌های مدت‌دار روی برنج، خشکبار، آجیل، چای و ادویه. تا پایان شمارش معکوس، با بهترین قیمت سفارش دهید.",
  alternates: { canonical: "/special-sale" },
};

type Tone = "green" | "clay" | "gold";

interface SaleProd {
  name: string;
  cat: string;
  catIcon: string;
  tone: Tone;
  rate: number;
  count: number;
  now: number;
  old: number;
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
    rate: 4.8,
    count: 124,
    now: 185000,
    old: 264000,
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
    rate: 4.8,
    count: 139,
    now: 275000,
    old: 380000,
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
    rate: 4.9,
    count: 318,
    now: 550000,
    old: 733000,
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
    rate: 4.9,
    count: 318,
    now: 520000,
    old: 684000,
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
    rate: 4.7,
    count: 89,
    now: 260000,
    old: 333000,
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
    rate: 4.8,
    count: 142,
    now: 490000,
    old: 612000,
    discount: 20,
    weight: "۴٫۶ گرم",
    inStock: true,
    stock: 3,
  },
  {
    name: "برنج دم‌سیاه معطر اصیل",
    cat: "برنج",
    catIcon: "fa-bowl-rice",
    tone: "green",
    rate: 4.9,
    count: 76,
    now: 470000,
    old: 580000,
    discount: 19,
    weight: "۵ کیلوگرم",
    inStock: true,
    stock: 22,
  },
  {
    name: "برنج هاشمی ممتاز معطر",
    cat: "برنج",
    catIcon: "fa-bowl-rice",
    tone: "green",
    rate: 4.9,
    count: 312,
    now: 420000,
    old: 506000,
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
    rate: 4.8,
    count: 139,
    now: 380000,
    old: 452000,
    discount: 16,
    weight: "۵۰۰ گرم",
    inStock: true,
    stock: 14,
  },
  {
    name: "لوبیا چیتی درشت درجه‌یک",
    cat: "حبوبات",
    catIcon: "fa-seedling",
    tone: "green",
    rate: 4.6,
    count: 207,
    now: 95000,
    old: 112000,
    discount: 15,
    weight: "۹۰۰ گرم",
    inStock: false,
  },
  {
    name: "باسلوق زعفرانی پسته‌ای",
    cat: "خشکبار",
    catIcon: "fa-bowl-food",
    tone: "clay",
    rate: 4.7,
    count: 64,
    now: 210000,
    old: 247000,
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
    rate: 4.6,
    count: 58,
    now: 230000,
    old: 264000,
    discount: 13,
    weight: "۴۵۰ گرم",
    inStock: true,
    stock: 16,
  },
];

function StockLine({ p }: { p: SaleProd }) {
  if (!p.inStock) {
    return (
      <Chip icon="fa-circle-xmark">ناموجود</Chip>
    );
  }
  const lowStock = (p.stock ?? 99) <= 5;
  return lowStock ? (
    <Chip tone="clay" icon="fa-bolt">
      تنها {toFaDigits(p.stock ?? 0)} عدد باقی مانده
    </Chip>
  ) : (
    <Chip tone="green" icon="fa-circle-check">
      موجود در انبار
    </Chip>
  );
}

function SaleCard({ p }: { p: SaleProd }) {
  return (
    <Card as="article" hover className={`sale-card${p.inStock ? "" : " is-out"}`}>
      <div className="sale-card__media">
        <Placeholder label={`عکس ${p.name}`} />
        <div className="sale-card__flags">
          <Badge tone="clay" icon="fa-tag">
            ٪{toFaDigits(p.discount)} تخفیف
          </Badge>
          {p.hot && (
            <Badge tone="gold" icon="fa-fire">
              پرفروش
            </Badge>
          )}
        </div>
        <button
          className="sale-card__bm"
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <i className="fa-regular fa-heart" aria-hidden />
        </button>
      </div>
      <div className="sale-card__body">
        <Chip tone={p.tone} icon={p.catIcon}>
          {p.cat}
        </Chip>
        <h3 className="sale-card__name">{p.name}</h3>
        <RatingChip value={p.rate} count={p.count} />
        <span className="sale-card__weight">
          <i className="fa-solid fa-weight-hanging" aria-hidden /> {p.weight}
        </span>
        <StockLine p={p} />
        <div className="sale-card__foot">
          <Price now={p.now} old={p.old} size="sm" />
          {p.inStock ? (
            <button
              className="sale-card__add"
              type="button"
              aria-label="افزودن به سبد"
            >
              <i className="fa-solid fa-plus" aria-hidden />
            </button>
          ) : (
            <button
              className="sale-card__add sale-card__add--off"
              type="button"
              disabled
              aria-label="اطلاع از موجودی"
            >
              <i className="fa-solid fa-bell" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
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
      <Hero
        tone="clay"
        kicker={
          <>
            <i className="fa-solid fa-bolt" aria-hidden /> پیشنهاد شگفت‌انگیز دشت‌زاد
          </>
        }
        title={
          <>
            فروش ویژه،
            <br />
            <em>تا پایان فرصت</em>
          </>
        }
        sub="گزیده‌ای از محصولات مرغوب دشت‌زاد با تخفیف‌های مدت‌دار. تا پایان شمارش معکوس، با بهترین قیمت سفارش دهید."
      >
        <SaleCountdown />
      </Hero>

      {/* PRODUCTS */}
      <section className="wrap sec">
        <SectionHead
          kicker="سبد تخفیف‌ها"
          title="محصولات فروش ویژه"
          sub="همه کالاهای تخفیف‌دار دشت‌زاد، مرتب‌شده بر اساس بیشترین درصد تخفیف."
          action={
            <span className="sale-count">
              <b className="num">{toFaDigits(saleSorted.length)}</b> پیشنهاد ویژه
            </span>
          }
        />
        <div className="sale-grid grid--4">
          {saleSorted.map((p) => (
            <SaleCard key={p.name} p={p} />
          ))}
        </div>
      </section>

      {/* TERMS + CTA */}
      <section className="wrap sec sec--warm">
        <SectionHead kicker="قبل از خرید بدانید" title="شرایط فروش ویژه" />
        <div className="sale-terms grid--4">
          {TERMS.map((t) => (
            <Card key={t.t} pad>
              <IconBox tone="clay" size="lg" icon={t.icon} />
              <h3 className="sale-term__t">{t.t}</h3>
              <p className="sale-term__d">{t.d}</p>
            </Card>
          ))}
        </div>

        <div className="sale-cta">
          <div className="sale-cta__l">
            <Badge tone="clay" icon="fa-bolt">
              فرصت محدود
            </Badge>
            <h3 className="sale-cta__t">تخفیف‌ها با پایان زمان حذف می‌شوند</h3>
            <p className="sale-cta__d">
              پیش از پایان شمارش معکوس، سبد خود را تکمیل کنید. برای خرید عمده با قیمت
              پلکانی هم می‌توانید درخواست استعلام ثبت کنید.
            </p>
          </div>
          <div className="sale-cta__btns">
            <ButtonLink href="/products" variant="primary" size="lg">
              <i className="fa-solid fa-bag-shopping" aria-hidden /> مشاهده همه محصولات
            </ButtonLink>
            <ButtonLink href="/bulk-order" variant="ghost" size="lg">
              <i className="fa-solid fa-box-open" aria-hidden /> استعلام قیمت عمده
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
