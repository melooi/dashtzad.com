import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { listProducts } from "@/lib/woo/products";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "محصولات",
  description: "همه محصولات طبیعی و ارگانیک دشت‌زاد",
};

export default async function ProductsPage() {
  let items: Awaited<ReturnType<typeof listProducts>>["items"] = [];
  try {
    items = (await listProducts({ perPage: 24 })).items;
  } catch {
    /* Woo not configured yet */
  }

  return (
    <Container className="py-10">
      <h1 className="mb-8 text-3xl font-extrabold">محصولات</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-dz-muted">محصولی برای نمایش نیست.</p>
      )}
    </Container>
  );
}
