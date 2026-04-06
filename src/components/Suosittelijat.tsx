"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quoteFi:
      "Lopputulos on moderni ja visuaalisesti miellyttävä, mutta ennen kaikkea teknisesti huippuluokkaa.",
    quoteEn:
      "The end result is modern and visually appealing, but above all technically top-notch.",
    name: "Jukka Poméll",
    role: "Director",
    company: "Dieta",
    logo: "/images/logos/dieta.avif",
  },
];

export function Suosittelijat() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 36,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".testimonial-card", start: "top 88%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-b border-dashed border-w-white-15 bg-w-black"
    >
      <div className="mx-auto max-w-[90rem] py-12 sm:py-20 md:py-28">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card">
            {/* Tag */}
            <span className="tag mb-10 inline-block">
              {locale === "fi" ? "Referenssi" : "Testimonial"}
            </span>

            {/* Quote */}
            <div className="flex items-start gap-6">
              {/* Blue accent bar */}
              <div className="hidden md:block shrink-0 mt-2 w-px self-stretch bg-w-accent" />

              <blockquote className="max-w-3xl">
                <p className="font-display text-[clamp(1.375rem,2.8vw,2.25rem)] font-normal leading-[1.35] tracking-[-0.025em] text-w-white">
                  &ldquo;{locale === "fi" ? t.quoteFi : t.quoteEn}&rdquo;
                </p>

                {/* Attribution */}
                <footer className="mt-8 flex items-center gap-5">
                  <Image
                    src={t.logo}
                    alt={t.company}
                    width={120}
                    height={42}
                    className="h-[28px] w-auto brightness-0 invert opacity-40"
                  />
                  <div
                    className="h-6 w-px"
                    style={{ background: "var(--dash-v)" }}
                  />
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-70">
                      {t.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
