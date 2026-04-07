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
    image: "/images/cases/dieta-testimonial.avif",
  },
];

export function Suosittelijat() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || window.innerWidth < 768) return;
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
      className="border-b border-dashed border-w-white-15 bg-w-black overflow-hidden"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 md:px-10 md:h-[300px]">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card relative flex md:h-[300px]">

            {/* Left: text content — 50% width, 20px padding top/bottom */}
            <div className="w-full md:w-1/2 py-5 flex flex-col gap-5 relative z-10 justify-center">
              {/* Reference label */}
              <span className="tag inline-block self-start">
                {locale === "fi" ? "Referenssi" : "Testimonial"}
              </span>

              {/* Blue bar + quote/attribution */}
              <div className="flex items-stretch gap-5">
                {/* Blue vertical line — as tall as quote+logo row */}
                <div className="shrink-0 w-px bg-w-accent" />

                <div className="flex flex-col gap-6">
                  {/* Quote */}
                  <p className="font-display text-[clamp(1.125rem,2.2vw,1.75rem)] font-normal leading-[1.35] tracking-[-0.025em] text-w-white">
                    &ldquo;{locale === "fi" ? t.quoteFi : t.quoteEn}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-5">
                    <Image
                      src={t.logo}
                      alt={t.company}
                      width={120}
                      height={42}
                      className="h-[28px] w-auto brightness-0 invert opacity-40"
                    />
                    <div className="h-6 w-px" style={{ background: "var(--dash-v)" }} />
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-70">
                        {t.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: image — fills right 50%, flush to section right border */}
            {t.image && (
              <div className="hidden md:block absolute top-0 bottom-0 w-1/2 overflow-hidden" style={{ right: "-2.5rem" }}>
                <Image
                  src={t.image}
                  alt={t.company}
                  fill
                  className="object-cover"
                />
                {/* Gradient: 45deg angle, exponential curve from bottom-left to transparent at top-right */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, rgba(3,4,10,1) 0px, rgba(3,4,10,1) 50px, rgba(3,4,10,0) 100%)",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
