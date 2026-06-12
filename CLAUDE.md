# دشت‌زاد — قراردادهای پروژه (Project Conventions)

Headless WooCommerce storefront — Next.js 16 (App Router) + TypeScript + Tailwind v4.
معماری و دیپلوی در [README.md](README.md).

---

## قانون فنی الزامی: نام‌گذاری انگلیسی (No Persian in identifiers)

هیچ **route، slug، نام فایل، نام فولدر، نام تصویر یا نام asset** نباید فارسی باشد.

**مسیرها (routes/folders):** فقط انگلیسی.
`/products`, `/product/[slug]`, `/category/[slug]`, `/cart`

**Slug محصول و دسته:** عنوان (`title`/`name`) فارسی، اما **slug انگلیسی**.
استاندارد slug:
- `lowercase`
- `kebab-case`
- فقط `a-z`, `0-9`, `-`
- بدون فاصله، فارسی، underscore، پرانتز، علائم خاص

قوانین رفتاری فرانت:
- فرانت **هرگز** slug فارسی را به‌عنوان URL اصلی تحمل، encode یا decode نمی‌کند.
- اگر از WooCommerce slug فارسی/نامعتبر آمد، باید **خطا/گزارش** بدهد، نه اینکه آن را normal کند:
  در صفحه → `notFound()`، در sitemap → drop + `console.warn`.
- منبع درستی slugهای انگلیسی، خودِ WordPress/WooCommerce است (گزینهٔ «الف»). فرانت فقط اعتبارسنجی می‌کند.
- ولیدیتور مرجع: `isValidSlug()` در [src/lib/utils.ts](src/lib/utils.ts).
- استثنای مجاز برای `encodeURIComponent`: فقط جایی که واقعاً یک query-param استاندارد است
  (مثل ساخت URL کامل برای getHead رنک‌مث) — نه برای slug در مسیر.

**نام فایل‌ها و assetها** (تصویر، فونت، آیکن، فایل‌های `public/`): انگلیسی و **kebab-case**.
- مثال درست: `honey-jar-500g.webp`, `iranyekanx-regular.woff2`
- ممنوع: فاصله، نیم‌فاصله، کاراکتر فارسی، پرانتز فارسی، علائم خاص، PascalCase.

**کامپوننت‌های React** از این قانون مستثنا هستند: طبق عرف React با `PascalCase` می‌مانند
(مثل `ProductCard.tsx`). این قانون مربوط به URLها و assetهاست، نه نام کلاس/کامپوننت.

> هیچ rename بدون تأیید صریح انجام نمی‌شود. تخلف‌ها فقط گزارش و پیشنهاد می‌شوند.
