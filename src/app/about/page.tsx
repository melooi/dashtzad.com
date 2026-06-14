import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/lib/utils";
import "./about.css";

// Icons use Font Awesome via CDN (same icon set as the design handoff) — no npm dependency.
const FA_CDN = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";

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

/** Branded photo placeholder shown until real images are uploaded. */
function Ph({ icon, caption }: { icon: string; caption: string }) {
  return (
    <div className="ph">
      <span className="ph__ic">
        <i className={`fa-solid ${icon}`} aria-hidden />
      </span>
      <span className="ph__cap">{caption}</span>
    </div>
  );
}

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
    <>
      <link rel="stylesheet" href={FA_CDN} />

      <div className="about-page">
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
        <section className="about-hero">
          <div className="about-hero__media" aria-hidden />
          <div className="about-hero__scrim" aria-hidden />
          <div className="wrap about-hero__inner">
            <span className="about-hero__eyebrow">درباره دشت‌زاد</span>
            <h1 className="about-hero__title">
              روایتِ یک نسل،
              <br />
              <span className="soft">از ۱۳۰۵.</span>
            </h1>
            <p className="about-hero__lead">
              دشت‌زاد فقط یک فروشگاه آنلاین مواد غذایی نیست؛ روایتی از زمین، رنج، صبر و سفره ایرانی است
              — جایی که هر دانه را به امانت می‌کارند و قدرش را می‌دانند.
            </p>
            <div className="about-hero__stats">
              <span className="ab-stat">
                <i className="fa-solid fa-seedling" aria-hidden /> ریشه از <b>۱۳۰۵</b>
              </span>
              <span className="ab-stat">
                <i className="fa-solid fa-handshake-angle" aria-hidden /> بدون واسطه
              </span>
              <span className="ab-stat">
                <i className="fa-solid fa-mountain-sun" aria-hidden /> مستقیم از باغ‌های دماوند
              </span>
            </div>
          </div>
        </section>

        {/* ============================= STORY ============================= */}
        <section className="sec">
          <div className="wrap">
            <div className="about-story">
              <div className="about-story__body">
                <div className="ab-intro">
                  <span className="ab-intro__kicker">داستانِ دشت‌زاد</span>
                  <h2 className="ab-intro__title">
                    از دلِ یک <span className="accent">داستان خانوادگی</span>
                  </h2>
                </div>
                <p>
                  نامِ دشت‌زاد از یاد مردی آمده که ریشه‌اش در خاک بود و زندگی‌اش با کار، قناعت و تلاش
                  معنا پیدا می‌کرد. <strong>علی‌اکبر جلوداری، زادهٔ سال ۱۳۰۵</strong>، از نسلی بود که
                  زمین را می‌شناخت، قدرِ دانه را می‌دانست و می‌فهمید پشتِ هر محصول، زحمتِ یک خانواده و
                  امیدِ یک فصل نشسته است.
                </p>
                <p>
                  دشت‌زاد ادامهٔ همان نگاه است؛ نگاهی که به محصول فقط به چشمِ کالا نگاه نمی‌کند، بلکه
                  آن را بخشی از زندگی مردم، سفرهٔ خانه‌ها و خاطرهٔ خانواده‌ها می‌داند.
                </p>
                <blockquote className="pullquote">
                  <p>
                    «دشت‌زاد یعنی زادهٔ دشت؛ محصولی که ریشه در خاک دارد، و احترامی دوباره به کشاورز و
                    سفرهٔ ایرانی.»
                  </p>
                  <cite>روایتِ یک نسل — از ۱۳۰۵</cite>
                </blockquote>
              </div>

              <div className="about-story__media">
                <div className="about-story__frame">
                  <Ph icon="fa-image" caption="عکس قدیمیِ خانوادگی — علی‌اکبر جلوداری / باغ خانوادگی" />
                </div>
                <div className="about-story__seal">
                  <b>۱۳۰۵</b>
                  <span>سالِ ریشه</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================= MEANING ============================= */}
        <section className="meaning">
          <div className="wrap">
            <div className="meaning__head">
              <span className="meaning__kicker">
                <i className="fa-solid fa-quote-right" aria-hidden /> دشت‌زاد یعنی چه؟
              </span>
              <h2 className="meaning__title">
                یعنی <span className="honey">زادهٔ دشت</span> — هر دانه، بخشی از یک زندگی‌ست
              </h2>
              <p className="meaning__sub">
                ما باور داریم هر مشت حبوبات، هر دانه برنج و هر بسته خشکبار که به خانهٔ شما می‌رسد، فقط
                یک خرید ساده نیست؛ بخشی از آشپزی روزانه، مهمانی‌ها، دورهمی‌ها و خاطره‌های خانوادگی‌ست.
              </p>
            </div>

            <div className="meaning__grid">
              <article className="mcard">
                <span className="mcard__ic">
                  <i className="fa-solid fa-seedling" aria-hidden />
                </span>
                <h3 className="mcard__t">زاده دشت</h3>
                <p className="mcard__d">
                  محصولی که ریشه در خاک دارد؛ نه نامی روی بسته‌بندی، بلکه ثمرِ یک فصل صبر و کارِ زمین.
                </p>
              </article>
              <article className="mcard">
                <span className="mcard__ic">
                  <i className="fa-solid fa-hand-holding-heart" aria-hidden />
                </span>
                <h3 className="mcard__t">احترام دوباره</h3>
                <p className="mcard__d">
                  به کشاورز، به تولیدکننده، به خانواده و به سفرهٔ ایرانی — به همان زنجیره‌ای که پشتِ هر
                  محصول ایستاده است.
                </p>
              </article>
              <article className="mcard">
                <span className="mcard__ic">
                  <i className="fa-solid fa-utensils" aria-hidden />
                </span>
                <h3 className="mcard__t">شایستهٔ سفره</h3>
                <p className="mcard__d">
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
            <div className="ab-intro">
              <span className="ab-intro__kicker">از خاک تا سفره</span>
              <h2 className="ab-intro__title">سه چیز که هیچ‌وقت فراموش نمی‌کنیم</h2>
              <p className="ab-intro__lead">
                دشت، دستِ کشاورز و محصولِ سالم — این سه، سرچشمهٔ هر چیزی‌ست که در دشت‌زاد عرضه می‌شود.
              </p>
            </div>

            <div className="gallery-grid">
              <article className="gcard gcard--dasht">
                <div className="gcard__media" aria-hidden />
                <div className="gcard__scrim" aria-hidden />
                <div className="gcard__body">
                  <span className="gcard__ic">
                    <i className="fa-solid fa-mountain-sun" aria-hidden />
                  </span>
                  <h3 className="gcard__t">دشت</h3>
                  <p className="gcard__d">
                    جایی که خاک هنوز حرمت دارد؛ سرزمینی که صبر را شرطِ برکت می‌داند.
                  </p>
                </div>
              </article>

              <article className="gcard gcard--farmer">
                <div className="gcard__media" aria-hidden />
                <div className="gcard__scrim" aria-hidden />
                <div className="gcard__body">
                  <span className="gcard__ic">
                    <i className="fa-solid fa-wheat-awn" aria-hidden />
                  </span>
                  <h3 className="gcard__t">کشاورز</h3>
                  <p className="gcard__d">
                    پشتِ هر محصول، تلاشِ کشاورز و امیدِ یک فصل نشسته است — ما این زنجیره را ارزشمند
                    می‌دانیم.
                  </p>
                </div>
              </article>

              <article className="gcard gcard--product">
                <div className="gcard__media" aria-hidden />
                <div className="gcard__scrim" aria-hidden />
                <div className="gcard__body">
                  <span className="gcard__ic">
                    <i className="fa-solid fa-bowl-rice" aria-hidden />
                  </span>
                  <h3 className="gcard__t">محصولِ سالم</h3>
                  <p className="gcard__d">
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
            <div className="ab-intro">
              <span className="ab-intro__kicker">چرا دشت‌زاد؟</span>
              <h2 className="ab-intro__title">
                ما با یک فروشگاهِ <span className="accent">خشک و بی‌روح</span> فرق داریم
              </h2>
              <p className="ab-intro__lead">
                دشت‌زاد از یک پرسشِ ساده شروع شد: چرا خریدِ محصولاتی مثل برنج، حبوبات و خشکبار باید سخت،
                مبهم و بی‌اعتماد باشد؟ ما تصمیم گرفتیم مسیرِ متفاوتی بسازیم.
              </p>
            </div>

            <div className="contrast-grid">
              <div className="cpanel cpanel--dull">
                <div className="cpanel__head">
                  <span className="cpanel__badge">
                    <i className="fa-solid fa-box" aria-hidden />
                  </span>
                  <div>
                    <h3 className="cpanel__t">فروشگاهِ بی‌روح</h3>
                    <p className="cpanel__n">فقط یک قفسه و یک قیمت</p>
                  </div>
                </div>
                <div className="clist">
                  <div className="cli">
                    <i className="fa-solid fa-xmark" aria-hidden /> نمی‌دانی محصول از کجا آمده و چطور
                    نگهداری شده.
                  </div>
                  <div className="cli">
                    <i className="fa-solid fa-xmark" aria-hidden /> اطلاعاتِ مبهم؛ معلوم نیست همان چیزی
                    را می‌گیری که سفارش دادی.
                  </div>
                  <div className="cli">
                    <i className="fa-solid fa-xmark" aria-hidden /> بین ده‌ها محصولِ شبیه به هم، گیج
                    می‌شوی.
                  </div>
                  <div className="cli">
                    <i className="fa-solid fa-xmark" aria-hidden /> بعد از فروش، دیگر کسی پاسخ‌گو نیست.
                  </div>
                </div>
              </div>

              <div className="cpanel cpanel--us">
                <div className="cpanel__head">
                  <span className="cpanel__badge">
                    <i className="fa-solid fa-leaf" aria-hidden />
                  </span>
                  <div>
                    <h3 className="cpanel__t">روشِ دشت‌زاد</h3>
                    <p className="cpanel__n">ساده‌تر، شفاف‌تر، مطمئن‌تر</p>
                  </div>
                </div>
                <div className="clist">
                  <div className="cli">
                    <i className="fa-solid fa-check" aria-hidden /> ریشه و داستانِ محصول روشن است —
                    مستقیم از باغ، بدون واسطه.
                  </div>
                  <div className="cli">
                    <i className="fa-solid fa-check" aria-hidden /> اطلاعاتِ شفاف برای انتخابِ بهتر،
                    پیش از خرید.
                  </div>
                  <div className="cli">
                    <i className="fa-solid fa-check" aria-hidden /> انتخابِ دقیق و بسته‌بندیِ تمیز و
                    قابل اعتماد.
                  </div>
                  <div className="cli">
                    <i className="fa-solid fa-check" aria-hidden /> پیگیریِ سفارش و پاسخ‌گوییِ واقعی،
                    بعد از خرید.
                  </div>
                </div>
              </div>
            </div>

            <div className="ab-intro" style={{ marginTop: "clamp(4rem,6vw,6.4rem)" }}>
              <span className="ab-intro__kicker">ارزش‌های ما</span>
              <h2 className="ab-intro__title">پنج چیزی که سرِ آن کوتاه نمی‌آییم</h2>
            </div>
            <div className="values-grid">
              <article className="value">
                <span className="value__ic">
                  <i className="fa-solid fa-seedling" aria-hidden />
                </span>
                <h3 className="value__t">اصالت</h3>
                <p className="value__d">
                  به ریشهٔ محصول، داستانِ تولید و جایگاهِ غذا در فرهنگ ایرانی اهمیت می‌دهیم.
                </p>
              </article>
              <article className="value">
                <span className="value__ic">
                  <i className="fa-solid fa-eye" aria-hidden />
                </span>
                <h3 className="value__t">شفافیت</h3>
                <p className="value__d">
                  مشتری باید بداند چه می‌خرد، چه ویژگی‌هایی دارد و چطور به دستش می‌رسد.
                </p>
              </article>
              <article className="value">
                <span className="value__ic">
                  <i className="fa-solid fa-headset" aria-hidden />
                </span>
                <h3 className="value__t">احترام به مشتری</h3>
                <p className="value__d">
                  پاسخ‌گویی، پیگیری و صداقت در ارتباط با مشتری برای ما اصل است.
                </p>
              </article>
              <article className="value">
                <span className="value__ic">
                  <i className="fa-solid fa-people-carry-box" aria-hidden />
                </span>
                <h3 className="value__t">احترام به تولیدکننده</h3>
                <p className="value__d">
                  پشتِ هر محصول، زنجیره‌ای از کشاورز تا بسته‌بند است؛ این زنجیره را ارزشمند می‌دانیم.
                </p>
              </article>
              <article className="value">
                <span className="value__ic">
                  <i className="fa-solid fa-cart-shopping" aria-hidden />
                </span>
                <h3 className="value__t">تجربهٔ خرید بهتر</h3>
                <p className="value__d">
                  خریدِ آنلاینِ مواد غذایی باید ساده، قابل فهم و بی‌دردسر باشد.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ============================= PROMISE ============================= */}
        <section className="sec">
          <div className="wrap">
            <div className="promise">
              <div>
                <div className="ab-intro">
                  <span className="ab-intro__kicker">تعهدِ ما</span>
                  <h2 className="ab-intro__title">
                    قولِ دشت‌زاد <span className="accent">به شما</span>
                  </h2>
                  <p className="ab-intro__lead">
                    در دشت‌زاد، فروش پایانِ ارتباطِ ما با مشتری نیست؛ آغازِ مسئولیتِ ماست. از لحظه‌ای که
                    وارد سایت می‌شوید تا زمانی که سفارش به دستتان می‌رسد، تلاش می‌کنیم مسیر روشن، ساده و
                    قابل پیگیری باشد.
                  </p>
                </div>
                <div className="promise__list">
                  <div className="pli">
                    <span className="pli__ic">
                      <i className="fa-solid fa-check" aria-hidden />
                    </span>
                    <span className="pli__t">
                      <b>اطلاعاتِ درست</b> و کاربردی دربارهٔ محصولات
                    </span>
                  </div>
                  <div className="pli">
                    <span className="pli__ic">
                      <i className="fa-solid fa-check" aria-hidden />
                    </span>
                    <span className="pli__t">
                      <b>پاسخ‌گویی</b> به پرسش‌های پیش از خرید
                    </span>
                  </div>
                  <div className="pli">
                    <span className="pli__ic">
                      <i className="fa-solid fa-check" aria-hidden />
                    </span>
                    <span className="pli__t">
                      <b>پیگیریِ سفارش‌ها</b> تا رسیدن به دستِ شما
                    </span>
                  </div>
                  <div className="pli">
                    <span className="pli__ic">
                      <i className="fa-solid fa-check" aria-hidden />
                    </span>
                    <span className="pli__t">
                      بررسیِ <b>مشکلاتِ پرداخت و ارسال</b>
                    </span>
                  </div>
                  <div className="pli">
                    <span className="pli__ic">
                      <i className="fa-solid fa-check" aria-hidden />
                    </span>
                    <span className="pli__t">
                      توجه به <b>نظرها و انتقادهای</b> مشتریان
                    </span>
                  </div>
                  <div className="pli">
                    <span className="pli__ic">
                      <i className="fa-solid fa-check" aria-hidden />
                    </span>
                    <span className="pli__t">
                      <b>بهبودِ مداومِ</b> کیفیتِ خدمات و محصولات
                    </span>
                  </div>
                </div>
              </div>

              <aside className="promise__card">
                <span className="promise__seal">د</span>
                <p className="promise__msg">
                  از <span className="green">دشت</span>، تا سفرهٔ شما — با محصولاتی که با دقت انتخاب
                  می‌شوند.
                </p>
                <p className="promise__sub">
                  ما آمده‌ایم تا خریدِ موادِ غذاییِ اصیل را ساده‌تر، شفاف‌تر و مطمئن‌تر کنیم؛ با
                  بسته‌بندیِ قابل اعتماد و پشتیبانیِ واقعی.
                </p>
                <div className="promise__cta">
                  <Link className="btn btn--primary btn--lg" href="/products">
                    <i className="fa-solid fa-store" aria-hidden /> دیدنِ محصولاتِ دشت‌زاد
                  </Link>
                  <Link
                    className="btn btn--ghost"
                    href="/contact"
                    style={{ background: "transparent", color: "#fff", borderColor: "oklch(1 0 0 / .3)" }}
                  >
                    <i className="fa-solid fa-headset" aria-hidden /> تماس با ما
                  </Link>
                </div>
                <div className="promise__sign">
                  <i className="fa-solid fa-seedling" aria-hidden /> دشت‌زاد؛ روایتِ یک نسل از ۱۳۰۵.
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
