"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function UraNosto() {
  const t = useTranslations("ura");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as Array<{ number: string; title: string; description: string }>;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".ura-h", { opacity: 0, y: 32, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".ura-h", start: "top 88%" } });
      gsap.utils.toArray<HTMLElement>(".ura-row").forEach((r, i) => {
        gsap.from(r, { opacity: 0, y: 24, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: r, start: "top 88%" }, delay: i * 0.08 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem]">
        <div className="py-16 md:py-36">
          <span className="tag mb-10 inline-block">{locale === "fi" ? "Ura" : "Careers"}</span>

          <h2 className="ura-h max-w-3xl font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-w-white">
            {t("title")}
          </h2>

          {/* Accent line under heading */}
          <div className="mt-6 h-px w-16 bg-w-accent" />

          <div className="mt-14 flex flex-col">
            {items.map((item, i) => (
              <div key={item.number} className={`ura-row group flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between ${i < items.length - 1 ? "border-b border-dashed border-w-white-15" : ""}`}>
                <div className="flex items-start gap-5">
                  <span className="tag-accent hidden md:inline-flex">{item.number}</span>
                  <div>
                    <h3 className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-w-white">{item.title}</h3>
                    <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-w-white-50">{item.description}</p>
                  </div>
                </div>
                <span className="btn-outline shrink-0 self-start opacity-30 transition-opacity duration-200 group-hover:opacity-100 md:self-center">
                  <span className="btn-label hidden md:block">{locale === "fi" ? "Lue lisää" : "Learn more"}</span>
                  <span className="btn-arrow text-w-white-30">→</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href={`/${locale}/ura`} className="btn-primary">
              <span className="btn-label">{t("cta")}</span>
              <span className="btn-arrow border-w-white-15 text-w-black/40">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
