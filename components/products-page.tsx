"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
import { images } from "@/lib/images";
import { useI18n } from "@/lib/language";

const productImages = [
  images.bottles,
  images.foodPack,
  images.industrial,
];

export function ProductsPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t.products.heroKicker}
        title={t.products.heroTitle}
        lead={t.products.heroLead}
        image={images.coils}
      />
      <section className="mx-auto max-w-[1440px] px-6 py-20">
        <div className="grid gap-8">
          {t.products.items.map((item, i) => (
            <Reveal key={item.id}>
              <article className="grid overflow-hidden rounded-[28px] border border-white/8 bg-ink-2 lg:grid-cols-2">
                <div className={`relative min-h-[320px] ${i % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    src={productImages[i]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-xs text-gold">0{i + 1}</p>
                  <h2 className="font-display mt-3 text-3xl text-cream sm:text-4xl">{item.name}</h2>
                  <p className="mt-4 text-lg text-sand/90">{item.summary}</p>
                  <p className="mt-4 leading-8 text-sand/75">{item.details}</p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex w-fit rounded-full bg-gold px-5 py-2.5 font-medium text-on-gold"
                  >
                    {t.products.cta}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
