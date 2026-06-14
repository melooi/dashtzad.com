import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section heading block: kicker (eyebrow) + title + optional sub, with optional right-side action. */
export function SectionHead({
  kicker,
  title,
  sub,
  action,
  center,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("sec-head", center && "sec-head--center", className)}>
      <div className="sec-head__l">
        {kicker && <span className="sec__kicker">{kicker}</span>}
        <h2 className="sec__title">{title}</h2>
        {sub && <p className="sec__sub">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
