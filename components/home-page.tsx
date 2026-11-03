"use client";

import Image from "next/image";
import Link from "next/link";
import { Certifications } from "./certifications";
import { Reveal } from "./reveal";
import { images } from "@/lib/images";
import { useI18n } from "@/lib/language";

export function HomePage() {
  const { t } = useI18n();
  const featured = t.products.items.slice(0, 4);

  return (
    <>
      <section className="relative isolate min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover kenburns"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,6,0.38)_0%,rgba(7,7,6,0.55)_42%,rgba(7,7,6,0.94)_100%)]" />
          <div className="absolute inset-0 pattern-mask" />
        </div>
        <div className="absolute start-0 top-1/4 hidden h-1/2 w-px gold-line opacity-70 lg:block" />

        <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col justify-end px-6 pb-16 pt-36">
          <p className="rise mb-5 text-xs uppercase tracking-[0.32em] text-gold">
            {t.hero.eyebrow}
          </p>
          <h1 className="hero-title font-display rise max-w-5xl text-3xl leading-snug break-words text-on-photo [text-shadow:0_12px_40px_rgba(0,0,0,0.7)] sm:text-6xl sm:leading-[1.15] lg:text-[6.2rem] lg:leading-[1.12]">
            {t.hero.title}
          </h1>
          <p
            className="rise mt-7 max-w-2xl text-lg leading-9 text-on-photo/80"
            style={{ animationDelay: "120ms" }}
          >
            {t.hero.lead}
          </p>
          <div
            className="rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/products"
              className="rounded-full bg-gold px-6 py-3 font-medium text-on-gold transition hover:bg-gold-deep"
            >
              {t.hero.primary}
            </Link>
            <Link
              href="/factory"
              className="rounded-full border border-white/15 px-6 py-3 text-on-photo transition hover:border-gold/50 hover:text-gold"
            >
              {t.hero.secondary}
            </Link>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-3">
            {[t.hero.glassA, t.hero.glassB, t.hero.glassC].map((label) => (
              <div key={label} className="glass flex items-center gap-3 rounded-2xl px-5 py-4 text-sm text-cream">
                <span className="size-1.5 shrink-0 rounded-full bg-gold" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-sand/70">
            <span className="scroll-pulse h-10 w-px bg-gold" />
            {t.hero.scroll}
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/8 bg-ink-2 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.28em] text-gold/80">
          {[...t.marquee, ...t.marquee].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              {item}
              <span className="size-1.5 rounded-full bg-gold/70" />
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">{t.heritage.kicker}</p>
          <h2 className="font-display mt-4 text-4xl leading-tight text-cream sm:text-5xl">
            {t.heritage.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-9 text-sand/85">{t.heritage.body}</p>
        </Reveal>
        <Reveal className="grid gap-4 sm:grid-cols-3 lg:col-span-6" delay={0.1}>
          {[
            [t.heritage.year, t.heritage.yearLabel],
            [t.heritage.group, t.heritage.groupLabel],
            [t.heritage.place, t.heritage.placeLabel],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-3xl p-6">
              <p className="font-display text-4xl text-gold">{value}</p>
              <p className="mt-3 text-sm text-sand/80">{label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-y border-white/8 bg-ink-2">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <p className="font-display text-5xl text-cream">{stat.value}</p>
              <p className="mt-3 text-sand/75">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">
              {t.productsPreview.kicker}
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl text-cream sm:text-5xl">
              {t.productsPreview.title}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sand/80">{t.productsPreview.body}</p>
            <Link href="/products" className="mt-4 inline-block text-gold hover:underline">
              {t.productsPreview.more}
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05} className="product-card group">
              <Link
                href="/products"
                className="relative block overflow-hidden rounded-[28px] border border-white/8"
              >
                <div className="relative h-80">
                  <Image
                    src={[images.bottles, images.foodPack, images.industrial][i]}
                    alt=""
                    fill
                    className="product-media object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-photo via-photo/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs text-gold">0{i + 1}</p>
                  <h3 className="font-display mt-2 text-2xl text-on-photo">{product.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-7 text-on-photo/80">{product.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={images.filmLine} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-photo/80" />
        </div>
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">{t.lines.kicker}</p>
            <h2 className="font-display mt-4 text-4xl text-on-photo sm:text-5xl">{t.lines.title}</h2>
            <p className="mt-6 text-lg leading-9 text-on-photo/80">{t.lines.body}</p>
            <Link
              href="/factory"
              className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 font-medium text-on-gold"
            >
              {t.lines.cta}
            </Link>
          </Reveal>
          <div className="grid gap-4 lg:col-span-7">
            {t.lines.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07} className="glass rounded-2xl p-6">
                <p className="text-xs text-gold">0{i + 1}</p>
                <h3 className="mt-2 text-xl text-cream">{item.title}</h3>
                <p className="mt-2 text-sand/80">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">{t.quality.kicker}</p>
          <h2 className="font-display mt-4 max-w-3xl text-4xl text-cream sm:text-5xl">
            {t.quality.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-sand/85">{t.quality.body}</p>
        </Reveal>
        <Reveal className="mt-10">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">{t.certs.kicker}</p>
        </Reveal>
        <Certifications className="mt-6" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.quality.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.06} className="rounded-3xl border border-white/8 bg-ink-2 p-6">
              <h3 className="text-xl text-cream">{pillar.title}</h3>
              <p className="mt-3 leading-7 text-sand/80">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[32px]">
          <Image src={images.warehouse} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-l from-photo/90 via-photo/70 to-photo/40" />
          <div className="relative px-8 py-20 sm:px-16">
            <Reveal>
              <h2 className="font-display max-w-2xl text-4xl text-on-photo sm:text-5xl">{t.cta.title}</h2>
              <p className="mt-5 max-w-xl text-lg text-on-photo/80">{t.cta.body}</p>
              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 font-medium text-on-gold"
              >
                {t.cta.button}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
