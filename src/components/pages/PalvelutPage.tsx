"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function PalvelutPage() {
  const t = useTranslations("palvelut");
  const locale = useLocale();

  const pillars = [
    { num: "01", title: t("pillar1.title"), desc: t("pillar1.description"), items: t.raw("pillar1.items") as string[], cta: t("pillar1.cta") },
    { num: "02", title: t("pillar2.title"), desc: t("pillar2.description"), items: t.raw("pillar2.items") as string[], cta: t("pillar2.cta") },
    { num: "03", title: t("pillar3.title"), desc: t("pillar3.description"), items: t.raw("pillar3.items") as string[], cta: t("pillar3.cta") },
  ];

  return (
    <main className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-24 md:py-32">
            <span className="tag mb-8 inline-block">{t("title")}</span>
            <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white md:max-w-[55%]">
              {locale === "fi" ? "Rakennamme järjestelmiä jotka tuottavat kilpailuetua." : "We build systems that create competitive advantage."}
            </h1>
            <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
              {locale === "fi"
                ? "Tekoäly on integroitu kaikkeen suunnittelusta, koodauksesta testaukseen. Nopeampi toimitus, parempi laatu."
                : "AI is integrated into everything from planning and coding to testing. Faster delivery, better quality."}
            </p>
          </div>
        </div>
      </section>

      {/* Pillars matches homepage Palvelut pattern */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex flex-col md:flex-row">
            {/* Sticky left */}
            <div className="shrink-0 border-b border-dashed border-w-white-15 py-10 md:sticky md:top-[4.25rem] md:w-[36%] md:self-start md:border-b-0 md:py-0 md:pb-24 md:pt-10 md:pr-14">
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Palvelut" : "Services"}</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
                {locale === "fi" ? "Mitä me teemme" : "What we do"}
              </h2>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-50">
                {locale === "fi"
                  ? "Kolme ydinpalvelua, yksi filosofia: tekoäly mukana joka vaiheessa."
                  : "Three core services, one philosophy: AI at every stage."}
              </p>
            </div>

            {/* Full-height separator */}
            <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

            {/* Right pillars */}
            <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-10">
              {pillars.map((p, i) => (
                <div key={p.num} className={`dashed-box p-5 sm:p-8 md:p-10 ${i < pillars.length - 1 ? "mb-4" : ""}`}>
                  <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-white/70">{p.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.items.map((item) => <span key={item} className="tag">{item}</span>)}
                  </div>
                  <div className="mt-8">
                    <Link href={`/${locale}/ota-yhteytta`} className="btn-outline inline-flex">
                      <span className="btn-label">{p.cta}</span>
                      <span className="btn-arrow text-w-white-30">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Kerro projektistasi." : "Tell us about your project."}
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
