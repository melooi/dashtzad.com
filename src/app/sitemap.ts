import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/woo/products";
import { listCategories } from "@/lib/woo/categories";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    const [slugs, categories] = await Promise.all([getAllProductSlugs(), listCategories()]);

    const productRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${SITE_URL}/product/${encodeURIComponent(slug)}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const categoryRoutes: MetadataRoute.Sitemap = categories.items.map((c) => ({
      url: `${SITE_URL}/category/${encodeURIComponent(c.slug)}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
