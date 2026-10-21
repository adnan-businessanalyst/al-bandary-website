"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useI18n } from "@/lib/language";
import { useTheme } from "@/lib/theme";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/factory", key: "factory" },
  { href: "/quality", key: "quality" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 ${
            scrolled || open ? "glass" : "border border-transparent bg-transparent"
          }`}
        >
          <Link href="/" aria-label={t.brand.legal} className="shrink-0">
            <Logo onPhoto={!scrolled && !open} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm transition ${
                    active
                      ? "bg-gold/15 text-gold"
                      : "text-sand/85 hover:bg-white/5 hover:text-cream"
                  }`}
                >
                  {t.nav[link.key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="glass grid size-10 place-items-center text-cream"
              aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v1.5M12 19.5V21M4.2 4.2l1.1 1.1M18.7 18.7l1.1 1.1M3 12h1.5M19.5 12H21M4.2 19.8l1.1-1.1M18.7 5.3l1.1-1.1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5Z" />
                </svg>
              )}
            </button>
            <div className="glass flex overflow-hidden rounded-full p-1 text-xs">
              <button
                type="button"
                onClick={() => setLocale("ar")}
                className={`rounded-full px-3 py-1.5 transition ${
                  locale === "ar" ? "bg-gold text-on-gold" : "text-sand hover:text-cream"
                }`}
              >
                ع
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`rounded-full px-3 py-1.5 transition ${
                  locale === "en" ? "bg-gold text-on-gold" : "text-sand hover:text-cream"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              href="/contact"
              className="hidden rounded-full bg-gold px-4 py-2 text-sm font-medium text-on-gold transition hover:bg-gold-deep sm:inline-flex"
            >
              {t.nav.quote}
            </Link>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 lg:hidden"
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex w-4 flex-col gap-1.5">
                <span className={`h-px bg-cream transition ${open ? "translate-y-1 rotate-45" : ""}`} />
                <span className={`h-px bg-cream transition ${open ? "opacity-0" : ""}`} />
                <span className={`h-px bg-cream transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <div className="grid gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-cream hover:bg-white/5"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 rounded-full bg-gold px-4 py-3 text-center font-medium text-on-gold"
              >
                {t.nav.quote}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
