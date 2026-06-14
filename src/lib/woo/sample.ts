import type { WooProduct } from "./types";

/**
 * Sample product fixtures — used ONLY as a development fallback when WooCommerce
 * credentials are absent (see `getProductBySlug` in products.ts). They let the
 * product page render and be tested offline across every state (normal / sale /
 * unavailable / no-price / no-image). In production with real Woo env, these are
 * never reached.
 *
 * Custom specs are stored in `meta_data` exactly like ACF fields would be, so the
 * extractor in specs.ts is exercised against realistic data.
 */

let seq = 9000;

function meta(pairs: Record<string, string>) {
  return Object.entries(pairs).map(([key, value], i) => ({ id: i + 1, key, value }));
}

interface SampleInput {
  slug: string;
  name: string;
  short_description?: string;
  description?: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  on_sale?: boolean;
  stock_status?: WooProduct["stock_status"];
  stock_quantity?: number | null;
  average_rating?: string;
  rating_count?: number;
  images?: WooProduct["images"];
  categories?: WooProduct["categories"];
  attributes?: WooProduct["attributes"];
  meta_data?: WooProduct["meta_data"];
}

function make(o: SampleInput): WooProduct {
  return {
    id: ++seq,
    name: o.name,
    slug: o.slug,
    permalink: `https://dashtzad.com/product/${o.slug}`,
    type: "simple",
    status: "publish",
    description: o.description ?? "",
    short_description: o.short_description ?? "",
    sku: o.sku ?? "",
    price: o.price ?? "",
    regular_price: o.regular_price ?? o.price ?? "",
    sale_price: o.sale_price ?? "",
    on_sale: o.on_sale ?? false,
    stock_status: o.stock_status ?? "instock",
    stock_quantity: o.stock_quantity ?? null,
    average_rating: o.average_rating ?? "0",
    rating_count: o.rating_count ?? 0,
    images: o.images ?? [],
    categories: o.categories ?? [{ id: 11, name: "میوه خشک", slug: "dried-fruit" }],
    tags: [],
    attributes: o.attributes ?? [],
    meta_data: o.meta_data ?? [],
  };
}

const WEIGHT_ATTR = {
  id: 1,
  name: "وزن",
  options: ["۲۵۰ گرم", "۵۰۰ گرم", "۱ کیلوگرم"],
};

export const SAMPLE_PRODUCTS: WooProduct[] = [
  // 1) normal — in stock, no discount
  make({
    slug: "barge-golabi-khoshk",
    name: "برگه گلابی خشک ممتاز",
    sku: "DZ-PEAR-24",
    short_description:
      "<p>حلقه‌های نازکِ گلابیِ رسیده، خشک‌شده با گرمای ملایم — بدون شکر، بدون نگهدارنده.</p>",
    description:
      "<p>گلابیِ شاه‌میوه باغ‌های دماوند را در اوجِ رسیدگی می‌چینیم و به حلقه‌های نازک برش می‌زنیم. سپس آرام، با گرمای ملایم، رطوبتش را می‌گیریم تا قند طبیعی و عطرش دست‌نخورده بماند. نه شکری افزوده می‌شود، نه گوگردی، نه نگهدارنده‌ای.</p><p>نتیجه، برگه‌ای است لطیف و کمی چِرم‌مانند، با شیرینیِ آرام و رنگِ کهربایی روشن.</p>",
    price: "372000",
    regular_price: "372000",
    stock_status: "instock",
    stock_quantity: 8,
    average_rating: "4.8",
    rating_count: 124,
    attributes: [WEIGHT_ATTR],
    meta_data: meta({
      origin: "باغ‌های دماوند، ایران",
      harvest_date: "شهریور ۱۴۰۳",
      drying_method: "خشک‌کردن با گرمای ملایم",
      humidity: "18",
    }),
  }),

  // 2) sale — discounted, low stock
  make({
    slug: "zardalu-talayi",
    name: "برگه زردآلوی طلایی",
    sku: "DZ-APRICOT-50",
    short_description: "<p>زردآلوی طلاییِ مراغه، خشک‌شدهٔ آفتابی با شیرینی طبیعی و بافتی لطیف.</p>",
    description:
      "<p>زردآلوی رسیدهٔ باغ‌های مراغه را زیر آفتاب می‌خشکانیم تا طعم و رنگ طبیعی‌اش حفظ شود. بدون گوگرد و افزودنی.</p>",
    price: "246000",
    regular_price: "320000",
    sale_price: "246000",
    on_sale: true,
    stock_status: "instock",
    stock_quantity: 3,
    average_rating: "4.7",
    rating_count: 86,
    attributes: [{ id: 1, name: "وزن", options: ["۲۵۰ گرم", "۵۰۰ گرم"] }],
    meta_data: meta({
      origin: "مراغه، آذربایجان شرقی",
      harvest_date: "تیر ۱۴۰۳",
      drying_method: "خشک‌کردن آفتابی",
      humidity: "20",
    }),
  }),

  // 3) unavailable — out of stock
  make({
    slug: "toot-khoshk-sefid",
    name: "توت خشک سفید اعلا",
    sku: "DZ-MULBERRY-30",
    short_description: "<p>توت خشک سفیدِ خراسان، شیرینِ طبیعی و سرشار از انرژی.</p>",
    description: "<p>توت سفیدِ درجه‌یک، خشک‌شده در سایه برای حفظ رنگ روشن و طعم ملس.</p>",
    price: "315000",
    regular_price: "315000",
    stock_status: "outofstock",
    stock_quantity: 0,
    average_rating: "4.9",
    rating_count: 57,
    meta_data: meta({
      origin: "قوچان، خراسان رضوی",
      harvest_date: "خرداد ۱۴۰۳",
      drying_method: "خشک‌کردن در سایه",
      humidity: "12",
    }),
  }),

  // 4) no-price — "تماس برای قیمت"
  make({
    slug: "anjir-khoshk-parak",
    name: "انجیر خشک پرک استهبان",
    sku: "DZ-FIG-40",
    short_description: "<p>انجیر پرکِ استهبان، دهان‌باز و طلایی — نگینِ میوه‌های خشک ایران.</p>",
    description: "<p>انجیر پرکِ ممتاز از باغ‌های دیمِ استهبان، خشک‌شده روی درخت.</p>",
    price: "",
    regular_price: "",
    stock_status: "instock",
    stock_quantity: 15,
    average_rating: "4.8",
    rating_count: 41,
    meta_data: meta({
      origin: "استهبان، فارس",
      harvest_date: "مرداد ۱۴۰۳",
      drying_method: "خشک‌شدن روی درخت",
      humidity: "22",
    }),
  }),

  // 5) normal — second in-stock item (related-grid variety, no-image like the rest)
  make({
    slug: "khorma-mazafati-bam",
    name: "خرمای مضافتی بم",
    sku: "DZ-DATE-90",
    short_description: "<p>خرمای مضافتیِ تازه و رطوبت‌دار بم، نرم و خوش‌عطر.</p>",
    description: "<p>مضافتیِ درجه‌یکِ بم، با گوشتِ نرم و طعمِ کاراملی.</p>",
    price: "268000",
    regular_price: "268000",
    stock_status: "instock",
    stock_quantity: 20,
    average_rating: "4.8",
    rating_count: 73,
    attributes: [{ id: 1, name: "وزن", options: ["۶۵۰ گرم", "۱ کیلوگرم"] }],
    meta_data: meta({
      origin: "بم، کرمان",
      harvest_date: "آبان ۱۴۰۳",
      drying_method: "رسیدن طبیعی روی نخل",
      humidity: "15",
    }),
  }),
];

export const SAMPLE_SLUGS: string[] = SAMPLE_PRODUCTS.map((p) => p.slug);

export function getSampleProductBySlug(slug: string): WooProduct | null {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug) ?? null;
}
