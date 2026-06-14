import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "clay" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "btn--primary",
  clay: "btn--clay",
  ghost: "btn--ghost",
};
const SIZE: Record<Size, string> = { sm: "btn--sm", md: "", lg: "btn--lg" };

function btnClass(variant: Variant = "primary", size: Size = "md", block?: boolean, className?: string) {
  return cn("btn", VARIANT[variant], SIZE[size], block && "btn--block", className);
}

interface Style {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

/** Design-system button (renders a <button>). */
export function Button({
  variant,
  size,
  block,
  className,
  children,
  ...rest
}: Style & { className?: string; children: ReactNode } & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={btnClass(variant, size, block, className)} {...rest}>
      {children}
    </button>
  );
}

/** Button-styled link (next/link). */
export function ButtonLink({
  variant,
  size,
  block,
  className,
  children,
  href,
  ...rest
}: Style & { href: string; className?: string; children: ReactNode } & Omit<
    ComponentProps<typeof Link>,
    "className" | "children" | "href"
  >) {
  return (
    <Link href={href} className={btnClass(variant, size, block, className)} {...rest}>
      {children}
    </Link>
  );
}
