"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const allCases = [
  {
    id: "dieta",
    client: "Dieta",
    titleFi: "Composable commerce -järjestelmä",
    titleEn: "Composable commerce system",
    descFi: "Rakensimme Dietalle modulaarisen verkkokauppajärjestelmän joka korvasi vanhentuneen alustan. Nopeampi toimitus, merkittävästi alhaisemmat ylläpitokustannukset ja parempi kehittäjäkokemus.",
    descEn: "We built Dieta a modular e-commerce system replacing their outdated platform. Faster delivery, significantly lower maintenance costs, and a better developer experience.",
    image: "/images/cases/dieta-hero.webp",
    tag: "Sovelluskehitys",
    year: "2024",
    outcome: null,
  },
  {
    id: "evolver",
    client: "Evolver",
    titleFi: "AI-pohjainen prosessiautomaatio",
    titleEn: "AI-powered process automation",
    descFi: "Rakensimme AI-agentin joka automatisoi manuaalisen datan käsittelyn. Toistuva työ poistui — tiimi pystyi keskittymään olennaiseen.",
    descEn: "We built an AI agent that automates manual data processing. Repetitive work eliminated — the team could focus on what matters.",
    image: "/images/cases/dieta-detail.webp",
    tag: "AI Engineering",
    year: "2024",
    outcome: null,
  },
  {
    id: "bongariliitto",
    client: "Bongariliitto",
    titleFi: "Lintuhavaintojärjestelmän modernisointi",
    titleEn: "Birdwatching system modernisation",
    descFi: "Havaintojärjestelmä uudelleenrakennettu modernilla teknologiapinolla. Suorituskyky moninkertaistui ja järjestelmä skaalautuu tulevaisuuden tarpeisiin.",
    descEn: "Observation system rebuilt on a modern stack. Performance multiplied and the system scales for future needs.",
    image: "/images/cases/bongariliitto-hero.webp",
    tag: "Sovelluskehitys",
    year: "2021",
    outcome: null,
  },
];

export function YhteistyotPage() {
  const t = useTranslations("yhteistyot");
  const locale = useLocale();

  return (
    <>
      {/* Page header */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="border-b border-dashed border-w-white-15 pt-32 pb-16 md:pt-40 md:pb-20"
          >
            <span className="tag mb-8 inline-block">{t("title")}</span>
            <h1 className="max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.035em] text-w-white">
              {locale === "fi" ? "Katso mitä olemme rakentaneet." : "See what we've built."}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          {allCases.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              viewport={{ once: true }}
              className={`group flex flex-col md:flex-row ${i < allCases.length - 1 ? "border-b border-dashed border-w-white-15" : ""}`}
            >
              {/* Image */}
              <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-[26rem] md:w-[46%]">
                <Image
                  src={c.image}
                  alt={locale === "fi" ? c.titleFi : c.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 46vw"
                />
                <div className="absolute inset-0 bg-w-black/25 transition-opacity duration-500 group-hover:bg-w-black/10" />
                {/* Corner ticks */}
                <span className="pointer-events-none absolute left-0 top-0 z-10 h-px w-10 bg-w-accent" />
                <span className="pointer-events-none absolute left-0 top-0 z-10 h-10 w-px bg-w-accent" />
                <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-px w-10 bg-w-accent/40" />
                <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-10 w-px bg-w-accent/40" />
              </div>

              {/* Content */}
              <div className="relative flex flex-1 flex-col justify-between px-8 py-10 md:px-14 md:py-14">
                {/* Decorative number */}
                <span className="pointer-events-none absolute right-10 top-10 select-none font-mono text-[8rem] font-bold leading-none tracking-tight text-white/[0.035] md:text-[10rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex items-center gap-3">
                    <span className="tag">{c.tag}</span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-w-white-30">{c.year}</span>
                  </div>

                  <h2 className="mt-6 font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-normal uppercase leading-[1.1] tracking-[0.01em] text-w-white">
                    {locale === "fi" ? c.titleFi : c.titleEn}
                  </h2>

                  <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
                    {locale === "fi" ? c.descFi : c.descEn}
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-dashed border-w-white-8 pt-6">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-30">
                    {c.client}
                  </span>
                  <span className="font-mono text-sm text-w-white-15 transition-colors duration-300 group-hover:text-w-white-70">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-dashed border-w-white-15 bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Kiinnostaako vastaava projekti?" : "Interested in a similar project?"}
            </h2>
            <Link href={`/${locale}/ota-yhteytta`} className="btn-primary shrink-0">
              <span className="btn-label">{locale === "fi" ? "Ota yhteyttä" : "Get in touch"}</span>
              <span className="btn-arrow text-white/60">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
