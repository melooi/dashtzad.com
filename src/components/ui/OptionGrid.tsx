"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OptionItem {
  id: string;
  label: ReactNode;
  /** secondary line under the label */
  meta?: ReactNode;
  /** "پرفروش"-style badge above the option */
  popular?: ReactNode;
  /** discount marker, e.g. "٪۲۳" */
  off?: ReactNode;
}

/**
 * Selectable option grid (weight / packaging / any single-choice). Controlled.
 * layout "grid" = centered tiles (N columns); "rows" = left-aligned label+meta.
 */
export function OptionGrid({
  options,
  value,
  onChange,
  layout = "grid",
  columns = 3,
  className,
}: {
  options: OptionItem[];
  value: string;
  onChange: (id: string) => void;
  layout?: "grid" | "rows";
  columns?: 2 | 3;
  className?: string;
}) {
  const isRows = layout === "rows";
  return (
    <div
      className={cn(
        "option-grid",
        isRows ? "option-grid--row" : columns === 2 ? "option-grid--2" : "option-grid--3",
        className,
      )}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={cn("option", isRows && "option--start")}
          data-active={o.id === value}
          onClick={() => onChange(o.id)}
        >
          {o.popular && <span className="option__pop">{o.popular}</span>}
          {o.off && <span className="option__off num">{o.off}</span>}
          <span className="option__label">{o.label}</span>
          {o.meta && <span className="option__meta">{o.meta}</span>}
        </button>
      ))}
    </div>
  );
}
