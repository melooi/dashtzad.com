import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CartBadge } from "./CartBadge";

export function Header() {
  return (
    <header className="border-b border-dz-line bg-dz-bg">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-dz-primary">
          دشت‌زاد
        </Link>
        <nav className="flex items-center gap-6 text-dz-muted">
          <Link href="/products" className="hover:text-dz-ink">
            محصولات
          </Link>
          <Link href="/blog" className="hover:text-dz-ink">
            مجله
          </Link>
          <CartBadge />
        </nav>
      </Container>
    </header>
  );
}
