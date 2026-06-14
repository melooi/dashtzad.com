import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductQA } from "@/components/product/ProductQA";
import { ProductFaqList } from "@/components/product/ProductFaqList";
import { getAllProductSlugs, getProductBySlug, listProducts } from "@/lib/woo/products";
import { buildProductView } from "@/lib/woo/view";
import { getRankMath } from "@/lib/seo/rankmath";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo/jsonld";
import { isValidSlug, stripHtml } from "@/lib/utils";
import { Badge, Card, IconBox, Placeholder, Price, RatingChip, SectionHead } from "@/components/ui";
import "./product.css";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs.filter(isValidSlug).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) return {};

  const { metadata } = await getRankMath(`/product/${slug}`);
  if (metadata.title) return metadata;

  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: stripHtml(product.short_description || product.description).slice(0, 160),
    alternates: { canonical: `/product/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const view = buildProductView(product);
  const category = product.categories[0];

  // ---- dynamic JSON-LD from the same data ----
  const { jsonLd } = await getRankMath(`/product/${slug}`);
  const schema =
    jsonLd.length > 0
      ? jsonLd
      : [
          productSchema(product, view.specs),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "محصولات", path: "/products" },
            ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
            { name: product.name, path: `/product/${product.slug}` },
          ]),
          ...(view.faq.length > 0
            ? [faqSchema(view.faq.map((f) => ({ question: f.q, answer: f.a })))]
            : []),
        ];

  // ---- related (same category) — non-fatal if empty ----
  const relatedAll = await listProducts({
    category: category ? String(category.id) : undefined,
    perPage: 6,
  })
    .then((r) => r.items)
    .catch(() => []);
  const related = relatedAll.filter((rp) => rp.slug !== product.slug).slice(0, 6);

  return (
    <div className="product-page dz">
      <JsonLd data={schema} />

      {/* BREADCRUMB */}
      <div className="wrap">
        <nav className="crumbs" aria-label="مسیر">
          <Link href="/">خانه</Link>
          <i className="fa-solid fa-angle-left" aria-hidden />
          <Link href="/products">محصولات</Link>
          {category && (
            <>
              <i className="fa-solid fa-angle-left" aria-hidden />
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </>
          )}
          <i className="fa-solid fa-angle-left" aria-hidden />
          <span className="crumbs__current">{product.name}</span>
        </nav>
      </div>

      {/* HERO: info + gallery + buy box; body sections render in the main column
          alongside the sticky buy box (matches the design's LayoutCompact) */}
      <ProductHero view={view}>

      {/* PRODUCT DESCRIPTION */}
      {(view.tagline || view.story.length > 0 || view.highlights.length > 0) && (
        <section id="description-section" className="sec">
          <SectionHead kicker="دربارهٔ محصول" title="توضیح محصول" />
          {view.tagline && <p className="prod-tagline">{view.tagline}</p>}
          {view.story.map((para, i) => (
            <p key={i} className="prod-story muted">
              {para}
            </p>
          ))}
          {view.highlights.length > 0 && (
            <div className="grid--auto prod-highlights">
              {view.highlights.map((h, i) => (
                <Card pad key={i} className="prod-hl">
                  <IconBox icon={h.icon} />
                  <div>
                    <div className="prod-hl__t">{h.title}</div>
                    <div className="prod-hl__p muted">{h.text}</div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SPECS / NUTRITION / CARE ACCORDION */}
      {(view.specTable.length > 0 || view.nutrition || view.care.length > 0) && (
        <section className="sec">
          <SectionHead kicker="جزئیات" title="ویژگی‌ها و مشخصات" />
          <ProductDetails view={view} />
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section id="related-section" className="sec">
          <SectionHead kicker="پیشنهاد دشت‌زاد" title="محصولات مرتبط" />
          <div className="rel-scroll">
            {related.map((rp) => {
              const img = rp.images[0];
              return (
                <Link key={rp.id} href={`/product/${rp.slug}`} className="card card--hover rel-card">
                  <div className="rel-card__media">
                    {rp.on_sale && (
                      <Badge tone="clay" className="rel-card__tag">
                        تخفیف
                      </Badge>
                    )}
                    {img ? (
                      <div className="ph rel-card__ph">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt || rp.name} />
                      </div>
                    ) : (
                      <Placeholder className="rel-card__ph" label={rp.name} />
                    )}
                  </div>
                  <div className="rel-card__b">
                    <h3 className="rel-card__name">{rp.name}</h3>
                    {rp.rating_count > 0 && <RatingChip value={rp.average_rating} />}
                    <span className="rel-card__price">
                      {rp.price ? <Price now={rp.price} size="sm" /> : "تماس برای قیمت"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* REVIEWS */}
      {(view.reviews.length > 0 || view.ratingBreakdown.length > 0) && (
        <section id="reviews-section" className="sec reviews-band">
          <SectionHead title="دیدگاه خریداران" />
          <ProductReviews view={view} />
        </section>
      )}

      {/* Q&A */}
      {view.questions.length > 0 && (
        <section id="questions-section" className="sec">
          <SectionHead title="پرسش‌های خریداران" />
          <ProductQA view={view} />
        </section>
      )}

      {/* FAQ */}
      {view.faq.length > 0 && (
        <section className="sec">
          <SectionHead title="سؤالات متداول" center />
          <ProductFaqList items={view.faq} />
        </section>
      )}
      </ProductHero>

      {/* TRUST STRIP */}
      <section className="wrap product-trust">
        <div className="trust-strip">
          {[
            { i: "fa-truck-fast", t: "ارسال سریع", s: "تهران ۲۴ ساعته" },
            { i: "fa-shield-halved", t: "ضمانت اصالت", s: "تضمین کیفیت دشت‌زاد" },
            { i: "fa-rotate-left", t: "بازگشت ۷ روزه", s: "بدون قید و شرط" },
            { i: "fa-headset", t: "پشتیبانی", s: "همه‌روزه ۹ تا ۲۱" },
          ].map((t) => (
            <div className="trust-strip__item" key={t.t}>
              <i className={`fa-solid ${t.i}`} aria-hidden />
              <span>
                <b>{t.t}</b>
                <span className="faint">{t.s}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
