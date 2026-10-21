"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Ltr } from "./ltr";
import { useI18n } from "@/lib/language";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/8 bg-ink-2">
      <div className="absolute inset-0 pattern-mask" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sand/80">{t.footer.tagline}</p>
          <p className="mt-6 text-sm text-muted">
            {t.brand.legal}
            <br />
            {t.brand.legalEn}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold">
            {t.certs.title}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">{t.nav.home}</p>
            <div className="grid gap-2 text-sand/85">
              <Link href="/about" className="hover:text-cream">
                {t.nav.about}
              </Link>
              <Link href="/products" className="hover:text-cream">
                {t.nav.products}
              </Link>
              <Link href="/factory" className="hover:text-cream">
                {t.nav.factory}
              </Link>
              <Link href="/quality" className="hover:text-cream">
                {t.nav.quality}
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">{t.contact.addressLabel}</p>
            <p className="text-sand/85">{t.contact.address}</p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">{t.nav.contact}</p>
            <a href={`tel:${t.contact.phoneHref}`} className="block text-sand/85 hover:text-cream">
              <Ltr>{t.contact.phone}</Ltr>
            </a>
            <a href={`mailto:${t.contact.email}`} className="mt-2 block text-sand/85 hover:text-cream">
              <Ltr>{t.contact.email}</Ltr>
            </a>
            <a
              href={t.contact.webHref}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-sand/85 hover:text-cream"
            >
              <Ltr>{t.contact.web}</Ltr>
            </a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/8 px-6 py-5 text-sm text-muted">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 sm:flex-row sm:justify-between">
          <p>
            © {year} {t.brand.legal}. {t.footer.rights}.
          </p>
          <a
            href={t.contact.webHref}
            target="_blank"
            rel="noreferrer"
            className="hover:text-gold"
          >
            <Ltr>{t.footer.visit}</Ltr>
          </a>
        </div>
      </div>
    </footer>
  );
}
