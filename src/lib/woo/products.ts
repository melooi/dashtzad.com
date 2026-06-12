import "server-only";

import { WOO_TAGS, wooFetch, wooFetchList } from "./client";
import type { WooList, WooProduct } from "./types";

export interface ListProductsParams {
  page?: number;
  perPage?: number;
  category?: string; // category id
  search?: string;
  orderby?: "date" | "price" | "popularity" | "rating" | "title";
  order?: "asc" | "desc";
  onSale?: boolean;
}

export async function listProducts(params: ListProductsParams = {}): Promise<WooList<WooProduct>> {
  return wooFetchList<WooProduct>("/products", {
    params: {
      status: "publish",
      page: params.page ?? 1,
      per_page: params.perPage ?? 24,
      category: params.category,
      search: params.search,
      orderby: params.orderby ?? "date",
      order: params.order ?? "desc",
      on_sale: params.onSale,
    },
    tags: [WOO_TAGS.products],
  });
}

/** Woo REST returns an array when filtering by slug — unwrap to a single product. */
export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  const items = await wooFetch<WooProduct[]>("/products", {
    params: { slug, status: "publish" },
    tags: [WOO_TAGS.product(slug)],
  });
  return items[0] ?? null;
}

export async function getProductById(id: number): Promise<WooProduct | null> {
  try {
    return await wooFetch<WooProduct>(`/products/${id}`, { tags: [WOO_TAGS.products] });
  } catch {
    return null;
  }
}

/** All product slugs for generateStaticParams (paginates through the catalog). */
export async function getAllProductSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  for (;;) {
    const { items, meta } = await wooFetchList<Pick<WooProduct, "slug">>("/products", {
      params: { status: "publish", per_page: 100, page, _fields: "slug" },
      tags: [WOO_TAGS.products],
    });
    slugs.push(...items.map((p) => p.slug));
    if (page >= meta.totalPages || items.length === 0) break;
    page += 1;
  }
  return slugs;
}
