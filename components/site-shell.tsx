"use client";

import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { useI18n } from "@/lib/language";

export function SiteShell({ children }: { children: ReactNode }) {
  const { locale } = useI18n();

  return (
    <div key={locale} className="flex min-h-full flex-col">
      <div className="noise" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
