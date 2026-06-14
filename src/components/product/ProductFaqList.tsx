import { Accordion } from "@/components/ui";
import type { FaqQA } from "@/lib/woo/view";

/** Product FAQ — thin wrapper over the design-system Accordion. */
export function ProductFaqList({ items }: { items: FaqQA[] }) {
  if (items.length === 0) return null;
  return (
    <Accordion
      className="pfaq"
      items={items.map((f, i) => ({ id: `faq-${i}`, head: f.q, body: <p>{f.a}</p> }))}
    />
  );
}
