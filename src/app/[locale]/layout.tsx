import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const aspekta = localFont({
  src: "../fonts/AspektaVF.ttf",
  variable: "--font-aspekta",
  display: "block",
});

const supplyMono = localFont({
  src: [
    { path: "../fonts/PPSupplyMono-Regular.otf", weight: "400" },
    { path: "../fonts/PPSupplyMono-Ultralight.otf", weight: "200" },
  ],
  variable: "--font-supply-mono",
  display: "block",
});

export const metadata: Metadata = {
  title: {
    default: "Webso — AI-natiivi sovelluskehitys",
    template: "%s — Webso",
  },
  description:
    "Rakennamme yritysten tietojärjestelmiä hyödyntäen tekoälyn koko potentiaalin. AI-natiivi tiimi toimittaa enemmän, nopeammin ja paremmalla laadulla.",
  metadataBase: new URL("https://webso.fi"),
  openGraph: {
    type: "website",
    siteName: "Webso",
    title: "Webso — AI-natiivi sovelluskehitys",
    description:
      "Rakennamme yritysten tietojärjestelmiä hyödyntäen tekoälyn koko potentiaalin.",
    images: [{ url: "/images/og.png", width: 1200, height: 630, alt: "Webso" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webso — AI-natiivi sovelluskehitys",
    description:
      "Rakennamme yritysten tietojärjestelmiä hyödyntäen tekoälyn koko potentiaalin.",
    images: ["/images/og.png"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className={`${aspekta.variable} ${supplyMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Vertical wireframe guide lines — fixed overlay, hidden on mobile */}
        <div className="pointer-events-none fixed inset-y-0 left-0 right-0 z-[999] mx-auto hidden max-w-[1640px] min-[1000px]:block" aria-hidden="true">
          <div className="absolute inset-y-0 left-[100px]" style={{ width: "1px", background: "var(--dash-v)" }} />
          <div className="absolute inset-y-0 right-[100px]" style={{ width: "1px", background: "var(--dash-v)" }} />
        </div>
        {/* Content box — slab that slides up to reveal fixed WEBSO behind it */}
        <div className="relative z-10 bg-w-black mx-auto max-w-[1640px] min-[1000px]:px-[100px]">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
