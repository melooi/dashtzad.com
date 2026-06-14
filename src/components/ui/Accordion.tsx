"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  /** head label (string or node) */
  head: ReactNode;
  /** optional leading icon class for the head, e.g. "fa-box" */
  icon?: string;
  body: ReactNode;
}

/**
 * Design-system accordion. `single` keeps only one item open at a time.
 * `defaultOpen` = id of the item open on mount (or "all" for none-forced).
 */
export function Accordion({
  items,
  single = true,
  defaultOpenId,
  className,
}: {
  items: AccordionItem[];
  single?: boolean;
  defaultOpenId?: string;
  className?: string;
}) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(defaultOpenId ? [defaultOpenId] : items[0] ? [items[0].id] : []),
  );

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(single ? [] : prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className={cn("accordion", className)}>
      {items.map((it) => {
        const isOpen = open.has(it.id);
        return (
          <div key={it.id} className={cn("accordion__item", isOpen && "is-open")}>
            <button type="button" className="accordion__head" onClick={() => toggle(it.id)} aria-expanded={isOpen}>
              <span className="accordion__head-l">
                {it.icon && (
                  <span className="icon-box icon-box--sm">
                    <i className={`fa-solid ${it.icon}`} aria-hidden />
                  </span>
                )}
                {it.head}
              </span>
              <i className="fa-solid fa-angle-down accordion__chev" aria-hidden />
            </button>
            <div className="accordion__body">
              <div className="accordion__inner">{it.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
