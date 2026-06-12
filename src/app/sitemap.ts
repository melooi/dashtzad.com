import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/woo/products";
import { listCategories } from "@/lib/woo/categories";
import { isValidSlug } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    const [slugs, categories] = await Promise.all([getAllProductSlugs(), listCategories()]);

    // Only valid English/URL-safe slugs enter the sitemap. Persian slugs are
    // dropped and reported, never encoded into a URL.
    const validProductSlugs = slugs.filter(isValidSlug);
    const validCategories = categories.items.filter((c) => isValidSlug(c.slug));

    const droppedProducts = slugs.length - validProductSlugs.length;
    const droppedCategories = categories.items.length - validCategories.length;
    if (droppedProducts > 0 || droppedCategories > 0) {
      console.warn(
        `[sitemap] dropped non-URL-safe slugs — products: ${droppedProducts}, categories: ${droppedCategories}. ` +
          "Fix these slugs to lowercase kebab-case in WooCommerce.",
      );
    }

    const productRoutes: MetadataRoute.Sitemap = validProductSlugs.map((slug) => ({
      url: `${SITE_URL}/product/${slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const categoryRoutes: MetadataRoute.Sitemap = validCategories.map((c) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
