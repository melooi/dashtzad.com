import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { WOO_TAGS } from "@/lib/woo/client";

/**
 * On-demand ISR endpoint. Configure a WooCommerce/WordPress webhook (or a
 * WP "save_post" hook) to POST here when content changes:
 *
 *   POST /api/revalidate?secret=...&tag=woo:products
 *   POST /api/revalidate?secret=...&slug=asal-tabiei   (revalidates that product)
 *
 * Protected by REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, error: "invalid secret" }, { status: 401 });
  }

  const tag = searchParams.get("tag");
  const slug = searchParams.get("slug");
  const revalidated: string[] = [];

  // Next 16: revalidateTag(tag, profile) — purge immediately with expire: 0.
  const purge = (t: string) => {
    revalidateTag(t, { expire: 0 });
    revalidated.push(t);
  };

  if (tag) purge(tag);
  if (slug) {
    purge(WOO_TAGS.product(slug));
    purge(WOO_TAGS.products);
  }
  if (revalidated.length === 0) {
    // default: refresh the whole catalog + categories
    purge(WOO_TAGS.products);
    purge(WOO_TAGS.categories);
  }

  return NextResponse.json({ revalidated: true, tags: revalidated });
}
