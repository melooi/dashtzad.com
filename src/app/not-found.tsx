import Link from "next/link";
import {
  Badge,
  ButtonLink,
  Card,
  Hero,
  IconBox,
  Placeholder,
  Price,
  RatingChip,
  SectionHead,
} from "@/components/ui";
import { NotFoundSearch } from "./NotFoundSearch";
import "./not-found.css";

// Font Awesome is loaded site-wide in app/layout.tsx.

const CATEGORIES = [
  { icon: "fa-wheat-awn", label: "خشکبار" },
  { icon: "fa-seedling", label: "آجیل و مغزها" },
  { icon: "fa-mug-hot", label: "چای و دمنوش" },
  { icon: "fa-jar", label: "عسل و فرآورده‌ها" },
];

const SUGGESTIONS = [
  { name: "برگه زردآلوی طلایی", price: 246000, rating: "۴٫۷", tag: "پرفروش", label: "زردآلو خشک" },
  { name: "توت خشک سفید اعلا", price: 315000, rating: "۴٫۹", tag: "تازه", label: "توت خشک" },
  { name: "انجیر خشک پرک", price: 410000, rating: "۴٫۸", tag: null, label: "انجیر خشک" },
  { name: "آلوبخارا بی‌هسته", price: 188000, rating: "۴٫۶", tag: null, label: "آلوبخارا" },
];

export default function NotFound() {
  return (
    <div className="notfound-page dz">
      {/* HERO */}
      <Hero
        kicker={
          <>
            <i className="fa-solid fa-magnifying-glass" aria-hidden /> خطای ۴۰۴ — صفحه پیدا نشد
          </>
        }
        title="صفحه‌ای که دنبالش بودید پیدا نشد"
        sub="شاید نشانی را اشتباه وارد کرده‌اید، یا این محصول دیگر در باغ ما موجود نیست. نگران نباشید؛ از همین‌جا جستجو کنید یا به خانه برگردید."
      >
        <div className="nf-seal" aria-label="۴۰۴">
          <span className="nf-seal__digit num display">۴</span>
          <IconBox icon="fa-leaf" tone="gold" size="lg" round className="nf-seal__badge" />
          <span className="nf-seal__digit num display">۴</span>
        </div>

        <NotFoundSearch />

        <div className="nf-actions">
          <ButtonLink href="/" size="lg">
            <i className="fa-solid fa-house" aria-hidden /> بازگشت به خانه
          </ButtonLink>
          <ButtonLink href="/products" variant="ghost" size="lg">
            <i className="fa-solid fa-cart-shopping" aria-hidden /> مشاهده محصولات
          </ButtonLink>
        </div>

        <div className="nf-cats">
          <span className="nf-cats__lead">دسته‌های پرطرفدار:</span>
          {CATEGORIES.map((c) => (
            <Link key={c.label} className="hero__chip" href="/products">
              <i className={`fa-solid ${c.icon}`} aria-hidden /> {c.label}
            </Link>
          ))}
        </div>
      </Hero>

      {/* SUGGESTED PRODUCTS */}
      <section className="wrap sec">
        <SectionHead
          title="شاید این‌ها را بپسندید"
          action={
            <Link className="nf-more" href="/products">
              همه محصولات <i className="fa-solid fa-angle-left" aria-hidden />
            </Link>
          }
        />
        <div className="grid--4 nf-grid">
          {SUGGESTIONS.map((p) => (
            <Card as="article" hover key={p.name} className="nf-card">
              <div className="nf-card__media">
                {p.tag && (
                  <Badge tone="clay" className="nf-card__tag">
                    {p.tag}
                  </Badge>
                )}
                <Placeholder className="nf-card__ph" label={p.label} />
              </div>
              <div className="nf-card__body">
                <h3 className="nf-card__name">{p.name}</h3>
                <RatingChip value={p.rating} />
                <div className="nf-card__foot">
                  <Price now={p.price} size="sm" />
                  <Link className="nf-card__add" href="/products" aria-label={`مشاهده ${p.name}`}>
                    <i className="fa-solid fa-plus" aria-hidden />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
