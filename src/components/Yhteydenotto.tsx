"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FormSuccess } from "@/components/FormSuccess";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Yhteydenotto({ headingFi, headingEn }: { headingFi?: string; headingEn?: string } = {}) {
  const t = useTranslations("yhteydenotto");
  const locale = useLocale();
  const fi = locale === "fi";
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [values, setValues] = useState<Record<string, string>>({ nimi: "", sahkoposti: "", viesti: "", yritys: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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

  const validators: Record<string, (v: string) => boolean> = {
    nimi: (v) => v.trim().length >= 2,
    sahkoposti: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    viesti: (v) => v.trim().length >= 10,
    yritys: (v) => v.trim().length >= 1,
  };

  const fieldOk = (k: string) => touched[k] && validators[k]?.(values[k] ?? "");
  const fieldErr = (k: string) => touched[k] && validators[k] && !validators[k](values[k] ?? "");
  const isComplete = Object.entries(validators).every(([k, fn]) => fn(values[k] ?? ""));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ nimi: true, sahkoposti: true, viesti: true, yritys: true });
    if (!isComplete) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "Etusivu – Yhteydenotto" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  const inputCls = (k: string) =>
    `w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${fieldErr(k) ? " opacity-80" : ""}`;

  return (
    <section ref={sectionRef} className="overflow-hidden border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
        <div className="contact-block py-10 sm:py-16 md:py-24">

          <div className="grid overflow-hidden gap-4 md:grid-cols-2">

            {/* Left: Pekka — photo fills full column, quote overlaid at bottom */}
            <div className="min-w-0 relative overflow-hidden min-h-[520px] md:min-h-0">

              {/* Photo — fills entire column */}
              <Image
                src="/images/team/pekka_no_bg.avif"
                alt="Pekka"
                fill
                className="object-contain"
                style={{ objectPosition: "center calc(100% - 100px)" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Bottom gradient so text is readable */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(3,4,10,1) 0%, rgba(3,4,10,0.95) 18%, rgba(3,4,10,0.4) 38%, rgba(3,4,10,0) 55%)" }}
              />

              {/* Quote overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <p className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-normal leading-[1.25] tracking-[-0.03em] text-w-white">
                    {t("pekka.quote")}
                  </p>
                  <div>
                    <p className="font-mono text-[1rem] uppercase tracking-[0.04em] text-w-white">
                      {t("pekka.name")}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.75rem] uppercase tracking-[0.06em] text-w-white-50">
                      {t("pekka.role")}
                    </p>
                    <div className="mt-3 flex flex-col gap-1">
                      <a href={`mailto:${t("pekka.email")}`}
                        className="font-mono text-[0.875rem] text-w-white-50 transition-colors duration-200 hover:text-w-white">
                        {t("pekka.email")}
                      </a>
                      <a href={`tel:${t("pekka.phone").replace(/\s/g, "")}`}
                        className="font-mono text-[0.875rem] text-w-white-50 transition-colors duration-200 hover:text-w-white">
                        {t("pekka.phone")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Form box */}
            <div className="min-w-0 dashed-box p-4 sm:p-6 md:p-7">
              <span className="tag mb-5 inline-block">{fi ? "Ota yhteyttä" : "Contact"}</span>
              <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.875rem)] font-bold tracking-[-0.03em] text-w-white">
                {fi ? (headingFi ?? t("title")) : (headingEn ?? t("title"))}
              </h2>
              <p className="mt-1.5 text-[1rem] text-w-white-50">{t("subtitle")}</p>

              {status === "sent" ? (
                <div className="mt-6">
                  <FormSuccess fi={fi} />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">

                  {/* Name */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-70">
                        {t("form.nimi")} *
                      </label>
                      {fieldOk("nimi") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <input
                      name="nimi" type="text" autoComplete="name"
                      placeholder={fi ? "Etunimi Sukunimi" : "First Last"}
                      value={values.nimi}
                      onChange={(e) => setValues((v) => ({ ...v, nimi: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, nimi: true }))}
                      className={inputCls("nimi")}
                    />
                    {fieldErr("nimi") && (
                      <p className="mt-1 font-mono text-[0.625rem] text-w-white-50">
                        {fi ? "Syötä nimesi" : "Enter your name"}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-70">
                        {t("form.sahkoposti")} *
                      </label>
                      {fieldOk("sahkoposti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <input
                      name="sahkoposti" type="email" autoComplete="email"
                      placeholder={fi ? "sinä@yritys.fi" : "you@company.com"}
                      value={values.sahkoposti}
                      onChange={(e) => setValues((v) => ({ ...v, sahkoposti: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, sahkoposti: true }))}
                      className={inputCls("sahkoposti")}
                    />
                    {fieldErr("sahkoposti") && (
                      <p className="mt-1 font-mono text-[0.625rem] text-w-white-50">
                        {fi ? "Tarkista sähköpostiosoite" : "Check your email address"}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-70">
                        {t("form.viesti")} *
                      </label>
                      {fieldOk("viesti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <textarea
                      name="message" rows={4}
                      placeholder={fi ? "Kerro lyhyesti projektista tai liiketoiminta mahdollisuudesta." : "Briefly describe the project or business opportunity."}
                      value={values.viesti}
                      onChange={(e) => setValues((v) => ({ ...v, viesti: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, viesti: true }))}
                      className={`${inputCls("viesti")} resize-none`}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-70">
                      {t("form.yritys")} *
                    </label>
                    <input
                      name="yritys" type="text" autoComplete="organization"
                      placeholder={fi ? "Yrityksen nimi" : "Company name"}
                      value={values.yritys}
                      onChange={(e) => setValues((v) => ({ ...v, yritys: e.target.value }))}
                      className={inputCls("yritys")}
                    />
                  </div>

                  {/* Submit */}
                  <div className="mt-1 flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary disabled:opacity-40"
                    >
                      <span className="btn-label">
                        {status === "sending" ? "..." : fi ? "Lähetä viesti" : "Send message"}
                      </span>
                      <span className="btn-arrow text-w-black/40">→</span>
                    </button>
                    <span className="font-mono text-[0.75rem] tracking-[0.04em] text-w-white-50">
                      {fi ? "Vastaamme 24h sisällä." : "We respond within 24h."}
                    </span>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
