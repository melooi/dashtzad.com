"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Field,
  FormNote,
  FormOk,
  FormRow,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

const TYPES = [
  "پیگیری سفارش",
  "مشاوره خرید",
  "خرید عمده",
  "همکاری با دشت‌زاد",
  "انتقاد و پیشنهاد",
  "مشکل پرداخت",
  "سایر موارد",
];

export function ContactForm() {
  const [done, setDone] = useState(false);

  return (
    <Card pad as="section" className="contact-form-card">
      <h2 className="display contact-form-card__h">فرم تماس با ما</h2>
      <p className="muted contact-form-card__sub">
        برای ارسال پیام، فرم زیر را کامل کنید. اگر موضوع پیام شما مربوط به سفارش است، شماره سفارش یا
        شماره موبایل ثبت‌شده را هم در متن وارد کنید تا سریع‌تر بررسی شود.
      </p>

      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          setDone(true);
          window.setTimeout(() => setDone(false), 8000);
        }}
      >
        <FormRow cols={2}>
          <Field label="نام و نام خانوادگی" required htmlFor="cfName">
            <Input type="text" id="cfName" required placeholder="مثلاً زهرا رحیمی" />
          </Field>
          <Field label="شماره موبایل" required htmlFor="cfPhone">
            <Input type="tel" id="cfPhone" required inputMode="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
          </Field>
        </FormRow>

        <FormRow cols={2}>
          <Field label="موضوع پیام" required htmlFor="cfSubject">
            <Input type="text" id="cfSubject" required placeholder="موضوع پیام خود را بنویسید" />
          </Field>
          <Field label="نوع درخواست" required htmlFor="cfType">
            <Select id="cfType" required defaultValue="">
              <option value="" disabled>
                یک گزینه را انتخاب کنید
              </option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
        </FormRow>

        <Field label="متن پیام" required htmlFor="cfText">
          <Textarea id="cfText" required placeholder="پیام خود را این‌جا بنویسید…" />
        </Field>

        <FormNote icon="fa-shield-heart">
          اطلاعات شما نزد ما محفوظ است و تنها برای پاسخ‌گویی استفاده می‌شود.
        </FormNote>

        <Button type="submit" className="contact-form__submit">
          <i className="fa-solid fa-paper-plane" aria-hidden /> ارسال پیام
        </Button>

        <FormOk show={done}>
          پیام شما ثبت شد! کارشناسان ما به‌زودی با شما تماس می‌گیرند.
        </FormOk>
      </form>
    </Card>
  );
}
