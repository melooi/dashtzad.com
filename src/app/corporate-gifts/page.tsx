import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import {
  Hero,
  SectionHead,
  Card,
  IconBox,
  Chip,
  Badge,
  ButtonLink,
  Price,
  Stat,
  Steps,
  Placeholder,
} from "@/components/ui";
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

const STATS = [
  { num: "۸۵۰+", label: "سازمان و برند همراه" },
  { num: "۴۲٬۰۰۰+", label: "پک هدیه تحویل‌شده" },
  { num: "۹۸٪", label: "رضایت از کیفیت و ارسال" },
  { num: "۴", label: "نسل تجربه از سال ۱۳۰۵" },
];

const BENEFITS: { icon: string; tone: "green" | "clay" | "gold"; title: string; text: string }[] = [
  {
    icon: "fa-leaf",
    tone: "green",
    title: "محصول طبیعی و مرغوب",
    text: "خشکبار و میوه خشک مستقیم از باغ‌های دماوند؛ بدون شکر و نگهدارنده.",
  },
  {
    icon: "fa-stamp",
    tone: "clay",
    title: "بسته‌بندی اختصاصی برند",
    text: "درج لوگو، رنگ سازمانی، کارت و پیام تبریک مخصوص شما.",
  },
  {
    icon: "fa-tags",
    tone: "gold",
    title: "قیمت پلکانی سازمانی",
    text: "هرچه تعداد بیشتر، قیمت هر پک کمتر؛ شفاف و بدون واسطه.",
  },
  {
    icon: "fa-file-invoice-dollar",
    tone: "green",
    title: "فاکتور رسمی",
    text: "صدور فاکتور رسمی با اطلاعات حقوقی و مالیات ارزش‌افزوده.",
  },
  {
    icon: "fa-truck-ramp-box",
    tone: "clay",
    title: "توزیع هماهنگ",
    text: "تحویل یک‌جا به سازمان یا ارسال خانه‌به‌خانه به گیرندگان در سراسر کشور.",
  },
  {
    icon: "fa-headset",
    tone: "gold",
    title: "کارشناس اختصاصی",
    text: "یک نفر از ابتدا تا تحویل، کنار شما برای چیدمان بهترین سبد.",
  },
];

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

const PACKAGES: {
  ph: string;
  name: string;
  tagline: string;
  from: number;
  featured?: boolean;
  variant: "primary" | "ghost";
  incl: { text: string; off?: boolean }[];
}[] = [
  {
    ph: "عکس پک دلگرمی — زیپ‌کیپ کرافت در جعبه ساده",
    name: "پک «دلگرمی»",
    tagline: "هدیه جمع‌وجور و باکیفیت",
    from: 350000,
    variant: "ghost",
    incl: [
      { text: "برگه گلابی و زردآلوی خشک ممتاز" },
      { text: "آجیل مخصوص دشت‌زاد" },
      { text: "جعبه کرافت با روبان" },
      { text: "کارت تبریک با نام برند شما" },
      { text: "جعبه چوبی لوکس", off: true },
    ],
  },
  {
    ph: "عکس پک مهرورزی — قوطی هدیه و چیدمان متنوع",
    name: "پک «مهرورزی»",
    tagline: "انتخابِ متعادل و شیک",
    from: 690000,
    featured: true,
    variant: "primary",
    incl: [
      { text: "تشکیله میوه خشک و خشکبار اعلا" },
      { text: "قوطی هدیه فلزی درب‌دار" },
      { text: "چای یا دمنوش هدیه" },
      { text: "درج لوگو روی جعبه و کارت اختصاصی" },
      { text: "روبان و بسته‌بندی هدیه" },
    ],
  },
  {
    ph: "عکس پک سپاس — جعبه چوبی لوکس با محتویات کامل",
    name: "پک «سپاس»",
    tagline: "هدیه لوکس و کامل",
    from: 1250000,
    variant: "ghost",
    incl: [
      { text: "تنوع کامل خشکبار، میوه خشک و خرما" },
      { text: "جعبه چوبی لوکس قابل نگهداری" },
      { text: "عسل طبیعی و زعفران هدیه" },
      { text: "پلاک یا حکاکی لوگوی برند" },
      { text: "کارت دست‌ساز و بسته‌بندی پارچه‌ای" },
    ],
  },
];

const OCCASIONS = [
  { icon: "fa-seedling", title: "هدایای نوروز", note: "پک‌های بهاری و سبز", ph: "سفره نوروزی و سبزه" },
  { icon: "fa-moon", title: "شب یلدا", note: "سبدهای زمستانی", ph: "شب یلدا، انار و آجیل" },
  {
    icon: "fa-users",
    title: "قدردانی از کارکنان",
    note: "روز کارمند و پاداش",
    ph: "جمع کارکنان یک شرکت",
  },
  {
    icon: "fa-handshake",
    title: "تقدیر از مشتریان",
    note: "حفظ ارتباط بلندمدت",
    ph: "دست‌دادن دو همکار تجاری",
  },
  { icon: "fa-cake-candles", title: "سالگرد تأسیس", note: "جشن و رویداد برند", ph: "کیک سالگرد و بادکنک" },
];

const CUSTOM: { icon: string; tone: "green" | "clay" | "gold"; title: string; text: string }[] = [
  {
    icon: "fa-stamp",
    tone: "green",
    title: "درج لوگو و رنگ سازمانی",
    text: "چاپ، حکاکی یا پلاک فلزی لوگوی شما روی جعبه و بسته‌بندی.",
  },
  {
    icon: "fa-envelope-open-text",
    tone: "clay",
    title: "کارت و پیام اختصاصی",
    text: "متن تبریک یا قدردانی شما روی کارت چاپی یا دست‌نویس.",
  },
  {
    icon: "fa-boxes-stacked",
    tone: "gold",
    title: "انتخاب محتویات",
    text: "ترکیب دلخواه از خشکبار، میوه خشک، خرما، عسل و زعفران.",
  },
  {
    icon: "fa-ribbon",
    tone: "green",
    title: "جعبه، روبان و تزئین",
    text: "از کرافت ساده تا جعبه چوبی لوکس، با روبان و بسته‌بندی پارچه‌ای.",
  },
];

const PROCESS = [
  {
    num: "۱",
    title: "مشاوره رایگان",
    desc: "درباره مناسبت، تعداد، بودجه و سلیقه برندتان با کارشناس ما گفت‌وگو می‌کنید.",
  },
  {
    num: "۲",
    title: "انتخاب و سفارشی‌سازی",
    desc: "پک، محتویات، جعبه و طرح لوگو و کارت را نهایی می‌کنیم و پیش‌فاکتور می‌دهیم.",
  },
  {
    num: "۳",
    title: "تأیید نمونه و تولید",
    desc: "نمونه بسته را تأیید می‌کنید؛ سپس با کیفیت یکدست تولید و بسته‌بندی می‌شود.",
  },
  {
    num: "۴",
    title: "ارسال و توزیع",
    desc: "تحویل یک‌جا به سازمان یا ارسال خانه‌به‌خانه به گیرندگان در سراسر کشور.",
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
      <Hero
        className="cg-hero"
        kicker={
          <>
            <i className="fa-solid fa-handshake-angle" aria-hidden /> راهکار هدیه سازمان‌ها
          </>
        }
        title={
          <>
            هدیه‌ای از <span className="cg-accent">دلِ طبیعت</span>
            <br />
            به نامِ برند شما
          </>
        }
        sub="پک‌های هدیه سازمانی دشت‌زاد، خشکبار و میوه خشکِ مرغوبِ باغ‌های دماوند را در بسته‌بندی شیک و اختصاصی به دست کارکنان و مشتریان شما می‌رساند — هدیه‌ای سالم، اصیل و به‌یادماندنی برای نوروز، یلدا و هر مناسبت."
      >
        <div className="cg-hero__cta">
          <ButtonLink href="#request" variant="primary">
            <i className="fa-solid fa-paper-plane" aria-hidden /> دریافت پیش‌فاکتور رایگان
          </ButtonLink>
          <a className="btn btn--ghost cg-hero__outline" href="#packages">
            <i className="fa-solid fa-box-open" aria-hidden /> مشاهده پک‌ها
          </a>
        </div>
        <div className="cg-hero__assure">
          <Chip icon="fa-stamp">درج لوگو و کارت اختصاصی</Chip>
          <Chip icon="fa-file-invoice">فاکتور رسمی و ارزش‌افزوده</Chip>
          <Chip icon="fa-truck-fast">توزیع سراسری</Chip>
        </div>

        <div className="cg-showcase">
          <Badge tone="gold" icon="fa-award" className="cg-showcase__tag">
            پک ویژه سازمانی
          </Badge>
          <Placeholder
            className="cg-showcase__main"
            label="عکس جعبه هدیه سازمانی لوکس با روبان و کارت برند"
          />
          <Placeholder className="cg-showcase__a" label="نمای محتویات: خشکبار و میوه خشک" />
          <Placeholder className="cg-showcase__b" label="جزئیات لوگوی برند روی درب جعبه" />
        </div>
      </Hero>

      {/* STATS */}
      <div className="wrap">
        <div className="cg-stats card">
          {STATS.map((s) => (
            <Stat key={s.label} num={s.num} label={s.label} />
          ))}
        </div>
      </div>

      {/* WHY */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            kicker="چرا دشت‌زاد؟"
            title="هدیه‌ای که هم سالم است، هم خاص"
            sub="از تأمین و چیدمان تا چاپ و توزیع، همه مراحل را یک‌جا و بدون دغدغه به ما بسپارید."
          />
          <div className="grid--3 cg-benefits">
            {BENEFITS.map((b) => (
              <Card key={b.title} pad className="cg-benefit">
                <IconBox icon={b.icon} tone={b.tone} />
                <div>
                  <div className="card__title">{b.title}</div>
                  <p className="card__text">{b.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="sec" id="collections">
        <div className="wrap">
          <SectionHead
            kicker="کالکشن‌های دشت‌زاد"
            title="برای هر حال‌وهوا، یک کالکشن"
            sub="هر کالکشن یک روایت است؛ ترکیبی از محصول، رنگ و حس. روی هرکدام بزنید تا دنیای آن را ببینید و آن را به‌عنوان هدیه سازمانی سفارش دهید."
          />
          <div className="grid--3">
            {COLLECTIONS.map((c) => (
              <Card as="article" hover key={c.name} className="cg-collection">
                <Link href="/products" className="cg-collection__link">
                  <div className="cg-collection__head">
                    <i className={`cg-collection__wm fa-solid ${c.icon}`} aria-hidden />
                    <span className="cg-collection__k">کالکشن دشت‌زاد</span>
                    <span className="cg-collection__name">{c.name}</span>
                  </div>
                  <div className="cg-collection__body">
                    <p className="cg-collection__slogan">«{c.slogan}»</p>
                    <div className="cg-collection__tags">
                      {c.tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                    <span className="cg-collection__go">
                      مشاهده کالکشن <i className="fa-solid fa-arrow-left" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="sec sec--warm" id="packages">
        <div className="wrap">
          <SectionHead
            kicker="پک‌های آماده"
            title="سبدهای هدیه سازمانی"
            sub="سه سطح آماده سفارش — همه قابل سفارشی‌سازی با لوگو و محتویات دلخواه شما. قیمت‌ها برای سفارش‌های عمده پلکانی است."
            action={
              <a className="see-all" href="#request">
                سفارش سبد دلخواه <i className="fa-solid fa-arrow-left" aria-hidden />
              </a>
            }
          />
          <div className="grid--3 cg-packs">
            {PACKAGES.map((p) => (
              <Card
                as="article"
                hover
                key={p.name}
                className={`cg-pack${p.featured ? " cg-pack--featured" : ""}`}
              >
                {p.featured && (
                  <Badge tone="gold" icon="fa-star" className="cg-pack__ribbon">
                    پرطرفدار
                  </Badge>
                )}
                <Placeholder className="cg-pack__media" label={p.ph} />
                <div className="cg-pack__body">
                  <div className="cg-pack__name">
                    {p.name} <span>{p.tagline}</span>
                  </div>
                  <div className="cg-pack__price">
                    <span className="cg-pack__from">از</span>
                    <Price now={p.from} size="lg" />
                    <span className="price__unit">/ پک</span>
                  </div>
                  <ul className="cg-incl">
                    {p.incl.map((it) => (
                      <li key={it.text} className={it.off ? "is-off" : undefined}>
                        <i
                          className={`fa-solid ${it.off ? "fa-xmark" : "fa-check"}`}
                          aria-hidden
                        />{" "}
                        {it.text}
                      </li>
                    ))}
                  </ul>
                  <a className={`btn btn--${p.variant} btn--block`} href="#request">
                    <i className="fa-solid fa-paper-plane" aria-hidden /> درخواست این پک
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            kicker="مناسبت‌ها"
            title="برای هر بهانه قدردانی"
            sub="از نوروز و یلدا تا سالگرد تأسیس و تقدیر از مشتریان — هدیه را با مناسبت شما هماهنگ می‌کنیم."
          />
          <div className="cg-occasions">
            {OCCASIONS.map((o) => (
              <a className="cg-occasion" href="#request" key={o.title}>
                <Placeholder label={o.ph} />
                <div className="cg-occasion__scrim" />
                <div className="cg-occasion__body">
                  <IconBox icon={o.icon} round className="cg-occasion__ic" />
                  <span className="cg-occasion__t">{o.title}</span>
                  <span className="cg-occasion__n">{o.note}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="sec sec--warm">
        <div className="wrap">
          <div className="cg-custom">
            <div className="cg-custom__media">
              <Placeholder label="عکس نزدیک از جعبه با لوگوی حکاکی‌شده برند و کارت دست‌نویس" />
              <Badge icon="fa-wand-magic-sparkles" className="cg-custom__badge">
                اختصاصی‌سازی کامل
              </Badge>
            </div>
            <div className="cg-custom__l">
              <SectionHead
                kicker="به نامِ برند شما"
                title="هر جعبه، سفیرِ برند شماست"
                sub="جزئیات را شما انتخاب می‌کنید؛ ما با وسواس آن را می‌سازیم تا گیرنده، نام شما را به‌خاطر بسپارد."
              />
              <div className="cg-custom__list">
                {CUSTOM.map((f) => (
                  <div className="cg-feature" key={f.title}>
                    <IconBox icon={f.icon} tone={f.tone} size="lg" />
                    <div>
                      <div className="cg-feature__t">{f.title}</div>
                      <p className="cg-feature__d">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            kicker="روند کار"
            title="از مشاوره تا تحویل، در ۴ گام"
            sub="ساده، شفاف و بدون دغدغه؛ شما تصمیم می‌گیرید، ما اجرا می‌کنیم."
          />
          <div className="cg-process">
            <Steps items={PROCESS} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec sec--warm">
        <div className="wrap">
          <SectionHead
            kicker="تجربه مشتریان سازمانی"
            title="برندهایی که به ما اعتماد کردند"
            sub="از استارتاپ تا شرکت‌های بزرگ، هدیه پایان‌سال‌شان را به دشت‌زاد سپردند."
          />
          <GiftDeck />
          <div className="cg-trust">
            <span className="cg-trust__lbl">همکاری با تیم‌های فروش و بازرگانیِ:</span>
            <Placeholder className="cg-trust__logo" label="دیجی‌کالا" />
            <Placeholder className="cg-trust__logo" label="باسلام" />
            <Placeholder className="cg-trust__logo" label="تپسی‌شاپ" />
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
                  <IconBox icon="fa-bolt" tone="ink" size="sm" round /> پاسخ‌گویی در کمتر از ۲۴ ساعت
                  کاری
                </li>
                <li>
                  <IconBox icon="fa-comments-dollar" tone="ink" size="sm" round /> مشاوره و چیدمان
                  سبد، رایگان
                </li>
                <li>
                  <IconBox icon="fa-lock" tone="ink" size="sm" round /> اطلاعات شما کاملاً محفوظ
                  می‌ماند
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
          <SectionHead kicker="پرسش‌های متداول" title="سؤالی درباره سفارش سازمانی دارید؟" />
          <div className="cg-faq">
            <GiftFaq />
          </div>
        </div>
      </section>
    </div>
  );
}
