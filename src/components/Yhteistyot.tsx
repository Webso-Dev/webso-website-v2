"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    id: "dieta",
    titleFi: "Composable commerce -järjestelmä",
    titleEn: "Composable commerce system",
    descFi: "Modulaarinen verkkokauppajärjestelmä joka korvasi vanhentuneen alustan — nopeampi toimitus, alhaisemmat ylläpitokustannukset.",
    descEn: "Modular e-commerce system replacing an outdated platform — faster delivery, lower maintenance costs.",
    image: "/images/cases/dieta-hero.webp",
    logo: "/images/logos/dieta.avif",
    tag: "Sovelluskehitys",
    year: "2024",
  },
  {
    id: "bongariliitto",
    titleFi: "Lintuhavaintojärjestelmän modernisointi",
    titleEn: "Birdwatching system modernisation",
    descFi: "Havaintojärjestelmä uudelleenrakennettu modernilla teknologiapinolla — suorituskyky moninkertaistui.",
    descEn: "Observation system rebuilt on a modern stack — performance multiplied.",
    image: "/images/cases/bongariliitto-hero.webp",
    logo: "/images/logos/bongariliitto.avif",
    tag: "Sovelluskehitys",
    year: "2021",
  },
];

export function Yhteistyot() {
  const t = useTranslations("yhteistyot");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-row").forEach((row, i) => {
        gsap.from(row, {
          opacity: 0, y: 36, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
          delay: i * 0.12,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 md:px-10">
        <div className="py-6 md:py-10">

          {/* Header */}
          <div className="mb-0 flex items-end justify-between pb-8">
            <p className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
              {t("title")}
            </p>
            <Link href={`/${locale}/yhteistyot`} className="btn-outline hidden md:inline-flex">
              <span className="btn-label">{t("cta")}</span>
              <span className="btn-arrow text-w-white-30">→</span>
            </Link>
          </div>

          {/* Case rows */}
          {cases.map((c, i) => (
            <div
              key={c.id}
              className={`case-row group flex flex-col md:flex-row dashed-box ${i < cases.length - 1 ? "mb-6" : ""}`}
            >
              {/* Image — full card height */}
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
              <div className="flex flex-1 flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                <div>
                  {/* Logo */}
                  <div className="mb-3">
                    <Image
                      src={c.logo}
                      alt={c.id}
                      width={220}
                      height={72}
                      className="h-[40px] w-auto brightness-0 invert opacity-70 md:h-[58px]"
                    />
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{c.tag}</span>
                    <span className="text-w-white-15">·</span>
                    <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{c.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-mono text-[clamp(1.25rem,2.2vw,1.75rem)] font-normal uppercase leading-[1.12] tracking-[0.01em] text-w-white">
                    {locale === "fi" ? c.titleFi : c.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.65] text-white/70">
                    {locale === "fi" ? c.descFi : c.descEn}
                  </p>
                </div>

                {/* Learn more */}
                <div className="mt-8">
                  <Link href={`/${locale}/yhteistyot`} className="btn-outline inline-flex">
                    <span className="btn-label">{locale === "fi" ? "Lue lisää" : "Learn more"}</span>
                    <span className="btn-arrow text-w-white-30">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="mt-10 text-center md:hidden">
            <Link href={`/${locale}/yhteistyot`} className="btn-outline inline-flex">
              <span className="btn-label">{t("cta")}</span>
              <span className="btn-arrow text-w-white-30">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
