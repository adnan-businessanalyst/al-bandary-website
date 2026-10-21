import type { Metadata } from "next";
import {
  IBM_Plex_Sans_Arabic,
  Noto_Kufi_Arabic,
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";
import { SiteShell } from "@/components/site-shell";
import { dictionary } from "@/lib/dictionary";
import "./globals.css";

const ibm = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const kufi = Noto_Kufi_Arabic({
  variable: "--font-kufi",
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: dictionary.ar.meta.title,
  description: dictionary.ar.meta.description,
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-theme="dark"
      className={`${ibm.variable} ${kufi.variable} ${cormorant.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("albandary-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <LanguageProvider>
            <SiteShell>{children}</SiteShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
