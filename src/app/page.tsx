import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/Newsletter";
import { ReviewDeck, type Review } from "@/components/home/ReviewDeck";
import "./home.css";

export const metadata: Metadata = {
  title: { absolute: "دشت‌زاد — از باغ خانوادگی تا سفره شما" },
  description:
    "فروشگاه آنلاین دشت‌زاد؛ برنج، حبوبات، خشکبار، چای و ادویه مرغوب مستقیم از باغ‌های دماوند. بدون واسطه، با ضمانت اصالت — از سال ۱۳۰۵.",
  alternates: { canonical: "/" },
};

type Tone = "" | "clay" | "gold";
type Flag = "best" | "sale" | "crown";

interface Prod {
  name: string;
  cat: string;
  catIcon: string;
  tone: Tone;
  rate: string;
  count: string;
  now: string;
  old?: string;
  flags: Flag[];
  desc?: string;
}

const CATEGORIES = [
  { slug: "rice", icon: "fa-bowl-rice", t: "برنج", n: "هاشمی، طارم، دم‌سیاه" },
  { slug: "legume", icon: "fa-seedling", t: "حبوبات", n: "لوبیا، عدس، نخود" },
  { slug: "nuts", icon: "fa-apple-whole", t: "خشکبار", n: "برگه، توت، خرما" },
  { slug: "tea", icon: "fa-mug-hot", t: "چای", n: "چای و دمنوش گیاهی" },
  { slug: "spice", icon: "fa-mortar-pestle", t: "ادویه", n: "زعفران، دارچین، هل" },
  { slug: "ajil", icon: "fa-bowl-food", t: "آجیل", n: "پسته، بادام، گردو" },
];

const BEST: Prod[] = [
  { name: "برنج هاشمی ممتاز معطر", cat: "برنج", catIcon: "fa-bowl-rice", tone: "", rate: "۴٫۹", count: "۳۱۲", now: "۴۲۰٬۰۰۰", old: "۴۸۰٬۰۰۰", flags: ["best"] },
  { name: "خرمای مضافتی درجه‌یک بم", cat: "خشکبار", catIcon: "fa-bowl-food", tone: "clay", rate: "۴٫۸", count: "۱۲۴", now: "۱۸۵٬۰۰۰", old: "۲۲۰٬۰۰۰", flags: ["best", "sale"] },
  { name: "چای سیاه ممتاز لاهیجان", cat: "چای", catIcon: "fa-mug-hot", tone: "gold", rate: "۴٫۷", count: "۸۹", now: "۲۶۰٬۰۰۰", flags: ["best"] },
  { name: "لوبیا چیتی درشت درجه‌یک", cat: "حبوبات", catIcon: "fa-seedling", tone: "", rate: "۴٫۶", count: "۲۰۷", now: "۹۵٬۰۰۰", flags: ["best"] },
  { name: "زعفران سرگل قائنات (یک مثقال)", cat: "ادویه", catIcon: "fa-mortar-pestle", tone: "clay", rate: "۴٫۸", count: "۱۴۲", now: "۴۹۰٬۰۰۰", flags: ["best"] },
  { name: "پسته اکبری خندان شور", cat: "آجیل", catIcon: "fa-bowl-food", tone: "clay", rate: "۴٫۹", count: "۳۱۸", now: "۵۲۰٬۰۰۰", old: "۵۹۰٬۰۰۰", flags: ["best"] },
];

const FEATURED: Prod[] = [
  { name: "زعفران نگین ممتاز صادراتی", cat: "ادویه", catIcon: "fa-mortar-pestle", tone: "gold", rate: "۵٫۰", count: "۴۸", now: "۶۸۰٬۰۰۰", flags: ["crown"], desc: "برداشت تازهٔ امسال از مزارع قائنات؛ رنگ و عطر استثنایی، مناسب هدیه و سفرهٔ ویژه." },
  { name: "برنج طارم هاشمی معطر شمال", cat: "برنج", catIcon: "fa-bowl-rice", tone: "", rate: "۴٫۹", count: "۷۶", now: "۴۵۰٬۰۰۰", flags: ["crown"], desc: "دانه‌بلند و خوش‌پخت، با عطر طبیعی؛ مستقیم از شالیزارهای منتخب گیلان." },
  { name: "انجیر خشک پرک استهبان", cat: "خشکبار", catIcon: "fa-apple-whole", tone: "clay", rate: "۴٫۸", count: "۱۳۹", now: "۲۷۵٬۰۰۰", old: "۳۲۰٬۰۰۰", flags: ["crown"], desc: "درجه‌یک و آفتاب‌خشک، بدون افزودنی؛ شیرینی طبیعی و بافت لطیف." },
  { name: "آجیل مخصوص پنج‌مغز ممتاز", cat: "آجیل", catIcon: "fa-bowl-food", tone: "clay", rate: "۴٫۹", count: "۳۱۸", now: "۵۵۰٬۰۰۰", old: "۶۲۰٬۰۰۰", flags: ["crown"], desc: "ترکیب متوازن پسته، بادام، فندق، گردو و بادام هندی؛ تازه و دست‌چین." },
  { name: "برنج دم‌سیاه معطر اصیل", cat: "برنج", catIcon: "fa-bowl-rice", tone: "", rate: "۴٫۹", count: "۷۶", now: "۴۷۰٬۰۰۰", old: "۵۲۰٬۰۰۰", flags: ["crown"], desc: "عطر بی‌نظیر و قد کشیدن عالی هنگام پخت؛ انتخابِ سفره‌های مهمانی." },
  { name: "مغز گردوی تازهٔ تویسرکان", cat: "خشکبار", catIcon: "fa-apple-whole", tone: "clay", rate: "۴٫۸", count: "۱۳۹", now: "۳۸۰٬۰۰۰", flags: ["crown"], desc: "روشن، چرب و تازه؛ بدون تلخی، مناسب پخت‌وپز و میان‌وعدهٔ سالم." },
];

const TRUST = [
  { icon: "fa-truck-fast", t: "ارسال سریع", d: "تهران در ۲۴ ساعت و سایر شهرها ۲ تا ۴ روز کاری؛ بسته‌بندی امن و سالم." },
  { icon: "fa-shield-halved", t: "ضمانت اصالت", d: "هر محصول با تضمین کیفیت دشت‌زاد؛ طبیعی، تازه و دقیقاً همان‌که سفارش داده‌اید." },
  { icon: "fa-rotate-left", t: "بازگشت ۷ روزه", d: "تا ۷ روز پس از دریافت، بدون قید و شرط امکان بازگشت کالای بازنشده وجود دارد." },
  { icon: "fa-headset", t: "پشتیبانی همه‌روزه", d: "کارشناسان ما همه‌روزه از ۹ تا ۲۱ پاسخ‌گوی سؤال‌ها و سفارش‌های شما هستند." },
];

const JOURNEY = [
  { icon: "fa-mountain-sun", no: "گام اول", t: "برداشت از باغ", d: "محصول در اوج رسیدگی و با دست از باغ‌های دماوند چیده می‌شود." },
  { icon: "fa-sun-plant-wilt", no: "گام دوم", t: "فرآوری طبیعی", d: "با گرمای ملایم و بدون افزودنی، طعم و عطر طبیعی حفظ می‌شود." },
  { icon: "fa-box-open", no: "گام سوم", t: "بسته‌بندی بهداشتی", d: "در بسته‌بندی درب‌دار و ایمن، برای تازه‌ماندن تا آخرین لحظه." },
  { icon: "fa-house-chimney-window", no: "گام چهارم", t: "رسیدن به خانه شما", d: "ارسال سریع و مطمئن، مستقیم به درِ خانه در سراسر کشور." },
];

const REVIEWS: Review[] = [
  { stars: 5, text: "واقعاً طعمش طبیعیه، اصلاً شیرینی مصنوعی نداره. بچه‌ها به‌جای پاستیل اینو می‌خورن. بسته‌بندیش هم تمیز و مرتب بود.", initial: "م", name: "مریم احمدی", city: "تهران" },
  { stars: 5, text: "کیفیت محصول فوق‌العاده‌ست؛ تازه و خوش‌عطر. قوطی هدیه‌اش رو برای عید گرفتم، خیلی شیک بود و ارسال هم سریع انجام شد.", initial: "ح", name: "حسین رضایی", city: "اصفهان" },
  { stars: 5, text: "دومین باره سفارش می‌دم. ارسالشون سریعه و محصول دقیقاً مثل عکسه. حس می‌کنی از یه باغ واقعی اومده؛ به همه پیشنهاد می‌دم.", initial: "ع", name: "علی کریمی", city: "مشهد" },
];

function flagBadge(f: Flag) {
  if (f === "best")
    return (
      <span className="badge badge--clay">
        <i className="fa-solid fa-fire" aria-hidden /> پرفروش
      </span>
    );
  if (f === "sale")
    return (
      <span className="badge badge--gold">
        <i className="fa-solid fa-tag" aria-hidden /> تخفیف
      </span>
    );
  return (
    <span className="badge badge--gold">
      <i className="fa-solid fa-crown" aria-hidden /> ویژه
    </span>
  );
}

function PCard({ p }: { p: Prod }) {
  const catClass = p.tone ? `cat-label cat-label--${p.tone}` : "cat-label";
  return (
    <article className="pcard">
      <div className="pcard__media">
        <div className="ph">
          <span className="ph__label">عکس {p.name}</span>
        </div>
        <div className="pcard__flags">{p.flags.map((f) => <span key={f}>{flagBadge(f)}</span>)}</div>
        <div className="pcard__bm">
          <button className="bookmark" type="button" aria-label="افزودن به علاقه‌مندی‌ها">
            <i className="fa-regular fa-heart" aria-hidden />
          </button>
        </div>
      </div>
      <div className="pcard__body">
        <span className={catClass}>
          <i className={`fa-solid ${p.catIcon}`} aria-hidden /> {p.cat}
        </span>
        <h3 className="pcard__name">{p.name}</h3>
        {p.desc && <p className="pcard__desc">{p.desc}</p>}
        <span className="pcard__rate">
          <i className="fa-solid fa-star" aria-hidden /> {p.rate} <span>({p.count})</span>
        </span>
        <div className="pcard__foot">
          <div className="pcard__price">
            {p.old && <span className="pcard__old num">{p.old}</span>}
            <span className="pcard__now num">
              {p.now} <span className="toman">تومان</span>
            </span>
          </div>
          <button className="pcard__add" type="button" aria-label="افزودن به سبد">
            <i className="fa-solid fa-plus" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="home-page dz">
      {/* HERO */}
      <section className="hm-hero">
        <div className="hm-hero__media" aria-hidden />
        <div className="hm-hero__scrim" aria-hidden />
        <div className="wrap">
          <div className="hm-hero__content">
            <span className="hm-hero__kicker">
              <i className="fa-solid fa-wheat-awn" aria-hidden /> چهار نسل اصالت از سال ۱۳۰۵
            </span>
            <h1 className="hm-hero__title">
              طعمِ اصیلِ ایران،
              <br />
              <span className="accent">مستقیم</span> از دلِ دشت
            </h1>
            <p className="hm-hero__lead">
              برنج، حبوبات، خشکبار، چای، ادویه و آجیل مرغوب — برداشت‌شده از باغ‌های دماوند و رسیده به
              سفره شما، بدون واسطه و با ضمانت اصالت دشت‌زاد.
            </p>
            <div className="hm-hero__cta">
              <Link className="btn btn--primary btn--lg" href="/products">
                <i className="fa-solid fa-bag-shopping" aria-hidden /> ورود به فروشگاه
              </Link>
              <Link className="btn btn--lg hm-hero__ghost" href="/special-sale">
                <i className="fa-solid fa-bolt" aria-hidden /> فروش ویژه
              </Link>
            </div>
            <div className="hm-hero__assure">
              <span>
                <i className="fa-solid fa-leaf" aria-hidden /> طبیعی و بدون افزودنی
              </span>
              <span>
                <i className="fa-solid fa-shield-halved" aria-hidden /> ضمانت اصالت
              </span>
              <span>
                <i className="fa-solid fa-star" aria-hidden /> رضایت ۱۲٬۰۰۰+ مشتری
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">دسته‌بندی‌های اصلی</span>
              <h2 className="sec__title">از کجا شروع کنیم؟</h2>
              <p className="sec__sub">
                شش خانواده اصلی محصولات دشت‌زاد — هرکدام مستقیم از تأمین‌کننده مورد اعتماد ما.
              </p>
            </div>
            <Link className="see-all" href="/products">
              همه محصولات <i className="fa-solid fa-arrow-left" aria-hidden />
            </Link>
          </div>
          <div className="hm-catgrid">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} className="hm-cat" href={`/category/${c.slug}`}>
                <div className="hm-cat__media">
                  <span className="hm-cat__ic">
                    <i className={`fa-solid ${c.icon}`} aria-hidden />
                  </span>
                </div>
                <div className="hm-cat__body">
                  <span className="hm-cat__t">{c.t}</span>
                  <span className="hm-cat__n">{c.n}</span>
                  <span className="hm-cat__go">
                    مشاهده <i className="fa-solid fa-arrow-left" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">محبوب‌ترین‌ها</span>
              <h2 className="sec__title">محصولات پرفروش</h2>
              <p className="sec__sub">آن‌چه مشتریان دشت‌زاد بیش از همه به سفره خود راه می‌دهند.</p>
            </div>
            <Link className="see-all" href="/products">
              مشاهده همه <i className="fa-solid fa-arrow-left" aria-hidden />
            </Link>
          </div>
          <div className="hm-prodgrid">
            {BEST.map((p) => (
              <PCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">دست‌چینِ دشت‌زاد</span>
              <h2 className="sec__title">محصولات ویژه</h2>
              <p className="sec__sub">گزیده‌ای از مرغوب‌ترین محصولات فصل — محدود، ممتاز و دست‌چین‌شده.</p>
            </div>
            <Link className="see-all" href="/products">
              مشاهده همه <i className="fa-solid fa-arrow-left" aria-hidden />
            </Link>
          </div>
          <div className="hm-featgrid">
            {FEATURED.map((p) => (
              <PCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="hm-story">
            <div className="hm-story__media">
              <div className="ph">
                <span className="ph__label">عکس باغ خانوادگی دماوند یا پرتره‌ای از باغبان دشت‌زاد</span>
              </div>
              <div className="hm-story__est">
                <b className="num">۱۳۰۵</b>
                <span>سالِ آغاز</span>
              </div>
            </div>
            <div className="hm-story__l">
              <span className="sec__kicker">روایت دشت‌زاد</span>
              <h2 className="hm-story__title">
                چهار نسل، یک پیمان:
                <br />
                طبیعی و دست‌نخورده
              </h2>
              <p className="hm-story__p">
                داستان دشت‌زاد از سال ۱۳۰۵ در باغ‌های دماوند آغاز شد؛ جایی که خانواده‌ای زمین را به دست
                خود بارور کرد و آموخت که بهترین طعم، از صبر و احترام به طبیعت به دست می‌آید.
              </p>
              <p className="hm-story__p">
                امروز همان پیمان ادامه دارد: محصول را مستقیم از باغ و مزرعه می‌گیریم، بدون واسطه و بدون
                افزودنی به دست شما می‌رسانیم — تا طعمی که می‌چشید، همان طعمِ اصیلِ زمین ایران باشد.
              </p>
              <div className="hm-story__sign">
                <span className="hm-story__seal">د</span>
                <div>
                  <b>خانواده دشت‌زاد</b>
                  <span>باغ‌های دماوند، از ۱۳۰۵</span>
                </div>
              </div>
              <div className="hm-story__cta">
                <Link className="btn btn--ghost" href="/about">
                  <i className="fa-solid fa-book-open-reader" aria-hidden /> داستان کامل ما
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">چرا دشت‌زاد؟</span>
              <h2 className="sec__title">خریدی مطمئن، از باغ تا درِ خانه</h2>
            </div>
          </div>
          <div className="hm-trustgrid">
            {TRUST.map((t) => (
              <div key={t.t} className="hm-trust">
                <div className="hm-trust__ic">
                  <i className={`fa-solid ${t.icon}`} aria-hidden />
                </div>
                <h3 className="hm-trust__t">{t.t}</h3>
                <p className="hm-trust__d">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="sec hm-journey">
        <div className="wrap">
          <div className="hm-journey__head">
            <span className="hm-journey__kicker">از دشت تا خانه</span>
            <h2 className="hm-journey__title">مسیرِ هر محصول، شفاف و بدون واسطه</h2>
            <p className="hm-journey__sub">
              از لحظه برداشت در باغ تا رسیدن به سفره شما، هر گام را خودمان مراقبت می‌کنیم.
            </p>
          </div>
          <div className="hm-journey__steps">
            {JOURNEY.map((s) => (
              <div key={s.no} className="hm-jstep">
                <span className="hm-jstep__ic">
                  <i className={`fa-solid ${s.icon}`} aria-hidden />
                </span>
                <span className="hm-jstep__no">{s.no}</span>
                <h3 className="hm-jstep__t">{s.t}</h3>
                <p className="hm-jstep__d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">تجربه مشتریان</span>
              <h2 className="sec__title">نظرات مشتریان دشت‌زاد</h2>
            </div>
            <div className="hm-revtop">
              <span className="hm-revtop__score">
                <b className="num">۴٫۸</b>
                <span className="hm-revtop__stars" aria-hidden>
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star-half-stroke" />
                </span>
                <span>از ۱۲٬۰۰۰+ خرید</span>
              </span>
            </div>
          </div>
          <ReviewDeck reviews={REVIEWS} />
        </div>
      </section>

      {/* SEASONAL */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-head__l">
              <span className="sec__kicker">فصل و مناسبت</span>
              <h2 className="sec__title">برای هر بهانه خوب</h2>
              <p className="sec__sub">
                از سفره نوروز تا شب یلدا، هدایای سازمانی و خرید عمده — دشت‌زاد کنار شماست.
              </p>
            </div>
          </div>
          <div className="hm-season">
            <Link className="hm-banner" href="/corporate-gifts">
              <div className="ph">
                <span className="ph__label">عکس سفره هفت‌سین و سبزه نوروزی</span>
              </div>
              <div className="hm-banner__scrim" aria-hidden />
              <div className="hm-banner__body">
                <span className="hm-banner__tag">
                  <i className="fa-solid fa-seedling" aria-hidden /> ویژه نوروز
                </span>
                <span className="hm-banner__t">سال نو را با طعم برکت آغاز کنید</span>
                <span className="hm-banner__d">
                  آجیل، چای، زعفران و کالکشن‌های بهاری برای سفره سال نو و دید و بازدید عید.
                </span>
                <span className="hm-banner__go">
                  مشاهده کالکشن نوروز <i className="fa-solid fa-arrow-left" aria-hidden />
                </span>
              </div>
            </Link>
            <Link className="hm-banner" href="/corporate-gifts">
              <div className="ph">
                <span className="ph__label">عکس شب یلدا، انار و آجیل</span>
              </div>
              <div className="hm-banner__scrim" aria-hidden />
              <div className="hm-banner__body">
                <span className="hm-banner__tag">
                  <i className="fa-solid fa-moon" aria-hidden /> شب یلدا
                </span>
                <span className="hm-banner__t">بلندترین شب سال، با طعم دورهمی</span>
                <span className="hm-banner__d">
                  سبدهای زمستانی یلدا — آجیل، انار خشک، باسلوق و چای، برای شب‌نشینی خانوادگی.
                </span>
                <span className="hm-banner__go">
                  مشاهده کالکشن یلدا <i className="fa-solid fa-arrow-left" aria-hidden />
                </span>
              </div>
            </Link>
          </div>
          <div className="hm-season__row">
            <Link className="hm-banner hm-banner--sm" href="/corporate-gifts">
              <div className="ph">
                <span className="ph__label">عکس جعبه هدیه سازمانی لوکس با روبان</span>
              </div>
              <div className="hm-banner__scrim" aria-hidden />
              <div className="hm-banner__body">
                <span className="hm-banner__tag">
                  <i className="fa-solid fa-gift" aria-hidden /> سازمانی
                </span>
                <span className="hm-banner__t">هدایای سازمانی به نام برند شما</span>
                <span className="hm-banner__d">
                  بسته‌بندی اختصاصی، درج لوگو و فاکتور رسمی — مشاوره رایگان چیدمان سبد.
                </span>
                <span className="hm-banner__go">
                  دریافت پیش‌فاکتور <i className="fa-solid fa-arrow-left" aria-hidden />
                </span>
              </div>
            </Link>
            <Link className="hm-banner hm-banner--sm" href="/bulk-order">
              <div className="ph">
                <span className="ph__label">عکس کیسه‌ها و بسته‌های عمده محصولات</span>
              </div>
              <div className="hm-banner__scrim" aria-hidden />
              <div className="hm-banner__body">
                <span className="hm-banner__tag">
                  <i className="fa-solid fa-box-open" aria-hidden /> خرید عمده
                </span>
                <span className="hm-banner__t">خرید عمده با قیمت پلکانی</span>
                <span className="hm-banner__d">
                  برای رستوران، فروشگاه و مصرف بالا — هرچه بیشتر، قیمت هر واحد کمتر.
                </span>
                <span className="hm-banner__go">
                  استعلام قیمت عمده <i className="fa-solid fa-arrow-left" aria-hidden />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  );
}
