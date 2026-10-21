"use client";

import Image from "next/image";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
import { images } from "@/lib/images";
import { useI18n } from "@/lib/language";

export function FactoryPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t.factoryPage.heroKicker}
        title={t.factoryPage.heroTitle}
        lead={t.factoryPage.heroLead}
        image={images.filmLine}
      />
      <section className="mx-auto max-w-[1440px] px-6 py-20">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl text-cream">{t.factoryPage.tourTitle}</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {t.factoryPage.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06} className="rounded-3xl border border-white/8 bg-ink-2 p-8">
              <p className="font-display text-3xl text-gold">{step.n}</p>
              <h3 className="mt-4 text-2xl text-cream">{step.title}</h3>
              <p className="mt-3 leading-8 text-sand/80">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image src={images.precision} alt="" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="flex items-center bg-ink-2 px-8 py-16 sm:px-16">
          <Reveal>
            <h2 className="font-display text-3xl text-cream sm:text-4xl">{t.factoryPage.noteTitle}</h2>
            <p className="mt-6 text-lg leading-9 text-sand/85">{t.factoryPage.noteBody}</p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-4 px-6 py-20 md:grid-cols-4">
        {t.lines.items.map((item) => (
          <Reveal key={item.title} className="glass rounded-3xl p-6">
            <h3 className="text-xl text-cream">{item.title}</h3>
            <p className="mt-3 text-sand/80">{item.text}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}
