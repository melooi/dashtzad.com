"use client";

import { useState } from "react";
import { Card, Field, Input, Select, Textarea, FormRow, FormNote, FormOk, Button } from "@/components/ui";

const OCCASIONS = [
  "نوروز",
  "شب یلدا",
  "قدردانی از کارکنان",
  "تقدیر از مشتریان",
  "سالگرد تأسیس",
  "سایر مناسبت‌ها",
];

const PACKS = ["پک دلگرمی", "پک مهرورزی", "پک سپاس", "سبد سفارشی"];

export function GiftForm() {
  const [done, setDone] = useState(false);

  return (
    <Card pad className="cg-form-card">
      <h3 className="cg-form-card__h">ثبت درخواست هدیه سازمانی</h3>
      <p className="cg-form-card__n">هرچه دقیق‌تر بنویسید، پیشنهاد ما دقیق‌تر خواهد بود.</p>
      <form
        className="cg-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          setDone(true);
          window.setTimeout(() => setDone(false), 6000);
        }}
      >
        <FormRow cols={2}>
          <Field label="نام و نام خانوادگی" required htmlFor="cgName">
            <Input type="text" id="cgName" required placeholder="مثلاً زهرا رحیمی" />
          </Field>
          <Field label="نام سازمان / برند" required htmlFor="cgCompany">
            <Input type="text" id="cgCompany" required placeholder="نام شرکت یا برند شما" />
          </Field>
        </FormRow>
        <FormRow cols={2}>
          <Field label="شماره تماس" required htmlFor="cgPhone">
            <Input type="tel" id="cgPhone" required inputMode="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" />
          </Field>
          <Field label="مناسبت" required htmlFor="cgOcc">
            <Select id="cgOcc" required defaultValue="">
              <option value="" disabled>
                یک گزینه را انتخاب کنید
              </option>
              {OCCASIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </Select>
          </Field>
        </FormRow>
        <FormRow cols={2}>
          <Field label="پک مورد نظر" htmlFor="cgPack">
            <Select id="cgPack" defaultValue="">
              <option value="" disabled>
                انتخاب کنید (اختیاری)
              </option>
              {PACKS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </Select>
          </Field>
          <Field label="تعداد تقریبی" required htmlFor="cgQty">
            <Input type="text" id="cgQty" required inputMode="numeric" placeholder="مثلاً ۱۵۰ پک" />
          </Field>
        </FormRow>
        <Field label="توضیحات" htmlFor="cgText">
          <Textarea
            id="cgText"
            placeholder="بودجه تقریبی هر پک، نیاز به درج لوگو، نوع توزیع و هر نکته دیگری که کمک می‌کند…"
          />
        </Field>
        <FormNote icon="fa-shield-heart">
          اطلاعات شما نزد ما محفوظ است و تنها برای هماهنگی استفاده می‌شود.
        </FormNote>
        <Button type="submit" variant="primary">
          <i className="fa-solid fa-paper-plane" aria-hidden /> ارسال درخواست و دریافت پیش‌فاکتور
        </Button>
        <FormOk show={done}>
          درخواست شما ثبت شد! کارشناس فروش سازمانی به‌زودی با شما تماس می‌گیرد.
        </FormOk>
      </form>
    </Card>
  );
}
