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

    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      if (headline) {
        // Lock height and hide before DOM manipulation — prevents collapse-induced layout shift
        headline.style.height = `${headline.offsetHeight}px`;
        headline.style.visibility = "hidden";

        const text = headline.textContent || "";
        const doc = document;
        // Clear existing children
        while (headline.firstChild) headline.removeChild(headline.firstChild);

        const makeWordSpan = (w: string) => {
          const outer = doc.createElement("span");
          outer.className = "inline-block overflow-hidden pb-[0.2em] -mb-[0.2em]";
          const inner = doc.createElement("span");
          inner.className = "hw inline-block translate-y-full";
          inner.textContent = w;
          outer.appendChild(inner);
          return outer;
        };

        const words = text.split(" ");
        words.forEach((w, wi) => {
          if (w.includes("\n")) {
            w.split("\n").forEach((part, pi) => {
              if (pi > 0 && window.innerWidth >= 768) headline.appendChild(doc.createElement("br"));
              if (part) headline.appendChild(makeWordSpan(part));
            });
          } else {
            headline.appendChild(makeWordSpan(w));
          }
          if (wi < words.length - 1) headline.appendChild(doc.createTextNode(" "));
        });

        // Unlock height and reveal — words are clipped by overflow-hidden until animated in
        headline.style.height = "";
        gsap.set(headline, { visibility: "visible" });
        tl.to(".hw", { y: 0, duration: 0.7, stagger: 0.055, ease: "power3.out" });
      }

      tl.from(sub, { opacity: 0, y: 14, duration: 0.5, ease: "power2.out" }, "-=0.3");
      tl.from(cta, { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" }, "-=0.2");
    });

    return () => {
      ctx.revert();
      // Clear GSAP inline styles so elements are visible on re-mount
      if (sub) gsap.set(sub, { clearProps: "all" });
      if (cta) gsap.set(cta, { clearProps: "all" });
    };
  }, []);

  return (
    <section
      className="relative flex flex-col justify-start overflow-hidden border-b border-dashed border-w-white-15 bg-w-black"
      style={{ height: "70dvh", minHeight: "32rem" }}
    >
      {/* Arcs background — anchored to bottom-right, pushed down on mobile */}
      <div className="pointer-events-none absolute inset-0">
        <HeroIllustration />
      </div>
      {/* Top fade — protects text readability on mobile */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[60%] md:hidden" style={{ background: "linear-gradient(to bottom, #03040a 30%, transparent 100%)" }} />
      {/* Bottom fade — masks the hard arc cut-off */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, #03040a 0%, transparent 100%)" }} />

      {/* Content — top left */}
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 pt-10 min-[1000px]:px-10">
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white md:w-[72%]"
        >
          {t("headline")}
        </h1>

        <div className="mt-3 md:w-[55%]">
          <p ref={subRef} className="text-[1.0625rem] font-light leading-[1.65] text-w-white-70 md:text-[1.1875rem]">
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
