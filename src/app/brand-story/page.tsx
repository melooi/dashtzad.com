import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { StoryScene } from "./StoryScene";
import "./brand-story.css";

export const metadata: Metadata = {
  title: "داستان برند — روایتِ درخت",
  description:
    "روایتِ دشت‌زاد؛ قصه یک ریشه که از شب تا طلوع، ایستاده می‌ماند. از باغ‌های دماوند، از سالِ ۱۳۰۵ — بدون واسطه، مستقیم از خاک تا سفره شما.",
  alternates: { canonical: "/brand-story" },
};

export default function BrandStoryPage() {
  return (
    <div className="brand-story-page dz">
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", path: "/" },
          { name: "داستان برند", path: "/brand-story" },
        ])}
      />

      <StoryScene>
        {/* scroll progress */}
        <div className="sprog" aria-hidden>
          <div className="sprog__fill" />
        </div>

        {/* FIXED SKY — the single tree, time changes on scroll.
            Image layers are .ph placeholders that crossfade. */}
        <div className="skybg" aria-hidden>
          <div className="skybg__img" data-stop="0">
            <div className="ph">
              <span className="ph__label">تصویر درخت در شب — تاریکی پیش از طلوع</span>
            </div>
          </div>
          <div className="skybg__img" data-stop="0.30">
            <div className="ph">
              <span className="ph__label">تصویر درخت در گرگ‌ومیش</span>
            </div>
          </div>
          <div className="skybg__img" data-stop="0.52">
            <div className="ph">
              <span className="ph__label">تصویر درخت هنگام غروب</span>
            </div>
          </div>
          <div className="skybg__img" data-stop="0.74">
            <div className="ph">
              <span className="ph__label">تصویر درخت در سپیده‌دم</span>
            </div>
          </div>
          <div className="skybg__img" data-stop="0.94">
            <div className="ph">
              <span className="ph__label">تصویر درخت در صبحِ روشن</span>
            </div>
          </div>
          <div className="skybg__scrim" />
          <div className="skybg__vignette" />
        </div>

        {/* minimal header */}
        <header className="shdr">
          <Link className="shdr__brand" href="/">
            <span className="shdr__seal">د</span>
            <span>
              <span className="shdr__name">دشت‌زاد</span>
              <span className="shdr__tag">روایتِ درخت — از ۱۳۰۵</span>
            </span>
          </Link>
          <Link className="shdr__shop" href="/products">
            <i className="fa-solid fa-store" aria-hidden /> فروشگاه دشت‌زاد
          </Link>
        </header>

        <main className="story-flow">
          {/* 0 · HERO — night */}
          <section className="beat">
            <div className="scene-content">
              <div className="hero-mark">
                <span className="hero-eyebrow" data-reveal>
                  روایتِ دشت‌زاد
                </span>
                <h1 className="scene-title" data-reveal data-delay="1">
                  در دلِ دشت،
                  <br />
                  <span className="soft">یک درخت</span> ایستاده است
                </h1>
                <p className="scene-lead" data-reveal data-delay="2">
                  نه محصولی، نه قیمتی، نه فروشی — فقط یک ریشه که از شب تا طلوع، نمی‌شکند. از سالِ ۱۳۰۵.
                </p>
              </div>
            </div>
            <div className="scroll-cue" aria-hidden>
              <span>قصه با تماشا آغاز می‌شود</span>
              <span className="scroll-cue__dot" />
            </div>
          </section>

          {/* 1 · ریشه — deep night */}
          <section className="beat">
            <div className="scene-content">
              <span className="chapter-no" data-reveal>
                فصلِ اول · ریشه
              </span>
              <h2 className="scene-title" data-reveal data-delay="1">
                ریشه،
                <br />
                <span className="honey">پیش از</span> میوه
              </h2>
              <p className="scene-lead" data-reveal data-delay="2">
                دشت‌زاد از جایی آغاز شد که خاک هنوز حرمت داشت؛ جایی که هر دانه را به امانت می‌کاشتند و
                صبر را شرطِ برکت می‌دانستند.
              </p>
            </div>
          </section>

          {/* 2 · زخم — twilight */}
          <section className="beat">
            <div className="scene-content">
              <span className="chapter-no" data-reveal>
                فصلِ دوم · زخم
              </span>
              <p className="verse" data-reveal data-delay="1">
                رو تنش زخمه، ولی زخمِ تبر
                <span className="verse__src">از ترانه‌ای کهن</span>
              </p>
              <p className="scene-lead" data-reveal data-delay="2">
                زمان زخم زد، بازار زخم زد، فراموشی زخم زد. اما آن‌که ریشه دارد، با زخم بزرگ می‌شود — نه
                با آن می‌شکند.
              </p>
            </div>
          </section>

          {/* 3 · تبر — dramatic dusk */}
          <section className="beat">
            <div className="scene-content">
              <span className="chapter-no" data-reveal>
                فصلِ سوم · تبر
              </span>
              <h2 className="scene-title" data-reveal data-delay="1">
                تبر، نامِ تازه
                <br />
                <span className="soft">فراموشی‌ست</span>
              </h2>
              <p className="scene-lead" data-reveal data-delay="2">
                مصرفِ بی‌ریشه، بازارِ بی‌انصاف، طعمی که اصلش گم شده. تبرها می‌آیند و می‌روند — درخت اما،
                به تبر خو نمی‌کند.
              </p>
            </div>
          </section>

          {/* 4 · پناه — first light */}
          <section className="beat">
            <div className="scene-content">
              <span className="chapter-no" data-reveal>
                فصلِ چهارم · پناه
              </span>
              <h2 className="scene-title" data-reveal data-delay="1">
                سایه‌ای برای
                <br />
                هر رهگذر
              </h2>
              <p className="scene-lead" data-reveal data-delay="2">
                دشت‌زاد فقط محصول نمی‌فروشد؛ پناه می‌سازد، خاطره می‌سازد، سفره می‌سازد. هر شاخه، جایی‌ست
                برای آسودنِ یک مسافر.
              </p>
              <p className="verse verse--soft" data-reveal data-delay="3">
                شاخه‌هاش پر از پرِ پرنده‌هاست
              </p>
            </div>
          </section>

          {/* 5 · دانه — full dawn */}
          <section className="beat">
            <div className="scene-content">
              <span className="chapter-no" data-reveal>
                فصلِ پنجم · دانه
              </span>
              <h2 className="scene-title" data-reveal data-delay="1">
                ما برای بریدن نیامده‌ایم؛
                <br />
                برای زنده‌نگه‌داشتنِ <span className="honey">ریشه</span> آمده‌ایم
              </h2>
              <p className="scene-lead" data-reveal data-delay="2">
                از هر آن‌چه افتاد، دانه‌ای ماند. و از هر دانه، دشتی دیگر آغاز می‌شود — هر صبح، از نو.
              </p>
            </div>
          </section>
        </main>

        {/* FINALE — products return, warm daylight */}
        <section className="finale">
          <div className="finale__halo" aria-hidden />
          <div className="finale__inner">
            <div className="finale__head">
              <span className="finale__seal">د</span>
              <h2 className="finale__msg">
                از <span className="green">دشت</span>، تا سفره شما.
              </h2>
              <p className="finale__sub">
                همان ریشه، همان خاک، همان پیمان — حالا در قالبِ آن‌چه هر روز می‌چشید.
              </p>
            </div>

            <div className="finale__grid">
              <article className="fprod">
                <div className="fprod__media">
                  <div className="ph">
                    <span className="ph__label">عکس برنجِ ایرانی</span>
                  </div>
                  <span className="fprod__ic">
                    <i className="fa-solid fa-bowl-rice" aria-hidden />
                  </span>
                </div>
                <span className="fprod__t">برنج</span>
                <span className="fprod__n">هاشمی، طارم، دمسیاه</span>
              </article>
              <article className="fprod">
                <div className="fprod__media">
                  <div className="ph">
                    <span className="ph__label">عکس حبوبات</span>
                  </div>
                  <span className="fprod__ic">
                    <i className="fa-solid fa-seedling" aria-hidden />
                  </span>
                </div>
                <span className="fprod__t">حبوبات</span>
                <span className="fprod__n">لوبیا، عدس، نخود</span>
              </article>
              <article className="fprod">
                <div className="fprod__media">
                  <div className="ph">
                    <span className="ph__label">عکس خشکبار و آجیل</span>
                  </div>
                  <span className="fprod__ic">
                    <i className="fa-solid fa-bowl-food" aria-hidden />
                  </span>
                </div>
                <span className="fprod__t">خشکبار</span>
                <span className="fprod__n">آجیل، میوه خشک</span>
              </article>
              <article className="fprod">
                <div className="fprod__media">
                  <div className="ph">
                    <span className="ph__label">عکس چای و دمنوش</span>
                  </div>
                  <span className="fprod__ic">
                    <i className="fa-solid fa-mug-hot" aria-hidden />
                  </span>
                </div>
                <span className="fprod__t">چای</span>
                <span className="fprod__n">چای و دمنوشِ گیاهی</span>
              </article>
            </div>

            <div className="finale__cta">
              <Link className="btn btn--primary btn--lg" href="/products">
                <i className="fa-solid fa-store" aria-hidden /> دیدنِ محصولاتِ دشت‌زاد
              </Link>
              <p className="finale__note">
                <i className="fa-solid fa-seedling" aria-hidden /> بدون واسطه · مستقیم از باغ‌های
                دماوند · از ۱۳۰۵
              </p>
            </div>
          </div>

          <footer className="story-ftr">
            <div className="story-ftr__inner">
              <span className="story-ftr__brand">
                <span className="shdr__seal">د</span> دشت‌زاد
              </span>
              <nav className="story-ftr__links">
                <Link href="/">خانه</Link>
                <Link href="/products">فروشگاه</Link>
                <Link href="/contact">تماس با ما</Link>
              </nav>
              <span className="story-ftr__copy">© ۱۴۰۵ دشت‌زاد تجارت ایرانیان</span>
            </div>
          </footer>
        </section>
      </StoryScene>
    </div>
  );
}
