import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { GiftForm } from "./GiftForm";
import { GiftFaq } from "./GiftFaq";
import { GiftDeck } from "./GiftDeck";
import "./corporate-gifts.css";

export const metadata: Metadata = {
  title: "هدایای سازمانی",
  description:
    "پک‌های هدیه سازمانی دشت‌زاد برای نوروز، یلدا و قدردانی از کارکنان و مشتریان — با بسته‌بندی اختصاصی، درج لوگو، فاکتور رسمی و توزیع سراسری.",
  alternates: { canonical: "/corporate-gifts" },
};

const COLLECTIONS = [
  {
    icon: "fa-seedling",
    name: "سبز بهاری",
    slogan: "طراوت بهار در یک جعبه؛ مناسب‌ترین هدیه برای آغاز سال نو.",
    tags: ["نوروز", "تازه و سبک", "خشکبار بهاری"],
  },
  {
    icon: "fa-moon",
    name: "شب بلند",
    slogan: "گرمای یلدا، انار و آجیل؛ روایتی از بلندترین شب سال.",
    tags: ["یلدا", "زمستانی", "آجیل و میوه خشک"],
  },
  {
    icon: "fa-gem",
    name: "لوکس اصیل",
    slogan: "جعبه چوبی، عسل و زعفران؛ هدیه‌ای ماندگار و باکلاس.",
    tags: ["تشریفاتی", "جعبه چوبی", "عسل و زعفران"],
  },
];

export default function CorporateGiftsPage() {
  return (
    <div className="corporate-gifts-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "هدایای سازمانی", path: "/corporate-gifts" },
        ])}
      />

      {/* HERO */}
      <section className="cg-hero">
        <div className="wrap">
          <div className="cg-hero__grid">
            <div className="cg-hero__l">
              <span className="cg-hero__kicker">
                <i className="fa-solid fa-handshake-angle" aria-hidden /> راهکار هدیه سازمان‌ها
              </span>
              <h1 className="cg-hero__title">
                هدیه‌ای از <span className="accent">دلِ طبیعت</span>
                <br />
                به نامِ برند شما
              </h1>
              <p className="cg-hero__sub">
                پک‌های هدیه سازمانی دشت‌زاد، خشکبار و میوه خشکِ مرغوبِ باغ‌های دماوند را در بسته‌بندی
                شیک و اختصاصی به دست کارکنان و مشتریان شما می‌رساند — هدیه‌ای سالم، اصیل و به‌یادماندنی
                برای نوروز، یلدا و هر مناسبت.
              </p>
              <div className="cg-hero__cta">
                <a className="btn btn--gold" href="#request">
                  <i className="fa-solid fa-paper-plane" aria-hidden /> دریافت پیش‌فاکتور رایگان
                </a>
                <a className="btn btn--outline" href="#packages">
                  <i className="fa-solid fa-box-open" aria-hidden /> مشاهده پک‌ها
                </a>
              </div>
              <div className="cg-hero__assure">
                <span>
                  <i className="fa-solid fa-stamp" aria-hidden /> درج لوگو و کارت اختصاصی
                </span>
                <span>
                  <i className="fa-solid fa-file-invoice" aria-hidden /> فاکتور رسمی و ارزش‌افزوده
                </span>
                <span>
                  <i className="fa-solid fa-truck-fast" aria-hidden /> توزیع سراسری
                </span>
              </div>
            </div>
            <div className="cg-hero__r">
              <div className="cg-showcase">
                <span className="cg-showcase__tag">
                  <i className="fa-solid fa-award" aria-hidden /> پک ویژه سازمانی
                </span>
                <div className="cg-showcase__main">
                  <div className="ph">
                    <span className="ph__label">
                      عکس جعبه هدیه سازمانی لوکس با روبان و کارت برند
                    </span>
                  </div>
                </div>
                <div className="cg-showcase__a">
                  <div className="ph">
                    <span className="ph__label">نمای محتویات: خشکبار و میوه خشک</span>
                  </div>
                </div>
                <div className="cg-showcase__b">
                  <div className="ph">
                    <span className="ph__label">جزئیات لوگوی برند روی درب جعبه</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="wrap">
        <div className="cg-stats">
          <div className="cg-stat">
            <div className="cg-stat__n num">
              ۸۵۰<span className="plus">+</span>
            </div>
            <div className="cg-stat__l">سازمان و برند همراه</div>
          </div>
          <div className="cg-stat">
            <div className="cg-stat__n num">
              ۴۲٬۰۰۰<span className="plus">+</span>
            </div>
            <div className="cg-stat__l">پک هدیه تحویل‌شده</div>
          </div>
          <div className="cg-stat">
            <div className="cg-stat__n num">۹۸٪</div>
            <div className="cg-stat__l">رضایت از کیفیت و ارسال</div>
          </div>
          <div className="cg-stat">
            <div className="cg-stat__n num">۴</div>
            <div className="cg-stat__l">نسل تجربه از سال ۱۳۰۵</div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">چرا دشت‌زاد؟</span>
              <h2 className="sec__title">هدیه‌ای که هم سالم است، هم خاص</h2>
              <p className="sec__sub">
                از تأمین و چیدمان تا چاپ و توزیع، همه مراحل را یک‌جا و بدون دغدغه به ما بسپارید.
              </p>
            </div>
          </div>
          <div className="bulk-benefits">
            <div className="bulk-benefit">
              <i className="fa-solid fa-leaf" aria-hidden />
              <div>
                <b>محصول طبیعی و مرغوب</b>
                <span>خشکبار و میوه خشک مستقیم از باغ‌های دماوند؛ بدون شکر و نگهدارنده.</span>
              </div>
            </div>
            <div className="bulk-benefit">
              <i className="fa-solid fa-stamp" aria-hidden />
              <div>
                <b>بسته‌بندی اختصاصی برند</b>
                <span>درج لوگو، رنگ سازمانی، کارت و پیام تبریک مخصوص شما.</span>
              </div>
            </div>
            <div className="bulk-benefit">
              <i className="fa-solid fa-tags" aria-hidden />
              <div>
                <b>قیمت پلکانی سازمانی</b>
                <span>هرچه تعداد بیشتر، قیمت هر پک کمتر؛ شفاف و بدون واسطه.</span>
              </div>
            </div>
            <div className="bulk-benefit">
              <i className="fa-solid fa-file-invoice-dollar" aria-hidden />
              <div>
                <b>فاکتور رسمی</b>
                <span>صدور فاکتور رسمی با اطلاعات حقوقی و مالیات ارزش‌افزوده.</span>
              </div>
            </div>
            <div className="bulk-benefit">
              <i className="fa-solid fa-truck-ramp-box" aria-hidden />
              <div>
                <b>توزیع هماهنگ</b>
                <span>تحویل یک‌جا به سازمان یا ارسال خانه‌به‌خانه به گیرندگان در سراسر کشور.</span>
              </div>
            </div>
            <div className="bulk-benefit">
              <i className="fa-solid fa-headset" aria-hidden />
              <div>
                <b>کارشناس اختصاصی</b>
                <span>یک نفر از ابتدا تا تحویل، کنار شما برای چیدمان بهترین سبد.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="sec" id="collections">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">کالکشن‌های دشت‌زاد</span>
              <h2 className="sec__title">برای هر حال‌وهوا، یک کالکشن</h2>
              <p className="sec__sub">
                هر کالکشن یک روایت است؛ ترکیبی از محصول، رنگ و حس. روی هرکدام بزنید تا دنیای آن را
                ببینید و آن را به‌عنوان هدیه سازمانی سفارش دهید.
              </p>
            </div>
          </div>
          <div className="col-grid">
            {COLLECTIONS.map((c) => (
              <Link className="col-card" href="/products" key={c.name}>
                <div className="col-card__head">
                  <i className={`col-card__wm fa-solid ${c.icon}`} aria-hidden />
                  <span className="col-card__k">کالکشن دشت‌زاد</span>
                  <span className="col-card__name">{c.name}</span>
                </div>
                <div className="col-card__body">
                  <p className="col-card__slogan">«{c.slogan}»</p>
                  <div className="col-card__tags">
                    {c.tags.map((t) => (
                      <span className="col-card__tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="col-card__go">
                    مشاهده کالکشن <i className="fa-solid fa-arrow-left" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="sec sec--warm" id="packages">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">پک‌های آماده</span>
              <h2 className="sec__title">سبدهای هدیه سازمانی</h2>
              <p className="sec__sub">
                سه سطح آماده سفارش — همه قابل سفارشی‌سازی با لوگو و محتویات دلخواه شما. قیمت‌ها برای
                سفارش‌های عمده پلکانی است.
              </p>
            </div>
            <a className="see-all" href="#request">
              سفارش سبد دلخواه <i className="fa-solid fa-arrow-left" aria-hidden />
            </a>
          </div>

          <div className="gift-grid">
            {/* tier 1 */}
            <article className="gift-card">
              <div className="gift-card__media">
                <div className="ph">
                  <span className="ph__label">عکس پک دلگرمی — زیپ‌کیپ کرافت در جعبه ساده</span>
                </div>
              </div>
              <div className="gift-card__body">
                <div className="gift-card__name">
                  پک «دلگرمی» <span>هدیه جمع‌وجور و باکیفیت</span>
                </div>
                <div className="gift-card__price">
                  <span className="from">از</span> <b className="num">۳۵۰٬۰۰۰</b>{" "}
                  <span className="toman">تومان / پک</span>
                </div>
                <ul className="gift-incl">
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> برگه گلابی و زردآلوی خشک ممتاز
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> آجیل مخصوص دشت‌زاد
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> جعبه کرافت با روبان
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> کارت تبریک با نام برند شما
                  </li>
                  <li className="muted">
                    <i className="fa-solid fa-xmark" aria-hidden /> جعبه چوبی لوکس
                  </li>
                </ul>
                <a className="btn btn--ghost btn--block" href="#request">
                  <i className="fa-solid fa-paper-plane" aria-hidden /> درخواست این پک
                </a>
              </div>
            </article>

            {/* tier 2 (featured) */}
            <article className="gift-card gift-card--featured">
              <span className="gift-card__ribbon">
                <i className="fa-solid fa-star" aria-hidden /> پرطرفدار
              </span>
              <div className="gift-card__media">
                <div className="ph">
                  <span className="ph__label">عکس پک مهرورزی — قوطی هدیه و چیدمان متنوع</span>
                </div>
              </div>
              <div className="gift-card__body">
                <div className="gift-card__name">
                  پک «مهرورزی» <span>انتخابِ متعادل و شیک</span>
                </div>
                <div className="gift-card__price">
                  <span className="from">از</span> <b className="num">۶۹۰٬۰۰۰</b>{" "}
                  <span className="toman">تومان / پک</span>
                </div>
                <ul className="gift-incl">
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> تشکیله میوه خشک و خشکبار اعلا
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> قوطی هدیه فلزی درب‌دار
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> چای یا دمنوش هدیه
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> درج لوگو روی جعبه و کارت اختصاصی
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> روبان و بسته‌بندی هدیه
                  </li>
                </ul>
                <a className="btn btn--primary btn--block" href="#request">
                  <i className="fa-solid fa-paper-plane" aria-hidden /> درخواست این پک
                </a>
              </div>
            </article>

            {/* tier 3 */}
            <article className="gift-card">
              <div className="gift-card__media">
                <div className="ph">
                  <span className="ph__label">عکس پک سپاس — جعبه چوبی لوکس با محتویات کامل</span>
                </div>
              </div>
              <div className="gift-card__body">
                <div className="gift-card__name">
                  پک «سپاس» <span>هدیه لوکس و کامل</span>
                </div>
                <div className="gift-card__price">
                  <span className="from">از</span> <b className="num">۱٬۲۵۰٬۰۰۰</b>{" "}
                  <span className="toman">تومان / پک</span>
                </div>
                <ul className="gift-incl">
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> تنوع کامل خشکبار، میوه خشک و خرما
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> جعبه چوبی لوکس قابل نگهداری
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> عسل طبیعی و زعفران هدیه
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> پلاک یا حکاکی لوگوی برند
                  </li>
                  <li>
                    <i className="fa-solid fa-check" aria-hidden /> کارت دست‌ساز و بسته‌بندی پارچه‌ای
                  </li>
                </ul>
                <a className="btn btn--ghost btn--block" href="#request">
                  <i className="fa-solid fa-paper-plane" aria-hidden /> درخواست این پک
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">مناسبت‌ها</span>
              <h2 className="sec__title">برای هر بهانه قدردانی</h2>
              <p className="sec__sub">
                از نوروز و یلدا تا سالگرد تأسیس و تقدیر از مشتریان — هدیه را با مناسبت شما هماهنگ
                می‌کنیم.
              </p>
            </div>
          </div>
          <div className="occ-grid">
            <a className="occ-card" href="#request">
              <div className="ph">
                <span className="ph__label">سفره نوروزی و سبزه</span>
              </div>
              <div className="occ-card__scrim" />
              <div className="occ-card__body">
                <span className="occ-card__ic">
                  <i className="fa-solid fa-seedling" aria-hidden />
                </span>
                <span className="occ-card__t">هدایای نوروز</span>
                <span className="occ-card__n">پک‌های بهاری و سبز</span>
              </div>
            </a>
            <a className="occ-card" href="#request">
              <div className="ph">
                <span className="ph__label">شب یلدا، انار و آجیل</span>
              </div>
              <div className="occ-card__scrim" />
              <div className="occ-card__body">
                <span className="occ-card__ic">
                  <i className="fa-solid fa-moon" aria-hidden />
                </span>
                <span className="occ-card__t">شب یلدا</span>
                <span className="occ-card__n">سبدهای زمستانی</span>
              </div>
            </a>
            <a className="occ-card" href="#request">
              <div className="ph">
                <span className="ph__label">جمع کارکنان یک شرکت</span>
              </div>
              <div className="occ-card__scrim" />
              <div className="occ-card__body">
                <span className="occ-card__ic">
                  <i className="fa-solid fa-users" aria-hidden />
                </span>
                <span className="occ-card__t">قدردانی از کارکنان</span>
                <span className="occ-card__n">روز کارمند و پاداش</span>
              </div>
            </a>
            <a className="occ-card" href="#request">
              <div className="ph">
                <span className="ph__label">دست‌دادن دو همکار تجاری</span>
              </div>
              <div className="occ-card__scrim" />
              <div className="occ-card__body">
                <span className="occ-card__ic">
                  <i className="fa-solid fa-handshake" aria-hidden />
                </span>
                <span className="occ-card__t">تقدیر از مشتریان</span>
                <span className="occ-card__n">حفظ ارتباط بلندمدت</span>
              </div>
            </a>
            <a className="occ-card" href="#request">
              <div className="ph">
                <span className="ph__label">کیک سالگرد و بادکنک</span>
              </div>
              <div className="occ-card__scrim" />
              <div className="occ-card__body">
                <span className="occ-card__ic">
                  <i className="fa-solid fa-cake-candles" aria-hidden />
                </span>
                <span className="occ-card__t">سالگرد تأسیس</span>
                <span className="occ-card__n">جشن و رویداد برند</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="cg-custom">
            <div className="cg-custom__media">
              <div className="ph">
                <span className="ph__label">
                  عکس نزدیک از جعبه با لوگوی حکاکی‌شده برند و کارت دست‌نویس
                </span>
              </div>
              <span className="cg-custom__badge">
                <i className="fa-solid fa-wand-magic-sparkles" aria-hidden /> اختصاصی‌سازی کامل
              </span>
            </div>
            <div className="cg-custom__l">
              <span className="sec__kicker">به نامِ برند شما</span>
              <h2 className="sec__title">هر جعبه، سفیرِ برند شماست</h2>
              <p className="sec__sub">
                جزئیات را شما انتخاب می‌کنید؛ ما با وسواس آن را می‌سازیم تا گیرنده، نام شما را به‌خاطر
                بسپارد.
              </p>
              <div className="cg-custom__list">
                <div className="cg-feat">
                  <span className="cg-feat__ic">
                    <i className="fa-solid fa-stamp" aria-hidden />
                  </span>
                  <div>
                    <div className="cg-feat__t">درج لوگو و رنگ سازمانی</div>
                    <div className="cg-feat__d">
                      چاپ، حکاکی یا پلاک فلزی لوگوی شما روی جعبه و بسته‌بندی.
                    </div>
                  </div>
                </div>
                <div className="cg-feat">
                  <span className="cg-feat__ic">
                    <i className="fa-solid fa-envelope-open-text" aria-hidden />
                  </span>
                  <div>
                    <div className="cg-feat__t">کارت و پیام اختصاصی</div>
                    <div className="cg-feat__d">
                      متن تبریک یا قدردانی شما روی کارت چاپی یا دست‌نویس.
                    </div>
                  </div>
                </div>
                <div className="cg-feat">
                  <span className="cg-feat__ic">
                    <i className="fa-solid fa-boxes-stacked" aria-hidden />
                  </span>
                  <div>
                    <div className="cg-feat__t">انتخاب محتویات</div>
                    <div className="cg-feat__d">
                      ترکیب دلخواه از خشکبار، میوه خشک، خرما، عسل و زعفران.
                    </div>
                  </div>
                </div>
                <div className="cg-feat">
                  <span className="cg-feat__ic">
                    <i className="fa-solid fa-ribbon" aria-hidden />
                  </span>
                  <div>
                    <div className="cg-feat__t">جعبه، روبان و تزئین</div>
                    <div className="cg-feat__d">
                      از کرافت ساده تا جعبه چوبی لوکس، با روبان و بسته‌بندی پارچه‌ای.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">روند کار</span>
              <h2 className="sec__title">از مشاوره تا تحویل، در ۴ گام</h2>
              <p className="sec__sub">ساده، شفاف و بدون دغدغه؛ شما تصمیم می‌گیرید، ما اجرا می‌کنیم.</p>
            </div>
          </div>
          <div className="cg-steps">
            <div className="cg-step">
              <span className="cg-step__no" />
              <i className="cg-step__ic fa-solid fa-comments" aria-hidden />
              <div className="cg-step__t">مشاوره رایگان</div>
              <div className="cg-step__d">
                درباره مناسبت، تعداد، بودجه و سلیقه برندتان با کارشناس ما گفت‌وگو می‌کنید.
              </div>
            </div>
            <div className="cg-step">
              <span className="cg-step__no" />
              <i className="cg-step__ic fa-solid fa-sliders" aria-hidden />
              <div className="cg-step__t">انتخاب و سفارشی‌سازی</div>
              <div className="cg-step__d">
                پک، محتویات، جعبه و طرح لوگو و کارت را نهایی می‌کنیم و پیش‌فاکتور می‌دهیم.
              </div>
            </div>
            <div className="cg-step">
              <span className="cg-step__no" />
              <i className="cg-step__ic fa-solid fa-box-open" aria-hidden />
              <div className="cg-step__t">تأیید نمونه و تولید</div>
              <div className="cg-step__d">
                نمونه بسته را تأیید می‌کنید؛ سپس با کیفیت یکدست تولید و بسته‌بندی می‌شود.
              </div>
            </div>
            <div className="cg-step">
              <span className="cg-step__no" />
              <i className="cg-step__ic fa-solid fa-truck-fast" aria-hidden />
              <div className="cg-step__t">ارسال و توزیع</div>
              <div className="cg-step__d">
                تحویل یک‌جا به سازمان یا ارسال خانه‌به‌خانه به گیرندگان در سراسر کشور.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">تجربه مشتریان سازمانی</span>
              <h2 className="sec__title">برندهایی که به ما اعتماد کردند</h2>
              <p className="sec__sub">
                از استارتاپ تا شرکت‌های بزرگ، هدیه پایان‌سال‌شان را به دشت‌زاد سپردند.
              </p>
            </div>
          </div>
          <GiftDeck />
          <div className="cg-trust">
            <span className="cg-trust__lbl">همکاری با تیم‌های فروش و بازرگانیِ:</span>
            <span className="cg-trust__logo">
              <span className="ph__label">دیجی‌کالا</span>
            </span>
            <span className="cg-trust__logo">
              <span className="ph__label">باسلام</span>
            </span>
            <span className="cg-trust__logo">
              <span className="ph__label">تپسی‌شاپ</span>
            </span>
          </div>
        </div>
      </section>

      {/* REQUEST FORM */}
      <section className="sec cg-form-band" id="request">
        <div className="wrap">
          <div className="cg-form-grid">
            <div className="cg-form-intro">
              <span className="cg-form-intro__kicker">
                <i className="fa-solid fa-paper-plane" aria-hidden /> شروع کنیم
              </span>
              <h2 className="cg-form-intro__t">پیش‌فاکتور رایگان بگیرید</h2>
              <p className="cg-form-intro__d">
                فرم را پر کنید؛ کارشناس فروش سازمانی در کمتر از یک روز کاری با شما تماس می‌گیرد و سبد
                پیشنهادی و قیمت را ارائه می‌دهد.
              </p>
              <ul className="cg-form-intro__list">
                <li>
                  <i className="fa-solid fa-bolt" aria-hidden /> پاسخ‌گویی در کمتر از ۲۴ ساعت کاری
                </li>
                <li>
                  <i className="fa-solid fa-comments-dollar" aria-hidden /> مشاوره و چیدمان سبد، رایگان
                </li>
                <li>
                  <i className="fa-solid fa-lock" aria-hidden /> اطلاعات شما کاملاً محفوظ می‌ماند
                </li>
              </ul>
            </div>

            <GiftForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">پرسش‌های متداول</span>
              <h2 className="sec__title">سؤالی درباره سفارش سازمانی دارید؟</h2>
            </div>
          </div>
          <GiftFaq />
        </div>
      </section>
    </div>
  );
}
