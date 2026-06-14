import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";
import { ButtonLink, Card, IconBox, Placeholder, SectionHead } from "@/components/ui";
import "./about.css";

// Font Awesome is loaded site-wide in app/layout.tsx.

const DESCRIPTION =
  "دشت‌زاد فقط یک فروشگاه آنلاین مواد غذایی نیست؛ روایتی از زمین، صبر و سفره ایرانی است. داستان برند، ریشه خانوادگی و قولِ ما به شما.";

export const metadata: Metadata = {
  title: "درباره ما — روایتِ یک نسل از ۱۳۰۵",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره دشت‌زاد — روایتِ یک نسل از ۱۳۰۵",
    description: DESCRIPTION,
    url: "/about",
    type: "website",
  },
};

const VALUES = [
  {
    icon: "fa-seedling",
    tone: "green" as const,
    title: "اصالت",
    desc: "به ریشهٔ محصول، داستانِ تولید و جایگاهِ غذا در فرهنگ ایرانی اهمیت می‌دهیم.",
  },
  {
    icon: "fa-eye",
    tone: "clay" as const,
    title: "شفافیت",
    desc: "مشتری باید بداند چه می‌خرد، چه ویژگی‌هایی دارد و چطور به دستش می‌رسد.",
  },
  {
    icon: "fa-headset",
    tone: "gold" as const,
    title: "احترام به مشتری",
    desc: "پاسخ‌گویی، پیگیری و صداقت در ارتباط با مشتری برای ما اصل است.",
  },
  {
    icon: "fa-people-carry-box",
    tone: "green" as const,
    title: "احترام به تولیدکننده",
    desc: "پشتِ هر محصول، زنجیره‌ای از کشاورز تا بسته‌بند است؛ این زنجیره را ارزشمند می‌دانیم.",
  },
  {
    icon: "fa-cart-shopping",
    tone: "clay" as const,
    title: "تجربهٔ خرید بهتر",
    desc: "خریدِ آنلاینِ مواد غذایی باید ساده، قابل فهم و بی‌دردسر باشد.",
  },
];

const PROMISES = [
  <>
    <b>اطلاعاتِ درست</b> و کاربردی دربارهٔ محصولات
  </>,
  <>
    <b>پاسخ‌گویی</b> به پرسش‌های پیش از خرید
  </>,
  <>
    <b>پیگیریِ سفارش‌ها</b> تا رسیدن به دستِ شما
  </>,
  <>
    بررسیِ <b>مشکلاتِ پرداخت و ارسال</b>
  </>,
  <>
    توجه به <b>نظرها و انتقادهای</b> مشتریان
  </>,
  <>
    <b>بهبودِ مداومِ</b> کیفیتِ خدمات و محصولات
  </>,
];

export default function AboutPage() {
  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "درباره دشت‌زاد",
    url: absoluteUrl("/about"),
    description: DESCRIPTION,
    inLanguage: "fa-IR",
  };

  return (
    <div className="about-page dz">
      <JsonLd
        data={[
          aboutLd,
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "درباره ما", path: "/about" },
          ]),
        ]}
      />

      {/* ============================= HERO ============================= */}
      <section className="hero about-hero">
        <div className="wrap">
          <div className="hero__inner">
            <span className="hero__kicker">درباره دشت‌زاد</span>
            <h1 className="hero__title">
              روایتِ یک نسل،
              <br />
              <span className="about-hero__soft">از ۱۳۰۵.</span>
            </h1>
            <p className="hero__sub">
              دشت‌زاد فقط یک فروشگاه آنلاین مواد غذایی نیست؛ روایتی از زمین، رنج، صبر و سفره ایرانی
              است — جایی که هر دانه را به امانت می‌کارند و قدرش را می‌دانند.
            </p>
            <div className="hero__chips">
              <span className="hero__chip">
                <i className="fa-solid fa-seedling" aria-hidden /> ریشه از ۱۳۰۵
              </span>
              <span className="hero__chip">
                <i className="fa-solid fa-handshake-angle" aria-hidden /> بدون واسطه
              </span>
              <span className="hero__chip">
                <i className="fa-solid fa-mountain-sun" aria-hidden /> مستقیم از باغ‌های دماوند
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= STORY ============================= */}
      <section className="sec">
        <div className="wrap">
          <div className="about-story">
            <div className="about-story__body">
              <SectionHead
                kicker="داستانِ دشت‌زاد"
                title={
                  <>
                    از دلِ یک <span className="about-accent">داستان خانوادگی</span>
                  </>
                }
              />
              <p className="about-prose">
                نامِ دشت‌زاد از یاد مردی آمده که ریشه‌اش در خاک بود و زندگی‌اش با کار، قناعت و تلاش
                معنا پیدا می‌کرد. <strong>علی‌اکبر جلوداری، زادهٔ سال ۱۳۰۵</strong>، از نسلی بود که
                زمین را می‌شناخت، قدرِ دانه را می‌دانست و می‌فهمید پشتِ هر محصول، زحمتِ یک خانواده و
                امیدِ یک فصل نشسته است.
              </p>
              <p className="about-prose">
                دشت‌زاد ادامهٔ همان نگاه است؛ نگاهی که به محصول فقط به چشمِ کالا نگاه نمی‌کند، بلکه
                آن را بخشی از زندگی مردم، سفرهٔ خانه‌ها و خاطرهٔ خانواده‌ها می‌داند.
              </p>
              <blockquote className="about-quote">
                <p>
                  «دشت‌زاد یعنی زادهٔ دشت؛ محصولی که ریشه در خاک دارد، و احترامی دوباره به کشاورز و
                  سفرهٔ ایرانی.»
                </p>
                <cite>روایتِ یک نسل — از ۱۳۰۵</cite>
              </blockquote>
            </div>

            <div className="about-story__media">
              <div className="about-story__frame">
                <Placeholder label="عکس قدیمیِ خانوادگی — علی‌اکبر جلوداری / باغ خانوادگی" />
              </div>
              <div className="about-story__seal">
                <b className="num">۱۳۰۵</b>
                <span>سالِ ریشه</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= MEANING ============================= */}
      <section className="about-band">
        <div className="wrap">
          <div className="about-band__head">
            <span className="about-band__kicker">
              <i className="fa-solid fa-quote-right" aria-hidden /> دشت‌زاد یعنی چه؟
            </span>
            <h2 className="about-band__title">
              یعنی <span className="about-honey">زادهٔ دشت</span> — هر دانه، بخشی از یک زندگی‌ست
            </h2>
            <p className="about-band__sub">
              ما باور داریم هر مشت حبوبات، هر دانه برنج و هر بسته خشکبار که به خانهٔ شما می‌رسد، فقط
              یک خرید ساده نیست؛ بخشی از آشپزی روزانه، مهمانی‌ها، دورهمی‌ها و خاطره‌های خانوادگی‌ست.
            </p>
          </div>

          <div className="about-band__grid">
            <article className="about-band__card">
              <IconBox icon="fa-seedling" tone="ink" size="lg" />
              <h3 className="about-band__ct">زاده دشت</h3>
              <p className="about-band__cd">
                محصولی که ریشه در خاک دارد؛ نه نامی روی بسته‌بندی، بلکه ثمرِ یک فصل صبر و کارِ زمین.
              </p>
            </article>
            <article className="about-band__card">
              <IconBox icon="fa-hand-holding-heart" tone="ink" size="lg" />
              <h3 className="about-band__ct">احترام دوباره</h3>
              <p className="about-band__cd">
                به کشاورز، به تولیدکننده، به خانواده و به سفرهٔ ایرانی — به همان زنجیره‌ای که پشتِ هر
                محصول ایستاده است.
              </p>
            </article>
            <article className="about-band__card">
              <IconBox icon="fa-utensils" tone="ink" size="lg" />
              <h3 className="about-band__ct">شایستهٔ سفره</h3>
              <p className="about-band__cd">
                محصولاتی که با دقت انتخاب می‌شوند تا شایستهٔ سفرهٔ خانهٔ شما باشند؛ برای مصرف روزانه و
                لحظه‌هایی که کیفیت مهم‌تر می‌شود.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================= GALLERY ============================= */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            kicker="از خاک تا سفره"
            title="سه چیز که هیچ‌وقت فراموش نمی‌کنیم"
            sub="دشت، دستِ کشاورز و محصولِ سالم — این سه، سرچشمهٔ هر چیزی‌ست که در دشت‌زاد عرضه می‌شود."
          />
          <div className="about-gallery">
            <article className="about-gcard about-gcard--dasht">
              <span className="about-gcard__scrim" aria-hidden />
              <div className="about-gcard__body">
                <IconBox icon="fa-mountain-sun" round size="md" className="about-gcard__ic" />
                <h3 className="about-gcard__t">دشت</h3>
                <p className="about-gcard__d">
                  جایی که خاک هنوز حرمت دارد؛ سرزمینی که صبر را شرطِ برکت می‌داند.
                </p>
              </div>
            </article>

            <article className="about-gcard about-gcard--farmer">
              <span className="about-gcard__scrim" aria-hidden />
              <div className="about-gcard__body">
                <IconBox icon="fa-wheat-awn" round size="md" className="about-gcard__ic" />
                <h3 className="about-gcard__t">کشاورز</h3>
                <p className="about-gcard__d">
                  پشتِ هر محصول، تلاشِ کشاورز و امیدِ یک فصل نشسته است — ما این زنجیره را ارزشمند
                  می‌دانیم.
                </p>
              </div>
            </article>

            <article className="about-gcard about-gcard--product">
              <span className="about-gcard__scrim" aria-hidden />
              <div className="about-gcard__body">
                <IconBox icon="fa-bowl-rice" round size="md" className="about-gcard__ic" />
                <h3 className="about-gcard__t">محصولِ سالم</h3>
                <p className="about-gcard__d">
                  تازه، تمیز و قابل اعتماد؛ با انتخابِ دقیق و بسته‌بندی‌ای که با احترام به دستِ شما
                  می‌رسد.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================= CONTRAST + VALUES ============================= */}
      <section className="sec sec--warm">
        <div className="wrap">
          <SectionHead
            kicker="چرا دشت‌زاد؟"
            title={
              <>
                ما با یک فروشگاهِ <span className="about-accent">خشک و بی‌روح</span> فرق داریم
              </>
            }
            sub="دشت‌زاد از یک پرسشِ ساده شروع شد: چرا خریدِ محصولاتی مثل برنج، حبوبات و خشکبار باید سخت، مبهم و بی‌اعتماد باشد؟ ما تصمیم گرفتیم مسیرِ متفاوتی بسازیم."
          />

          <div className="about-contrast">
            <Card pad className="about-panel about-panel--dull">
              <div className="about-panel__head">
                <IconBox icon="fa-box" tone="ink" size="md" className="about-panel__badge" />
                <div>
                  <h3 className="about-panel__t">فروشگاهِ بی‌روح</h3>
                  <p className="about-panel__n">فقط یک قفسه و یک قیمت</p>
                </div>
              </div>
              <div className="about-clist">
                <p className="about-cli about-cli--no">
                  <i className="fa-solid fa-xmark" aria-hidden /> نمی‌دانی محصول از کجا آمده و چطور
                  نگهداری شده.
                </p>
                <p className="about-cli about-cli--no">
                  <i className="fa-solid fa-xmark" aria-hidden /> اطلاعاتِ مبهم؛ معلوم نیست همان چیزی
                  را می‌گیری که سفارش دادی.
                </p>
                <p className="about-cli about-cli--no">
                  <i className="fa-solid fa-xmark" aria-hidden /> بین ده‌ها محصولِ شبیه به هم، گیج
                  می‌شوی.
                </p>
                <p className="about-cli about-cli--no">
                  <i className="fa-solid fa-xmark" aria-hidden /> بعد از فروش، دیگر کسی پاسخ‌گو نیست.
                </p>
              </div>
            </Card>

            <div className="about-panel about-panel--us">
              <div className="about-panel__head">
                <span className="about-panel__badge about-panel__badge--us">
                  <i className="fa-solid fa-leaf" aria-hidden />
                </span>
                <div>
                  <h3 className="about-panel__t">روشِ دشت‌زاد</h3>
                  <p className="about-panel__n">ساده‌تر، شفاف‌تر، مطمئن‌تر</p>
                </div>
              </div>
              <div className="about-clist">
                <p className="about-cli about-cli--yes">
                  <i className="fa-solid fa-check" aria-hidden /> ریشه و داستانِ محصول روشن است —
                  مستقیم از باغ، بدون واسطه.
                </p>
                <p className="about-cli about-cli--yes">
                  <i className="fa-solid fa-check" aria-hidden /> اطلاعاتِ شفاف برای انتخابِ بهتر،
                  پیش از خرید.
                </p>
                <p className="about-cli about-cli--yes">
                  <i className="fa-solid fa-check" aria-hidden /> انتخابِ دقیق و بسته‌بندیِ تمیز و
                  قابل اعتماد.
                </p>
                <p className="about-cli about-cli--yes">
                  <i className="fa-solid fa-check" aria-hidden /> پیگیریِ سفارش و پاسخ‌گوییِ واقعی،
                  بعد از خرید.
                </p>
              </div>
            </div>
          </div>

          <SectionHead
            kicker="ارزش‌های ما"
            title="پنج چیزی که سرِ آن کوتاه نمی‌آییم"
            className="about-values-head"
          />
          <div className="about-values">
            {VALUES.map((v) => (
              <Card key={v.title} pad hover as="article" className="about-value">
                <IconBox icon={v.icon} tone={v.tone} size="lg" />
                <h3 className="about-value__t">{v.title}</h3>
                <p className="about-value__d">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= PROMISE ============================= */}
      <section className="sec">
        <div className="wrap">
          <div className="about-promise">
            <div>
              <SectionHead
                kicker="تعهدِ ما"
                title={
                  <>
                    قولِ دشت‌زاد <span className="about-accent">به شما</span>
                  </>
                }
                sub="در دشت‌زاد، فروش پایانِ ارتباطِ ما با مشتری نیست؛ آغازِ مسئولیتِ ماست. از لحظه‌ای که وارد سایت می‌شوید تا زمانی که سفارش به دستتان می‌رسد، تلاش می‌کنیم مسیر روشن، ساده و قابل پیگیری باشد."
              />
              <div className="about-promise__list">
                {PROMISES.map((text, i) => (
                  <div className="about-pli" key={i}>
                    <IconBox icon="fa-check" size="sm" round className="about-pli__ic" />
                    <span className="about-pli__t">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="about-cta">
              <span className="about-cta__seal">د</span>
              <p className="about-cta__msg">
                از <span className="about-cta__green">دشت</span>، تا سفرهٔ شما — با محصولاتی که با دقت
                انتخاب می‌شوند.
              </p>
              <p className="about-cta__sub">
                ما آمده‌ایم تا خریدِ موادِ غذاییِ اصیل را ساده‌تر، شفاف‌تر و مطمئن‌تر کنیم؛ با
                بسته‌بندیِ قابل اعتماد و پشتیبانیِ واقعی.
              </p>
              <div className="about-cta__actions">
                <ButtonLink href="/products" size="lg">
                  <i className="fa-solid fa-store" aria-hidden /> دیدنِ محصولاتِ دشت‌زاد
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost" className="about-cta__ghost">
                  <i className="fa-solid fa-headset" aria-hidden /> تماس با ما
                </ButtonLink>
              </div>
              <div className="about-cta__sign">
                <i className="fa-solid fa-seedling" aria-hidden /> دشت‌زاد؛ روایتِ یک نسل از ۱۳۰۵.
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
