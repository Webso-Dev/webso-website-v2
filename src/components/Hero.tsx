"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import Link from "next/link";
import { HeroIllustration } from "./illustrations/HeroIllustration";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ delay: 0.15 });

    const headline = headlineRef.current;
    if (headline) {
      const text = headline.textContent || "";
      const wordSpan = (w: string) =>
        `<span class="inline-block overflow-hidden"><span class="hw inline-block translate-y-full">${w}</span></span>`;
      const spaceSpan = wordSpan("&nbsp;");
      headline.innerHTML = text
        .split(" ")
        .map((w) =>
          w.includes("\n")
            ? w.split("\n").map((part, i) => (i > 0 ? "<br/>" : "") + (part ? wordSpan(part) : "")).join("")
            : wordSpan(w)
        )
        .join(spaceSpan);
      tl.to(".hw", { y: 0, duration: 0.7, stagger: 0.055, ease: "power3.out" });
    }

    tl.from(subRef.current, { opacity: 0, y: 14, duration: 0.5, ease: "power2.out" }, "-=0.3");
    tl.from(ctaRef.current, { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      className="relative flex flex-col justify-start overflow-hidden border-b border-dashed border-w-white-15 bg-w-black"
      style={{ height: "calc(100vh - 4.25rem)", minHeight: "38rem", maxHeight: "60rem" }}
    >
      {/* Arcs background — full section, anchored to bottom-right */}
      <HeroIllustration />
      {/* Bottom fade — masks the hard arc cut-off */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, #030407 0%, transparent 100%)" }} />

      {/* Content — top left */}
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-10 pt-10">
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white md:w-[72%]"
        >
          {t("headline")}
        </h1>

        <div className="mt-3 md:w-[55%]">
          <p ref={subRef} className="text-[1.1875rem] leading-[1.65] text-w-white-70 md:text-[1.3125rem]">
            {t("subheadline")}
          </p>

          <div ref={ctaRef} className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/ota-yhteytta`} className="btn-primary">
              <span className="btn-label">{t("ctaPrimary")}</span>
              <span className="btn-arrow text-white/60">→</span>
            </Link>
            <Link href={`/${locale}/palvelut`} className="btn-outline">
              <span className="btn-label">{t("ctaSecondary")}</span>
              <span className="btn-arrow text-w-white-30">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
