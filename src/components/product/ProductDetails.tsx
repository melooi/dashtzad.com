import { Accordion, IconBox, Stat, Note } from "@/components/ui";
import { toFaDigits } from "@/lib/utils";
import type { ProductView } from "@/lib/woo/view";

/** ویژگی‌ها و مشخصات: مشخصات / ارزش غذایی / نگهداری — design-system Accordion. */
export function ProductDetails({ view }: { view: ProductView }) {
  const items = [];

  if (view.specTable.length > 0) {
    items.push({
      id: "spec",
      icon: "fa-box",
      head: "مشخصات محصول",
      body: (
        <div className="spec-grid">
          {view.specTable.map((s) => (
            <div className="spec-cell" key={s.key}>
              <IconBox size="sm" icon={s.icon} />
              <div>
                <div className="spec-cell__k faint">{s.label}</div>
                <div className="spec-cell__v">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (view.nutrition) {
    const n = view.nutrition;
    const macros = ["کربوهیدرات", "فیبر غذایی", "پروتئین"]
      .map((l) => n.rows.find((r) => r.label === l))
      .filter(Boolean) as { label: string; value: string }[];
    const detail = n.rows.filter((r) => r.label !== "انرژی");
    items.push({
      id: "nut",
      icon: "fa-leaf",
      head: "ارزش غذایی",
      body: (
        <div className="nut">
          <div className="nut__hero">
            <div className="nut__energy">
              <IconBox round icon="fa-sun" className="nut__energy-ic" />
              <Stat num={toFaDigits(n.energyKcal ?? 0)} label={`کیلوکالری ${n.serving}`} />
            </div>
            <div className="nut__macros">
              {macros.map((m) => (
                <Stat key={m.label} num={m.value.split(" ")[0]} label={m.label.replace(" غذایی", "")} />
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
                  <span className="stockbar nut__bar">
                    <span className="stockbar__fill nut__fill" style={{ width: `${Math.min(100, r.pct)}%` }} />
                  </span>
                )}
              </div>
            ))}
          </div>
          {n.note && <Note tone="gold" icon="fa-circle-info">{n.note}</Note>}
        </div>
      ),
    });
  }

  if (view.care.length > 0) {
    items.push({
      id: "care",
      icon: "fa-shield-halved",
      head: "نگهداری و فرآوری",
      body: (
        <div className="care">
          {view.care.map((r, i) => (
            <div className="care__row" key={i}>
              <IconBox icon={r.icon} />
              <div>
                <div className="care__k">{r.k}</div>
                <div className="care__v muted">{r.v}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (items.length === 0) return null;
  return <Accordion items={items} defaultOpenId={items[0]!.id} />;
}
