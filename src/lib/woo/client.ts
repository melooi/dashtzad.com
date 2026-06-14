import "server-only";

import type { WooList, WooListMeta } from "./types";

/**
 * Central WooCommerce REST client.
 *
 * - Server-only (uses consumer key/secret — never expose to the browser).
 * - Talks to `${WOO_API_URL}/wp-json/wc/v3`.
 * - Integrates with Next caching via `next: { revalidate, tags }`.
 */

const API_URL = process.env.WOO_API_URL;
const KEY = process.env.WOO_CONSUMER_KEY;
const SECRET = process.env.WOO_CONSUMER_SECRET;

/** Whether real WooCommerce credentials are configured. */
export function isWooConfigured(): boolean {
  return Boolean(API_URL && KEY && SECRET);
}

export const WOO_TAGS = {
  products: "woo:products",
  product: (slug: string) => `woo:product:${slug}`,
  categories: "woo:categories",
  category: (slug: string) => `woo:category:${slug}`,
} as const;

export interface WooFetchOptions {
  /** Query string params (auth is added automatically). */
  params?: Record<string, string | number | boolean | undefined>;
  /** ISR revalidation window in seconds. Default 1h. */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation. */
  tags?: string[];
  method?: "GET";
}

class WooError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly path: string,
  ) {
    super(message);
    this.name = "WooError";
  }
}

interface WooEnv {
  apiUrl: string;
  key: string;
  secret: string;
}

function requireEnv(): WooEnv {
  if (!API_URL || !KEY || !SECRET) {
    throw new Error(
      "Missing WooCommerce env: set WOO_API_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET (.env.local).",
    );
  }
  return { apiUrl: API_URL, key: KEY, secret: SECRET };
}

function buildUrl(env: WooEnv, path: string, params: WooFetchOptions["params"]): string {
  const url = new URL(`/wp-json/wc/v3${path}`, env.apiUrl);
  url.searchParams.set("consumer_key", env.key);
  url.searchParams.set("consumer_secret", env.secret);
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }
  return url.toString();
}

/** Raw fetch — returns parsed JSON of type T. */
export async function wooFetch<T>(path: string, opts: WooFetchOptions = {}): Promise<T> {
  const env = requireEnv();
  const { params, revalidate = 3600, tags = [] } = opts;

  const res = await fetch(buildUrl(env, path, params), {
    method: opts.method ?? "GET",
    headers: { Accept: "application/json" },
    next: { revalidate, tags },
  });

  if (!res.ok) {
    throw new WooError(`WooCommerce ${res.status} on ${path}`, res.status, path);
  }
  return (await res.json()) as T;
}

/** List fetch — also reads pagination headers (X-WP-Total / X-WP-TotalPages). */
export async function wooFetchList<T>(
  path: string,
  opts: WooFetchOptions = {},
): Promise<WooList<T>> {
  const env = requireEnv();
  const { params, revalidate = 3600, tags = [] } = opts;

  const res = await fetch(buildUrl(env, path, params), {
    headers: { Accept: "application/json" },
    next: { revalidate, tags },
  });

  if (!res.ok) {
    throw new WooError(`WooCommerce ${res.status} on ${path}`, res.status, path);
  }

  const meta: WooListMeta = {
    total: Number(res.headers.get("x-wp-total") ?? 0),
    totalPages: Number(res.headers.get("x-wp-totalpages") ?? 0),
  };
  return { items: (await res.json()) as T[], meta };
}

export { WooError };
