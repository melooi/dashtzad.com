import localFont from "next/font/local";

/**
 * IRANYekanX — self-hosted via next/font/local (NOT a CDN).
 *
 * Drop the .woff2 files into `src/fonts/` with the names below.
 * See src/fonts/README.md for the exact files required.
 * Until the files exist the build will fail on this import — that is expected.
 */
export const iranYekan = localFont({
  src: [
    { path: "../fonts/IRANYekanX-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/IRANYekanX-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/IRANYekanX-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/IRANYekanX-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-iranyekan",
  display: "swap",
  preload: true,
});
