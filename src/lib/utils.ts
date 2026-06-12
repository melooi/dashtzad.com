import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Slug policy (see CLAUDE.md): lowercase kebab-case, only `a-z 0-9 -`,
 * single hyphens, no leading/trailing hyphen. No spaces, Persian chars,
 * underscores, parentheses, or special characters.
 *
 * The front-end NEVER encodes/decodes or normalizes a Persian slug — any slug
 * that fails this check is rejected (notFound / dropped from sitemap), so a
 * Persian slug coming from WooCommerce surfaces as an error rather than working.
 */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert ASCII digits in a string to Persian digits. */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => faDigits[Number(d)]!);
}

/** Format a Toman price (Woo prices are strings) with thousands separators + Persian digits. */
export function formatToman(value: string | number): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return "";
  return `${toFaDigits(n.toLocaleString("en-US"))} تومان`;
}

/** Strip HTML tags from Woo description/short_description fields. */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Absolute URL on the storefront origin. */
export function absoluteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
