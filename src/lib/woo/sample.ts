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

/** Rich ACF-style meta: JSON-encode non-string values (mirrors how WP/ACF stores them). */
function richMeta(obj: Record<string, unknown>) {
  return Object.entries(obj).map(([key, value], i) => ({
    id: 200 + i,
    key,
    value: typeof value === "string" ? value : JSON.stringify(value),
  }));
}

/** Full design data for the flagship product (from the product-page handoff). */
const PEAR_RICH: Record<string, unknown> = {
  dz_tagline: "حلقه‌های نازکِ گلابیِ رسیده، خشک‌شده با گرمای ملایم — بدون شکر، بدون نگهدارنده.",
  dz_latin: "Premium Sun-Dried Pear Slices",
  dz_sold_count: 1860,
  dz_cash_discount: 3,
  dz_stock_of: 10,
  dz_weights: [
    { id: "w250", label: "۲۵۰ گرم", grams: 250, price: 198000, old: 240000 },
    { id: "w500", label: "۵۰۰ گرم", grams: 500, price: 372000, old: 460000, popular: true },
    { id: "w1000", label: "۱ کیلوگرم", grams: 1000, price: 690000, old: 880000 },
  ],
  dz_packaging: [
    { id: "zip", label: "زیپ‌کیپ کرافت", note: "درب‌دار، ماندگاری بالا" },
    { id: "tin", label: "قوطی هدیه", note: "+۴۵٬۰۰۰ تومان", extra: 45000 },
  ],
  dz_badges: [
    { id: "organic", label: "ارگانیک", icon: "fa-leaf" },
    { id: "nosugar", label: "بدون شکر افزوده", icon: "fa-cube" },
    { id: "halal", label: "حلال", icon: "fa-certificate" },
    { id: "nopreserv", label: "بدون نگهدارنده", icon: "fa-shield-halved" },
  ],
  dz_highlights: [
    { icon: "fa-sun", title: "خشک‌شده با گرمای ملایم", text: "بدون گوگرد و افزودنی، عطر طبیعی حفظ می‌شود." },
    { icon: "fa-seedling", title: "مستقیم از باغ خانوادگی", text: "برداشت از باغ‌های دماوند، بدون واسطه." },
    { icon: "fa-heart", title: "میان‌وعده سالم", text: "منبع فیبر و پتاسیم، مناسب کودک و بزرگسال." },
    { icon: "fa-box", title: "بسته‌بندی درب‌دار", text: "زیپ‌کیپ برای تازه‌ماندن تا آخرین حلقه." },
  ],
  dz_story: [
    "گلابیِ شاه‌میوه باغ‌های دماوند را در اوجِ رسیدگی می‌چینیم؛ همان‌جا که چهار نسل از خانواده دشت‌زاد از سال ۱۳۰۵ زمین را به دست خود بارور کرده‌اند.",
    "هر گلابی را به حلقه‌های نازک برش می‌زنیم و آرام، با گرمای ملایم، رطوبتش را می‌گیریم تا قند طبیعی و عطرش دست‌نخورده بماند. نه شکری افزوده می‌شود، نه گوگردی، نه نگهدارنده‌ای.",
    "نتیجه، برگه‌ای است لطیف و کمی چِرم‌مانند، با شیرینیِ آرام و رنگِ کهربایی روشن — میان‌وعده‌ای که می‌توانید با خیال راحت به کودکتان هم بدهید.",
  ],
  dz_nutrition: {
    serving: "در هر ۱۰۰ گرم",
    energyKcal: 262,
    rows: [
      { label: "انرژی", value: "۲۶۲ کیلوکالری", pct: 13 },
      { label: "کربوهیدرات", value: "۶۹٫۷ گرم", pct: 25 },
      { label: "قند طبیعی", value: "۶۲٫۲ گرم", pct: null },
      { label: "فیبر غذایی", value: "۷٫۵ گرم", pct: 30 },
      { label: "پروتئین", value: "۱٫۹ گرم", pct: 4 },
      { label: "چربی", value: "۰٫۶ گرم", pct: 1 },
      { label: "پتاسیم", value: "۵۳۳ میلی‌گرم", pct: 15 },
      { label: "سدیم", value: "۶ میلی‌گرم", pct: 0 },
    ],
    note: "بدون قند افزوده — تمام شیرینی از خودِ گلابی است.",
  },
  dz_care: [
    { icon: "fa-scissors", k: "زمان چیدن", v: "اواخر تابستان، در اوج رسیدگی میوه روی درخت" },
    { icon: "fa-sun", k: "روش خشک‌کردن", v: "با گرمای ملایم خشک می‌شود؛ بدون گوگرد و بدون افزودنی" },
    { icon: "fa-box", k: "روش نگهداری", v: "در ظرف دربسته، جای خشک و خنک و دور از نور مستقیم آفتاب" },
    { icon: "fa-shield-halved", k: "ماندگاری", v: "۱۲ ماه از تاریخ بسته‌بندی" },
  ],
  dz_reviews: [
    { name: "مریم احمدی", city: "تهران", rating: 5, date: "۲ هفته پیش", verified: true, recommend: true, helpful: 24, text: "واقعاً طعمش طبیعیه، اصلاً شیرینی مصنوعی نداره. بچه‌ها به‌جای پاستیل اینو می‌خورن. بسته‌بندیش هم تمیز و مرتب بود." },
    { name: "حسین رضایی", city: "اصفهان", rating: 5, date: "۱ ماه پیش", verified: true, recommend: true, helpful: 18, text: "کیفیت برگه گلابی فوق‌العاده‌ست، نازک و خوش‌عطر. قوطی هدیه‌اش رو برای عید گرفتم، خیلی شیک بود." },
    { name: "سحر موسوی", city: "شیراز", rating: 4, date: "۱ ماه پیش", verified: true, recommend: true, helpful: 9, text: "خیلی خوب بود فقط کاش بسته ۱ کیلویی کمی ارزون‌تر بود. در کل از خریدم راضی‌ام و دوباره سفارش می‌دم." },
    { name: "علی کریمی", city: "مشهد", rating: 5, date: "۲ ماه پیش", verified: true, recommend: true, helpful: 31, text: "دومین باره سفارش می‌دم. ارسالشون سریعه و محصول دقیقاً مثل عکسه. حس می‌کنی از یه باغ واقعی اومده." },
  ],
  dz_rating_breakdown: [
    { stars: 5, count: 96 },
    { stars: 4, count: 19 },
    { stars: 3, count: 6 },
    { stars: 2, count: 2 },
    { stars: 1, count: 1 },
  ],
  dz_questions: [
    { user: "سمیرا کاظمی", date: "۲ هفته پیش", q: "طعمش بیشتر ترش است یا شیرین؟", votes: 19, a: "طعم غالب، شیرینیِ ملایم است با ته‌مزه‌ای کمی ملس؛ چون تمام شیرینی از قند طبیعیِ خودِ گلابی می‌آید و هیچ شکری افزوده نشده.", by: "کارشناس دشت‌زاد", role: "expert" },
    { user: "نگار محمدی", date: "۳ هفته پیش", q: "برای کودک زیر دو سال مناسب است؟", votes: 12, a: "من برای دختر ۱۸ ماهه‌ام می‌گیرم و خیالم راحته چون شکر و افزودنی نداره. فقط چون بافتش کمی سفت و چرم‌مانندِ، ریز خردش می‌کنم که راحت بجوه و گلوگیر نشه.", by: "زهرا رحیمی", role: "user" },
    { user: "کامران اسدی", date: "۱ ماه پیش", q: "بسته یک کیلویی هم زیپ‌کیپ دارد؟", votes: 7, a: "بله، همه وزن‌ها از جمله بسته یک کیلوگرمی در بسته‌بندی زیپ‌کیپ کرافت درب‌دار ارسال می‌شوند تا تا آخرین حلقه تازه بماند.", by: "کارشناس دشت‌زاد", role: "expert" },
  ],
  dz_faq: [
    { q: "آیا این محصول شکر یا نگهدارنده دارد؟", a: "خیر. برگه گلابی دشت‌زاد فقط از گلابیِ تازه تهیه می‌شود؛ هیچ شکر افزوده، گوگرد یا نگهدارنده‌ای در آن به کار نرفته است. تمام شیرینی از قند طبیعی خودِ میوه است." },
    { q: "بهترین روش نگهداری چیست؟", a: "در ظرف دربسته و در جای خشک و خنک، دور از نور مستقیم آفتاب نگهداری کنید. بسته‌بندی زیپ‌کیپ کمک می‌کند تا تازگی و عطر محصول تا آخرین حلقه حفظ شود." },
    { q: "ارسال چقدر طول می‌کشد؟", a: "سفارش‌ها در تهران بین ۲۴ تا ۴۸ ساعت و در سایر شهرها ۲ تا ۴ روز کاری به دست شما می‌رسد. ارسال سفارش‌های بالای ۷۰۰٬۰۰۰ تومان رایگان است." },
    { q: "آیا امکان مرجوع کردن وجود دارد؟", a: "بله، تا ۷ روز پس از دریافت، در صورتی که بسته باز نشده باشد، می‌توانید کالا را مرجوع کنید و وجه آن به طور کامل بازگردانده می‌شود." },
  ],
  dz_gallery: [
    { id: "g1", label: "عکس اصلی محصول — حلقه‌های گلابی خشک روی تخته چوب" },
    { id: "g2", label: "نمای نزدیک بافت" },
    { id: "g3", label: "بسته‌بندی زیپ‌کیپ کرافت" },
    { id: "g4", label: "صحنه چیدمان با چای" },
    { id: "g5", label: "باغ گلابی دماوند" },
  ],
};

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
    meta_data: [
      ...meta({
        origin: "باغ‌های دماوند، ایران",
        harvest_date: "شهریور ۱۴۰۳",
        drying_method: "خشک‌کردن با گرمای ملایم",
        humidity: "18",
      }),
      ...richMeta(PEAR_RICH),
    ],
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
