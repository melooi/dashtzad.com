import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  ButtonLink,
  Card,
  IconBox,
  Placeholder,
  Price,
  RatingChip,
  SectionHead,
  Stars,
} from "@/components/ui";
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
  count: number;
  now: number;
  old?: number;
  off?: number;
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
  { name: "برنج هاشمی ممتاز معطر", cat: "برنج", catIcon: "fa-bowl-rice", tone: "", rate: "۴٫۹", count: 312, now: 420000, old: 480000, off: 13, flags: ["best"] },
  { name: "خرمای مضافتی درجه‌یک بم", cat: "خشکبار", catIcon: "fa-bowl-food", tone: "clay", rate: "۴٫۸", count: 124, now: 185000, old: 220000, off: 16, flags: ["best", "sale"] },
  { name: "چای سیاه ممتاز لاهیجان", cat: "چای", catIcon: "fa-mug-hot", tone: "gold", rate: "۴٫۷", count: 89, now: 260000, flags: ["best"] },
  { name: "لوبیا چیتی درشت درجه‌یک", cat: "حبوبات", catIcon: "fa-seedling", tone: "", rate: "۴٫۶", count: 207, now: 95000, flags: ["best"] },
  { name: "زعفران سرگل قائنات (یک مثقال)", cat: "ادویه", catIcon: "fa-mortar-pestle", tone: "clay", rate: "۴٫۸", count: 142, now: 490000, flags: ["best"] },
  { name: "پسته اکبری خندان شور", cat: "آجیل", catIcon: "fa-bowl-food", tone: "clay", rate: "۴٫۹", count: 318, now: 520000, old: 590000, off: 12, flags: ["best"] },
];

const FEATURED: Prod[] = [
  { name: "زعفران نگین ممتاز صادراتی", cat: "ادویه", catIcon: "fa-mortar-pestle", tone: "gold", rate: "۵٫۰", count: 48, now: 680000, flags: ["crown"], desc: "برداشت تازهٔ امسال از مزارع قائنات؛ رنگ و عطر استثنایی، مناسب هدیه و سفرهٔ ویژه." },
  { name: "برنج طارم هاشمی معطر شمال", cat: "برنج", catIcon: "fa-bowl-rice", tone: "", rate: "۴٫۹", count: 76, now: 450000, flags: ["crown"], desc: "دانه‌بلند و خوش‌پخت، با عطر طبیعی؛ مستقیم از شالیزارهای منتخب گیلان." },
  { name: "انجیر خشک پرک استهبان", cat: "خشکبار", catIcon: "fa-apple-whole", tone: "clay", rate: "۴٫۸", count: 139, now: 275000, old: 320000, off: 14, flags: ["crown"], desc: "درجه‌یک و آفتاب‌خشک، بدون افزودنی؛ شیرینی طبیعی و بافت لطیف." },
  { name: "آجیل مخصوص پنج‌مغز ممتاز", cat: "آجیل", catIcon: "fa-bowl-food", tone: "clay", rate: "۴٫۹", count: 318, now: 550000, old: 620000, off: 11, flags: ["crown"], desc: "ترکیب متوازن پسته، بادام، فندق، گردو و بادام هندی؛ تازه و دست‌چین." },
  { name: "برنج دم‌سیاه معطر اصیل", cat: "برنج", catIcon: "fa-bowl-rice", tone: "", rate: "۴٫۹", count: 76, now: 470000, old: 520000, off: 10, flags: ["crown"], desc: "عطر بی‌نظیر و قد کشیدن عالی هنگام پخت؛ انتخابِ سفره‌های مهمانی." },
  { name: "مغز گردوی تازهٔ تویسرکان", cat: "خشکبار", catIcon: "fa-apple-whole", tone: "clay", rate: "۴٫۸", count: 139, now: 380000, flags: ["crown"], desc: "روشن، چرب و تازه؛ بدون تلخی، مناسب پخت‌وپز و میان‌وعدهٔ سالم." },
];

const TRUST = [
  { icon: "fa-truck-fast", tone: "green" as const, t: "ارسال سریع", d: "تهران در ۲۴ ساعت و سایر شهرها ۲ تا ۴ روز کاری؛ بسته‌بندی امن و سالم." },
  { icon: "fa-shield-halved", tone: "clay" as const, t: "ضمانت اصالت", d: "هر محصول با تضمین کیفیت دشت‌زاد؛ طبیعی، تازه و دقیقاً همان‌که سفارش داده‌اید." },
  { icon: "fa-rotate-left", tone: "gold" as const, t: "بازگشت ۷ روزه", d: "تا ۷ روز پس از دریافت، بدون قید و شرط امکان بازگشت کالای بازنشده وجود دارد." },
  { icon: "fa-headset", tone: "green" as const, t: "پشتیبانی همه‌روزه", d: "کارشناسان ما همه‌روزه از ۹ تا ۲۱ پاسخ‌گوی سؤال‌ها و سفارش‌های شما هستند." },
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

const SEASONAL = [
  { href: "/corporate-gifts", img: "عکس سفره هفت‌سین و سبزه نوروزی", icon: "fa-seedling", tag: "ویژه نوروز", t: "سال نو را با طعم برکت آغاز کنید", d: "آجیل، چای، زعفران و کالکشن‌های بهاری برای سفره سال نو و دید و بازدید عید.", go: "مشاهده کالکشن نوروز" },
  { href: "/corporate-gifts", img: "عکس شب یلدا، انار و آجیل", icon: "fa-moon", tag: "شب یلدا", t: "بلندترین شب سال، با طعم دورهمی", d: "سبدهای زمستانی یلدا — آجیل، انار خشک، باسلوق و چای، برای شب‌نشینی خانوادگی.", go: "مشاهده کالکشن یلدا" },
];

const SEASONAL_SM = [
  { href: "/corporate-gifts", img: "عکس جعبه هدیه سازمانی لوکس با روبان", icon: "fa-gift", tag: "سازمانی", t: "هدایای سازمانی به نام برند شما", d: "بسته‌بندی اختصاصی، درج لوگو و فاکتور رسمی — مشاوره رایگان چیدمان سبد.", go: "دریافت پیش‌فاکتور" },
  { href: "/bulk-order", img: "عکس کیسه‌ها و بسته‌های عمده محصولات", icon: "fa-box-open", tag: "خرید عمده", t: "خرید عمده با قیمت پلکانی", d: "برای رستوران، فروشگاه و مصرف بالا — هرچه بیشتر، قیمت هر واحد کمتر.", go: "استعلام قیمت عمده" },
];

function flagBadge(f: Flag) {
  if (f === "best") return <Badge tone="clay" icon="fa-fire">پرفروش</Badge>;
  if (f === "sale") return <Badge tone="gold" icon="fa-tag">تخفیف</Badge>;
  return <Badge tone="gold" icon="fa-crown">ویژه</Badge>;
}

function ProductCard({ p }: { p: Prod }) {
  const catClass = p.tone ? `cat-label cat-label--${p.tone}` : "cat-label";
  return (
    <Card as="article" hover className="product-card">
      <div className="product-card__media">
        <Placeholder label={`عکس ${p.name}`} />
        <div className="product-card__flags">{p.flags.map((f) => <span key={f}>{flagBadge(f)}</span>)}</div>
        <button className="product-card__bm" type="button" aria-label="افزودن به علاقه‌مندی‌ها">
          <i className="fa-regular fa-heart" aria-hidden />
        </button>
      </div>
      <div className="product-card__body">
        <span className={catClass}>
          <i className={`fa-solid ${p.catIcon}`} aria-hidden /> {p.cat}
        </span>
        <h3 className="product-card__name">{p.name}</h3>
        {p.desc && <p className="muted product-card__desc">{p.desc}</p>}
        <RatingChip value={p.rate} count={p.count} />
        <div className="product-card__foot">
          <Price now={p.now} old={p.old} off={p.off} />
          <button className="product-card__add" type="button" aria-label="افزودن به سبد">
            <i className="fa-solid fa-plus" aria-hidden />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="home-page dz">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden />
        <div className="home-hero__scrim" aria-hidden />
        <div className="wrap">
          <div className="home-hero__content">
            <span className="home-hero__kicker">
              <i className="fa-solid fa-wheat-awn" aria-hidden /> چهار نسل اصالت از سال ۱۳۰۵
            </span>
            <h1 className="home-hero__title">
              طعمِ اصیلِ ایران،
              <br />
              <span className="home-hero__accent">مستقیم</span> از دلِ دشت
            </h1>
            <p className="home-hero__lead">
              برنج، حبوبات، خشکبار، چای، ادویه و آجیل مرغوب — برداشت‌شده از باغ‌های دماوند و رسیده به
              سفره شما، بدون واسطه و با ضمانت اصالت دشت‌زاد.
            </p>
            <div className="home-hero__cta">
              <ButtonLink href="/products" size="lg">
                <i className="fa-solid fa-bag-shopping" aria-hidden /> ورود به فروشگاه
              </ButtonLink>
              <ButtonLink href="/special-sale" size="lg" className="home-hero__ghost">
                <i className="fa-solid fa-bolt" aria-hidden /> فروش ویژه
              </ButtonLink>
            </div>
            <div className="home-hero__assure">
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
          <SectionHead
            kicker="دسته‌بندی‌های اصلی"
            title="از کجا شروع کنیم؟"
            sub="شش خانواده اصلی محصولات دشت‌زاد — هرکدام مستقیم از تأمین‌کننده مورد اعتماد ما."
            action={
              <Link className="see-all" href="/products">
                همه محصولات <i className="fa-solid fa-arrow-left" aria-hidden />
              </Link>
            }
          />
          <div className="home-scroller home-catgrid">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} className="home-cat" href={`/category/${c.slug}`}>
                <div className="home-cat__media">
                  <IconBox icon={c.icon} size="lg" round className="home-cat__ic" />
                </div>
                <div className="home-cat__body">
                  <span className="home-cat__t">{c.t}</span>
                  <span className="faint">{c.n}</span>
                  <span className="home-cat__go">
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
          <SectionHead
            kicker="محبوب‌ترین‌ها"
            title="محصولات پرفروش"
            sub="آن‌چه مشتریان دشت‌زاد بیش از همه به سفره خود راه می‌دهند."
            action={
              <Link className="see-all" href="/products">
                مشاهده همه <i className="fa-solid fa-arrow-left" aria-hidden />
              </Link>
            }
          />
          <div className="home-scroller home-prodgrid">
            {BEST.map((p) => (
              <ProductCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            kicker="دست‌چینِ دشت‌زاد"
            title="محصولات ویژه"
            sub="گزیده‌ای از مرغوب‌ترین محصولات فصل — محدود، ممتاز و دست‌چین‌شده."
            action={
              <Link className="see-all" href="/products">
                مشاهده همه <i className="fa-solid fa-arrow-left" aria-hidden />
              </Link>
            }
          />
          <div className="grid--3 home-featgrid">
            {FEATURED.map((p) => (
              <ProductCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="home-story">
            <div className="home-story__media">
              <Placeholder
                label="عکس باغ خانوادگی دماوند یا پرتره‌ای از باغبان دشت‌زاد"
                className="home-story__ph"
              />
              <div className="home-story__est">
                <b className="num">۱۳۰۵</b>
                <span>سالِ آغاز</span>
              </div>
            </div>
            <div className="home-story__l">
              <span className="sec__kicker">روایت دشت‌زاد</span>
              <h2 className="home-story__title">
                چهار نسل، یک پیمان:
                <br />
                طبیعی و دست‌نخورده
              </h2>
              <p className="muted home-story__p">
                داستان دشت‌زاد از سال ۱۳۰۵ در باغ‌های دماوند آغاز شد؛ جایی که خانواده‌ای زمین را به دست
                خود بارور کرد و آموخت که بهترین طعم، از صبر و احترام به طبیعت به دست می‌آید.
              </p>
              <p className="muted home-story__p">
                امروز همان پیمان ادامه دارد: محصول را مستقیم از باغ و مزرعه می‌گیریم، بدون واسطه و بدون
                افزودنی به دست شما می‌رسانیم — تا طعمی که می‌چشید، همان طعمِ اصیلِ زمین ایران باشد.
              </p>
              <div className="home-story__sign">
                <span className="home-story__seal">د</span>
                <div>
                  <b>خانواده دشت‌زاد</b>
                  <span className="faint">باغ‌های دماوند، از ۱۳۰۵</span>
                </div>
              </div>
              <div className="home-story__cta">
                <ButtonLink href="/about" variant="ghost">
                  <i className="fa-solid fa-book-open-reader" aria-hidden /> داستان کامل ما
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="چرا دشت‌زاد؟" title="خریدی مطمئن، از باغ تا درِ خانه" />
          <div className="grid--4">
            {TRUST.map((t) => (
              <Card key={t.t} pad hover className="home-trust">
                <IconBox icon={t.icon} tone={t.tone} size="lg" />
                <h3 className="home-trust__t">{t.t}</h3>
                <p className="muted home-trust__d">{t.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="sec home-journey">
        <div className="wrap">
          <div className="home-journey__head">
            <span className="home-journey__kicker">از دشت تا خانه</span>
            <h2 className="home-journey__title">مسیرِ هر محصول، شفاف و بدون واسطه</h2>
            <p className="home-journey__sub">
              از لحظه برداشت در باغ تا رسیدن به سفره شما، هر گام را خودمان مراقبت می‌کنیم.
            </p>
          </div>
          <div className="home-journey__steps">
            {JOURNEY.map((s) => (
              <div key={s.no} className="home-jstep">
                <span className="home-jstep__ic">
                  <i className={`fa-solid ${s.icon}`} aria-hidden />
                </span>
                <span className="home-jstep__no">{s.no}</span>
                <h3 className="home-jstep__t">{s.t}</h3>
                <p className="home-jstep__d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            kicker="تجربه مشتریان"
            title="نظرات مشتریان دشت‌زاد"
            action={
              <span className="home-revscore">
                <b className="num">۴٫۸</b>
                <Stars value={4.5} />
                <span className="faint">از ۱۲٬۰۰۰+ خرید</span>
              </span>
            }
          />
          <ReviewDeck reviews={REVIEWS} />
        </div>
      </section>

      {/* SEASONAL */}
      <section className="sec sec--warm">
        <div className="wrap">
          <SectionHead
            kicker="فصل و مناسبت"
            title="برای هر بهانه خوب"
            sub="از سفره نوروز تا شب یلدا، هدایای سازمانی و خرید عمده — دشت‌زاد کنار شماست."
          />
          <div className="home-season">
            {SEASONAL.map((b) => (
              <Link key={b.t} className="home-banner" href={b.href}>
                <Placeholder label={b.img} className="home-banner__ph" />
                <div className="home-banner__scrim" aria-hidden />
                <div className="home-banner__body">
                  <span className="home-banner__tag">
                    <i className={`fa-solid ${b.icon}`} aria-hidden /> {b.tag}
                  </span>
                  <span className="home-banner__t">{b.t}</span>
                  <span className="home-banner__d">{b.d}</span>
                  <span className="home-banner__go">
                    {b.go} <i className="fa-solid fa-arrow-left" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="home-season home-season--row">
            {SEASONAL_SM.map((b) => (
              <Link key={b.t} className="home-banner home-banner--sm" href={b.href}>
                <Placeholder label={b.img} className="home-banner__ph" />
                <div className="home-banner__scrim" aria-hidden />
                <div className="home-banner__body">
                  <span className="home-banner__tag">
                    <i className={`fa-solid ${b.icon}`} aria-hidden /> {b.tag}
                  </span>
                  <span className="home-banner__t">{b.t}</span>
                  <span className="home-banner__d">{b.d}</span>
                  <span className="home-banner__go">
                    {b.go} <i className="fa-solid fa-arrow-left" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />
    </div>
  );
}
