import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Full-bleed page hero (dark green by default, clay variant). Place inside the page wrapper. */
export function Hero({
  kicker,
  title,
  sub,
  chips,
  tone,
  className,
  children,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  chips?: ReactNode;
  tone?: "clay";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section className={cn("hero", tone === "clay" && "hero--clay", className)}>
      <div className="wrap">
        <div className="hero__inner">
          {kicker && <span className="hero__kicker">{kicker}</span>}
          <h1 className="hero__title">{title}</h1>
          {sub && <p className="hero__sub">{sub}</p>}
          {chips && <div className="hero__chips">{chips}</div>}
          {children}
        </div>
      </div>
    </section>
  );
}
