import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { listProducts } from "@/lib/woo/products";

// Homepage is ISR — revalidated hourly (or on-demand via /api/revalidate).
export const revalidate = 3600;

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof listProducts>>["items"] = [];
  try {
    const res = await listProducts({ perPage: 8, orderby: "popularity" });
    products = res.items;
  } catch {
    // Woo not configured yet — render the shell without products.
  }

  return (
    <Container className="py-10">
      <section className="mb-10 rounded-dz bg-dz-primary-50 p-10 text-center">
        <h1 className="text-4xl font-extrabold text-dz-primary">دشت‌زاد</h1>
        <p className="mt-3 text-dz-muted">عسل و محصولات طبیعی، مستقیم از دل طبیعت</p>
      </section>

      {products.length > 0 ? (
        <section>
          <h2 className="mb-6 text-2xl font-bold">پرفروش‌ترین‌ها</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-center text-dz-muted">
          هنوز محصولی بارگذاری نشده — اتصال ووکامرس را در <code>.env.local</code> تنظیم کنید.
        </p>
      )}
    </Container>
  );
}
