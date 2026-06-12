import Image from "next/image";
import Link from "next/link";
import type { WooProduct } from "@/lib/woo/types";
import { formatToman } from "@/lib/utils";

export function ProductCard({ product }: { product: WooProduct }) {
  const img = product.images[0];
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-dz border border-dz-line bg-dz-bg shadow-dz transition hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-dz-surface">
        {img && (
          <Image
            src={img.src}
            alt={img.alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition group-hover:scale-105"
          />
        )}
        {product.on_sale && (
          <span className="absolute right-3 top-3 rounded-dz-sm bg-dz-accent px-2 py-1 text-xs font-bold text-white">
            تخفیف
          </span>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 font-bold text-dz-ink">{product.name}</h3>
        <p className="font-bold text-dz-primary">{formatToman(product.price)}</p>
      </div>
    </Link>
  );
}
