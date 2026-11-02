"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/language";
import { trackPageView } from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();
  const { locale, localeReady } = useI18n();

  useEffect(() => {
    if (!localeReady) return;
    trackPageView(pathname, locale);
  }, [localeReady, pathname, locale]);

  return null;
}
