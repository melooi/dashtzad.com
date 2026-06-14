"use client";

import { useState, type ReactNode } from "react";
import { Badge, Button, Chip, IconBox, Price } from "@/components/ui";
import { useCart } from "@/store/cart";
import { formatToman, toFaDigits } from "@/lib/utils";
import type { ProductView } from "@/lib/woo/view";

/**
 * Product hero — info card (title, meta, weight + packaging via OptionGrid,
 * feature chips), gallery, and the sticky buy box. Selection state is shared
 * because the selectors live in the info card while price + CTA live in the
 * sidebar. Body sections render as children inside the main column.
 */
export function ProductHero({ view, children }: { view: ProductView; children?: ReactNode }) {
  const p = view.product;
  const addItem = useCart((s) => s.addItem);

  const [wid, setWid] = useState(() => (view.weights.find((w) => w.popular) ?? view.weights[0])?.id ?? "");
  const [pkg, setPkg] = useState(() => view.packaging[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [active, setActive] = useState(0);

  const w = view.weights.find((x) => x.id === wid) ?? view.weights[0];
  const pk = view.packaging.find((x) => x.id === pkg);
  const extra = pk?.extra ?? 0;
  const sale = p.on_sale;
  const finalP = (w?.price ?? 0) + extra;
  const oldP = (w?.old ?? w?.price ?? 0) + extra;
  const off = w?.old ? Math.round((1 - w.price / w.old) * 100) : 0;

  const ratingVal = Number(p.average_rating);
  const reviewCount =
    view.ratingBreakdown.reduce((a, b) => a + b.count, 0) || view.reviews.length || p.rating_count;
  const stockLeft = view.stockLeft ?? 0;
  const stockPct = view.stockOf > 0 ? Math.max(6, Math.min(100, (stockLeft / view.stockOf) * 100)) : 0;

  function add() {
    addItem(
      { productId: p.id, slug: p.slug, name: `${p.name}${w ? ` · ${w.label}` : ""}`, price: finalP, image: p.images[0]?.src },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  const mainImg = view.gallery[active] ?? view.gallery[0];

  return (
    <section className="wrap product-hero">
      <div className="zc-page">
        <div className="zc-page__main">
          <div className="card zc-info">
            <div className="zc-info__body">
              <div className="zc-head">
                <div className="zc-head__t">
                  <h1 className="zc-title display">{p.name}</h1>
                  {view.latin && (
                    <div className="zc-latin" dir="ltr">
                      {view.latin}
                    </div>
                  )}
                </div>
                <div className="zc-head__actions">
                  <button
                    type="button"
                    className={`zc-iconbtn${liked ? " is-on" : ""}`}
                    aria-label="افزودن به علاقه‌مندی‌ها"
                    aria-pressed={liked}
                    onClick={() => setLiked((l) => !l)}
                  >
                    <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"} aria-hidden />
                  </button>
                  <button type="button" className="zc-iconbtn" aria-label="اشتراک‌گذاری">
                    <i className="fa-solid fa-share-nodes" aria-hidden />
                  </button>
                </div>
              </div>

              <div className="zc-meta">
                {p.sku && (
                  <span className="zc-meta__i">
                    کد کالا:{" "}
                    <b className="num" dir="ltr">
                      {p.sku}
                    </b>
                  </span>
                )}
                {ratingVal > 0 && (
                  <>
                    <span className="zc-meta__sep" />
                    <a className="zc-meta__i" href="#reviews-section">
                      <i className="fa-solid fa-star" aria-hidden style={{ color: "var(--star)" }} />{" "}
                      <span className="num">{toFaDigits(p.average_rating).replace(".", "٫")}</span> امتیاز
                    </a>
                    {reviewCount > 0 && (
                      <>
                        <span className="zc-meta__sep" />
                        <a className="zc-meta__i" href="#reviews-section">
                          <span className="num">{toFaDigits(reviewCount)}</span> دیدگاه
                        </a>
                      </>
                    )}
                  </>
                )}
                {view.questions.length > 0 && (
                  <>
                    <span className="zc-meta__sep" />
                    <a className="zc-meta__i" href="#questions-section">
                      <span className="num">{toFaDigits(view.questions.length)}</span> پرسش
                    </a>
                  </>
                )}
              </div>

              {view.weights.length > 0 && (
                <div className="zc-field">
                  <label className="zc-field__lbl">وزن بسته</label>
                  <div className="option-grid option-grid--3">
                    {view.weights.map((opt) => {
                      const o = opt.old ? Math.round((1 - opt.price / opt.old) * 100) : 0;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className="option"
                          data-active={opt.id === wid}
                          onClick={() => setWid(opt.id)}
                        >
                          {opt.popular && <span className="option__pop">پرفروش</span>}
                          {sale && o > 0 && <span className="option__off num">٪{toFaDigits(o)}</span>}
                          <span className="option__label">{opt.label}</span>
                          <span className="option__meta num">{formatToman(opt.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {view.packaging.length > 0 && (
                <div className="zc-field">
                  <label className="zc-field__lbl">بسته‌بندی</label>
                  <div className="option-grid option-grid--row">
                    {view.packaging.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className="option option--start"
                        data-active={opt.id === pkg}
                        onClick={() => setPkg(opt.id)}
                      >
                        <span className="option__label">{opt.label}</span>
                        <span className="option__meta">{opt.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {view.badges.length > 0 && (
                <div className="zc-field">
                  <h4 className="zc-field__h">ویژگی‌های اصلی</h4>
                  <div className="zc-feats">
                    {view.badges.map((b) => (
                      <Chip key={b.id} icon={b.icon}>
                        {b.label}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="zc-gallery-col">
              <div className="zc-gallery">
                <div className="zc-gallery__main">
                  <div className="zc-gallery__badges">
                    <Badge tone="clay" icon="fa-medal">
                      ممتاز
                    </Badge>
                    {sale ? (
                      <Badge tone="gold" icon="fa-bolt">
                        فروش ویژه
                      </Badge>
                    ) : (
                      <Badge tone="gold" icon="fa-apple-whole">
                        طعم شیرین
                      </Badge>
                    )}
                  </div>
                  <div className="ph zc-gallery__ph">
                    {mainImg?.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={mainImg.src} alt={mainImg.label} />
                    ) : (
                      <span className="ph__label">{mainImg?.label ?? p.name}</span>
                    )}
                  </div>
                  <span className="zc-gallery__count num">
                    {toFaDigits(active + 1)} / {toFaDigits(view.gallery.length)}
                  </span>
                </div>
                {view.gallery.length > 1 && (
                  <div className="zc-gallery__thumbs">
                    {view.gallery.map((g, i) => (
                      <button
                        key={g.id}
                        type="button"
                        className="zc-gallery__thumb"
                        data-active={i === active}
                        onClick={() => setActive(i)}
                        aria-label={`تصویر ${i + 1}`}
                      >
                        <span className="ph zc-thumb__ph">
                          {g.src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={g.src} alt={g.label} />
                          ) : (
                            <span className="ph__label num">۰{toFaDigits(i + 1)}</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="freeship" data-done={700000 - finalP * qty <= 0}>
                <i className="fa-solid fa-truck-fast" aria-hidden />
                {700000 - finalP * qty <= 0 ? (
                  <span>
                    این سفارش <b>ارسال رایگان</b> دارد
                  </span>
                ) : (
                  <span>
                    تا <b className="num">{formatToman(700000 - finalP * qty)}</b> دیگر تا ارسال رایگان
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* body sections live in the main column, alongside the sticky buy box */}
          {children}
        </div>

        <aside className="zc-page__side">
          <div className="card zc-buy">
            <div className="zc-row">
              <span className="zc-row__l">وضعیت محصول:</span>
              <span className={`zc-row__v ${view.inStock ? "is-ok" : "is-out"}`}>
                {view.inStock ? "موجود در انبار" : "ناموجود"}
              </span>
            </div>
            <div className="zc-row zc-row--b">
              <span className="zc-row__l">زمان و هزینه ارسال:</span>
              <button type="button" className="zc-link">
                مشاهده <i className="fa-solid fa-angle-left" aria-hidden />
              </button>
            </div>

            {view.inStock && stockLeft > 0 && stockLeft <= 10 && (
              <div className="zc-stock">
                <div className="zc-stock__row">
                  <span className="zc-stock__hot">
                    تنها <b className="num">{toFaDigits(stockLeft)}</b> عدد باقی مانده
                  </span>
                  <span className="faint">
                    از <span className="num">{toFaDigits(view.stockOf)}</span> عدد
                  </span>
                </div>
                <span className="stockbar zc-fuse">
                  <span className="stockbar__fill" style={{ width: `${stockPct}%` }} />
                </span>
              </div>
            )}

            {view.inStock ? (
              <>
                <div className="zc-row zc-row--b zc-pricerow">
                  <span className="zc-row__l">قیمت:</span>
                  <Price now={finalP} old={sale && off > 0 ? oldP : undefined} off={sale ? off : undefined} />
                </div>

                <div className="zc-qtyrow">
                  <span className="zc-row__l">تعداد</span>
                  <div className="qty">
                    <button type="button" className="qty__btn" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="افزایش">
                      <i className="fa-solid fa-plus" aria-hidden />
                    </button>
                    <span className="qty__n num">{toFaDigits(qty)}</span>
                    <button type="button" className="qty__btn" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="کاهش">
                      <i className="fa-solid fa-minus" aria-hidden />
                    </button>
                  </div>
                </div>

                <Button block className="zc-cta" onClick={add}>
                  <i className={`fa-solid ${sale ? "fa-bolt" : "fa-cart-plus"}`} aria-hidden />{" "}
                  {sale ? "خرید با قیمت ویژه" : "افزودن به سبد خرید"}
                </Button>
                <div className={`form-ok zc-ok${added ? " show" : ""}`} role="status" aria-live="polite">
                  <i className="fa-solid fa-circle-check" aria-hidden /> به سبد خرید افزوده شد
                </div>
              </>
            ) : (
              <div className="zc-soldout">
                <p className="zc-soldout__t">
                  <IconBox tone="clay" size="sm" icon="fa-box" /> فعلاً تمام شد
                </p>
                <p className="zc-soldout__d">این محصول پرطرفدار به‌زودی دوباره شارژ می‌شود.</p>
                <a className="btn btn--ghost btn--block" href="#related-section">
                  <i className="fa-solid fa-boxes-stacked" aria-hidden /> محصولات مشابه
                </a>
              </div>
            )}

            <ul className="zc-trust">
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
        </aside>
      </div>
    </section>
  );
}
