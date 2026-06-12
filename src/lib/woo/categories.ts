import "server-only";

import { WOO_TAGS, wooFetch, wooFetchList } from "./client";
import type { WooCategory, WooList } from "./types";

export async function listCategories(parent?: number): Promise<WooList<WooCategory>> {
  return wooFetchList<WooCategory>("/products/categories", {
    params: { per_page: 100, hide_empty: true, parent },
    tags: [WOO_TAGS.categories],
  });
}

export async function getCategoryBySlug(slug: string): Promise<WooCategory | null> {
  const items = await wooFetch<WooCategory[]>("/products/categories", {
    params: { slug },
    tags: [WOO_TAGS.category(slug)],
  });
  return items[0] ?? null;
}
