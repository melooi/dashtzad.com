import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StepItem {
  /** number/label shown in the circle (e.g. ۱ or a check) */
  num: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
  state?: "done" | "pending";
}

/** Vertical numbered steps / status timeline. */
export function Steps({ items, className }: { items: StepItem[]; className?: string }) {
  return (
    <div className={cn("steps", className)}>
      {items.map((s, i) => (
        <div className="steps__item" key={i}>
          <span
            className={cn(
              "steps__num",
              s.state === "done" && "steps__num--done",
              s.state === "pending" && "steps__num--pending",
            )}
          >
            {s.num}
          </span>
          <div className="steps__b">
            <div className="steps__t">{s.title}</div>
            {s.desc && <div className="steps__d">{s.desc}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
