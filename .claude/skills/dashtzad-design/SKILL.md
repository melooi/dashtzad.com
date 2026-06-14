---
name: dashtzad-design
description: The دشت‌زاد storefront design system — how to build any page/component with the unified token + BEM-class + ui/ component vocabulary. USE THIS whenever creating or editing a page, section, or component under src/app or src/components so everything stays visually and structurally consistent. Triggers: "new page", "new section", "style this", "add a card/form/accordion/button", "match the design", any .css under src/app, anything in src/components/ui.
---

# دشت‌زاد Design System

One token layer, one shared BEM class vocabulary (`src/styles/dz.css`), one React
primitive library (`src/components/ui/`). Every page composes these. **Never invent
per-page ad-hoc class systems** (the old `.hm-*`, `.cg-*`, `.zc-*`, `.cf-*`, `.pf-*`
prefixes were the problem this system fixes). Full spec: `docs/design-system.md`.

## Golden rules

1. **Tokens only** — colours/space/radius/shadow/type come from `:root` in `dz.css`
   (`--green --ink --hair --r-lg --shadow --display` …). Never hard-code a hex/radius.
2. **Reuse primitives** — for any button, card, badge, chip, note, form field,
   accordion, option grid, price, stars, stat, step, hero, section head, placeholder →
   import from `@/components/ui` (or use the matching `dz.css` class). Do not re-implement them.
3. **Page CSS = layout only** — one `src/app/<route>/<route>.css`, everything nested
   under `.<route>-page`, holding ONLY page-specific layout (grids, section order,
   column ratios). Target < ~120 lines. No redefining shared components.
4. **rem base is 10px** (`html{font-size:62.5%}`) — `1.6rem = 16px`.
5. **English identifiers** (routes/files/classes/ids), Persian only in visible text +
   metadata. RTL (`dir="rtl"`). FA icons: `<i className="fa-solid fa-x" aria-hidden />`.
6. **Prototype = visual reference, not code.** Match the look (earthy-lux: warm stone
   neutrals + olive green + clay + gold) using OUR vocabulary; never copy prototype classes.
7. If a genuinely reusable visual pattern has no primitive, **add it to `dz.css` +
   `src/components/ui/` as a new primitive** (and document it here) — not a one-off class.

## ui/ components (`@/components/ui`)

`Button` `ButtonLink` · `Badge` `Chip` · `Card` `IconBox` · `SectionHead` · `Hero` ·
`Field` `Input` `Textarea` `Select` `FormRow` `FormNote` `FormOk` · `Accordion` ·
`OptionGrid` · `Price` `Stars` `RatingChip` · `Note` `Stat` `Placeholder` · `Steps` ·
`Container`.

```tsx
// page shell
<div className="<route>-page dz">
  <Hero kicker={<><i className="fa-solid fa-leaf"/> برچسب</>} title="…" sub="…"
        chips={<><a className="hero__chip" href="#x"><i className="fa-solid fa-x"/> …</a></>} />
  <section className="wrap sec">
    <SectionHead kicker="…" title="…" sub="…" />
    <div className="grid--auto">
      <Card pad hover><IconBox icon="fa-leaf" tone="green" /> …</Card>
    </div>
  </section>
</div>

// form
<FormRow cols={2}>
  <Field label="نام" required htmlFor="n"><Input id="n" name="name" required /></Field>
  <Field label="موبایل" htmlFor="p"><Input id="p" type="tel" dir="ltr" /></Field>
</FormRow>
<FormNote icon="fa-shield-heart">اطلاعات شما محفوظ است.</FormNote>
<FormOk show={done}>پیام ثبت شد!</FormOk>

// data
<Accordion items={[{ id:"a", head:"سؤال؟", icon:"fa-box", body:<p>پاسخ…</p> }]} />
<OptionGrid value={v} onChange={setV} layout="grid" columns={3}
  options={[{ id:"w500", label:"۵۰۰ گرم", meta:"۳۷۲٬۰۰۰ تومان", popular:"پرفروش", off:"٪۱۹" }]} />
<Price now={372000} old={460000} off={19} size="lg" />
<Steps items={[{ num:"۱", title:"ثبت سفارش", desc:"…", state:"done" }]} />
<Note tone="clay" icon="fa-triangle-exclamation">هشدار…</Note>
<Stat num="۲۶۲" label="کیلوکالری" />  <Placeholder label="تصویر محصول" />
```

## Shared dz.css class vocabulary (when not using a ui/ component)

- containers: `wrap` · `sec` `sec--warm` · `sec-head` `sec-head--center` `sec__kicker` `sec__title` `sec__sub`
- card: `card` `card--pad` `card--hover` `card__head/__body/__title/__text` · `icon-box` (`--clay/--gold/--ink/--sm/--lg/--round`)
- atoms: `btn` (`--primary/--clay/--ghost/--sm/--lg/--block`) · `badge` (`--clay/--gold`) · `chip` (`--green/--clay/--gold/--block`) · `note` (`--clay/--gold/--green`)
- commerce: `price` `price__now/__old` `discount-chip` · `stars` · `rating-chip` · `stockbar` `stockbar__fill` · `option-grid` (`--2/--3/--row`) `option` (`--start`, `[data-active]`, `option__label/__meta/__pop/__off`)
- data: `accordion` `accordion__item/__head/__head-l/__chev/__body/__inner` (`.is-open`) · `steps` `steps__item/__num/__b/__t/__d` (`__num--done/--pending`) · `stat` `stat__num/__label` · `avatar` (`--green/--sm`)
- form: `field` `field__label/__hint` `req` · `input` `textarea` `select` · `form-row` (`--2/--3`) · `form-note` · `form-ok` (`.show`) · `star-pick`
- hero: `hero` (`--clay`) `hero__inner/__kicker/__title/__sub/__chips/__chip`
- grids: `grid--auto/--2/--3/--4`
- utils: `display` `num` `muted` `faint` `ph` `ph__label` `see-all`
- chrome (global, rendered by layout): `hdr-*` `ftr-*` `mega*` `brandmark*` `news*` `link-card*`

## Data / WordPress

Data comes from headless WooCommerce via `src/lib/woo/` (typed client + `ProductView`
in `view.ts`, ACF/`dz_*` meta). Keep `metadata`, `JsonLd` (breadcrumb/faq/product
schema), and interactivity intact when restyling. Dev data: `lib/woo/sample.ts`
fixtures (offline) or the local Woo in `scripts/local-woo/`.

## Checklist before finishing any UI work

- [ ] No new ad-hoc component classes; primitives reused from `ui/` + `dz.css`.
- [ ] Page CSS is layout-only, scoped under `.<route>-page`, small.
- [ ] No hard-coded colours/radii (tokens only).
- [ ] `typecheck` + `lint` + `build` green; route renders 200, no console errors.
