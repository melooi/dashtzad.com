# دشت‌زاد — فروشگاه Headless

فرانت‌اند فروشگاه **dashtzad.com** با Next.js (App Router) + TypeScript + Tailwind v4،
متصل به **WordPress + WooCommerce هدلس** از طریق **WooCommerce REST API**.

> WPGraphQL فعلاً **فعال نیست** و استفاده نمی‌شود؛ فقط در صورت درخواست صریح بررسی می‌شود.
> قراردادهای فنی پروژه (از جمله قانون نام‌گذاری/slug انگلیسی) در [CLAUDE.md](CLAUDE.md).

## معماری

```
src/
├── app/                      # App Router (RTL, fa)
│   ├── layout.tsx            # ریشه: فونت IRANYekanX، Providers، Header/Footer، JSON-LD سراسری
│   ├── page.tsx              # صفحه اصلی (ISR)
│   ├── product/[slug]/       # صفحه محصول + generateMetadata (Rank Math) + JSON-LD
│   ├── category/[slug]/      # صفحه دسته
│   ├── cart/                 # سبد خرید (کلاینت، Zustand)
│   ├── api/revalidate/       # وب‌هوک ISR از وردپرس
│   ├── sitemap.ts / robots.ts
│   └── globals.css           # توکن‌های dz-* (Tailwind @theme) + پایه rem ۱۰px
├── components/
│   ├── layout/  product/  ui/  seo/   # JsonLd, ProductCard, AddToCartButton, ...
├── lib/
│   ├── woo/                  # کلاینت مرکزی wooFetch + products/categories + types
│   ├── seo/                  # rankmath.ts (generateMetadata) + jsonld.ts (Product/Recipe/FAQ/Breadcrumb)
│   ├── query/keys.ts         # کلیدهای React Query
│   ├── fonts.ts              # IRANYekanX با next/font/local
│   └── utils.ts              # cn، اعداد فارسی، فرمت تومان
├── providers/                # React Query provider
├── store/cart.ts             # Zustand (persist)
└── fonts/                    # ← فایل‌های .woff2 را اینجا بگذارید
```

**جریان داده:** Server Component → `lib/woo/wooFetch` (server-only، کش ISR + تگ) → WooCommerce REST.
تعاملات کلاینت (سبد خرید) با Zustand؛ React Query برای داده‌های کلاینتی آماده است.

## شروع

```bash
cp .env.example .env.local      # مقادیر ووکامرس/سایت را پر کنید
# فایل‌های فونت IRANYekanX را در src/fonts/ بگذارید (src/fonts/README.md)
npm install
npm run dev
```

## SEO

- **متادیتا:** `getRankMath(path)` خروجی هد Rank Math را می‌خواند و به `Metadata` نگاشت می‌کند
  (وردپرس → Rank Math → General Settings → Headless CMS Support = ON). در نبود آن، fallback به فیلدهای ووکامرس.
- **JSON-LD:** سازنده‌های `lib/seo/jsonld.ts` (Product, Recipe, FAQ, Breadcrumb, Organization, WebSite) با `<JsonLd />`.
- **Slug:** فقط slug انگلیسی و URL-safe (lowercase kebab-case، `a-z 0-9 -`) پذیرفته می‌شود.
  فرانت slug فارسی را encode/decode نمی‌کند؛ slug نامعتبر → `notFound()` و در sitemap drop می‌شود.
  جزئیات کامل در [CLAUDE.md](CLAUDE.md). ولیدیتور: `isValidSlug()` در `src/lib/utils.ts`.

## دیپلوی (VPS ایران — نه Vercel)

`output: "standalone"` فعال است.

**PM2:**
```bash
npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
pm2 start ecosystem.config.cjs
```

**Docker:**
```bash
docker compose up -d --build      # روی 127.0.0.1:3000
```

سپس Nginx را با `deploy/nginx.conf.example` به‌عنوان reverse proxy تنظیم و TLS را با certbot اضافه کنید.

**Revalidate:** route فعلاً با **shared secret** (مقدار `REVALIDATE_SECRET`) محافظت می‌شود — **HMAC نیست**.
در وردپرس یک وب‌هوک بزنید تا کش بروز شود (حتماً روی HTTPS تا secret در مسیر لو نرود):
`POST /api/revalidate?secret=<REVALIDATE_SECRET>&slug=<slug>`
اگر بعداً به امضای HMAC مهاجرت شد، این بخش و route باید با هم به‌روزرسانی شوند.
