"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { toFaDigits } from "@/lib/utils";
import type { ProductView } from "@/lib/woo/view";

function money(n: number): string {
  return `${toFaDigits(n.toLocaleString("en-US"))} تومان`;
}

/**
 * Product hero — info card (title, meta, weight + packaging selectors, features),
 * gallery, and the sticky buy box. Selection state (weight / packaging / qty) is
 * shared here because the selectors live in the info card while the price + CTA
 * live in the sticky sidebar (matches the design's LayoutCompact).
 */
export function ProductHero({ view }: { view: ProductView }) {
  const p = view.product;
  const addItem = useCart((s) => s.addItem);

  const [wid, setWid] = useState(() => (view.weights.find((w) => w.popular) ?? view.weights[0])?.id ?? "");
  const [pkg, setPkg] = useState(() => view.packaging[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [cashOpen, setCashOpen] = useState(false);
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
  const profit = oldP - finalP;
  const rate = view.cashDiscount ?? 0;
  const cashTotal = Math.round((finalP * (1 - rate / 100)) / 1000) * 1000;
  const cashSave = finalP - cashTotal;
  const FREE = 700000;
  const toFree = FREE - finalP * qty;

  const stockLeft = view.stockLeft ?? 0;
  const stockPct = view.stockOf > 0 ? Math.max(6, Math.min(100, (stockLeft / view.stockOf) * 100)) : 0;

  function add() {
    addItem(
      {
        productId: p.id,
        slug: p.slug,
        name: `${p.name}${w ? ` · ${w.label}` : ""}`,
        price: finalP,
        image: p.images[0]?.src,
      },
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
              {/* header */}
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
                </div>
              </div>

              {/* meta row */}
              <div className="zc-meta">
                {p.sku && (
                  <span className="zc-meta__i">
                    کد کالا: <b className="num" dir="ltr">{p.sku}</b>
                  </span>
                )}
                {p.rating_count > 0 && (
                  <>
                    <span className="zc-meta__sep" />
                    <a className="zc-meta__i" href="#reviews-section">
                      <i className="fa-solid fa-star" aria-hidden style={{ color: "var(--star)" }} />{" "}
                      <span className="num">{toFaDigits(p.average_rating).replace(".", "٫")}</span> امتیاز
                    </a>
                    <span className="zc-meta__sep" />
                    <a className="zc-meta__i" href="#reviews-section">
                      <span className="num">{toFaDigits(p.rating_count)}</span> دیدگاه
                    </a>
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
                {view.soldCount != null && (
                  <>
                    <span className="zc-meta__sep" />
                    <span className="zc-meta__i">
                      <span className="num">{toFaDigits(view.soldCount)}</span>+ فروش
                    </span>
                  </>
                )}
              </div>

              {/* weight selector */}
              {view.weights.length > 0 && (
                <div className="zc-field">
                  <label className="zc-field__lbl">وزن بسته</label>
                  <div className="wsel">
                    {view.weights.map((opt) => {
                      const o = opt.old ? Math.round((1 - opt.price / opt.old) * 100) : 0;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className="wsel__opt"
                          data-active={opt.id === wid}
                          onClick={() => setWid(opt.id)}
                        >
                          {opt.popular && <span className="wsel__pop">پرفروش</span>}
                          {sale && o > 0 && <span className="wsel__off num">٪{toFaDigits(o)}</span>}
                          <span className="wsel__label">{opt.label}</span>
                          <span className="wsel__now num">{money(opt.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* packaging selector */}
              {view.packaging.length > 0 && (
                <div className="zc-field">
                  <label className="zc-field__lbl">بسته‌بندی</label>
                  <div className="pkgsel">
                    {view.packaging.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className="pkg-opt"
                        data-active={opt.id === pkg}
                        onClick={() => setPkg(opt.id)}
                      >
                        <span className="pkg-opt__l">{opt.label}</span>
                        <span className="pkg-opt__n">{opt.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* feature badges */}
              {view.badges.length > 0 && (
                <div className="zc-field">
                  <h4 className="zc-field__h">ویژگی‌های اصلی</h4>
                  <div className="feat-chips">
                    {view.badges.map((b) => (
                      <span key={b.id} className="feat-chip">
                        <i className={`fa-solid ${b.icon}`} aria-hidden /> {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* gallery */}
            <div className="zc-gallery-col">
              <div className="zc-gallery">
                <div className="zc-gallery__main">
                  {view.badges.length > 0 && (
                    <div className="zc-gallery__badges">
                      <span className="badge badge--clay">
                        <i className="fa-solid fa-medal" aria-hidden /> ممتاز
                      </span>
                      {sale && (
                        <span className="badge badge--gold">
                          <i className="fa-solid fa-bolt" aria-hidden /> فروش ویژه
                        </span>
                      )}
                    </div>
                  )}
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

              {/* under-image: cash nudge + free shipping */}
              <div className="under-img">
                {rate > 0 && sale && (
                  <button
                    type="button"
                    className="cash-nudge"
                    data-open={cashOpen}
                    onClick={() => setCashOpen((o) => !o)}
                  >
                    {!cashOpen ? (
                      <span className="cash-nudge__teaser">
                        <span className="cash-nudge__spark">٪{toFaDigits(rate)}</span> تخفیف پرداخت نقدی
                        می‌خوای؟ بزن روی من
                      </span>
                    ) : (
                      <span className="cash-nudge__open">
                        <span>با پرداخت نقدی (درگاه دشت‌زاد)</span>
                        <span className="cash-nudge__price num">{money(cashTotal)}</span>
                        <span className="cash-nudge__save num">{money(cashSave)} سود</span>
                      </span>
                    )}
                  </button>
                )}
                <div className="freeship" data-done={toFree <= 0}>
                  <i className="fa-solid fa-truck-fast" aria-hidden />
                  {toFree <= 0 ? (
                    <span>
                      این سفارش <b>ارسال رایگان</b> دارد
                    </span>
                  ) : (
                    <span>
                      تا <b className="num">{money(toFree)}</b> دیگر تا ارسال رایگان
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sticky buy box */}
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
              <span className="zc-row__v faint">۱ تا ۴ روز کاری</span>
            </div>

            {view.inStock && stockLeft > 0 && stockLeft <= 10 && (
              <div className="stock zc-stock">
                <div className="stock__row">
                  <span className="stock__hot">
                    تنها <b className="num">{toFaDigits(stockLeft)}</b> عدد باقی مانده
                  </span>
                  <span className="faint">
                    از <span className="num">{toFaDigits(view.stockOf)}</span> عدد
                  </span>
                </div>
                <span className="stock__bar">
                  <span className="stock__fill zc-fuse" style={{ width: `${stockPct}%` }} />
                </span>
              </div>
            )}

            {view.inStock ? (
              <>
                <div className="zc-price">
                  {sale && off > 0 ? (
                    <>
                      <div className="zc-row">
                        <span className="zc-row__l">قیمت:</span>
                        <span className="zc-row__v zc-strike num">{money(oldP)}</span>
                      </div>
                      <div className="zc-row">
                        <span className="zc-row__l">سود خرید شما:</span>
                        <span className="zc-row__v is-ok">
                          <span className="discount-chip num">٪{toFaDigits(off)}</span>{" "}
                          <span className="num">{money(profit)}</span>
                        </span>
                      </div>
                      <div className="zc-row zc-row--b">
                        <span className="zc-row__l">قیمت نهایی:</span>
                        <span className="zc-row__v zc-final num">{money(finalP)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="zc-row zc-row--b">
                      <span className="zc-row__l">قیمت:</span>
                      <span className="zc-row__v zc-final num">{money(finalP)}</span>
                    </div>
                  )}
                </div>

                <div className="zc-qtyrow">
                  <span className="zc-row__l">تعداد</span>
                  <div className="qty">
                    <button
                      type="button"
                      className="qty__btn"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                      aria-label="کاهش"
                    >
                      <i className="fa-solid fa-minus" aria-hidden />
                    </button>
                    <span className="qty__n num">{toFaDigits(qty)}</span>
                    <button
                      type="button"
                      className="qty__btn"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="افزایش"
                    >
                      <i className="fa-solid fa-plus" aria-hidden />
                    </button>
                  </div>
                </div>

                <button type="button" className="btn btn--primary btn--block zc-cta" onClick={add}>
                  <i className={`fa-solid ${sale ? "fa-bolt" : "fa-cart-plus"}`} aria-hidden />{" "}
                  {sale ? "خرید با قیمت ویژه" : "افزودن به سبد خرید"}
                </button>
                <div className={`buy-ok${added ? " show" : ""}`} role="status" aria-live="polite">
                  <i className="fa-solid fa-circle-check" aria-hidden /> به سبد خرید افزوده شد
                </div>
                <button type="button" className="wishlist-link" onClick={() => setLiked((l) => !l)}>
                  <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"} aria-hidden /> افزودن به
                  علاقه‌مندی‌ها
                </button>
              </>
            ) : (
              <div className="zc-soldout">
                <p className="zc-soldout__t">
                  <i className="fa-solid fa-box" aria-hidden /> فعلاً تمام شد
                </p>
                <p className="zc-soldout__d">این محصول پرطرفدار به‌زودی دوباره شارژ می‌شود.</p>
                <a className="btn btn--ghost btn--block" href="#related-section">
                  <i className="fa-solid fa-boxes-stacked" aria-hidden /> محصولات مشابه
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
