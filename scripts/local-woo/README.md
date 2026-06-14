# Local WooCommerce for development

Spin up a throwaway WordPress + WooCommerce backend (via [WordPress Playground](https://wordpress.github.io/wordpress-playground/))
so the storefront renders against a **real WooCommerce REST API** instead of the
dev sample fixtures — no Docker, no MySQL, just Node + PHP.

The [`blueprint.json`](blueprint.json) installs WooCommerce, creates 3 demo
products (with the same English slugs the fixtures use) carrying the custom ACF
specs (`origin` / `harvest_date` / `drying_method` / `humidity`) and the full
design data (`dz_weights`, `dz_nutrition`, `dz_reviews`, …) as `meta_data`, and
registers a read-only REST API key.

## Start

```bash
npx @wp-playground/cli@latest start \
  --blueprint=scripts/local-woo/blueprint.json \
  --port=9400 --reset --no-auto-mount --skip-browser --login=false
```

Keep it running in another terminal. It serves WordPress on `http://127.0.0.1:9400`.

## Point the storefront at it

Add to `.env.local` (gitignored):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WP_URL=http://127.0.0.1:9400
WOO_API_URL=http://127.0.0.1:9400
WOO_CONSUMER_KEY=ck_dzlocal0000000000000000000000000000001
WOO_CONSUMER_SECRET=cs_dzlocal0000000000000000000000000000001
```

Restart `npm run dev`. With `WOO_API_URL` set, the app stops using the dev
fixtures (`src/lib/woo/sample.ts`) and fetches live from the local store.

## Notes

- **Ephemeral**: `--reset` rebuilds a clean site on every start (data is not
  persisted). Drop `--reset` to keep the site, but then the blueprint must not
  re-run product creation (duplicate SKU → fatal), so `--reset` is simplest.
- **HTTP auth shim**: WooCommerce only accepts consumer key/secret over HTTPS.
  The blueprint writes a dev-only mu-plugin that spoofs `$_SERVER['HTTPS']` for
  `/wc/` requests so the keys authenticate over the local HTTP transport. Never
  ship that mu-plugin to production.
- **Production**: point the same env vars at the real `https://dashtzad.com`
  (or `cms.dashtzad.com`) WooCommerce and generate proper read-only REST keys
  in WooCommerce → Settings → Advanced → REST API.
- The demo credentials above only work against this local ephemeral store.
