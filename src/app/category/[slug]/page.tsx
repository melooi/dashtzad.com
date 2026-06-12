import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCategoryBySlug } from "@/lib/woo/categories";
import { listProducts } from "@/lib/woo/products";
import { getRankMath } from "@/lib/seo/rankmath";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { isValidSlug } from "@/lib/utils";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) return {};

  const { metadata } = await getRankMath(`/category/${slug}`);
  if (metadata.title) return metadata;

  const category = await getCategoryBySlug(slug);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  // Reject non-English / non-URL-safe slugs outright (no encode/decode fallback).
  if (!isValidSlug(slug)) notFound();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const { items } = await listProducts({ category: String(category.id), perPage: 24 });

  return (
    <Container className="py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: category.name, path: `/category/${category.slug}` },
        ])}
      />
      <h1 className="mb-2 text-3xl font-extrabold">{category.name}</h1>
      {category.description && <p className="mb-8 text-dz-muted">{category.description}</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Container>
  );
}
