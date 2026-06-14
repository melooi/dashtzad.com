import type { WooProduct } from "@/lib/woo/types";
import { absoluteUrl, stripHtml } from "@/lib/utils";

/** Builders for structured data (JSON-LD). Render with <JsonLd data={...} />. */

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "دشت‌زاد",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "دشت‌زاد",
    url: absoluteUrl("/"),
    inLanguage: "fa-IR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** A custom spec rendered as schema.org PropertyValue (origin, harvest date, …). */
export interface ProductSpecLite {
  label: string;
  value: string;
}

export function productSchema(p: WooProduct, specs: ProductSpecLite[] = []): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: stripHtml(p.short_description || p.description),
    sku: p.sku || undefined,
    image: p.images.length > 0 ? p.images.map((i) => i.src) : undefined,
    brand: { "@type": "Brand", name: "دشت‌زاد" },
    category: p.categories[0]?.name,
    additionalProperty:
      specs.length > 0
        ? specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value }))
        : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: p.price || undefined,
      availability:
        p.stock_status === "instock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/product/${p.slug}`),
      priceValidUntil: p.date_on_sale_to || undefined,
    },
    aggregateRating:
      p.rating_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: p.average_rating,
            reviewCount: p.rating_count,
          }
        : undefined,
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export interface RecipeInput {
  name: string;
  image?: string[];
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string; // ISO 8601 duration, e.g. PT15M
  cookTime?: string;
}

export function recipeSchema(r: RecipeInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.name,
    image: r.image,
    description: r.description,
    recipeIngredient: r.ingredients,
    recipeInstructions: r.instructions.map((step) => ({ "@type": "HowToStep", text: step })),
    prepTime: r.prepTime,
    cookTime: r.cookTime,
    inLanguage: "fa-IR",
  };
}
