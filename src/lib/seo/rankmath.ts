import "server-only";

import type { Metadata } from "next";

/**
 * Pull Rank Math SEO metadata for a given storefront path and map it onto
 * Next's Metadata object for `generateMetadata`.
 *
 * Requires: Rank Math -> General Settings -> "Headless CMS Support" = ON, which
 * exposes `GET /wp-json/rankmath/v1/getHead?url=<full-frontend-url>` returning
 * `{ success, head }` where `head` is the raw <head> HTML.
 *
 * We parse the tags we care about with regex (no DOM on the server) and hand
 * the JSON-LD block back separately so the page can inject it.
 */

const RANKMATH_API = process.env.RANKMATH_API_URL;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export interface RankMathResult {
  metadata: Metadata;
  /** Raw JSON-LD objects extracted from Rank Math's <script type="application/ld+json">. */
  jsonLd: unknown[];
}

function attr(tag: string, name: string): string | undefined {
  const re = new RegExp(`${name}=["']([^"']*)["']`, "i");
  return tag.match(re)?.[1];
}

function metaContent(head: string, key: "name" | "property", value: string): string | undefined {
  const re = new RegExp(`<meta[^>]*${key}=["']${value}["'][^>]*>`, "i");
  const tag = head.match(re)?.[0];
  return tag ? attr(tag, "content") : undefined;
}

function parseHead(head: string): RankMathResult {
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = metaContent(head, "name", "description");
  const canonical = (() => {
    const tag = head.match(/<link[^>]*rel=["']canonical["'][^>]*>/i)?.[0];
    return tag ? attr(tag, "href") : undefined;
  })();
  const robots = metaContent(head, "name", "robots");

  const jsonLd: unknown[] = [];
  const ldRe = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of head.matchAll(ldRe)) {
    try {
      jsonLd.push(JSON.parse(m[1]!));
    } catch {
      /* ignore malformed blocks */
    }
  }

  const metadata: Metadata = {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: robots
      ? {
          index: !/noindex/i.test(robots),
          follow: !/nofollow/i.test(robots),
        }
      : undefined,
    openGraph: {
      title: metaContent(head, "property", "og:title") ?? title,
      description: metaContent(head, "property", "og:description") ?? description,
      url: metaContent(head, "property", "og:url") ?? canonical,
      type: "website",
      images: metaContent(head, "property", "og:image")
        ? [{ url: metaContent(head, "property", "og:image")! }]
        : undefined,
    },
  };

  return { metadata, jsonLd };
}

/** Fetch + parse Rank Math head for a storefront `path` (e.g. "/product/asal-tabiei"). */
export async function getRankMath(path: string): Promise<RankMathResult> {
  const empty: RankMathResult = { metadata: {}, jsonLd: [] };
  if (!RANKMATH_API) return empty;

  const target = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const endpoint = `${RANKMATH_API}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(target)}`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600, tags: ["rankmath"] } });
    if (!res.ok) return empty;
    const data = (await res.json()) as { success?: boolean; head?: string };
    if (!data.head) return empty;
    return parseHead(data.head);
  } catch {
    return empty;
  }
}
