"use client";

import { useState } from "react";
import { toFaDigits } from "@/lib/utils";
import type { ProductQuestion, ProductView } from "@/lib/woo/view";

function QACard({ q }: { q: ProductQuestion }) {
  const [voted, setVoted] = useState(false);
  const votes = (q.votes ?? 0) + (voted ? 1 : 0);
  const answered = !!(q.a && q.a.trim());
  const isExpert = q.role !== "user";
  return (
    <div className="qa-card">
      <div className="qa-card__q">
        <span className="qa-card__qmark">؟</span>
        <div>
          <p className="qa-card__qt">{q.q}</p>
          <div className="faint qa-card__meta">
            {q.user} · {q.date}
          </div>
        </div>
      </div>
      {answered ? (
        <div className={`qa-card__a${isExpert ? " is-expert" : ""}`}>
          <span className="qa-card__avatar">
            {isExpert ? <i className="fa-solid fa-check" aria-hidden /> : (q.by ?? "؟").charAt(0)}
          </span>
          <div>
            <div className="qa-card__by-row">
              <b className="qa-card__by">{q.by}</b>
              {isExpert ? (
                <span className="badge qa-card__tag">
                  <i className="fa-solid fa-check" aria-hidden /> پاسخ رسمی
                </span>
              ) : (
                <span className="badge badge--clay qa-card__tag">
                  <i className="fa-regular fa-user" aria-hidden /> خریدار
                </span>
              )}
            </div>
            <p className="muted qa-card__at">{q.a}</p>
          </div>
        </div>
      ) : (
        <div className="qa-card__pending faint">
          <i className="fa-solid fa-phone" aria-hidden /> پرسش شما ثبت شد؛ کارشناسان دشت‌زاد به‌زودی پاسخ
          می‌دهند.
        </div>
      )}
      {answered && (
        <div className="review-foot">
          <span className="review-rec">
            <i className="fa-solid fa-check" aria-hidden /> {isExpert ? "پاسخ تأییدشده" : "پاسخ یک خریدار"}
          </span>
          <button type="button" className="review-helpful" data-on={voted} onClick={() => setVoted((v) => !v)}>
            <i className="fa-regular fa-thumbs-up" aria-hidden /> این پاسخ مفید بود{" "}
            {votes > 0 && <span className="num">({toFaDigits(votes)})</span>}
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductQA({ view }: { view: ProductView }) {
  const [formOpen, setFormOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [extra, setExtra] = useState<ProductQuestion[]>([]);

  if (view.questions.length === 0) return null;

  const all = [...extra, ...view.questions];
  const visible = expanded ? all : all.slice(0, 2);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("qName") as HTMLInputElement).value.trim();
    const text = (form.elements.namedItem("qText") as HTMLTextAreaElement).value.trim();
    if (!name || !text) return;
    setExtra((x) => [{ user: name, date: "همین حالا", q: text, votes: 0 }, ...x]);
    form.reset();
    setFormOpen(false);
    setThanks(true);
    window.setTimeout(() => setThanks(false), 6000);
  }

  return (
    <div className="qa">
      <div className="card qa-bar">
        <div className="qa-bar__l">
          <span className="qa-bar__ic">
            <i className="fa-regular fa-circle-question" aria-hidden />
          </span>
          <div>
            <b className="qa-bar__t">پرسش و پاسخ</b>
            <div className="faint">
              <span className="num">{toFaDigits(all.length)}</span> پرسش درباره این محصول
            </div>
          </div>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setFormOpen((o) => !o)}>
          <i className="fa-solid fa-plus" aria-hidden /> پرسش خود را بپرسید
        </button>
      </div>

      {thanks && (
        <div className="form-ok">
          <i className="fa-solid fa-circle-check" aria-hidden /> با تشکر! پرسش شما ثبت شد؛ به‌محض پاسخ، از طریق
          پیامک به شماره‌ی شما اطلاع می‌دهیم.
        </div>
      )}

      {formOpen && (
        <form className="card review-form" onSubmit={submit}>
          <h4 className="review-form__h">پرسش خود را بپرسید</h4>
          <div className="review-form__row">
            <input name="qName" placeholder="نام شما" required />
            <input name="qPhone" type="tel" placeholder="شماره تماس (برای اطلاع پاسخ)" dir="ltr" />
          </div>
          <textarea name="qText" placeholder="سؤال‌تان درباره این محصول را بنویسید…" required />
          <div className="review-form__actions">
            <button type="submit" className="btn btn--primary">
              <i className="fa-solid fa-check" aria-hidden /> ثبت پرسش
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setFormOpen(false)}>
              انصراف
            </button>
          </div>
        </form>
      )}

      <div className="qa-list">
        {visible.map((q, i) => (
          <QACard key={i} q={q} />
        ))}
      </div>

      {all.length > 2 && (
        <button type="button" className="btn btn--ghost qa-more" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "نمایش کمتر" : `نمایش ${toFaDigits(all.length - 2)} پرسش دیگر`}
          <i className={`fa-solid fa-angle-down${expanded ? " is-up" : ""}`} aria-hidden />
        </button>
      )}
    </div>
  );
}
