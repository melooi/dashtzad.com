import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-5xl font-extrabold text-dz-primary">۴۰۴</h1>
      <p className="mt-4 text-dz-muted">صفحه‌ای که دنبال آن بودید پیدا نشد.</p>
      <Link href="/" className="mt-6 inline-block font-bold text-dz-primary">
        بازگشت به خانه
      </Link>
    </Container>
  );
}
