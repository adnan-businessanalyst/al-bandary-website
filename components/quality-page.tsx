"use client";

import { Certifications } from "./certifications";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
import { images } from "@/lib/images";
import { useI18n } from "@/lib/language";

export function QualityPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t.quality.pageKicker}
        title={t.quality.pageTitle}
        lead={t.quality.pageLead}
        image={images.team}
      />
      <section className="mx-auto max-w-[1440px] px-6 py-20">
        <Reveal className="mb-10">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">{t.certs.kicker}</p>
          <h2 className="font-display mt-3 text-3xl text-cream sm:text-4xl">{t.certs.title}</h2>
        </Reveal>
        <Certifications className="mb-16" />
        <div className="grid gap-6 md:grid-cols-2">
          {t.quality.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.06} className="glass min-h-[240px] rounded-[28px] p-8">
              <p className="text-gold">0{i + 1}</p>
              <h2 className="font-display mt-4 text-3xl text-cream">{pillar.title}</h2>
              <p className="mt-4 text-lg leading-8 text-sand/85">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
