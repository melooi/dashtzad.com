import type { WooProduct } from "./types";
import { buildSpecTable, extractProductSpecs, type ProductSpec } from "./specs";

/**
 * ProductView — the full view-model the product page renders, assembled from a
 * WooCommerce product. Rich, design-specific data (weights, nutrition, reviews,
 * Q&A, FAQ, …) lives in `meta_data` as JSON (ACF-style); each piece is optional,
 * so a bare Woo product still renders cleanly (sections hide when empty).
 *
 * Mapping notes for real Woo:
 *  - weights  → product variations (or `dz_weights` meta as here)
 *  - reviews  → /products/<id>/reviews endpoint (or `dz_reviews` meta)
 *  - nutrition/care/highlights/badges/faq/qa → ACF fields (`dz_*` meta)
 */

export interface WeightOption {
  id: string;
  label: string;
  grams?: number;
  price: number;
  old?: number;
  popular?: boolean;
}

export interface PackagingOption {
  id: string;
  label: string;
  note: string;
  extra?: number;
}

export interface FeatureBadge {
  id: string;
  label: string;
  icon: string;
}

export interface Highlight {
  icon: string;
  title: string;
  text: string;
}

export interface NutritionRow {
  label: string;
  value: string;
  pct?: number | null;
}

export interface Nutrition {
  serving: string;
  energyKcal?: number;
  rows: NutritionRow[];
  note?: string;
}

export interface CareRow {
  icon: string;
  k: string;
  v: string;
}

export interface Review {
  name: string;
  city: string;
  rating: number;
  date: string;
  verified?: boolean;
  recommend?: boolean;
  helpful?: number;
  text: string;
}

export interface RatingBucket {
  stars: number;
  count: number;
}

export interface ProductQuestion {
  user: string;
  date: string;
  q: string;
  a?: string;
  by?: string;
  role?: "expert" | "user";
  votes?: number;
}

export interface FaqQA {
  q: string;
  a: string;
}

export interface GalleryImage {
  id: string | number;
  label: string;
  src?: string;
}

export interface ProductView {
  product: WooProduct;
  // pricing/identity
  tagline?: string;
  latin?: string;
  soldCount?: number;
  cashDiscount?: number; // percent off for cash payment
  inStock: boolean;
  stockLeft: number | null;
  stockOf: number;
  // selectable options
  weights: WeightOption[];
  packaging: PackagingOption[];
  // content
  badges: FeatureBadge[];
  highlights: Highlight[];
  story: string[];
  nutrition?: Nutrition;
  care: CareRow[];
  specs: ProductSpec[];
  specTable: ProductSpec[];
  // social proof
  reviews: Review[];
  ratingBreakdown: RatingBucket[];
  questions: ProductQuestion[];
  faq: FaqQA[];
  gallery: GalleryImage[];
}

/** Read a meta_data value by key (case-insensitive). */
function meta(product: WooProduct, key: string): unknown {
  const k = key.toLowerCase();
  for (const m of product.meta_data ?? []) {
    if (typeof m?.key === "string" && m.key.toLowerCase() === k) return m.value;
  }
  return undefined;
}

/** Read + JSON-parse a meta value that may be a JSON string or already an object. */
function metaJson<T>(product: WooProduct, key: string): T | undefined {
  const v = meta(product, key);
  if (v == null) return undefined;
  if (typeof v === "string") {
    try {
      return JSON.parse(v) as T;
    } catch {
      return undefined;
    }
  }
  return v as T;
}

function metaString(product: WooProduct, key: string): string | undefined {
  const v = meta(product, key);
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function metaNumber(product: WooProduct, key: string): number | undefined {
  const v = meta(product, key);
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : undefined;
}

export function buildProductView(product: WooProduct): ProductView {
  const priceNum = Number(product.price);
  const regularNum = Number(product.regular_price);

  // weights: explicit meta, else a single weight from the product price.
  let weights = metaJson<WeightOption[]>(product, "dz_weights") ?? [];
  if (weights.length === 0 && Number.isFinite(priceNum) && priceNum > 0) {
    weights = [
      {
        id: "default",
        label: product.attributes?.[0]?.options?.[0] ?? "واحد",
        price: priceNum,
        old: regularNum > priceNum ? regularNum : undefined,
        popular: true,
      },
    ];
  }

  const packaging = metaJson<PackagingOption[]>(product, "dz_packaging") ?? [];
  const badges = metaJson<FeatureBadge[]>(product, "dz_badges") ?? [];
  const highlights = metaJson<Highlight[]>(product, "dz_highlights") ?? [];
  const nutrition = metaJson<Nutrition>(product, "dz_nutrition");
  const care = metaJson<CareRow[]>(product, "dz_care") ?? [];
  const reviews = metaJson<Review[]>(product, "dz_reviews") ?? [];
  const ratingBreakdown = metaJson<RatingBucket[]>(product, "dz_rating_breakdown") ?? [];
  const questions = metaJson<ProductQuestion[]>(product, "dz_questions") ?? [];
  const faq = metaJson<FaqQA[]>(product, "dz_faq") ?? [];

  const storyMeta = metaJson<string[]>(product, "dz_story");
  const story = storyMeta && storyMeta.length > 0 ? storyMeta : [];

  // gallery: explicit labels meta, else the Woo images, else one placeholder.
  let gallery = metaJson<GalleryImage[]>(product, "dz_gallery") ?? [];
  if (gallery.length === 0) {
    gallery =
      product.images.length > 0
        ? product.images.map((im, i) => ({ id: im.id || i, label: im.alt || product.name, src: im.src }))
        : [{ id: "ph", label: product.name }];
  }

  return {
    product,
    tagline:
      metaString(product, "dz_tagline") ??
      (product.short_description.replace(/<[^>]*>/g, "").trim() || undefined),
    latin: metaString(product, "dz_latin"),
    soldCount: metaNumber(product, "dz_sold_count"),
    cashDiscount: metaNumber(product, "dz_cash_discount"),
    inStock: product.stock_status === "instock",
    stockLeft: product.stock_quantity,
    stockOf: metaNumber(product, "dz_stock_of") ?? Math.max(product.stock_quantity ?? 0, 10),
    weights,
    packaging,
    badges,
    highlights,
    story,
    nutrition,
    care,
    specs: extractProductSpecs(product),
    specTable: buildSpecTable(product),
    reviews,
    ratingBreakdown,
    questions,
    faq,
    gallery,
  };
}
