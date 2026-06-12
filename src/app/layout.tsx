import type { Metadata, Viewport } from "next";
import { iranYekan } from "@/lib/fonts";
import { Providers } from "@/providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "دشت‌زاد | عسل و محصولات طبیعی",
    template: "%s | دشت‌زاد",
  },
  description: "فروشگاه آنلاین محصولات طبیعی و ارگانیک دشت‌زاد",
  alternates: { canonical: "/" },
  openGraph: { locale: "fa_IR", siteName: "دشت‌زاد", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#1f7a4d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={iranYekan.variable} suppressHydrationWarning>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
