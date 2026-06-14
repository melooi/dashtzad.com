import type { WooProduct } from "./types";
import { toFaDigits } from "@/lib/utils";

/**
 * Custom product specs (خاستگاه / تاریخ برداشت / روش خشک‌کردن / رطوبت …) live in
 * WooCommerce `meta_data` (populated by ACF / custom fields on the product).
 *
 * Field keys vary by WP setup, so each spec matches a list of candidate keys
 * (English slugs + Persian labels). The first non-empty match wins. This stays
 * the single place to adjust once the real ACF field keys are confirmed.
 */

export interface ProductSpec {
  /** stable key for React lists */
  key: string;
  /** Persian display label */
  label: string;
  /** display value (already digit-normalized) */
  value: string;
  /** Font Awesome icon (loaded globally) */
  icon: string;
}

interface SpecDef {
  key: string;
  label: string;
  icon: string;
  /** meta_data keys to match (case-insensitive, trimmed) */
  candidates: string[];
  /** appended when the value is a bare number, e.g. "18" → "۱۸٪" */
  unit?: string;
}

/** Curated ACF/meta specs, in display order. */
const SPEC_DEFS: SpecDef[] = [
  {
    key: "origin",
    label: "خاستگاه",
    icon: "fa-location-dot",
    candidates: ["origin", "product_origin", "_origin", "khastgah", "mabda", "خاستگاه", "مبدأ", "مبدا"],
  },
  {
    key: "harvest_date",
    label: "تاریخ برداشت",
    icon: "fa-calendar-day",
    candidates: [
      "harvest_date",
      "harvest",
      "harvesting_date",
      "tarikh_bardasht",
      "تاریخ برداشت",
      "تاریخ_برداشت",
      "زمان برداشت",
    ],
  },
  {
    key: "drying_method",
    label: "روش خشک‌کردن",
    icon: "fa-sun",
    candidates: [
      "drying_method",
      "drying",
      "dry_method",
      "ravesh_khoshk_kardan",
      "روش خشک‌کردن",
      "روش_خشک_کردن",
      "روش خشک کردن",
    ],
  },
  {
    key: "humidity",
    label: "رطوبت",
    icon: "fa-droplet",
    candidates: ["humidity", "moisture", "moisture_content", "rotubat", "رطوبت"],
    unit: "٪",
  },
];

/** Coerce a meta value (unknown JSON) to a trimmed display string, or undefined. */
function coerce(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : undefined;
  if (typeof value === "boolean") return value ? "بله" : "خیر";
  return undefined;
}

function findMeta(product: WooProduct, candidates: string[]): string | undefined {
  const wanted = new Set(candidates.map((c) => c.toLowerCase().trim()));
  for (const m of product.meta_data ?? []) {
    if (typeof m?.key === "string" && wanted.has(m.key.toLowerCase().trim())) {
      const v = coerce(m.value);
      if (v) return v;
    }
  }
  return undefined;
}

const BARE_NUMBER = /^[0-9]+([.,][0-9]+)?$/;

/** The curated custom specs present on this product (origin / harvest / drying / humidity …). */
export function extractProductSpecs(product: WooProduct): ProductSpec[] {
  const specs: ProductSpec[] = [];
  for (const def of SPEC_DEFS) {
    let value = findMeta(product, def.candidates);
    if (!value) continue;
    if (def.unit && BARE_NUMBER.test(value)) value = `${toFaDigits(value)}${def.unit}`;
    specs.push({ key: def.key, label: def.label, value, icon: def.icon });
  }
  return specs;
}

/**
 * Full spec table: curated ACF specs + WooCommerce product attributes
 * (e.g. وزن، بسته‌بندی) + intrinsic fields (SKU). Used for the spec table UI.
 */
export function buildSpecTable(product: WooProduct): ProductSpec[] {
  const rows = extractProductSpecs(product);

  for (const attr of product.attributes ?? []) {
    const value = (attr.options ?? []).filter(Boolean).join("، ");
    if (attr.name && value) {
      rows.push({ key: `attr-${attr.id}`, label: attr.name, value, icon: "fa-tag" });
    }
  }

  if (product.sku) {
    rows.push({ key: "sku", label: "کد محصول", value: product.sku, icon: "fa-barcode" });
  }

  return rows;
}
