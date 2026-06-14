"use client";

import { useState } from "react";
import { Button, Field, Input, Select, Textarea, FormRow, FormNote, FormOk } from "@/components/ui";

const REQUEST_TYPES = [
  "خرید عمده محصولات",
  "هدایای سازمانی (نوروز/یلدا)",
  "همکاری و نمایندگی",
  "سفارش سفارشی‌سازی‌شده",
  "سایر موارد",
];

export function BulkForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="bulk-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        setDone(true);
        window.setTimeout(() => setDone(false), 6000);
      }}
    >
      <FormRow cols={2}>
        <Field label="نام و نام خانوادگی" required htmlFor="bName">
          <Input type="text" id="bName" required placeholder="مثلا زهرا رحیمی" />
        </Field>
        <Field label="نام کسب‌وکار / سازمان" htmlFor="bCompany">
          <Input type="text" id="bCompany" placeholder="نام شرکت یا برند شما" />
        </Field>
      </FormRow>

      <FormRow cols={2}>
        <Field label="شماره تماس" required htmlFor="bPhone">
          <Input type="tel" id="bPhone" required inputMode="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
        </Field>
        <Field label="نوع درخواست" required htmlFor="bType">
          <Select id="bType" required defaultValue="">
            <option value="" disabled>
              یک گزینه را انتخاب کنید
            </option>
            {REQUEST_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </FormRow>

      <Field label="توضیحات درخواست" required htmlFor="bText">
        <Textarea
          id="bText"
          required
          placeholder="تعداد تقریبی، مناسبت، بودجه و هر نکته‌ای که به ما کمک می‌کند…"
        />
      </Field>

      <FormNote icon="fa-shield-heart">
        اطلاعات شما نزد ما محفوظ است و تنها برای هماهنگی استفاده می‌شود.
      </FormNote>

      <Button type="submit" className="bulk-form__submit">
        <i className="fa-solid fa-paper-plane" aria-hidden /> ارسال درخواست
      </Button>

      <FormOk show={done}>
        درخواست شما ثبت شد! کارشناس فروش سازمانی به‌زودی با شما تماس می‌گیرد.
      </FormOk>
    </form>
  );
}
