"use client";

import { useState } from "react";
import { Button, FormNote, Input } from "@/components/ui";

export function NotFoundSearch() {
  const [q, setQ] = useState("");
  const [note, setNote] = useState(false);

  return (
    <div className="nf-search">
      <form
        className="nf-search__bar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setNote(true);
          window.setTimeout(() => setNote(false), 6000);
        }}
      >
        <i className="fa-solid fa-magnifying-glass" aria-hidden />
        <Input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو در محصولات دشت‌زاد…"
          aria-label="جستجو"
          className="nf-search__input"
        />
        <Button type="submit" className="nf-search__btn">
          جستجو
        </Button>
      </form>
      {note && (
        <FormNote icon="fa-circle-info" className="nf-search__note">
          جستجو در نسخه نمایشی فعال نیست؛ از فهرست محصولات یا دسته‌های پرطرفدار استفاده کنید.
        </FormNote>
      )}
    </div>
  );
}
