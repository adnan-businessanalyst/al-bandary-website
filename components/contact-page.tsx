"use client";

import { ContactForm } from "./contact-form";
import { Ltr } from "./ltr";
import { PageHero } from "./page-hero";
import { Reveal } from "./reveal";
import { images } from "@/lib/images";
import { trackClickEmail, trackClickPhone } from "@/lib/analytics";
import { useI18n } from "@/lib/language";

export function ContactPage() {
  const { locale, t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t.contact.heroKicker}
        title={t.contact.heroTitle}
        lead={t.contact.heroLead}
        image={images.warehouse}
      />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 py-20 lg:grid-cols-12">
        <Reveal className="grid gap-5 lg:col-span-5">
          <div className="rounded-3xl border border-white/8 bg-ink-2 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">{t.contact.addressLabel}</p>
            <p className="mt-3 text-lg text-cream">{t.contact.address}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-ink-2 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">{t.contact.phoneLabel}</p>
            <a
              href={`tel:${t.contact.phoneHref}`}
              className="mt-3 block text-lg text-cream hover:text-gold"
              onClick={() => trackClickPhone(locale)}
            >
              <Ltr>{t.contact.phone}</Ltr>
            </a>
          </div>
          <div className="rounded-3xl border border-white/8 bg-ink-2 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">{t.contact.emailLabel}</p>
            <a
              href={`mailto:${t.contact.email}`}
              className="mt-3 block text-lg text-cream hover:text-gold"
              onClick={() => trackClickEmail(locale)}
            >
              <Ltr>{t.contact.email}</Ltr>
            </a>
          </div>
          <div className="rounded-3xl border border-white/8 bg-ink-2 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">{t.contact.webLabel}</p>
            <a href={t.contact.webHref} target="_blank" rel="noreferrer" className="mt-3 block text-lg text-cream hover:text-gold">
              <Ltr>{t.contact.web}</Ltr>
            </a>
          </div>
          <div className="rounded-3xl border border-white/8 bg-ink-2 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">{t.contact.hoursLabel}</p>
            <p className="mt-3 text-lg text-cream">{t.contact.hours}</p>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          <ContactForm />
        </Reveal>
      </section>
      <section className="px-6 pb-16">
        <Reveal className="mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-white/8">
          <p className="bg-ink-2 px-6 py-4 text-sm text-sand/80">{t.contact.mapTitle}</p>
          <iframe
            title={t.contact.mapTitle}
            src="https://maps.google.com/maps?q=3rd%20Industrial%20City%20Jeddah&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-[380px] w-full border-0 grayscale contrast-125"
            loading="lazy"
          />
        </Reveal>
      </section>
    </>
  );
}
