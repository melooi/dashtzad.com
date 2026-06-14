"use client";

import { useState } from "react";
import { Button, Card, FormOk, FormRow, IconBox, Input, Textarea } from "@/components/ui";
import { toFaDigits } from "@/lib/utils";
import type { ProductQuestion, ProductView } from "@/lib/woo/view";

function QACard({ q }: { q: ProductQuestion }) {
  const [voted, setVoted] = useState(false);
  const votes = (q.votes ?? 0) + (voted ? 1 : 0);
  const answered = !!(q.a && q.a.trim());
  const isExpert = q.role !== "user";
  return (
    <Card pad className="qa-card">
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
          <span className={`avatar avatar--sm${isExpert ? " avatar--green" : ""}`}>
            {isExpert ? <i className="fa-solid fa-check" aria-hidden /> : (q.by ?? "؟").charAt(0)}
          </span>
          <div>
            <div className="qa-card__by-row">
              <b className="qa-card__by">{q.by}</b>
              <span className={`badge${isExpert ? "" : " badge--clay"} qa-card__tag`}>
                <i className={`fa-solid ${isExpert ? "fa-check" : "fa-user"}`} aria-hidden />{" "}
                {isExpert ? "پاسخ رسمی" : "خریدار"}
              </span>
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
    </Card>
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
      <Card pad className="qa-bar">
        <div className="qa-bar__l">
          <IconBox icon="fa-circle-question" />
          <div>
            <b className="qa-bar__t">پرسش و پاسخ</b>
            <div className="faint">
              <span className="num">{toFaDigits(all.length)}</span> پرسش درباره این محصول
            </div>
          </div>
        </div>
        <Button onClick={() => setFormOpen((o) => !o)}>
          <i className="fa-solid fa-plus" aria-hidden /> پرسش خود را بپرسید
        </Button>
      </Card>

      <FormOk show={thanks}>پرسش شما ثبت شد؛ به‌محض پاسخ، پیامک می‌کنیم.</FormOk>

      {formOpen && (
        <Card as="form" pad className="review-form" onSubmit={submit}>
          <h4 className="review-form__h">پرسش خود را بپرسید</h4>
          <FormRow cols={2}>
            <Input name="qName" placeholder="نام شما" required />
            <Input name="qPhone" type="tel" placeholder="شماره تماس (برای اطلاع پاسخ)" dir="ltr" />
          </FormRow>
          <Textarea name="qText" placeholder="سؤال‌تان درباره این محصول را بنویسید…" required />
          <div className="review-form__actions">
            <Button type="submit">
              <i className="fa-solid fa-check" aria-hidden /> ثبت پرسش
            </Button>
            <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>
              انصراف
            </Button>
          </div>
        </Card>
      )}

      <div className="qa-list">
        {visible.map((q, i) => (
          <QACard key={i} q={q} />
        ))}
      </div>

      {all.length > 2 && (
        <Button variant="ghost" className="qa-more" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "نمایش کمتر" : `نمایش ${toFaDigits(all.length - 2)} پرسش دیگر`}
          <i className={`fa-solid fa-angle-down${expanded ? " is-up" : ""}`} aria-hidden />
        </Button>
      )}
    </div>
  );
}
