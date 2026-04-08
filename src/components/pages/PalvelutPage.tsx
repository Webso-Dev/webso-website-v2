"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { FormSuccess } from "@/components/FormSuccess";
import { Luvut } from "@/components/Luvut";
import { scrollToYhteysSection } from "@/lib/scrollToYhteysSection";

export function PalvelutPage() {
  const t = useTranslations("palvelut");
  const tY = useTranslations("yhteydenotto");
  const locale = useLocale();
  const fi = locale === "fi";

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [values, setValues] = useState({ nimi: "", sahkoposti: "", viesti: "", yritys: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validators: Record<string, (v: string) => boolean> = {
    nimi: (v) => v.trim().length >= 2,
    sahkoposti: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    viesti: (v) => v.trim().length >= 10,
  };

  const fieldOk = (k: string) => touched[k] && validators[k]?.(values[k as keyof typeof values] ?? "");
  const fieldErr = (k: string) => touched[k] && validators[k] && !validators[k](values[k as keyof typeof values] ?? "");
  const isComplete = Object.entries(validators).every(([k, fn]) => fn(values[k as keyof typeof values] ?? ""));

  const inputCls = (k: string) =>
    `w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${fieldErr(k) ? " opacity-80" : ""}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ nimi: true, sahkoposti: true, viesti: true });
    if (!isComplete) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  const pillars = [
    { num: "01", title: t("pillar1.title"), desc: t("pillar1.description"), items: t.raw("pillar1.items") as string[], cta: t("pillar1.cta") },
    { num: "02", title: t("pillar2.title"), desc: t("pillar2.description"), items: t.raw("pillar2.items") as string[], cta: t("pillar2.cta") },
    { num: "03", title: t("pillar3.title"), desc: t("pillar3.description"), items: t.raw("pillar3.items") as string[], cta: t("pillar3.cta") },
  ];

  return (
    <main className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-24 md:py-32">
            <span className="tag mb-8 inline-block">{t("title")}</span>
            <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white md:max-w-[60%]">
              {fi
                ? "Rakennamme järjestelmiä, jotka tuottavat kilpailuetua. Ei vuosien päästä vaan nyt."
                : "We build systems that create competitive advantage. Not in years. Now."}
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] leading-[1.7] text-white/70">
              {fi
                ? "Tekoäly on integroitu jokaiseen vaiheeseen: suunnitteluun, koodaukseen ja testaukseen. Toimitus on nopeampaa, laatu on parempi ja budjetti pysyy kurissa."
                : "AI is integrated into every stage: planning, coding and testing. Faster delivery, better quality, budget in control."}
            </p>
            <div className="mt-10">
              <button type="button" onClick={scrollToYhteysSection} className="btn-primary cursor-pointer">
                <span className="btn-label">{fi ? "Kerro projektistasi" : "Tell us about your project"}</span>
                <span className="btn-arrow text-w-black/40">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex flex-col md:flex-row">
            {/* Sticky left */}
            <div className="shrink-0 border-b border-dashed border-w-white-15 py-10 md:sticky md:top-[4.25rem] md:w-[36%] md:self-start md:border-b-0 md:py-0 md:pb-24 md:pt-10 md:pr-14">
              <span className="tag mb-8 inline-block">{fi ? "Palvelut" : "Services"}</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
                {fi ? "Mitä me teemme" : "What we do"}
              </h2>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-50">
                {fi
                  ? "Kolme ydinpalvelua, yksi filosofia: tekoäly mukana joka vaiheessa."
                  : "Three core services, one philosophy: AI at every stage."}
              </p>
            </div>

            {/* Full-height separator */}
            <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

            {/* Right pillars */}
            <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-10">
              {pillars.map((p, i) => (
                <div key={p.num} className={`dashed-box p-5 sm:p-8 md:p-10 ${i < pillars.length - 1 ? "mb-4" : ""}`}>
                  <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-white/70">{p.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.items.map((item) => <span key={item} className="tag">{item}</span>)}
                  </div>
                  <div className="mt-8">
                    <button type="button" onClick={scrollToYhteysSection} className="btn-outline inline-flex cursor-pointer">
                      <span className="btn-label">{fi ? "Kysy lisää" : "Ask us more"}</span>
                      <span className="btn-arrow text-w-white-30">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof numbers */}
      <Luvut />

      {/* Contact section */}
      <section id="yhteys" className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="grid gap-4 py-10 md:grid-cols-2 md:py-16 lg:py-20">

            {/* Left: Pekka photo + quote overlay */}
            <div className="relative min-h-[420px] overflow-hidden md:min-h-0">
              <Image
                src="/images/team/pekka_no_bg.avif"
                alt="Pekka"
                fill
                className="object-contain"
                style={{ objectPosition: "center calc(100% - 100px)" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(3,4,10,1) 0%, rgba(3,4,10,0.95) 18%, rgba(3,4,10,0.4) 38%, rgba(3,4,10,0) 55%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                <div className="flex flex-col gap-4">
                  <p className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-normal leading-[1.25] tracking-[-0.03em] text-w-white">
                    {tY("pekka.quote")}
                  </p>
                  <div>
                    <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-w-white-70">
                      {tY("pekka.name")}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                      {tY("pekka.role")}
                    </p>
                    <div className="mt-3 flex flex-col gap-1">
                      <a href={`mailto:${tY("pekka.email")}`}
                        className="font-mono text-[0.75rem] text-w-white-30 transition-colors duration-200 hover:text-w-white">
                        {tY("pekka.email")}
                      </a>
                      <a href={`tel:${tY("pekka.phone").replace(/\s/g, "")}`}
                        className="font-mono text-[0.75rem] text-w-white-30 transition-colors duration-200 hover:text-w-white">
                        {tY("pekka.phone")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="dashed-box @container p-4 sm:p-6 md:p-7">
              <span className="tag mb-5 inline-block">{fi ? "Ota yhteyttä" : "Get in touch"}</span>
              <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.875rem)] font-bold tracking-[-0.03em] text-w-white">
                {fi ? "Kerro projektistasi." : "Tell us about your project."}
              </h2>
              <p className="mt-1.5 text-[0.8125rem] text-w-white-30">
                {fi ? "Vastaamme 24 tunnin sisällä. Tarjous viidessä arkipäivässä." : "We respond within 24 hours. Proposal in five business days."}
              </p>
              {status === "sent" ? (
                <div className="mt-6">
                  <FormSuccess fi={fi} />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">

                  {/* Name */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                        {tY("form.nimi")} *
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
                        {tY("form.sahkoposti")} *
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
                        {tY("form.viesti")} *
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
                      {tY("form.yritys")} <span className="normal-case">{fi ? "valinnainen" : "optional"}</span>
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
                  <div className="mt-1 flex flex-col items-start gap-2 @min-[22rem]:flex-row @min-[22rem]:items-center @min-[22rem]:gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary shrink-0 disabled:opacity-40"
                    >
                      <span className="btn-label">
                        {status === "sending"
                          ? "..."
                          : fi ? "Lähetä viesti" : "Send message"}
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

          </div>
        </div>
      </section>

    </main>
  );
}
