"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function HeroArcs() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const paths = Array.from(ref.current?.querySelectorAll<SVGPathElement>("path") ?? []);
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      gsap.fromTo(p,
        { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.9 + i * 0.1, ease: "power2.out", delay: 0.05 + i * 0.08 }
      );
    });
  }, []);
  const W = 520, H = 320;
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMin slice"
      fill="none" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="og-grad" x1={W} y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1560D4" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[75, 145, 215, 285].map((r) => (
        <path key={r} d={`M ${W},${r} A ${r},${r} 0 0,1 ${W - r},0`}
          stroke="url(#og-grad)" strokeWidth="0.85" />
      ))}
    </svg>
  );
}

export function OtaYhteyttaPage() {
  const t = useTranslations("yhteydenotto");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-block", {
        opacity: 0, y: 36, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".contact-block", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  const inputCls = "w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-colors duration-200 placeholder:text-w-white-20 dashed-box";

  return (
    <main ref={sectionRef} className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="relative overflow-hidden">
          <HeroArcs />
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="py-24 md:py-32">
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Yhteydenotto" : "Contact"}</span>
              <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white">
                {t("title")}
              </h1>
              <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">{t("subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Pekka — matches homepage Yhteydenotto */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="contact-block py-10 sm:py-16 md:py-24">
            <div className="grid overflow-hidden gap-4 md:grid-cols-[1.75fr_1fr]">

              {/* Left: Form box */}
              <div className="min-w-0 dashed-box p-4 sm:p-6 md:p-7">
                <span className="tag mb-5 inline-block">{locale === "fi" ? "Ota yhteyttä" : "Get in touch"}</span>
                <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.875rem)] font-bold tracking-[-0.03em] text-w-white">
                  {t("title")}
                </h2>
                <p className="mt-1.5 text-[0.8125rem] text-w-white-30">{t("subtitle")}</p>

                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    {(["nimi", "sahkoposti", "yritys", "puhelin"] as const).map((f) => (
                      <div key={f}>
                        <label className="mb-1.5 block font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                          {t(`form.${f}`)}{f !== "puhelin" && " *"}
                        </label>
                        <input
                          name={f}
                          type={f === "sahkoposti" ? "email" : f === "puhelin" ? "tel" : "text"}
                          required={f !== "puhelin"}
                          className={inputCls}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                      {t("form.viesti")}
                    </label>
                    <textarea name="message" rows={4} className={`${inputCls} resize-none`} />
                  </div>
                  <div className="mt-1">
                    <button type="submit" disabled={status !== "idle"} className="btn-primary disabled:opacity-40">
                      <span className="btn-label">
                        {status === "idle" ? t("form.laheta") : status === "sending" ? "..." : "✓"}
                      </span>
                      <span className="btn-arrow border-w-white-15 text-w-black/40">→</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right: Pekka — matches homepage layout */}
              <div className="min-w-0 flex flex-col dashed-box">
                {/* Photo — top */}
                <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[4/3]">
                  <Image
                    src="/images/team/pekka.webp"
                    alt="Pekka"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-w-black/10" />
                  {/* Corner accents */}
                  <span className="pointer-events-none absolute left-0 top-0 z-10 h-px w-5 bg-w-accent" />
                  <span className="pointer-events-none absolute left-0 top-0 z-10 h-5 w-px bg-w-accent" />
                </div>

                {/* Info — bottom */}
                <div className="flex flex-1 flex-col p-6 md:p-7 border-t border-dashed border-w-white-15">
                  <p className="font-display text-[1.125rem] font-bold tracking-[-0.02em] text-w-white">
                    {t("pekka.name")}
                  </p>
                  <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                    {t("pekka.role")}
                  </p>

                  <div className="mt-5 flex flex-col gap-1.5">
                    <a href={`mailto:${t("pekka.email")}`} className="font-mono text-[0.75rem] text-w-white-50 transition-colors duration-200 hover:text-w-white">
                      {t("pekka.email")}
                    </a>
                    <a href={`tel:${t("pekka.phone").replace(/\s/g, "")}`} className="font-mono text-[0.75rem] text-w-white-50 transition-colors duration-200 hover:text-w-white">
                      {t("pekka.phone")}
                    </a>
                  </div>

                  <p className="mt-auto pt-6 text-[0.875rem] leading-[1.6] text-w-white-30 font-display tracking-[-0.01em]">
                    &ldquo;{t("pekka.quote")}&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-12">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-15">{locale === "fi" ? "Osoite" : "Address"}</p>
            <p className="font-mono text-[0.8125rem] text-w-white-30">Itämerenkatu 3A, 00180 Helsinki</p>
          </div>
        </div>
      </section>

    </main>
  );
}
