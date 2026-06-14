import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Surface card. `pad` adds default padding, `hover` adds the lift/border-glow.
 *  Extra props (id, onSubmit, …) pass through to the underlying element. */
export function Card({
  pad,
  hover,
  as: Tag = "div",
  className,
  children,
  ...rest
}: {
  pad?: boolean;
  hover?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Tag className={cn("card", pad && "card--pad", hover && "card--hover", className)} {...rest}>
      {children}
    </Tag>
  );
}

/** Rounded-square icon container used across cards / list rows. */
export function IconBox({
  tone = "green",
  size = "md",
  round,
  icon,
  className,
  children,
}: {
  tone?: "green" | "clay" | "gold" | "ink";
  size?: "sm" | "md" | "lg";
  round?: boolean;
  icon?: string;
  className?: string;
  children?: ReactNode;
}) {
  const tones = { green: "", clay: "icon-box--clay", gold: "icon-box--gold", ink: "icon-box--ink" };
  const sizes = { sm: "icon-box--sm", md: "", lg: "icon-box--lg" };
  return (
    <span className={cn("icon-box", tones[tone], sizes[size], round && "icon-box--round", className)}>
      {icon ? <i className={`fa-solid ${icon}`} aria-hidden /> : children}
    </span>
  );
}
