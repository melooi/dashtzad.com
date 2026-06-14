"use client";

import { useState } from "react";
import { toFaDigits } from "@/lib/utils";
import type { ProductView } from "@/lib/woo/view";

/** Accordion: مشخصات محصول / ارزش غذایی / نگهداری و فرآوری. */
export function ProductDetails({ view }: { view: ProductView }) {
  const panels = [
    view.specTable.length > 0 && { id: "spec", title: "مشخصات محصول", icon: "fa-box" },
    view.nutrition && { id: "nut", title: "ارزش غذایی", icon: "fa-leaf" },
    view.care.length > 0 && { id: "care", title: "نگهداری و فرآوری", icon: "fa-shield-halved" },
  ].filter(Boolean) as { id: string; title: string; icon: string }[];

  const [open, setOpen] = useState<string>(panels[0]?.id ?? "");

  if (panels.length === 0) return null;

  return (
    <div className="details-acc">
      {panels.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className={`details-acc__item${isOpen ? " is-open" : ""}`}>
            <button type="button" className="details-acc__head" onClick={() => setOpen(isOpen ? "" : it.id)}>
              <span className="details-acc__t">
                <span className="details-acc__ic">
                  <i className={`fa-solid ${it.icon}`} aria-hidden />
                </span>
                {it.title}
              </span>
              <i className="fa-solid fa-angle-down details-acc__chev" aria-hidden />
            </button>
            <div className="details-acc__body">
              <div className="details-acc__inner">
                {it.id === "spec" && <SpecTable view={view} />}
                {it.id === "nut" && view.nutrition && <NutritionTable view={view} />}
                {it.id === "care" && <CareList view={view} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SpecTable({ view }: { view: ProductView }) {
  return (
    <div className="spec-grid">
      {view.specTable.map((s) => (
        <div className="spec-cell" key={s.key}>
          <span className="spec-cell__ic">
            <i className={`fa-solid ${s.icon}`} aria-hidden />
          </span>
          <div className="spec-cell__b">
            <div className="spec-cell__k">{s.label}</div>
            <div className="spec-cell__v">{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NutritionTable({ view }: { view: ProductView }) {
  const n = view.nutrition!;
  const macros = ["کربوهیدرات", "فیبر غذایی", "پروتئین"]
    .map((l) => n.rows.find((r) => r.label === l))
    .filter(Boolean) as { label: string; value: string }[];
  const detail = n.rows.filter((r) => r.label !== "انرژی");
  return (
    <div className="nut">
      <div className="nut__hero">
        <div className="nut__energy">
          <span className="nut__energy-ic">
            <i className="fa-solid fa-sun" aria-hidden />
          </span>
          <div>
            <div className="nut__kcal display num">{toFaDigits(n.energyKcal ?? 0)}</div>
            <div className="faint">کیلوکالری {n.serving}</div>
          </div>
        </div>
        <div className="nut__macros">
          {macros.map((m) => (
            <div className="nut__macro" key={m.label}>
              <div className="num nut__macro-v">{m.value.split(" ")[0]}</div>
              <div className="faint">{m.label.replace(" غذایی", "")}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="nut__rows">
        {detail.map((r) => (
          <div className="nut__row" key={r.label}>
            <div className="nut__row-top">
              <span className="nut__row-l">{r.label}</span>
              <span className="num nut__row-v">{r.value}</span>
            </div>
            {r.pct != null && (
              <span className="nut__bar">
                <span className="nut__fill" style={{ width: `${Math.min(100, r.pct)}%` }} />
              </span>
            )}
          </div>
        ))}
      </div>
      {n.note && <p className="nut__note faint">{n.note}</p>}
    </div>
  );
}

function CareList({ view }: { view: ProductView }) {
  return (
    <div className="care">
      {view.care.map((r, i) => (
        <div className="care__row" key={i}>
          <span className="care__ic">
            <i className={`fa-solid ${r.icon}`} aria-hidden />
          </span>
          <div>
            <div className="care__k">{r.k}</div>
            <div className="care__v muted">{r.v}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
