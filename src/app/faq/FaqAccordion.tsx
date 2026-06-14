"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FAQ_GROUPS, NAV } from "./faq-data";

/** Normalize Persian text for forgiving search (drop ZWNJ + diacritics). */
function norm(s: string): string {
  return (s || "")
    .replace(/‌/g, " ")
    .replace(/[ً-ْ]/g, "")
    .toLowerCase()
    .trim();
}

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
    <div className="faq-layout">
      {/* ===== side category nav ===== */}
      <aside className="faq-nav" id="faqNav">
        <div className="faq-nav__h">
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
            <span className="faq-nav__ic">
              <i className={`fa-solid ${n.icon}`} aria-hidden />
            </span>{" "}
            {n.label}
          </a>
        ))}
        <div className="faq-nav__sep" />
        <Link className="faq-nav__contact" href="/contact">
          <i className="fa-solid fa-headset" aria-hidden />
          <span>
            <b>تماس با پشتیبانی</b>
            <span>هر روز ۹ تا ۲۱، کنار شما</span>
          </span>
        </Link>
      </aside>

      {/* ===== search + accordion groups ===== */}
      <div className="faq-main">
        <form className="faq-hero__search faq-search" onSubmit={(e) => e.preventDefault()}>
          <i className="fa-solid fa-magnifying-glass" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="سؤالتان را بنویسید… مثلاً «ارسال» یا «مرجوعی»"
            aria-label="جستجو در پرسش‌ها"
            autoComplete="off"
          />
          {query && (
            <button
              className="btn btn--primary btn--sm"
              type="button"
              onClick={() => setQuery("")}
            >
              <i className="fa-solid fa-xmark" aria-hidden /> پاک کردن
            </button>
          )}
        </form>

        {/* empty state */}
        <div className={`faq-empty${!anyVisible ? " show" : ""}`}>
          <i className="fa-regular fa-face-frown" aria-hidden />
          <p>
            پرسشی با این عبارت پیدا نشد. عبارت دیگری را امتحان کنید یا با پشتیبانی تماس بگیرید.
          </p>
        </div>

        {filtered.map(({ group, matches }) => {
          if (matches.length === 0) return null;
          const toneClass =
            group.tone === "clay"
              ? "faq-group faq-group--clay"
              : group.tone === "gold"
                ? "faq-group faq-group--gold"
                : "faq-group";
          return (
            <section className={toneClass} id={group.id} key={group.id}>
              <div className="faq-group__head">
                <span className="faq-group__ic">
                  <i className={`fa-solid ${group.icon}`} aria-hidden />
                </span>
                <div>
                  <h2 className="faq-group__t">{group.title}</h2>
                  <p className="faq-group__n">{group.note}</p>
                </div>
              </div>
              <div className="faq-list">
                {matches.map(({ it, i }) => {
                  const key = `${group.id}:${i}`;
                  const isOpen = !!open[key] || (!!q && true);
                  return (
                    <article className={`faq-item${isOpen ? " is-open" : ""}`} key={key}>
                      <button className="faq-q" type="button" onClick={() => toggle(key)}>
                        <span className="faq-q__ic">
                          <i className="fa-solid fa-plus" aria-hidden />
                        </span>
                        <span className="faq-q__txt">{it.q}</span>
                      </button>
                      <div className="faq-a">
                        <div className="faq-a__inner">
                          <div className="faq-a__body">{it.a}</div>
                        </div>
                      </div>
                    </article>
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
