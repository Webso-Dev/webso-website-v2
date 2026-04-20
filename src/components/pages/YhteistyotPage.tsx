"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Yhteydenotto } from "@/components/Yhteydenotto";

const allCases = [
  {
    id: "dieta",
    titleFi: "Composable commerce -järjestelmä",
    titleEn: "Composable commerce system",
    descFi: "Modulaarinen verkkokauppajärjestelmä joka korvasi vanhentuneen alustan nopeampi toimitus, alhaisemmat ylläpitokustannukset.",
    descEn: "Modular e-commerce system replacing an outdated platform faster delivery, lower maintenance costs.",
    image: "/images/cases/dieta-hero.webp",
    logo: "/images/logos/dieta.avif",
    tagFi: "Sovelluskehitys",
    tagEn: "Software Development",
    year: "2024",
    slug: "/case/dieta-commerce",
  },
  {
    id: "bongariliitto",
    titleFi: "Lintuhavaintojärjestelmän modernisointi",
    titleEn: "Birdwatching system modernisation",
    descFi: "Havaintojärjestelmä uudelleenrakennettu modernilla teknologiapinolla suorituskyky moninkertaistui.",
    descEn: "Observation system rebuilt on a modern stack performance multiplied.",
    image: "/images/cases/bongariliitto-hero.webp",
    logo: "/images/logos/bongariliitto.avif",
    tagFi: "Sovelluskehitys",
    tagEn: "Software Development",
    year: "2021",
    slug: "/case/bongariliitto",
  },
];

const testimonial = {
  quoteFi: "Yhteinen projekti sujui ketterästi ja tehokkaasti, ja pystyimme ratkomaan haasteita nopeasti. Lopputulos on moderni ja visuaalisesti miellyttävä, mutta ennen kaikkea teknisesti huippuluokkaa.",
  quoteEn: "The joint project ran agile and efficiently, and we were able to resolve challenges quickly. The result is modern and visually appealing, but above all technically top-notch.",
  name: "Jukka Poméll",
  role: "PMO",
  company: "Dieta",
  logo: "/images/logos/dieta.avif",
};

export function YhteistyotPage() {
  const locale = useLocale();

  return (
    <main className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="py-14 md:py-20">
            <span className="tag mb-8 inline-block">{locale === "fi" ? "Yhteistyöt" : "Work"}</span>
            <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Tuloksia, jotka puhuvat puolestaan." : "Results that speak for themselves."}
            </h1>
            <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
              {locale === "fi"
                ? "Tutustu asiakkaidemme tarinoihin."
                : "Explore our clients' stories."}
            </p>
          </div>
        </div>
      </section>

      {/* Cases exact same card style as homepage */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="py-6 md:py-10">
            {allCases.map((c, i) => (
              <div
                key={c.id}
                className={`group flex flex-col dashed-box md:flex-row ${i < allCases.length - 1 ? "mb-6" : ""}`}
              >
                {/* Image full card height */}
                <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-[36%] md:self-stretch">
                  <Image
                    src={c.image}
                    alt={locale === "fi" ? c.titleFi : c.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-w-black/20 transition-opacity duration-500 group-hover:bg-w-black/10" />
                  <div className="pointer-events-none absolute inset-0 z-10" style={{ border: "1px dashed rgba(255,255,255,0.15)" }} />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between px-5 pt-8 pb-6 sm:px-8 sm:pt-8 sm:pb-8 md:px-10 md:py-10">
                  <div>
                    {/* Logo */}
                    {c.logo && (
                      <div className="mb-1">
                        <Image
                          src={c.logo}
                          alt={c.id}
                          width={220}
                          height={72}
                          className="h-[40px] w-auto brightness-0 invert opacity-70 md:h-[58px]"
                        />
                      </div>
                    )}
                    {!c.logo && (
                      <p className="mb-3 font-mono text-[1.25rem] font-bold uppercase tracking-[0.02em] text-w-white-70 md:text-[1.5rem]">
                        {c.id.charAt(0).toUpperCase() + c.id.slice(1)}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{locale === "fi" ? c.tagFi : c.tagEn}</span>
                      <span className="text-w-white-15">&middot;</span>
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{c.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 font-mono text-[clamp(1.25rem,2.2vw,1.75rem)] font-normal uppercase leading-[1.12] tracking-[0.01em] text-w-white">
                      {locale === "fi" ? c.titleFi : c.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.65] text-white/70">
                      {locale === "fi" ? c.descFi : c.descEn}
                    </p>
                  </div>

                  {/* Learn more */}
                  <div className="mt-8">
                    <Link href={`/${locale}${c.slug}`} className="btn-outline inline-flex">
                      <span className="btn-label">{locale === "fi" ? "Lue lisää" : "Learn more"}</span>
                      <span className="btn-arrow text-w-white-30">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10 py-12 sm:py-20 md:py-28">
          <span className="tag mb-10 inline-block">
            {locale === "fi" ? "Referenssi" : "Testimonial"}
          </span>

          <div className="flex items-start gap-6">
            <div className="hidden md:block shrink-0 mt-2 w-px self-stretch bg-w-accent" />

            <blockquote className="max-w-3xl">
              <p className="font-display text-[clamp(1.375rem,2.8vw,2.25rem)] font-normal leading-[1.35] tracking-[-0.025em] text-w-white">
                &ldquo;{locale === "fi" ? testimonial.quoteFi : testimonial.quoteEn}&rdquo;
              </p>

              <footer className="mt-8 flex items-center gap-5">
                <Image
                  src={testimonial.logo}
                  alt={testimonial.company}
                  width={120}
                  height={42}
                  className="h-[28px] w-auto brightness-0 invert opacity-40"
                />
                <div className="h-6 w-px" style={{ background: "var(--dash-v)" }} />
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-70">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <Yhteydenotto
        headingFi="Kiinnostaako vastaava projekti?"
        headingEn="Interested in a similar project?"
      />

    </main>
  );
}
