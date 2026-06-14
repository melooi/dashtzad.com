import { cn, formatToman, toFaDigits } from "@/lib/utils";

/** Price block with optional strikethrough old price and discount chip. */
export function Price({
  now,
  old,
  off,
  size = "md",
  className,
}: {
  now: number | string;
  old?: number | string | null;
  /** discount percent (number) → renders a clay chip */
  off?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span className={cn("price", size === "lg" && "price--lg", size === "sm" && "price--sm", className)}>
      {old != null && old !== "" && <span className="price__old num">{formatToman(old)}</span>}
      <span className="price__now num">{formatToman(now)}</span>
      {off != null && off > 0 && (
        <span className="discount-chip num">٪{toFaDigits(off)} تخفیف</span>
      )}
    </span>
  );
}

/** Five-star rating display (rounded). */
export function Stars({ value = 5, className }: { value?: number; className?: string }) {
  const v = Math.round(value);
  return (
    <span className={cn("stars", className)} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i} className={i < v ? "fa-solid fa-star" : "fa-regular fa-star"} />
      ))}
    </span>
  );
}

/** Compact amber rating chip (★ value). */
export function RatingChip({ value, count }: { value: number | string; count?: number }) {
  return (
    <span className="rating-chip">
      <i className="fa-solid fa-star" aria-hidden />
      <span className="num">{toFaDigits(String(value)).replace(".", "٫")}</span>
      {count != null && <span className="faint">({toFaDigits(count)})</span>}
    </span>
  );
}
