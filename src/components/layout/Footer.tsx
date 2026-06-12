import { Container } from "@/components/ui/Container";
import { toFaDigits } from "@/lib/utils";

export function Footer() {
  const year = 1404; // Persian year — update or compute from a server value
  return (
    <footer className="mt-20 border-t border-dz-line bg-dz-surface py-10 text-sm text-dz-muted">
      <Container className="flex flex-col items-center gap-2">
        <p className="font-bold text-dz-ink">دشت‌زاد</p>
        <p>تمام حقوق محفوظ است © {toFaDigits(year)}</p>
      </Container>
    </footer>
  );
}
