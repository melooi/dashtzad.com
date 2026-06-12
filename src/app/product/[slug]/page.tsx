import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { getAllProductSlugs, getProductBySlug } from "@/lib/woo/products";
import { getRankMath } from "@/lib/seo/rankmath";
import { breadcrumbSchema, productSchema } from "@/lib/seo/jsonld";
import { formatToman, stripHtml } from "@/lib/utils";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

// Persian slugs come through URL-encoded; decode before querying Woo.
function decode(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs.map((slug) => ({ slug: encodeURIComponent(slug) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Rank Math is the source of truth for SEO meta.
  const { metadata } = await getRankMath(`/product/${slug}`);
  if (metadata.title) return metadata;

  // Fallback to Woo fields if Rank Math is unavailable.
  const product = await getProductBySlug(decode(slug));
  if (!product) return {};
  return {
    title: product.name,
    description: stripHtml(product.short_description || product.description).slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(decode(slug));
  if (!product) notFound();

  const { jsonLd } = await getRankMath(`/product/${slug}`);
  const schema =
    jsonLd.length > 0
      ? jsonLd
      : [
          productSchema(product),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "محصولات", path: "/products" },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ];

  const img = product.images[0];

  return (
    <Container className="py-10">
      <JsonLd data={schema} />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-dz bg-dz-surface">
          {img && (
            <Image
              src={img.src}
              alt={img.alt || product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold">{product.name}</h1>
          <p className="text-2xl font-bold text-dz-primary">{formatToman(product.price)}</p>
          <div
            className="leading-9 text-dz-muted"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
          <AddToCartButton
            item={{
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: Number(product.price),
              image: img?.src,
            }}
          />
        </div>
      </div>

      {product.description && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">توضیحات</h2>
          <div
            className="leading-9 text-dz-ink"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}
    </Container>
  );
}
