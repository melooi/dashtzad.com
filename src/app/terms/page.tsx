import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { TermsToc } from "./TermsToc";
import "./terms.css";

export const metadata: Metadata = {
  title: "قوانین و مقررات",
  description:
    "شرایط خرید، حساب کاربری، پرداخت، ارسال، مرجوعی و حریم خصوصی فروشگاه دشت‌زاد. ثبت هر سفارش به‌منزله مطالعه و پذیرش این مقررات است.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="terms-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "قوانین و مقررات", path: "/terms" },
        ])}
      />

      {/* HERO */}
      <section className="faq-hero">
        <div className="wrap">
          <div className="faq-hero__inner">
            <span className="faq-hero__kicker">
              <i className="fa-solid fa-scale-balanced" aria-hidden /> اعتماد، پایه هر خرید است
            </span>
            <h1 className="faq-hero__title">قوانین و مقررات</h1>
            <p className="faq-hero__sub">
              شرایط خرید، حساب کاربری، ارسال، مرجوعی، پرداخت و حریم خصوصی شما را این‌جا روشن و
              بی‌ابهام نوشته‌ایم. ثبت هر سفارش به‌منزله مطالعه و پذیرش این مقررات است.
            </p>
            <span className="legal-updated">
              <i className="fa-regular fa-calendar-check" aria-hidden /> آخرین به‌روزرسانی: ۱۲ خرداد
              ۱۴۰۵
            </span>

            <div className="faq-hero__chips">
              <a className="faq-chip" href="#t-buy">
                <i className="fa-solid fa-bag-shopping" aria-hidden /> شرایط خرید
              </a>
              <a className="faq-chip" href="#t-return">
                <i className="fa-solid fa-rotate-left" aria-hidden /> شرایط مرجوعی
              </a>
              <a className="faq-chip" href="#t-privacy">
                <i className="fa-solid fa-user-shield" aria-hidden /> حریم خصوصی
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className="wrap">
        <div className="faq-layout">
          {/* TOC nav (scroll-spy) */}
          <TermsToc />

          {/* legal prose */}
          <div className="legal">
            <div className="legal-intro">
              <p>
                فروشگاه دشت‌زاد (با نام حقوقی <strong>شرکت دشت‌زاد تجارت ایرانیان</strong>) متعهد است
                محصولاتی طبیعی و باکیفیت را با شفاف‌ترین شرایط ممکن به دست شما برساند. مقرراتی که در
                ادامه می‌خوانید، چارچوب همکاری ما با شماست و برای حفظ حقوق هر دو طرف تنظیم شده است.
              </p>
              <p>
                این مقررات ممکن است هر از چندی به‌روزرسانی شود؛ نسخه معتبر همان است که در زمان ثبت
                سفارش روی این صفحه قرار دارد.
              </p>
            </div>

            {/* 1 — کلیات و تعاریف */}
            <section className="legal-sec" id="t-general">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۱</span>
                <div>
                  <h2 className="legal-sec__t">کلیات و تعاریف</h2>
                  <p className="legal-sec__n">دامنه کاربرد، تعریف‌ها و پذیرش قوانین</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  استفاده از وب‌سایت دشت‌زاد و خدمات آن، برای تمام افرادی که بر اساس قوانین جمهوری
                  اسلامی ایران اهلیت قانونی دارند، به‌شرط رعایت این قوانین مجاز است. ورود به حساب
                  کاربری یا ثبت هر سفارش، به‌منزله آگاهی و پذیرش کامل این مقررات و جایگزین توافق‌های
                  پیشین است.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>کاربر:</strong> شخصی که با ثبت اطلاعات خود در سایت ثبت‌نام و از خدمات
                      استفاده می‌کند. حداقل سن قانونی برای خرید <strong>۱۸ سال</strong> یا تحت نظارت
                      ولیّ/سرپرست قانونی است.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>فروشنده:</strong> فروشگاه دشت‌زاد و هر شخص حقیقی یا حقوقی که کالای خود
                      را در این سایت عرضه می‌کند.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      خرید از دشت‌زاد بر مبنای <strong>قوانین تجارت الکترونیکی</strong> و با رعایت
                      کامل قوانین جاری کشور انجام می‌شود.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 2 — حساب کاربری و ثبت‌نام */}
            <section className="legal-sec" id="t-account">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۲</span>
                <div>
                  <h2 className="legal-sec__t">حساب کاربری و ثبت‌نام</h2>
                  <p className="legal-sec__n">ساخت حساب، صحت اطلاعات و امنیت آن</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  برای استفاده از خدمات و ثبت سفارش، داشتن حساب کاربری لازم است. ثبت‌نام با شماره
                  موبایل و کد فعال‌سازی پیامکی انجام می‌شود.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      کاربر می‌پذیرد که اطلاعات را <strong>صحیح، کامل و به‌روز</strong> وارد کند و
                      تنها با شماره و ایمیلِ متعلق به خود ثبت‌نام نماید.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      مسئولیت حفظ محرمانگی نام کاربری و رمز عبور با کاربر است؛ در صورت سرقت یا مفقودی،
                      باید در اسرع وقت به دشت‌زاد اطلاع داده شود.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      حساب کاربری <strong>قائم به شخص و غیرقابل‌انتقال</strong> است و همه فعالیت‌های
                      انجام‌شده از طریق آن، منتسب به دارنده حساب است.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      کاربر حقوقی باید نماینده حقیقی و اطلاعات حقوقی (نام شرکت، شناسه ملی و کد
                      اقتصادی) را معرفی کند.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      در صورت ارائه اطلاعات نادرست، دشت‌زاد می‌تواند حساب کاربری را مسدود یا از ارائه
                      خدمات خودداری کند.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 3 — شرایط خرید و ثبت سفارش */}
            <section className="legal-sec" id="t-buy">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۳</span>
                <div>
                  <h2 className="legal-sec__t">شرایط خرید و ثبت سفارش</h2>
                  <p className="legal-sec__n">قیمت، موجودی، قرارداد الکترونیکی و سفارش</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  ثبت سفارش در دشت‌زاد به‌منزله انعقاد قرارداد الکترونیکی است. لطفاً پیش از
                  نهایی‌کردن خرید به نکات زیر توجه کنید:
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      تمام قیمت‌ها به <strong>تومان</strong> و شامل مالیات بر ارزش افزوده است.
                      قیمت‌ها ممکن است بدون اطلاع قبلی تغییر کند، اما سفارش ثبت‌شده با{" "}
                      <strong>قیمت همان لحظه</strong> نهایی می‌شود.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      موجودی کالاها لحظه‌ای است و افزودن به سبد خرید به‌معنای رزرو قطعی نیست. اگر
                      کالایی پس از پرداخت ناموجود شود، دشت‌زاد حق{" "}
                      <strong>لغو و استرداد وجه</strong> (حداکثر ظرف ۷۲ ساعت کاری) یا پیشنهاد جایگزین
                      را دارد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      در صورت بروز <strong>خطای آشکار در قیمت</strong>، دشت‌زاد حق بررسی، اصلاح یا
                      ابطال سفارش و بازگرداندن وجه دریافتی را دارد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      روز کاری به‌معنای شنبه تا پنج‌شنبه به‌جز تعطیلات رسمی است. امکان ثبت سفارش
                      به‌صورت <strong>۲۴ ساعته و ۷ روز هفته</strong> فراهم است.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      تحویل در اماکن عمومی (کافه، رستوران، هتل و مانند آن) ممکن نیست؛ آدرس باید دقیق و
                      قابل استناد باشد.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4 — تسویه حساب */}
            <section className="legal-sec" id="t-pay">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۴</span>
                <div>
                  <h2 className="legal-sec__t">تسویه حساب</h2>
                  <p className="legal-sec__n">پرداخت، درگاه امن و کارت‌به‌کارت</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  انجام تسویه‌حساب برای ثبت نهایی سفارش الزامی است. در پایان مراحل ثبت سفارش، درگاه
                  پرداخت اینترنتی امن باز می‌شود.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      پرداخت از طریق <strong>درگاه بانکی مورد تأیید شاپرک</strong> انجام می‌شود و
                      مسئولیت ورود اطلاعات بانکی در صفحه بانک با کاربر است؛ این اطلاعات نزد دشت‌زاد
                      ذخیره نمی‌شود.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      در صورت بروز اختلال در پرداخت اینترنتی، با هماهنگی پشتیبانی امکان پرداخت{" "}
                      <strong>کارت‌به‌کارت</strong> و سپس ثبت نهایی وجود دارد. کارت‌به‌کارت تنها در
                      صورت اعلام رسمی دشت‌زاد معتبر است.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      سفارش تنها <strong>پس از تأیید پرداخت</strong> وارد مرحله پردازش می‌شود و
                      سفارش‌های پرداخت‌نشده پس از مدت مشخصی لغو می‌شوند.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      سبد خرید بالای <strong>۳ میلیون تومان</strong> امکان پرداخت در محل ندارد و باید
                      پیش از ارسال به‌صورت اینترنتی تسویه شود.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 5 — حمل، تحویل و دریافت */}
            <section className="legal-sec" id="t-ship">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۵</span>
                <div>
                  <h2 className="legal-sec__t">حمل، تحویل و دریافت سفارش</h2>
                  <p className="legal-sec__n">زمان‌بندی، روش ارسال و بازرسی هنگام تحویل</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  ارسال سفارش‌ها در محدوده تهران از طریق پیک و در سایر شهرها به‌واسطه پست انجام
                  می‌شود. هر سفارش حداکثر ظرف ۲۴ ساعت کاری پردازش و تحویل پست/پیک می‌شود.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      هزینه ارسال بر اساس <strong>وزن و مقصد</strong> محاسبه و در صفحه پرداخت نمایش
                      داده می‌شود؛ خریدهای بالای ۷۰۰٬۰۰۰ تومان از ارسال رایگان بهره‌مند می‌شوند.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      پس از تحویل مرسوله به شرکت پست/پیک، کد رهگیری برای شما ارسال می‌شود و
                      زمان‌بندیِ رسیدن تابع آن شرکت است. دشت‌زاد در قبال تأخیرهای خارج از کنترل خود
                      (شرایط جوی، تعطیلات، اختلال پستی) مسئولیتی ندارد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      مکان تحویل، نشانیِ ثبت‌شده توسط کاربر است و پس از تحویل به پست/پیک، تغییر آن
                      ممکن نیست.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      کاربر موظف است هنگام تحویل و <strong>پیش از امضای رسید</strong>، سلامت بسته‌بندی
                      و ظاهر کالا را بررسی کند؛ در صورت آسیب آشکار، از تحویل خودداری و بلافاصله موضوع
                      را به دشت‌زاد اطلاع دهد. امضای رسید بدون بررسی، به‌منزله دریافت سالم کالاست.
                    </span>
                  </li>
                </ul>
                <Link className="legal-link" href="/faq">
                  <i className="fa-solid fa-circle-info" aria-hidden /> جزئیات زمان و هزینه ارسال در
                  پرسش‌های متداول
                </Link>
              </div>
            </section>

            {/* 6 — مرجوعی و استرداد */}
            <section className="legal-sec" id="t-return">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۶</span>
                <div>
                  <h2 className="legal-sec__t">شرایط مرجوعی و استرداد (حق انصراف)</h2>
                  <p className="legal-sec__n">بازگشت کالا، موارد قابل و غیرقابل مرجوع</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>رضایت شما برای ما در اولویت است. شرایط مرجوع‌کردن و استرداد به این شرح است:</p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>پیش از ارسال:</strong> در صورت انصراف پس از تسویه و پیش از ارسال، کل وجه
                      دریافتی حداکثر ظرف <strong>۷۲ ساعت کاری</strong> بازمی‌گردد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>پس از ارسال:</strong> کالای سالم تا <strong>۷ روز</strong> پس از دریافت
                      و به‌شرط باز نشدن بسته‌بندی و نبود خسارت، قابل استرداد است؛ هزینه بازگشت کالای
                      سالم بر عهده خریدار است.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      به دلیل مسائل بهداشتی، اقلام خوراکیِ <strong>باز یا مصرف‌شده</strong> قابل
                      مرجوع‌کردن نیستند، مگر در صورت وجود ایراد کیفی یا مغایرت.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      کالای مرجوعی باید همراه <strong>فاکتور</strong> و در بسته‌بندی اصلی و سالم
                      بازگردانده شود. بازگشت وجه، پس از دریافت و بازبینی کالا و طی ۳ تا ۵ روز کاری
                      انجام می‌شود.
                    </span>
                  </li>
                </ul>
                <Link className="legal-link" href="/faq">
                  <i className="fa-solid fa-shield-heart" aria-hidden /> ضمانت کیفیت و بازگشت کالای
                  معیوب در پرسش‌های متداول
                </Link>
              </div>
            </section>

            {/* 7 — مسئولیت ثبت آدرس */}
            <section className="legal-sec" id="t-address">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۷</span>
                <div>
                  <h2 className="legal-sec__t">مسئولیت مشتری در ثبت آدرس</h2>
                  <p className="legal-sec__n">صحت آدرس و پیامدهای اطلاعات نادرست</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  درست‌بودن نشانی و شماره تماس، نقش کلیدی در رسیدن به‌موقع سفارش دارد و مسئولیت آن بر
                  عهده خریدار است.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      آدرس را با ذکر <strong>کد پستی، واحد و نشانه‌های دقیق</strong> و یک شماره تماسِ
                      همراهِ در دسترس وارد کنید.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      اگر مرسوله به‌دلیل <strong>آدرس ناقص یا اشتباه</strong>، عدم پاسخ‌گویی یا غیبت
                      گیرنده به انبار بازگردد، ارسال مجدد با هزینه خریدار انجام می‌شود.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      تا پیش از مرحله ارسال، می‌توانید آدرس را از بخش{" "}
                      <Link href="/track-order">پیگیری سفارش</Link> دنبال کنید یا با پشتیبانی تماس
                      بگیرید.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 8 — کد تخفیف */}
            <section className="legal-sec" id="t-coupon">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۸</span>
                <div>
                  <h2 className="legal-sec__t">شرایط استفاده از کد تخفیف</h2>
                  <p className="legal-sec__n">اعتبار، محدودیت‌ها و نحوه اعمال کد</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  کدهای تخفیف هدیه‌ای از سوی دشت‌زاد هستند و استفاده از آن‌ها تابع شرایط زیر است:
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      هر کد ممکن است شرایط مخصوص خود را داشته باشد:{" "}
                      <strong>حداقل مبلغ خرید، تاریخ انقضا، سقف تخفیف</strong> یا اختصاص به دسته‌ای خاص
                      از محصولات.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      جز در مواردی که صراحتاً ذکر شود، کدها <strong>یک‌بار مصرف</strong> بوده و با
                      یکدیگر یا با تخفیف‌های فعالِ سایت <strong>جمع‌پذیر نیستند</strong>.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      کد تخفیف <strong>قابل تبدیل به وجه نقد</strong> نیست و معمولاً تنها روی مبلغ
                      کالاها (نه هزینه ارسال) اعمال می‌شود.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      کد باید پیش از نهایی‌شدن پرداخت در صفحه سبد خرید وارد شود؛ اعمال کد پس از ثبت
                      سفارش ممکن نیست.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      دشت‌زاد حق ابطال کدها را در صورت مشاهده <strong>سوءاستفاده یا تخلف</strong> برای
                      خود محفوظ می‌دارد.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 9 — مالکیت معنوی */}
            <section className="legal-sec" id="t-ip">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۹</span>
                <div>
                  <h2 className="legal-sec__t">مالکیت معنوی</h2>
                  <p className="legal-sec__n">حقوق محتوا، تصاویر و اطلاعات سایت</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>محتوای این سایت برای استفاده شخصی و غیرتجاری کاربران عرضه شده است.</p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      مالکیت معنوی اطلاعات، تصاویر و علائم تجاری موجود در سایت متعلق به{" "}
                      <strong>دشت‌زاد</strong> است و هرگونه سوءاستفاده پیگرد قانونی دارد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      استفاده تجاری از محتوا، تصاویر و اطلاعات سایت نیازمند <strong>اجازه کتبی</strong>{" "}
                      از دشت‌زاد است.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      اطلاعات محصولات از منابع معتبر یا تولیدکننده تهیه شده و ممکن است در مواردی دارای
                      خطای جزئی باشد؛ این اطلاعات به‌طور مداوم بازبینی و به‌روزرسانی می‌شود.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      دشت‌زاد مسئولیتی در قبال اختلالات خارج از حوزه مدیریت خود (نقص اینترنت، مسائل
                      مخابراتی یا سخت‌افزاری) ندارد.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 10 — حریم خصوصی */}
            <section className="legal-sec" id="t-privacy">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۱۰</span>
                <div>
                  <h2 className="legal-sec__t">قوانین حریم خصوصی</h2>
                  <p className="legal-sec__n">گردآوری، استفاده و حفاظت از اطلاعات شما</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  حفظ حریم خصوصی و امنیت اطلاعات شما یکی از اصول بنیادین دشت‌زاد است. در این بخش
                  به‌روشنی توضیح می‌دهیم که <strong>چه اطلاعاتی</strong>، <strong>چرا</strong> و{" "}
                  <strong>چگونه</strong> گردآوری می‌شود و شما چه اختیاراتی نسبت به آن دارید.
                </p>

                <h3 className="legal-subh">
                  <i className="fa-solid fa-folder-open" aria-hidden /> چه اطلاعاتی جمع‌آوری می‌کنیم؟
                </h3>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>اطلاعات هویتی و تماس:</strong> نام و نام خانوادگی، شماره موبایل و در
                      صورت تمایل، ایمیل شما.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>اطلاعات سفارش و تحویل:</strong> نشانی پستی، کد پستی و تاریخچه سفارش‌ها
                      برای پردازش و ارسال.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>اطلاعات پرداخت:</strong> تنها وضعیت و مبلغ تراکنش نزد ما ثبت می‌شود؛
                      شماره کارت و رمز بانکی شما <strong>هرگز</strong> ذخیره نمی‌گردد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>اطلاعات فنی:</strong> نوع دستگاه، مرورگر و نشانی IP، صرفاً برای امنیت،
                      رفع خطا و بهبود سایت.
                    </span>
                  </li>
                </ul>

                <h3 className="legal-subh">
                  <i className="fa-solid fa-download" aria-hidden /> چطور این اطلاعات را به دست
                  می‌آوریم؟
                </h3>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>به‌صورت مستقیم:</strong> هنگام ثبت‌نام، تکمیل سفارش یا تماس با پشتیبانی،
                      اطلاعات را خودِ شما وارد می‌کنید.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>به‌صورت خودکار:</strong> هنگام استفاده از سایت، بخشی از اطلاعات فنی از
                      طریق کوکی‌ها و ابزارهای تحلیلی ثبت می‌شود.
                    </span>
                  </li>
                </ul>

                <h3 className="legal-subh">
                  <i className="fa-solid fa-list-check" aria-hidden /> از اطلاعات شما چطور استفاده
                  می‌کنیم؟
                </h3>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      پردازش، ارسال و پیگیری سفارش و اطلاع‌رسانی وضعیت آن از طریق پیامک.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>پشتیبانی، پاسخ به پرسش‌ها و رسیدگی به درخواست‌های مرجوعی.</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      بهبود تجربه خرید و — <strong>تنها با رضایت شما</strong> — ارسال پیشنهادها،
                      تخفیف‌ها و خبرنامه.
                    </span>
                  </li>
                </ul>

                <h3 className="legal-subh">
                  <i className="fa-solid fa-share-nodes" aria-hidden /> اطلاعات با چه کسانی به اشتراک
                  گذاشته می‌شود؟
                </h3>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>شرکت پست یا پیک:</strong> تنها نشانی و شماره تماسِ لازم برای تحویل
                      مرسوله.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>درگاه پرداخت بانکی:</strong> برای انجام امن تراکنش، تحت نظارت شاپرک و
                      بانک مرکزی.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>مراجع قانونی:</strong> تنها در صورت الزام قانونی و بر اساس درخواست رسمی
                      مرجع ذی‌صلاح.
                    </span>
                  </li>
                </ul>
                <div className="faq-note">
                  <i className="fa-solid fa-ban" aria-hidden />
                  <span>
                    اطلاعات شخصی شما <strong>هرگز</strong> به اشخاص یا شرکت‌های ثالث برای مقاصد
                    تبلیغاتی فروخته یا اجاره داده نمی‌شود.
                  </span>
                </div>

                <h3 className="legal-subh">
                  <i className="fa-solid fa-cookie-bite" aria-hidden /> کوکی‌ها و فناوری‌های ردیابی
                </h3>
                <p>
                  از کوکی‌ها برای نگه‌داشتن سبد خرید، ورود امن، یادآوری ترجیحات و سنجش عملکرد سایت
                  استفاده می‌کنیم. می‌توانید کوکی‌ها را از تنظیمات مرورگر خود مدیریت یا حذف کنید؛ تنها
                  توجه داشته باشید که در این صورت ممکن است برخی بخش‌های سایت (مانند سبد خرید) درست کار
                  نکنند.
                </p>

                <h3 className="legal-subh">
                  <i className="fa-solid fa-shield-halved" aria-hidden /> امنیت و مدت نگهداری اطلاعات
                </h3>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      تمام ارتباط شما با سایت با پروتکل امن <strong>SSL</strong> رمزنگاری می‌شود و
                      دسترسی به اطلاعات تنها برای کارکنانِ مجاز و در حد وظیفه ممکن است.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      اطلاعات شما تنها <strong>تا زمانی</strong> نگهداری می‌شود که برای ارائه خدمات یا
                      رعایت الزامات قانونی (مانند نگهداری سوابق مالی) لازم باشد.
                    </span>
                  </li>
                </ul>

                <h3 className="legal-subh">
                  <i className="fa-solid fa-user-gear" aria-hidden /> حقوق شما نسبت به اطلاعاتتان
                </h3>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      درخواست <strong>دسترسی، اصلاح یا حذف</strong> اطلاعات حساب خود را در هر زمان از
                      طریق پشتیبانی ثبت کنید.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      <strong>لغو اشتراک</strong> پیامک‌ها و ایمیل‌های تبلیغاتی در هر زمان و بدون نیاز
                      به دلیل امکان‌پذیر است.
                    </span>
                  </li>
                </ul>

                <div className="faq-note faq-note--gold">
                  <i className="fa-solid fa-child-reaching" aria-hidden />
                  <span>
                    <strong>حریم خصوصی کودکان:</strong> خدمات دشت‌زاد برای بزرگسالان طراحی شده است و
                    ما آگاهانه اطلاعات افراد زیر ۱۸ سال را جمع‌آوری نمی‌کنیم.
                  </span>
                </div>

                <Link className="legal-link" href="/faq">
                  <i className="fa-solid fa-lock" aria-hidden /> اطلاعات بیشتر درباره امنیت پرداخت
                </Link>
              </div>
            </section>

            {/* 11 — قوانین ارسال نظر */}
            <section className="legal-sec" id="t-comments">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۱۱</span>
                <div>
                  <h2 className="legal-sec__t">قوانین ارسال نظر</h2>
                  <p className="legal-sec__n">اشتراک تجربه و چارچوب نقد محصولات</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  هدف از بخش نظرات، اشتراک‌گذاری تجربه خرید و استفاده از محصولات است. هر نظر پس از
                  بررسی کارشناسان و در صورت رعایت قوانین، منتشر می‌شود.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      نقد مناسب، نقدی واقع‌بینانه است که <strong>مزایا و معایب</strong> محصول را بر
                      پایه تجربه شخصی و متناسب با قیمت آن بررسی کند.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      استفاده از <strong>ادبیات محترمانه</strong> الزامی است؛ توهین، کلمات نامناسب یا
                      مطالب مغایر با عرف جامعه تأیید نمی‌شوند.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      تنها نظرات <strong>مرتبط با همان محصول</strong> و با نگارش صحیح تأیید می‌شوند؛
                      نقد درباره سایت یا خدمات را از طریق پشتیبانی مطرح کنید.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      دشت‌زاد در قبال درستی یا نادرستی نظرات کاربران مسئولیتی ندارد و نمایش نظر
                      به‌معنای تأیید محتوای آن نیست.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 12 — قوه قهریه */}
            <section className="legal-sec" id="t-force">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۱۲</span>
                <div>
                  <h2 className="legal-sec__t">قوه قهریه (فورس ماژور)</h2>
                  <p className="legal-sec__n">حوادث غیرمترقبه و تعلیق خدمات</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  چنانچه بر اثر وقوع حوادث غیرمترقبه، امکان فعالیت دشت‌زاد کلاً یا بخشی از آن به‌طور
                  موقت ناممکن شود، ثبت سفارش جدید و ارسال سفارش‌های ثبت‌شده به حالت تعلیق درمی‌آید.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      در مدتی که به‌دلیل وقوع حادثه امکان پردازش سفارش وجود ندارد، کاربر حق درخواست
                      ارسال فوری یا استرداد وجه را نخواهد داشت.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      پس از رفع حادثه، در صورت امکان ادامه فعالیت، دشت‌زاد پردازش سفارش‌ها را از سر
                      می‌گیرد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      در صورت ناممکن‌شدن کاملِ پردازش، با توافق طرفین سفارش تعدیل یا لغو و وجه
                      پرداخت‌شده مسترد می‌شود.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 13 — تغییر قوانین و حل اختلاف */}
            <section className="legal-sec" id="t-change">
              <div className="legal-sec__head">
                <span className="legal-sec__no">۱۳</span>
                <div>
                  <h2 className="legal-sec__t">تغییر قوانین و حل اختلاف</h2>
                  <p className="legal-sec__n">به‌روزرسانی مقررات و مرجع رسیدگی</p>
                </div>
              </div>
              <div className="legal-sec__body">
                <p>
                  این مقررات برای حفظ حقوق شما و شفافیتِ همکاری تنظیم شده و ممکن است در طول زمان بهبود
                  یابد.
                </p>
                <ul className="legal-list">
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      دشت‌زاد می‌تواند این مقررات را هر زمان <strong>به‌روزرسانی</strong> کند؛ نسخه
                      معتبر همان است که در لحظه ثبت سفارش روی این صفحه قرار دارد.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>تغییرات مهم از طریق سایت و در صورت لزوم پیامک به اطلاع کاربران می‌رسد.</span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" aria-hidden />
                    <span>
                      در صورت بروز هرگونه اختلاف، نخست از راه{" "}
                      <strong>گفت‌وگوی مستقیم با پشتیبانی</strong> حل‌وفصل می‌شود و در غیر این صورت،
                      تابع <strong>قانون تجارت الکترونیکی</strong> و قوانین جاری جمهوری اسلامی ایران
                      خواهد بود.
                    </span>
                  </li>
                </ul>
                <Link className="legal-link" href="/contact">
                  <i className="fa-solid fa-headset" aria-hidden /> تماس با پشتیبانی دشت‌زاد
                </Link>
              </div>
            </section>

            <div className="legal-foot">
              <b>توضیح:</b> این سند به‌منظور شفافیت و راهنمایی شما تنظیم شده و موارد درج‌نشده یا مبهم
              در آن، تابع قوانین، آیین‌نامه‌ها و مصوبات مراجع قانونی کشور است. این صفحه متعلق به شرکت{" "}
              <b>دشت‌زاد تجارت ایرانیان</b> است و در صورت وجود هرگونه ابهام، تیم پشتیبانی آماده
              پاسخ‌گویی و حل‌وفصل دوستانه است. برای پرسش‌های پرتکرار به صفحه{" "}
              <Link href="/faq">پرسش‌های متداول</Link> سر بزنید.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
