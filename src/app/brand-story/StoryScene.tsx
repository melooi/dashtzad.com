"use client";

import { useEffect, useRef } from "react";

/**
 * StoryScene — the cinematic scroll engine for the brand-story page.
 * - Crossfades the fixed "sky" layers from night → dawn as the reader scrolls.
 * - Drives the top progress bar.
 * - Reveals [data-reveal] beats on enter.
 * - Toggles the minimal header into its solid state past the hero.
 *
 * Pure client-side, no assets. The sky layers are .ph placeholders that
 * fade between tinted gradients (see brand-story.css), so we only animate
 * opacity here — no images involved.
 */
export function StoryScene({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    const sky = root.querySelector<HTMLElement>(".skybg");
    const layers = sky
      ? Array.from(sky.querySelectorAll<HTMLElement>(".skybg__img"))
      : [];
    const stops = layers.map((l) => parseFloat(l.dataset.stop ?? "0"));
    const shdr = root.querySelector<HTMLElement>(".shdr");
    const fill = root.querySelector<HTMLElement>(".sprog__fill");
    const finale = root.querySelector<HTMLElement>(".finale");

    let ticking = false;

    const render = () => {
      ticking = false;
      const vh = window.innerHeight;
      const end = Math.max(1, (finale?.offsetTop ?? vh * 2) - vh);
      const g = clamp(window.scrollY / end, 0, 1);

      for (let i = 1; i < layers.length; i++) {
        const prev = stops[i - 1] ?? 0;
        const cur = stops[i] ?? 1;
        const layer = layers[i];
        if (layer) layer.style.opacity = clamp((g - prev) / (cur - prev), 0, 1).toFixed(3);
      }

      if (shdr) {
        if (window.scrollY > vh * 0.5) shdr.classList.add("is-solid");
        else shdr.classList.remove("is-solid");
      }

      if (fill) {
        const docH = document.documentElement.scrollHeight - vh;
        fill.style.width = (clamp(window.scrollY / Math.max(1, docH), 0, 1) * 100).toFixed(2) + "%";
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", render);
    render();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", render);
      io.disconnect();
    };
  }, []);

  return (
    <div className="story-shell" ref={rootRef}>
      {children}
    </div>
  );
}
