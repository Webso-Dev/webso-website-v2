"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function UraPage() {
  const t = useTranslations("ura");
  const locale = useLocale();
  const items = t.raw("items") as Array<{ number: string; title: string; description: string }>;

  return (
    <main className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-24 md:py-32">
            <span className="tag mb-8 inline-block">{locale === "fi" ? "Ura" : "Careers"}</span>
            <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
              {locale === "fi"
                ? "Etsimme huippuosaajia jotka haluavat tehdä ohjelmistokehitystä tavalla, joka määrittelee alan suunnan."
                : "We're looking for top talent who want to do software engineering in a way that defines the direction of the industry."}
            </p>
          </div>
        </div>
      </section>

      {/* Reasons matches homepage Palvelut two-column pattern */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex flex-col md:flex-row">
            <div className="shrink-0 border-b border-dashed border-w-white-15 py-10 md:sticky md:top-[4.25rem] md:w-[36%] md:self-start md:border-b-0 md:py-0 md:pb-24 md:pt-10 md:pr-14">
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Miksi Webso" : "Why Webso"}</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
                {locale === "fi" ? "Rakennetaan ohjelmistoja tavalla, jota ei vielä opeteta kouluissa." : "Build software in a way not yet taught in schools."}
              </h2>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-50">
                {locale === "fi"
                  ? "Täällä tekoäly ei ole tulossa se on jo täällä."
                  : "Here AI isn't coming it's already here."}
              </p>
            </div>

            <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

            <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-10">
              {items.map((item, i) => (
                <div key={item.number} className={`dashed-box p-5 sm:p-8 md:p-10 ${i < items.length - 1 ? "mb-4" : ""}`}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="h-px w-5 bg-w-accent block shrink-0" />
                    <span className="font-mono text-[0.75rem] tracking-[0.05em] text-w-accent">{item.number}</span>
                  </div>
                  <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team image visual weight */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="group relative h-52 w-full overflow-hidden sm:h-64 md:h-80">
            <Image src="/images/ura-team.jpg" alt={locale === "fi" ? "Webso-tiimi" : "Webso team"} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-w-black/30" />
            <div className="pointer-events-none absolute inset-0 z-10" style={{ border: "1px dashed rgba(255,255,255,0.15)" }} />
            <span className="pointer-events-none absolute left-0 top-0 z-10 h-px w-8 bg-w-accent" />
            <span className="pointer-events-none absolute left-0 top-0 z-10 h-8 w-px bg-w-accent" />
            <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-px w-8 bg-w-accent/40" />
            <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-8 w-px bg-w-accent/40" />
          </div>
        </div>
      </section>

      {/* Open application */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-20">
          <div className="dashed-box p-5 sm:p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="tag mb-4 inline-block">{locale === "fi" ? "Avoin hakemus" : "Open application"}</span>
                <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                  {locale === "fi" ? "Kaikki roolit" : "All roles"}
                </h3>
                <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.7] text-white/70">
                  {locale === "fi"
                    ? "Emme löytäneet sopivaa roolia? Lähetä avoin hakemus otamme yhteyttä kun sopiva paikka aukeaa."
                    : "Don't see a fitting role? Send an open application we'll reach out when the right position opens."}
                </p>
              </div>
              <Link href={`/${locale}/ota-yhteytta`} className="btn-outline shrink-0 inline-flex">
                <span className="btn-label">{t("cta")}</span>
                <span className="btn-arrow text-w-white-30">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Kuulostaako hyvältä?" : "Sound good?"}
            </h2>
            <Link href={`/${locale}/ota-yhteytta`} className="btn-primary shrink-0">
              <span className="btn-label">{locale === "fi" ? "Ota yhteyttä" : "Get in touch"}</span>
              <span className="btn-arrow text-w-black/40">→</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
