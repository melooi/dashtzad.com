"use client";

import { useState } from "react";
import { toFaDigits } from "@/lib/utils";
import type { ProductView, Review } from "@/lib/woo/view";

function Stars({ value }: { value: number }) {
  const v = Math.round(value);
  return (
    <span className="stars" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i} className={i < v ? "fa-solid fa-star" : "fa-regular fa-star"} />
      ))}
    </span>
  );
}

function ReviewItem({ r }: { r: Review }) {
  const [helped, setHelped] = useState(false);
  const count = (r.helpful ?? 0) + (helped ? 1 : 0);
  return (
    <div className="rev-card">
      <div className="rev-card__head">
        <span className="rev-card__avatar">{r.name.charAt(0)}</span>
        <div className="rev-card__who">
          <div className="rev-card__name-row">
            <span className="rev-card__name">{r.name}</span>
            {r.verified && (
              <span className="badge rev-card__verified">
                <i className="fa-solid fa-check" aria-hidden /> خرید تأییدشده
              </span>
            )}
          </div>
          <div className="faint rev-card__meta">
            {r.city} · {r.date}
          </div>
        </div>
        <Stars value={r.rating} />
      </div>
      <p className="rev-card__text muted">{r.text}</p>
      <div className="review-foot">
        {r.recommend && (
          <span className="review-rec">
            <i className="fa-solid fa-check" aria-hidden /> این محصول را توصیه می‌کنم
          </span>
        )}
        <button
          type="button"
          className="review-helpful"
          data-on={helped}
          onClick={() => setHelped((h) => !h)}
        >
          <i className="fa-regular fa-thumbs-up" aria-hidden /> مفید بود{" "}
          {count > 0 && <span className="num">({toFaDigits(count)})</span>}
        </button>
      </div>
    </div>
  );
}

export function ProductReviews({ view }: { view: ProductView }) {
  const p = view.product;
  const [expanded, setExpanded] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [extra, setExtra] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  if (view.reviews.length === 0 && view.ratingBreakdown.length === 0) return null;

  const all = [...extra, ...view.reviews];
  const total = view.ratingBreakdown.reduce((a, b) => a + b.count, 0) || all.length || 1;
  const recPct = Math.round(
    (view.ratingBreakdown.filter((b) => b.stars >= 4).reduce((a, b) => a + b.count, 0) / total) * 100,
  );
  const visible = expanded ? all : all.slice(0, 1);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("rvName") as HTMLInputElement).value.trim();
    const text = (form.elements.namedItem("rvText") as HTMLTextAreaElement).value.trim();
    if (!name || !text) return;
    setExtra((x) => [
      { name, city: "دیدگاه شما", rating, date: "همین حالا", recommend: rating >= 4, helpful: 0, text },
      ...x,
    ]);
    form.reset();
    setRating(5);
    setFormOpen(false);
    setExpanded(true);
    setThanks(true);
    window.setTimeout(() => setThanks(false), 6000);
  }

  return (
    <div className="reviews">
      <div className="card rev-head">
        <div className="rev-head__score">
          <div className="display num rev-head__num">{toFaDigits(p.average_rating).replace(".", "٫")}</div>
          <Stars value={Number(p.average_rating)} />
          <div className="faint rev-head__count">از {toFaDigits(p.rating_count)} دیدگاه</div>
        </div>
        {view.ratingBreakdown.length > 0 && (
          <>
            <div className="rev-head__rec">
              <i className="fa-solid fa-circle-check" aria-hidden />
              <div>
                <b className="num">٪{toFaDigits(recPct)}</b>
                <div className="faint">پیشنهاد خریداران</div>
              </div>
            </div>
            <div className="rev-head__bars">
              {view.ratingBreakdown.map((b) => (
                <div className="rev-bar" key={b.stars}>
                  <span className="num">{toFaDigits(b.stars)}</span>
                  <i className="fa-solid fa-star" aria-hidden style={{ color: "var(--star)" }} />
                  <span className="rev-bar__track">
                    <span className="rev-bar__fill" style={{ width: `${(b.count / total) * 100}%` }} />
                  </span>
                  <span className="num faint rev-bar__n">{toFaDigits(b.count)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {thanks && (
        <div className="form-ok">
          <i className="fa-solid fa-circle-check" aria-hidden /> با تشکر از نظر شما! دیدگاه‌تان ثبت شد و پس از
          بررسی منتشر می‌شود.
        </div>
      )}

      <div className="rev-list">
        {visible.map((r, i) => (
          <ReviewItem key={i} r={r} />
        ))}
      </div>

      <div className="rev-actions">
        {all.length > 1 && (
          <button type="button" className="btn btn--ghost" onClick={() => setExpanded((e) => !e)}>
            {expanded ? "نمایش کمتر" : `نمایش ${toFaDigits(all.length - 1)} دیدگاه دیگر`}
            <i className={`fa-solid fa-angle-down${expanded ? " is-up" : ""}`} aria-hidden />
          </button>
        )}
        <button type="button" className="btn btn--primary" onClick={() => setFormOpen((o) => !o)}>
          <i className="fa-solid fa-plus" aria-hidden /> ثبت دیدگاه
        </button>
      </div>

      {formOpen && (
        <form className="card review-form" onSubmit={submit}>
          <h4 className="review-form__h">ثبت دیدگاه شما</h4>
          <div className="review-form__rate">
            <span className="muted">امتیاز شما:</span>
            <span className="star-pick">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  type="button"
                  key={i}
                  className={(hover || rating) >= i ? "is-on" : ""}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                  aria-label={`${i} ستاره`}
                >
                  <i className={(hover || rating) >= i ? "fa-solid fa-star" : "fa-regular fa-star"} aria-hidden />
                </button>
              ))}
            </span>
          </div>
          <div className="review-form__row">
            <input name="rvName" placeholder="نام شما" required />
            <input name="rvPhone" type="tel" placeholder="شماره تماس" dir="ltr" />
          </div>
          <textarea name="rvText" placeholder="تجربه‌تان از این محصول را بنویسید…" required />
          <div className="review-form__actions">
            <button type="submit" className="btn btn--primary">
              <i className="fa-solid fa-check" aria-hidden /> ثبت دیدگاه
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setFormOpen(false)}>
              انصراف
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
