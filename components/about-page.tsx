"use client";

import Image from "next/image";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
import { images } from "@/lib/images";
import { useI18n } from "@/lib/language";
import { useTheme } from "@/lib/theme";

export function AboutPage() {
  const { t } = useI18n();
  const { theme } = useTheme();

  return (
    <>
      <PageHero
        kicker={t.aboutPage.heroKicker}
        title={t.aboutPage.heroTitle}
        lead={t.aboutPage.heroLead}
        image={images.assembly}
      />
      <section className="mx-auto grid max-w-[1100px] gap-12 px-6 py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="mb-8">
            <Image
              src={theme === "light" ? "/logo-on-light.png" : "/logo-on-dark.png"}
              alt={t.brand.legal}
              width={420}
              height={148}
              className="h-auto w-full"
            />
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">{t.aboutPage.storyTitle}</p>
        </Reveal>
        <div className="grid gap-8 lg:col-span-8">
          {t.aboutPage.story.map((para) => (
            <Reveal key={para}>
              <p className="text-lg leading-9 text-sand/90">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="relative min-h-[420px] overflow-hidden">
        <Image src={images.industrial} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-photo/55" />
      </section>
      <section className="mx-auto max-w-[1440px] px-6 py-20">
        <Reveal>
          <h2 className="font-display text-4xl text-cream">{t.aboutPage.valuesTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.aboutPage.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08} className="glass rounded-3xl p-8">
              <p className="text-gold">0{i + 1}</p>
              <h3 className="mt-3 text-2xl text-cream">{value.title}</h3>
              <p className="mt-3 leading-8 text-sand/80">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
