import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "green" | "clay" | "gold";

const BADGE_TONE: Record<Tone, string> = {
  green: "",
  clay: "badge--clay",
  gold: "badge--gold",
};
const CHIP_TONE: Record<Tone, string> = {
  green: "chip--green",
  clay: "chip--clay",
  gold: "chip--gold",
};

/** Pill badge (rounded, filled). */
export function Badge({
  tone = "green",
  icon,
  className,
  children,
}: {
  tone?: Tone;
  icon?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("badge", BADGE_TONE[tone], className)}>
      {icon && <i className={`fa-solid ${icon}`} aria-hidden />}
      {children}
    </span>
  );
}

/** Soft inline chip/tag with an icon (feature facts, filters, …). */
export function Chip({
  tone,
  icon,
  block,
  className,
  children,
}: {
  tone?: Tone;
  icon?: string;
  block?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("chip", tone && CHIP_TONE[tone], block && "chip--block", className)}>
      {icon && <i className={`fa-solid ${icon}`} aria-hidden />}
      {children}
    </span>
  );
}
