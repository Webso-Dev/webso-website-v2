import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { routing } from "@/i18n/routing";
import "../globals.css";

const aspekta = localFont({
  src: "../fonts/AspektaVF.ttf",
  variable: "--font-aspekta",
  display: "swap",
});

const supplyMono = localFont({
  src: [
    { path: "../fonts/PPSupplyMono-Regular.otf", weight: "400" },
    { path: "../fonts/PPSupplyMono-Ultralight.otf", weight: "200" },
  ],
  variable: "--font-supply-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webso — AI-natiivi ohjelmistotalo",
  description:
    "Rakennamme yritysten tietojärjestelmiä hyödyntäen tekoälyn koko potentiaalin.",
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
        {/* Vertical wireframe guide lines — fixed overlay */}
        <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
          <div className="absolute inset-y-0 left-[100px]" style={{ width: "1px", background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 2px)" }} />
          <div className="absolute inset-y-0 right-[100px]" style={{ width: "1px", background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 2px)" }} />
        </div>
        {/* Content box — bounded between the vertical lines */}
        <div className="mx-[100px]">
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
