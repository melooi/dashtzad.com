# Fonts

Self-hosted **IRANYekanX** (loaded via `next/font/local`, never a CDN).

Place these `.woff2` files here — filenames must match `src/lib/fonts.ts`:

- `IRANYekanX-Regular.woff2` (400)
- `IRANYekanX-Medium.woff2` (500)
- `IRANYekanX-Bold.woff2` (700)
- `IRANYekanX-ExtraBold.woff2` (800)

> The build fails until these exist — that is expected for a fresh clone.
> Convert from the licensed `.ttf`/`.otf` to `.woff2` (e.g. `fonttools` or an online converter) and commit the `.woff2` files.
