"use client";

import { useState } from "react";

export function NotFoundSearch() {
  const [q, setQ] = useState("");
  const [note, setNote] = useState(false);

  return (
    <>
      <form
        className="nf-search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setNote(true);
          window.setTimeout(() => setNote(false), 6000);
        }}
      >
        <i className="fa-solid fa-magnifying-glass" aria-hidden />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو در محصولات دشت‌زاد…"
          aria-label="جستجو"
        />
        <button type="submit" className="btn btn--primary nf-search__btn">
          جستجو
        </button>
      </form>
      <p className={`nf-search-note${note ? " show" : ""}`} aria-live="polite">
        <i className="fa-solid fa-circle-info" aria-hidden /> جستجو در نسخه نمایشی فعال نیست؛ از فهرست
        محصولات یا دسته‌های پرطرفدار استفاده کنید.
      </p>
    </>
  );
}
