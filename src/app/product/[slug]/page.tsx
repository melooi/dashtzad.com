import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuy } from "@/components/product/ProductBuy";
import { getAllProductSlugs, getProductBySlug, listProducts } from "@/lib/woo/products";
import { buildSpecTable, extractProductSpecs } from "@/lib/woo/specs";
import { getRankMath } from "@/lib/seo/rankmath";
import { breadcrumbSchema, productSchema } from "@/lib/seo/jsonld";
import { formatToman, isValidSlug, stripHtml, toFaDigits } from "@/lib/utils";
import "./product.css";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    // Only pre-render valid English slugs; a Persian slug from Woo is skipped, not normalized.
    return slugs.filter(isValidSlug).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) return {};

  // Rank Math is the source of truth for SEO meta.
  const { metadata } = await getRankMath(`/product/${slug}`);
  if (metadata.title) return metadata;

  // Fallback to Woo fields if Rank Math is unavailable.
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
  // Reject non-English / non-URL-safe slugs outright (no encode/decode fallback).
  if (!isValidSlug(slug)) notFound();

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // ---- derive view data from the WooCommerce record ----
  const specs = extractProductSpecs(product); // curated ACF/meta specs
  const specTable = buildSpecTable(product); // specs + attributes + sku

  const priceNum = Number(product.price);
  const regularNum = Number(product.regular_price);
  const hasPrice = product.price !== "" && Number.isFinite(priceNum) && priceNum > 0;
  const onSale = product.on_sale && Number.isFinite(regularNum) && regularNum > priceNum;
  const discountPct = onSale ? Math.round((1 - priceNum / regularNum) * 100) : 0;
  const inStock = product.stock_status === "instock";
  const qty = product.stock_quantity;
  const lowStock = inStock && qty != null && qty > 0 && qty <= 10;
  const stockPct = qty != null ? Math.max(6, Math.min(100, Math.round((qty / 20) * 100))) : 0;

  const category = product.categories[0];

  // ---- dynamic JSON-LD from the same data ----
  const { jsonLd } = await getRankMath(`/product/${slug}`);
  const schema =
    jsonLd.length > 0
      ? jsonLd
      : [
          productSchema(product, specs),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "محصولات", path: "/products" },
            ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ];

  // ---- related products (same category) — non-fatal if empty/unavailable ----
  const relatedAll = await listProducts({
    category: category ? String(category.id) : undefined,
    perPage: 5,
  })
    .then((r) => r.items)
    .catch(() => []);
  const related = relatedAll.filter((p) => p.slug !== product.slug).slice(0, 4);

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

      {/* HERO: gallery + buy box */}
      <section className="wrap product-hero">
        <div className="dz-detail">
          <ProductGallery images={product.images} name={product.name} />

          <div className="buy-box">
            <div className="buy-box__badges">
              {category && (
                <Link href={`/category/${category.slug}`} className="badge">
                  <i className="fa-solid fa-leaf" aria-hidden /> {category.name}
                </Link>
              )}
              {onSale && (
                <span className="badge badge--clay">
                  <i className="fa-solid fa-bolt" aria-hidden /> فروش ویژه
                </span>
              )}
              {!inStock && (
                <span className="badge badge--gold">
                  <i className="fa-solid fa-hourglass-half" aria-hidden /> ناموجود
                </span>
              )}
            </div>

            <h1 className="buy-box__title display">{product.name}</h1>

            <div className="buy-box__sub">
              {product.rating_count > 0 && (
                <span className="rating-chip">
                  <i className="fa-solid fa-star" aria-hidden />
                  <span className="num">{toFaDigits(product.average_rating)}</span>
                  <span className="faint">({toFaDigits(product.rating_count)} نظر)</span>
                </span>
              )}
              {product.sku && (
                <span className="buy-box__sku faint">
                  کد: <span className="num">{product.sku}</span>
                </span>
              )}
            </div>

            {product.short_description && (
              <div
                className="buy-box__lead muted"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* PRICE */}
            <div className="price">
              {hasPrice ? (
                <>
                  {onSale && (
                    <span className="price__old num">{formatToman(product.regular_price)}</span>
                  )}
                  <span className="price__now num">{formatToman(product.price)}</span>
                  {onSale && (
                    <span className="discount-chip">
                      <i className="fa-solid fa-tag" aria-hidden /> ٪{toFaDigits(discountPct)} تخفیف
                    </span>
                  )}
                </>
              ) : (
                <span className="price__contact">
                  <i className="fa-solid fa-circle-info" aria-hidden /> تماس برای استعلام قیمت
                </span>
              )}
            </div>

            {/* STOCK */}
            {inStock ? (
              lowStock ? (
                <div className="stock">
                  <div className="stock__row">
                    <span className="stock__lbl">
                      <i className="fa-solid fa-fire" aria-hidden /> تنها{" "}
                      <b className="num">{toFaDigits(qty!)}</b> عدد باقی مانده
                    </span>
                    <span className="faint">عجله کنید</span>
                  </div>
                  <div className="stock__bar">
                    <span className="stock__fill" style={{ width: `${stockPct}%` }} />
                  </div>
                </div>
              ) : (
                <p className="stock-ok">
                  <i className="fa-solid fa-circle-check" aria-hidden /> موجود در انبار
                </p>
              )
            ) : (
              <p className="stock-out">
                <i className="fa-solid fa-circle-xmark" aria-hidden /> این محصول فعلاً موجود نیست
              </p>
            )}

            <ProductBuy
              productId={product.id}
              slug={product.slug}
              name={product.name}
              price={hasPrice ? priceNum : 0}
              image={product.images[0]?.src}
              inStock={inStock}
              hasPrice={hasPrice}
              maxQty={qty ?? 99}
            />

            {/* TRUST mini */}
            <ul className="buy-trust">
              <li>
                <i className="fa-solid fa-truck-fast" aria-hidden /> ارسال سریع، تهران ۲۴ ساعته
              </li>
              <li>
                <i className="fa-solid fa-shield-heart" aria-hidden /> ضمانت اصالت و کیفیت دشت‌زاد
              </li>
              <li>
                <i className="fa-solid fa-rotate-left" aria-hidden /> بازگشت ۷ روزه بدون قید و شرط
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CUSTOM SPECS — highlight cards from ACF/meta */}
      {specs.length > 0 && (
        <section className="wrap sec product-specs">
          <div className="sec__kicker">مشخصات محصول</div>
          <h2 className="sec__title">ویژگی‌های این محصول</h2>
          <div className="hl-grid">
            {specs.map((s) => (
              <div className="hl-card" key={s.key}>
                <div className="hl-card__ic">
                  <i className={`fa-solid ${s.icon}`} aria-hidden />
                </div>
                <div className="hl-card__t">{s.label}</div>
                <div className="hl-card__p">{s.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SPEC TABLE — full attribute/spec list */}
      {specTable.length > 0 && (
        <section className="wrap product-spectbl">
          <div className="spectbl">
            <div className="spectbl__head">
              <i className="fa-solid fa-clipboard-list" aria-hidden /> جدول مشخصات
            </div>
            {specTable.map((s) => (
              <div className="spectbl__row" key={s.key}>
                <span className="spectbl__k">
                  <i className={`fa-solid ${s.icon}`} aria-hidden /> {s.label}
                </span>
                <span className="spectbl__v">{s.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      {product.description && (
        <section className="wrap sec product-desc">
          <div className="sec__kicker">دربارهٔ محصول</div>
          <h2 className="sec__title">توضیحات</h2>
          <div
            className="product-desc__body"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="wrap sec product-related">
          <div className="sec__kicker">پیشنهاد دشت‌زاد</div>
          <h2 className="sec__title">محصولات مرتبط</h2>
          <div className="related-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* TRUST STRIP */}
      <section className="wrap product-trust">
        <div className="trust-strip">
          <div className="trust-strip__item">
            <i className="fa-solid fa-truck-fast" aria-hidden />
            <span>
              <b>ارسال سریع</b>
              <span className="faint">تهران ۲۴ ساعته</span>
            </span>
          </div>
          <div className="trust-strip__item">
            <i className="fa-solid fa-shield-halved" aria-hidden />
            <span>
              <b>ضمانت اصالت</b>
              <span className="faint">تضمین کیفیت دشت‌زاد</span>
            </span>
          </div>
          <div className="trust-strip__item">
            <i className="fa-solid fa-rotate-left" aria-hidden />
            <span>
              <b>بازگشت ۷ روزه</b>
              <span className="faint">بدون قید و شرط</span>
            </span>
          </div>
          <div className="trust-strip__item">
            <i className="fa-solid fa-headset" aria-hidden />
            <span>
              <b>پشتیبانی</b>
              <span className="faint">همه‌روزه ۹ تا ۲۱</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
