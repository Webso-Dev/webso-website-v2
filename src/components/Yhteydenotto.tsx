"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Yhteydenotto() {
  const t = useTranslations("yhteydenotto");
  const locale = useLocale();
  const fi = locale === "fi";
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [values, setValues] = useState({ nimi: "", sahkoposti: "", viesti: "", yritys: "" });
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
  };

  const fieldOk = (k: string) => touched[k] && validators[k]?.(values[k] ?? "");
  const fieldErr = (k: string) => touched[k] && validators[k] && !validators[k](values[k] ?? "");
  const isComplete = Object.entries(validators).every(([k, fn]) => fn(values[k] ?? ""));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ nimi: true, sahkoposti: true, viesti: true });
    if (!isComplete) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  const inputCls = (k: string) =>
    `w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${fieldErr(k) ? " opacity-80" : ""}`;

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

              {status === "sent" ? (
                <div className="mt-10 flex flex-col items-start gap-4">
                  <span className="tag-accent">{fi ? "Lähetetty" : "Sent"}</span>
                  <p className="font-display text-[1.5rem] font-normal tracking-[-0.025em] text-w-white">
                    {fi ? "Kiitos! Palaamme asiaan pian." : "Thanks! We'll be in touch soon."}
                  </p>
                  <p className="text-[0.875rem] leading-[1.65] text-w-white-30">
                    {fi ? "Vastaamme yleensä saman päivän aikana." : "We typically respond the same day."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">

                  {/* Name */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
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
                      <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">
                        {fi ? "Syötä nimesi" : "Enter your name"}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
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
                      <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">
                        {fi ? "Tarkista sähköpostiosoite" : "Check your email address"}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                        {t("form.viesti")} *
                      </label>
                      {fieldOk("viesti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <textarea
                      name="message" rows={4}
                      placeholder={fi ? "Kerro lyhyesti projektistasi tai haasteestasi..." : "Briefly describe your project or challenge..."}
                      value={values.viesti}
                      onChange={(e) => setValues((v) => ({ ...v, viesti: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, viesti: true }))}
                      className={`${inputCls("viesti")} resize-none`}
                    />
                    {fieldErr("viesti") && (
                      <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">
                        {fi ? "Kirjoita ainakin muutama sana" : "Write at least a few words"}
                      </p>
                    )}
                  </div>

                  {/* Company optional */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                      {t("form.yritys")} <span className="normal-case">{fi ? "valinnainen" : "optional"}</span>
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
                    <span className="font-mono text-[0.5625rem] tracking-[0.04em] text-w-white-30">
                      {fi ? "Vastaamme 24h sisällä." : "We respond within 24h."}
                    </span>
                  </div>

                </form>
              )}
            </div>

            {/* Right: Pekka — testimonial style */}
            <div className="min-w-0 relative dashed-box overflow-hidden">

              {/* Mobile: photo at top */}
              <div className="relative aspect-[4/3] w-full overflow-hidden md:hidden">
                <Image
                  src="/images/team/pekka_no_bg.avif"
                  alt="Pekka"
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-w-black/10" />
              </div>

              {/* Text content — left side */}
              <div className="relative z-10 flex flex-col gap-5 p-6 md:p-7 md:w-[58%] md:min-h-full md:justify-center">
                <span className="tag self-start">{fi ? "Yhteyshenkilö" : "Contact"}</span>

                <div className="flex items-stretch gap-4">
                  <div className="shrink-0 w-px bg-w-accent" />
                  <div className="flex flex-col gap-5">
                    <p className="font-display text-[clamp(0.9375rem,1.4vw,1.125rem)] font-normal leading-[1.45] tracking-[-0.02em] text-w-white">
                      &ldquo;{t("pekka.quote")}&rdquo;
                    </p>
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-70">
                        {t("pekka.name")}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                        {t("pekka.role")}
                      </p>
                      <div className="mt-3 flex flex-col gap-1">
                        <a href={`mailto:${t("pekka.email")}`}
                          className="font-mono text-[0.6875rem] text-w-white-30 transition-colors duration-200 hover:text-w-white">
                          {t("pekka.email")}
                        </a>
                        <a href={`tel:${t("pekka.phone").replace(/\s/g, "")}`}
                          className="font-mono text-[0.6875rem] text-w-white-30 transition-colors duration-200 hover:text-w-white">
                          {t("pekka.phone")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo — absolute right side, desktop only */}
              <div className="hidden md:block absolute inset-y-0 right-0 w-[48%] overflow-hidden">
                <Image
                  src="/images/team/pekka_no_bg.avif"
                  alt="Pekka"
                  fill
                  className="object-cover object-top"
                  sizes="25vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(3,4,10,1) 0px, rgba(3,4,10,0.7) 40%, rgba(3,4,10,0) 100%)" }}
                />
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
