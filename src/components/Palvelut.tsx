"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function Palvelut() {
  const t = useTranslations("palvelut");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".pillar").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 28, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    { num: "01", title: t("pillar1.title"), desc: t("pillar1.description"), items: t.raw("pillar1.items") as string[], cta: t("pillar1.cta") },
    { num: "02", title: t("pillar2.title"), desc: t("pillar2.description"), items: t.raw("pillar2.items") as string[], cta: t("pillar2.cta") },
    { num: "03", title: t("pillar3.title"), desc: t("pillar3.description"), items: t.raw("pillar3.items") as string[], cta: t("pillar3.cta") },
  ];

  const subtitle = locale === "fi"
    ? "Rakennamme ohjelmistoja tekoälyn täydellä potentiaalilla nopeammin ja laadukkaammin kuin perinteiset toimittajat."
    : "We build software with the full potential of AI faster and better than traditional vendors.";

  return (
    <section ref={sectionRef} className="border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 md:px-10">
        <div className="flex flex-col md:flex-row">

          {/* Left column gradient spans full height, content is sticky */}
          <div className="shrink-0 border-b border-dashed border-w-white-15 md:w-[36%] md:border-b-0">
            <div className="py-10 md:sticky md:top-[4.25rem] md:py-0 md:pb-24 md:pt-10 md:pr-8">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
                {locale === "fi" ? "Mitä me teemme" : "What we do"}
              </h2>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-50">
                {subtitle}
              </p>
              <div className="mt-10">
                <Link href={`/${locale}/palvelut`} className="btn-outline inline-flex">
                  <span className="btn-label">{locale === "fi" ? "Kaikki palvelut" : "All services"}</span>
                  <span className="btn-arrow text-w-white-30">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Full-height vertical separator */}
          <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

          {/* Right column three pillars */}
          <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-8">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className={`pillar dashed-box p-6 sm:p-8 md:p-10 ${i < pillars.length - 1 ? "mb-4" : ""}`}
              >
                <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                  {p.title}
                </h3>

                <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-white/70">
                  {p.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>

                {/* Per-card CTA */}
                <div className="mt-8">
                  <Link href={`/${locale}/palvelut`} className="btn-outline inline-flex">
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
  );
}
