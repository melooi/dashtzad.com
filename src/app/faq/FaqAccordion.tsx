"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button, IconBox } from "@/components/ui";
import { FAQ_GROUPS, NAV } from "./faq-data";

/** Normalize Persian text for forgiving search (drop ZWNJ + diacritics). */
function norm(s: string): string {
  return (s || "")
    .replace(/‌/g, " ")
    .replace(/[ً-ْ]/g, "")
    .toLowerCase()
    .trim();
}

/** Tone → IconBox tone for the group head badge. */
const GROUP_TONE = { green: "green", clay: "clay", gold: "gold" } as const;

export function FaqAccordion() {
  const [query, setQuery] = useState("");
  // track open state per "groupId:index" key
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    // open the first question by default
    const first = FAQ_GROUPS[0]?.items.length ? `${FAQ_GROUPS[0].id}:0` : "";
    return first ? { [first]: true } : {};
  });
  const [activeNav, setActiveNav] = useState<string>(NAV[0]?.id ?? "");
  const navRef = useRef(false);

  const q = norm(query);

  // filtered structure: for each group, which item indices match
  const filtered = useMemo(() => {
    return FAQ_GROUPS.map((g) => {
      const matches = g.items
        .map((it, i) => ({ it, i }))
        .filter(({ it }) => !q || norm(it.q + " " + it.plain).includes(q));
      return { group: g, matches };
    });
  }, [q]);

  const anyVisible = filtered.some((f) => f.matches.length > 0);

  function toggle(key: string) {
    setOpen((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
        return next;
      }
      // single-open within the same group for a tidy feel
      const groupId = key.split(":")[0];
      for (const k of Object.keys(next)) {
        if (k.startsWith(`${groupId}:`)) delete next[k];
      }
      next[key] = true;
      return next;
    });
  }

  function jumpTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    navRef.current = true;
    const cs = getComputedStyle(document.documentElement);
    const hdr = parseFloat(cs.getPropertyValue("--hdr-h")) || 90;
    const y = el.getBoundingClientRect().top + window.scrollY - hdr - 16;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveNav(id);
    window.setTimeout(() => {
      navRef.current = false;
    }, 600);
  }

  // scroll-spy
  useEffect(() => {
    function paint() {
      if (navRef.current) return;
      const cs = getComputedStyle(document.documentElement);
      const hdr = parseFloat(cs.getPropertyValue("--hdr-h")) || 90;
      const trigger = hdr + 60;
      let current = NAV[0]?.id ?? "";
      for (const n of NAV) {
        const s = document.getElementById(n.id);
        if (s && s.getBoundingClientRect().top < trigger) current = n.id;
      }
      setActiveNav(current);
    }
    window.addEventListener("scroll", paint, { passive: true });
    paint();
    return () => window.removeEventListener("scroll", paint);
  }, []);

  return (
    <div className="faq-page__layout">
      {/* ===== side category nav ===== */}
      <aside className="faq-page__nav" id="faqNav">
        <div className="faq-page__nav-h">
          <i className="fa-solid fa-layer-group" aria-hidden /> دسته‌بندی پرسش‌ها
        </div>
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={activeNav === n.id ? "is-active" : undefined}
            onClick={(e) => {
              e.preventDefault();
              jumpTo(n.id);
            }}
          >
            <IconBox icon={n.icon} size="sm" tone="green" className="faq-page__nav-ic" />
            {n.label}
          </a>
        ))}
        <div className="faq-page__nav-sep" />
        <Link className="faq-page__nav-contact" href="/contact">
          <i className="fa-solid fa-headset" aria-hidden />
          <span>
            <b>تماس با پشتیبانی</b>
            <span>هر روز ۹ تا ۲۱، کنار شما</span>
          </span>
        </Link>
      </aside>

      {/* ===== search + accordion groups ===== */}
      <div className="faq-page__main">
        <form className="faq-page__search" onSubmit={(e) => e.preventDefault()}>
          <i className="fa-solid fa-magnifying-glass" aria-hidden />
          <input
            className="input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="سؤالتان را بنویسید… مثلاً «ارسال» یا «مرجوعی»"
            aria-label="جستجو در پرسش‌ها"
            autoComplete="off"
          />
          {query && (
            <Button type="button" size="sm" onClick={() => setQuery("")}>
              <i className="fa-solid fa-xmark" aria-hidden /> پاک کردن
            </Button>
          )}
        </form>

        {/* empty state */}
        {!anyVisible && (
          <div className="faq-page__empty">
            <i className="fa-regular fa-face-frown" aria-hidden />
            <p>
              پرسشی با این عبارت پیدا نشد. عبارت دیگری را امتحان کنید یا با پشتیبانی تماس بگیرید.
            </p>
          </div>
        )}

        {filtered.map(({ group, matches }) => {
          if (matches.length === 0) return null;
          return (
            <section className="faq-page__group" id={group.id} key={group.id}>
              <div className="faq-page__group-head">
                <IconBox icon={group.icon} size="lg" tone={GROUP_TONE[group.tone]} />
                <div>
                  <h2 className="faq-page__group-t">{group.title}</h2>
                  <p className="faq-page__group-n">{group.note}</p>
                </div>
              </div>

              <div className="accordion">
                {matches.map(({ it, i }) => {
                  const key = `${group.id}:${i}`;
                  const isOpen = !!open[key] || !!q;
                  return (
                    <div
                      className={`accordion__item${isOpen ? " is-open" : ""}`}
                      key={key}
                    >
                      <button
                        type="button"
                        className="accordion__head"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                      >
                        <span className="accordion__head-l">
                          <span className="icon-box icon-box--sm icon-box--round faq-page__q-ic">
                            <i className="fa-solid fa-plus" aria-hidden />
                          </span>
                          {it.q}
                        </span>
                        <i className="fa-solid fa-angle-down accordion__chev" aria-hidden />
                      </button>
                      <div className="accordion__body">
                        <div className="accordion__inner faq-page__answer">{it.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
