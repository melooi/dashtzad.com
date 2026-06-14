import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Callout / note box with a leading icon and tone. */
export function Note({
  tone,
  icon = "fa-circle-info",
  className,
  children,
}: {
  tone?: "clay" | "gold" | "green";
  icon?: string;
  className?: string;
  children: ReactNode;
}) {
  const tones = { clay: "note--clay", gold: "note--gold", green: "note--green" };
  return (
    <div className={cn("note", tone && tones[tone], className)}>
      <i className={`fa-solid ${icon}`} aria-hidden />
      <span>{children}</span>
    </div>
  );
}

/** Big number + label stat. */
export function Stat({ num, label, className }: { num: ReactNode; label: ReactNode; className?: string }) {
  return (
    <div className={cn("stat", className)}>
      <div className="stat__num num">{num}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

/** Image placeholder (used until real product/blog imagery exists). */
export function Placeholder({
  label,
  className,
  style,
}: {
  label?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("ph", className)} style={style}>
      {label && <span className="ph__label">{label}</span>}
    </div>
  );
}
