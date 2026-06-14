# دشت‌زاد — سند معماریِ سیستم طراحی (Design System Spec)

> وضعیت: **پیش‌نویس برای تأیید.** پس از تأیید، کد بر اساس همین سند بازنویسی می‌شود.
> هدف: یک سیستم طراحیِ **یکپارچه** که در همهٔ صفحه‌ها یک واژگانِ کلاس، یک ساختار
> و یک کتابخانهٔ کامپوننت دارد — نه ۱۴ مجموعهٔ کلاسِ ادهاکِ جدا.

---

## ۱) چرا (مسئله‌ای که حل می‌کنیم)

inventory فعلی نشان می‌دهد هر صفحه واژگانِ کلاسِ مخصوص خودش را اختراع کرده:

| صفحه | پیشوندهای ادهاک |
|---|---|
| home | `.hm-*` (۱۲۵)، `.pcard-*` |
| corporate-gifts | `.cg-*` (۱۲۰)، `.gift-* .col-* .occ-*` |
| payment-failed | `.pf-*` (۱۱۴) |
| product | `.zc-* .wsel-* .pkg-* .nut-* .qa-* .pfaq-* .details-acc-*` (۲۰۵) |
| about | `.ab-* .cpanel-* .gcard-* .promise-*` |
| not-found | `.nf-*` (۴۹) |
| … | … |

**مفاهیم تکراری با اسم‌های متفاوت:**

- «کارت»: `gcard / cpanel / hl-card / rev-card / qa-card / pcard / col-card`
- «آکوردئون»: `faq-a / details-acc / pfaq`
- «فرم/فیلد»: `cf-field / cform / contact-form / review-form` (در ۳+ صفحه تکرار)
- «گزینهٔ انتخابی»: `wsel / pkgsel`
- «چیپ/تگ»: `faq-chip / faq-fact / feat-chip / cat-chip`
- «نوار/استپ»: `faq-steps / track-timeline / steps`

نتیجه: نگه‌داری سخت، ظاهر ناهماهنگ، کدِ تکراری. این سند یک واژگانِ واحد تعریف می‌کند.

---

## ۲) اصول

1. **یک منبعِ حقیقت برای توکن‌ها** — رنگ/فاصله/شعاع/سایه/تایپ فقط در `:root` فایل `dz.css`.
2. **کلاس‌های مشترکِ معنایی، نه ادهاکِ هر صفحه** — یک واژگانِ BEM واحد و مستند.
3. **هر کامپوننت یک‌بار** — در `dz.css` (کلاس) + در `components/ui/` (کامپوننت React). صفحه‌ها فقط compose می‌کنند.
4. **CSS صفحه = فقط چیدمانِ خاصِ همان صفحه**، scoped زیر `.<route>-page`؛ بازتعریفِ کارت/دکمه/فرم ممنوع.
5. **نام‌گذاری انگلیسی** طبق `CLAUDE.md` (slug/route/file/asset انگلیسی؛ فارسی فقط در محتوا).
6. **داده از وردپرس/ووکامرس**؛ پروتوتایپ‌های HTML/JSX فقط مرجعِ نیت‌اند، نه منبعِ کد.

---

## ۳) لایه‌بندی

```
توکن‌ها (dz.css :root)
   ↓
کلاس‌های پایه + کامپوننت‌های مشترک (dz.css)
   ↓
کتابخانهٔ UI  (src/components/ui/*)   ← هر کامپوننت = همان کلاس‌های dz
   ↓
کامپوننت‌های دامنه (src/components/{product,layout,home,cart,...})
   ↓
صفحه‌ها (src/app/<route>/page.tsx + <route>.css scoped و حداقلی)
```

---

## ۴) کنوانسیون نام‌گذاری

- BEM: `block`, `block__element`, `block--modifier`.
- کلاس‌های **مشترک** بدون پیشوندِ صفحه (`btn`, `card`, `field`, `accordion`…).
- کلاس‌های **مخصوص صفحه**: همیشه nested زیر `.<route>-page`، و فقط برای چیدمان (مثل `.product-page .hero-grid`). بدون اختراع کارت/فرم/دکمهٔ جدید.
- حذف پیشوندهای رمزی (`hm/cg/pf/zc/nf/ab`). به‌جایشان نام معنایی.
- توکن‌ها: `--<role>` (مثل `--green`, `--ink-soft`, `--r-lg`, `--shadow`).

---

## ۵) توکن‌ها (تثبیت‌شده در `dz.css`)

| گروه | توکن‌ها |
|---|---|
| رنگ پایه | `--paper --paper-2 --surface --surface-warm --ink --ink-soft --ink-faint --hair --hair-strong` |
| برند | `--green --green-deep --green-soft --clay --clay-deep --clay-soft --gold --gold-deep --honey --amber-soft --amber-50 --star` |
| شعاع | `--r-sm --r --r-lg --r-xl` |
| سایه | `--shadow-sm --shadow --shadow-lg` |
| تایپ | `--display --body` + مقیاس (rem پایهٔ ۱۰px: `html{font-size:62.5%}`) |
| چیدمان | `--maxw` (۱۲۰rem) |

> تنها منبعِ این مقادیر `:root` است؛ هیچ صفحه‌ای رنگ/شعاع hard-code نمی‌کند.

---

## ۶) واژگانِ مشترکِ کامپوننت‌ها (کلاس‌های `dz.css` + کامپوننت `ui/`)

هر ردیف = یک کلاسِ مشترکِ واحد که **جایگزینِ همهٔ معادل‌های ادهاک** می‌شود.

### اتم‌ها

| کامپوننت `ui/` | کلاس(های) dz | جایگزینِ این ادهاک‌ها |
|---|---|---|
| `Button` | `.btn` `--primary/--clay/--ghost/--gold/--block/--sm/--lg` | دکمه‌های پراکنده |
| `Badge` | `.badge` `--clay/--gold/--green` | بج‌های هر صفحه |
| `Chip` | `.chip` `--clay/--gold` | `faq-chip` `feat-chip` `cat-chip` |
| `Fact` | `.fact` `--clay/--gold` | `faq-fact` |
| `Price` | `.price` `__now __old __off` | قیمت‌های `zc` `pcard` `summary` |
| `Stars` | `.stars` | تکرارهای ستاره |
| `RatingChip` | `.rating-chip` | چیپ امتیاز |
| `Avatar` | `.avatar` | آواتارِ نظر/پرسش |
| `Placeholder` | `.ph .ph__label` | (موجود) |
| `Toman` | `.toman` | واحد تومان |

### فرم

| `ui/` | کلاس dz | جایگزین |
|---|---|---|
| `Field` | `.field` `__label __hint` | `cf-field` و labelهای پراکنده |
| `Input/Textarea/Select` | `.input .textarea .select` | inputهای `contact-form` `review-form` `cform` |
| `FormRow` | `.form-row` `--2 --3` | `cf-row` |
| `FormNote` | `.form-note` | `cf-note` |
| `FormOk` | `.form-ok` | `cf-ok` و پیام‌های موفقیت |
| `StarPicker` | `.star-pick` | انتخاب امتیاز |

### چیدمان و ظرف

| `ui/` | کلاس dz | توضیح / جایگزین |
|---|---|---|
| `Container` | `.wrap` | (موجود) |
| `Section` | `.sec` + `.sec-head __kicker/__title/__sub` | تیترهای سکشن همه‌جا |
| `Card` | `.card` `__head/__body/__title/__text/__icon` | `gcard cpanel hl-card col-card …` |
| `Grid` | `.grid--auto/--2/--3/--4` | گریدهای تکراری |
| `Hero` | `.hero __inner/__kicker/__title/__sub/__chips` + `--green/--clay` | `faq-hero` (تعمیم به هیروِ عمومی) |
| `LinkCard` | `.link-card` | (موجود) |

### کامپوننت‌های مرکب

| `ui/` | کلاس dz | جایگزین |
|---|---|---|
| `Accordion` | `.accordion __item/__head/__body --open` | `faq-a` `details-acc` `pfaq` |
| `OptionGrid` + `Option` | `.option-grid` + `.option __label/__meta --active/--popular/--off` | `wsel/wsel__opt` `pkgsel/pkg-opt` |
| `Steps` | `.steps __item/__num/__label/__line` | `faq-steps` `track-timeline` `cprogress` |
| `Stat` | `.stat __num/__label` | اعداد آماری پراکنده |
| `Note` (callout) | `.note --clay/--gold/--green` | `faq-note` |
| `StockBar` | `.stockbar __fill` | نوار موجودی |
| `Toast/Drawer/Modal` | `.toast .drawer .modal` | (یکدست‌سازی) |

### چرومِ سایت (موجود، بدون تغییر ساختاری)

`hdr-*` (Header)، `ftr-*` (Footer)، `mega*` (مگامنو)، `brandmark*`، `news*` (Newsletter)، `crumbs` (مسیر).

---

## ۷) کتابخانهٔ React (`src/components/ui/`)

هر کامپوننت فقط همان کلاس‌های dz را رندر می‌کند (مثال API):

```tsx
<Button variant="primary" size="lg" block>افزودن به سبد</Button>
<Card><Card.Head>…</Card.Head><Card.Body>…</Card.Body></Card>
<Field label="نام" hint="…"><Input name="name" required /></Field>
<Accordion items={[{ id, head, body }]} single />
<OptionGrid value={wid} onChange={setWid} options={[{ id, label, meta, popular, off }]} />
<Price now={372000} old={460000} />
<Section kicker="…" title="…">…</Section>
```

- کامپوننت‌های **دامنه** (`product/`, `home/`, `cart/`, `layout/`) از همین اتم‌ها ساخته می‌شوند.
  مثلاً `ProductBuyBox`, `ReviewCard`, `ProductCard` = ترکیبِ `Card + Price + OptionGrid + Stars + Button`.
- نتیجه: یک دکمه/کارت/فرم/آکوردئونِ واحد در کلِ سایت.

---

## ۸) قواعدِ CSS صفحه

- یک فایل `<route>.css`، همه‌چیز nested زیر `.<route>-page`.
- فقط **چیدمان/ترکیبِ خاصِ همان صفحه** (گرید بزرگ، ترتیب سکشن‌ها، نسبت ستون‌ها).
- ممنوع: بازتعریف `card/btn/field/accordion/...`؛ hard-code رنگ/شعاع؛ اختراع پیشوند جدید.
- هدف: هر `<route>.css` کوچک بماند (راهنما: < ~۱۲۰ خط).

---

## ۹) معماری داده / وردپرس

- `src/lib/woo/` — کلاینت تایپ‌دار (`client.ts`)، `products.ts`/`categories.ts`، تایپ‌ها (`types.ts`).
- **`ProductView`** (`view.ts`): مونتاژِ همهٔ دادهٔ یک محصول از رکورد Woo + متای ACF؛ بخش‌ها در نبودِ داده پنهان.
- **قرارداد فیلدهای ACF** (مستند می‌شود): کلیدهای spec (`origin/harvest_date/drying_method/humidity`) و کلیدهای غنی (`dz_weights/dz_nutrition/dz_reviews/...`).
- دادهٔ dev: fixtures (`sample.ts`) برای آفلاین؛ Woo لوکال (`scripts/local-woo/`) برای دادهٔ واقعی؛ production → `dashtzad.com`.
- SEO: Rank Math (`rankmath.ts`) + سازنده‌های JSON-LD (`jsonld.ts`).

---

## ۱۰) ساختار پوشه (هدف)

```
src/
  app/<route>/page.tsx + <route>.css        # scoped، حداقلی
  app/globals.css                            # rem base + reset
  components/ui/                             # ★ کتابخانهٔ سیستم طراحی (جدید)
  components/{layout,product,home,cart,...}/  # کامپوننت‌های دامنه (compose از ui)
  styles/dz.css                              # توکن‌ها + پایه + کلاس‌های مشترک
  lib/{woo,seo,utils,...}
docs/design-system.md                        # همین سند
```

---

## ۱۱) نقشهٔ مهاجرت (فازها)

| فاز | کار | خروجی |
|---|---|---|
| ۰ | همین سند | تأیید معماری |
| ۱ | **فونداسیون**: تثبیت لایهٔ کامپوننتِ `dz.css` + ساخت `components/ui/*` + ثبت کنوانسیون در `CLAUDE.md` | سیستم آماده |
| ۲ | بازنویسی **صفحهٔ محصول** روی سیستم (حذف `zc/wsel/pkg/nut/...`) | الگوی مرجع |
| ۳ | بازنویسی بقیه به‌گروه: فرم‌محور (contact/bulk/corporate) · محتوا (faq/terms/track) · مارکتینگ (home/special-sale/brand-story) · ابزاری (payment/404) · about | یکدستی کامل |
| ۴ | حذف CSS مردهٔ ادهاک + verify (typecheck/lint/build) + مستند ACF | پاک‌سازی نهایی |

> هر فاز جداگانه commit و در صورت نیاز PR می‌شود. هیچ rename/حذفی بدون این‌که build سبز بماند انجام نمی‌شود.

---

## ۱۲) چیزهایی که تغییر **نمی‌کنند**

- توکن‌ها و پالت رنگ (همان دشت‌زاد).
- چرومِ سراسری (Header/Footer/مگامنو) — فقط در صورت نیاز به یکدست‌سازیِ کلاس.
- منطق دادهٔ Woo/SEO (فقط تمیزتر/مستندتر).
- قانون نام‌گذاری انگلیسیِ `CLAUDE.md`.

---

### پرسش برای تأیید
اگر این معماری و واژگان را تأیید می‌کنی، از **فاز ۱ (فونداسیون)** شروع می‌کنم.
اگر جایی از نام‌گذاری/ساختار را جور دیگری می‌خواهی، همین‌جا بگو تا سند را اصلاح کنم.
