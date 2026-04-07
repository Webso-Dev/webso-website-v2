"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Yhteydenotto() {
  const t = useTranslations("yhteydenotto");
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
    <section ref={sectionRef} className="overflow-hidden border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 md:px-10">
        <div className="contact-block py-10 sm:py-16 md:py-24">

          <div className="grid overflow-hidden gap-4 md:grid-cols-[1.75fr_1fr]">

            {/* Left: Form box */}
            <div className="min-w-0 dashed-box p-4 sm:p-6 md:p-7">
              <span className="tag mb-5 inline-block">Ota yhteyttä</span>
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

            {/* Right: Pekka */}
            <div className="min-w-0 flex flex-col dashed-box">

              {/* Photo — top half */}
              <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[4/3]">
                <Image
                  src="/images/team/pekka.webp"
                  alt="Pekka"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-w-black/10" />
              </div>

              {/* Info — bottom half */}
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
  );
}
