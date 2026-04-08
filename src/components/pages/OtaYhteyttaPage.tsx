"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FormSuccess } from "@/components/FormSuccess";
import Image from "next/image";
import { Lupaus } from "@/components/Lupaus";
import { Yhteistyot } from "@/components/Yhteistyot";
import { Suosittelijat } from "@/components/Suosittelijat";

function contactFailureMessage(res: Response, body: unknown, fi: boolean): string {
  const apiErr =
    typeof body === "object" && body !== null && "error" in body && typeof (body as { error: unknown }).error === "string"
      ? (body as { error: string }).error
      : null;
  if (res.status === 400) {
    return fi ? "Tarkista puuttuvat tai virheelliset kentät." : "Please check missing or invalid fields.";
  }
  if (res.status >= 500) {
    return fi ? "Lähetys epäonnistui. Yritä uudelleen." : "Could not send. Please try again.";
  }
  if (apiErr && fi) return apiErr;
  return fi ? "Lähetys epäonnistui. Yritä uudelleen." : "Could not send your message. Please try again.";
}

export function OtaYhteyttaPage() {
  const t = useTranslations("yhteydenotto");
  const locale = useLocale();
  const fi = locale === "fi";
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [values, setValues] = useState({ nimi: "", sahkoposti: "", viesti: "", yritys: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [mValues, setMValues] = useState({ nimi: "", sahkoposti: "", viesti: "", yritys: "" });
  const [mTouched, setMTouched] = useState<Record<string, boolean>>({});
  const [mStatus, setMStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [mSubmitError, setMSubmitError] = useState<string | null>(null);

  const validators: Record<string, (v: string) => boolean> = {
    nimi: (v) => v.trim().length >= 2,
    sahkoposti: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    viesti: (v) => v.trim().length >= 10,
    yritys: (v) => v.trim().length >= 1,
  };

  const fieldOk = (k: string) => touched[k] && validators[k]?.(values[k as keyof typeof values] ?? "");
  const fieldErr = (k: string) => touched[k] && validators[k] && !validators[k](values[k as keyof typeof values] ?? "");

  const isComplete = Object.entries(validators).every(([k, fn]) => fn(values[k as keyof typeof values] ?? ""));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ nimi: true, sahkoposti: true, viesti: true, yritys: true });
    if (!isComplete) return;
    setSubmitError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "Ota yhteyttä -sivu" }),
      });
      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        /* non-JSON body */
      }
      if (!res.ok) {
        setSubmitError(contactFailureMessage(res, data, fi));
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setSubmitError(
        fi ? "Verkkovirhe. Tarkista yhteys ja yritä uudelleen." : "Network error. Check your connection and try again.",
      );
      setStatus("idle");
    }
  };

  const mIsComplete = Object.entries(validators).every(([k, fn]) => fn(mValues[k as keyof typeof mValues] ?? ""));
  const mFieldOk = (k: string) => mTouched[k] && validators[k]?.(mValues[k as keyof typeof mValues] ?? "");
  const mFieldErr = (k: string) => mTouched[k] && validators[k] && !validators[k](mValues[k as keyof typeof mValues] ?? "");
  const mInputCls = (k: string) =>
    `w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${mFieldErr(k) ? " opacity-80" : ""}`;

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMTouched({ nimi: true, sahkoposti: true, viesti: true, yritys: true });
    if (!mIsComplete) return;
    setMSubmitError(null);
    setMStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...mValues, source: "Ota yhteyttä -sivu (modaali)" }),
      });
      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        /* non-JSON body */
      }
      if (!res.ok) {
        setMSubmitError(contactFailureMessage(res, data, fi));
        setMStatus("idle");
        return;
      }
      setMStatus("sent");
    } catch {
      setMSubmitError(
        fi ? "Verkkovirhe. Tarkista yhteys ja yritä uudelleen." : "Network error. Check your connection and try again.",
      );
      setMStatus("idle");
    }
  };

  const inputCls = (k: string) =>
    `w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${fieldErr(k) ? " opacity-80" : ""}`;

  return (
    <main className="bg-w-black">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section id="yhteys" className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="grid gap-8 py-10 md:grid-cols-2 md:gap-12 md:py-14 lg:py-16">

            {/* Left: text */}
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white whitespace-pre-line">
                {fi
                  ? "Kerro projektistasi.\nAloitamme viikkojen sisällä."
                  : "Tell us about your project.\nWe start within weeks."}
              </h1>
              <p className="mt-6 text-[1rem] leading-[1.65] text-w-white-50">
                {fi
                  ? "Vastaamme 24 tunnin sisällä. Tarjous viidessä arkipäivässä."
                  : "We respond within 24 hours. Proposal in five business days."}
              </p>

              <div className="mt-8">
                <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-30">
                  {fi ? "tai ota suoraan yhteyttä" : "or reach out directly"}
                </p>
                <div className="@container dashed-box p-4 w-full md:max-w-md">
                  <div className="flex flex-col items-start gap-3 @min-[22rem]:flex-row @min-[22rem]:items-center @min-[22rem]:gap-5">
                    <div className="flex min-w-0 w-full flex-1 items-center gap-5 @min-[22rem]:w-auto">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden">
                        <Image
                          src="/images/team/pekka.avif"
                          alt="Pekka"
                          fill
                          className="object-cover object-top"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex flex-col gap-0">
                        <p className="font-display text-[0.9375rem] font-bold tracking-[-0.02em] text-w-white">{t("pekka.name")}</p>
                        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-30">{t("pekka.role")}</p>
                      </div>
                    </div>
                    <div className="shrink-0 @min-[22rem]:ml-auto">
                      <a href="tel:+358445066448" className="btn-outline inline-flex">
                        <span className="btn-label whitespace-nowrap">+358 44 506 6448</span>
                        <span className="btn-arrow text-w-white-30">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="dashed-box @container p-5 sm:p-7">
              {status === "sent" ? (
                <div className="flex h-full min-h-[18rem] flex-col justify-center" role="status" aria-live="polite">
                  <FormSuccess fi={fi} />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Name */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                        {t("form.nimi")} *
                      </label>
                      {fieldOk("nimi") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <input
                      name="nimi" type="text" autoFocus autoComplete="name"
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
                      placeholder={fi ? "Kerro lyhyesti projektista tai liiketoiminta mahdollisuudesta." : "Briefly describe the project or business opportunity."}
                      value={values.viesti}
                      onChange={(e) => setValues((v) => ({ ...v, viesti: e.target.value }))}
                      onBlur={() => setTouched((t) => ({ ...t, viesti: true }))}
                      className={`${inputCls("viesti")} resize-none`}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
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
                  <div className="mt-1 flex flex-col items-start gap-3 @min-[22rem]:flex-row @min-[22rem]:items-center @min-[22rem]:gap-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
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
                  {submitError && (
                    <p role="alert" className="font-mono text-[0.75rem] leading-snug text-red-300/95">
                      {submitError}
                    </p>
                  )}

                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      <Lupaus />
      <Yhteistyot />
      <Suosittelijat />

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-normal tracking-[-0.03em] text-w-white">
              {fi ? "Rakennetaan jotain merkittävää." : "Let's build something significant."}
            </h2>
            <button type="button" onClick={() => setModalOpen(true)} className="btn-primary shrink-0 self-start">
              <span className="btn-label">{fi ? "Ota yhteyttä" : "Get in touch"}</span>
              <span className="btn-arrow text-w-black/40">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Modal ───────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(3,4,10,0.85)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="dashed-box @container bg-w-black w-full max-w-lg p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 font-mono text-[0.75rem] text-w-white-30 hover:text-w-white transition-colors"
            >
              ✕
            </button>

            {mStatus === "sent" ? (
              <div role="status" aria-live="polite">
                <FormSuccess fi={fi} />
              </div>
            ) : (
              <>
                <p className="font-display text-[1.25rem] font-normal tracking-[-0.025em] text-w-white mb-6">
                  {fi ? "Kerro projektistasi" : "Tell us about your project"}
                </p>
                <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">{t("form.nimi")} *</label>
                      {mFieldOk("nimi") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <input
                      type="text" autoFocus autoComplete="name"
                      placeholder={fi ? "Etunimi Sukunimi" : "First Last"}
                      value={mValues.nimi}
                      onChange={(e) => setMValues((v) => ({ ...v, nimi: e.target.value }))}
                      onBlur={() => setMTouched((t) => ({ ...t, nimi: true }))}
                      className={mInputCls("nimi")}
                    />
                    {mFieldErr("nimi") && <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">{fi ? "Syötä nimesi" : "Enter your name"}</p>}
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">{t("form.sahkoposti")} *</label>
                      {mFieldOk("sahkoposti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <input
                      type="email" autoComplete="email"
                      placeholder={fi ? "sinä@yritys.fi" : "you@company.com"}
                      value={mValues.sahkoposti}
                      onChange={(e) => setMValues((v) => ({ ...v, sahkoposti: e.target.value }))}
                      onBlur={() => setMTouched((t) => ({ ...t, sahkoposti: true }))}
                      className={mInputCls("sahkoposti")}
                    />
                    {mFieldErr("sahkoposti") && <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">{fi ? "Tarkista sähköpostiosoite" : "Check your email address"}</p>}
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">{t("form.viesti")} *</label>
                      {mFieldOk("viesti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                    </div>
                    <textarea
                      rows={3}
                      placeholder={fi ? "Kerro lyhyesti projektista tai liiketoiminta mahdollisuudesta." : "Briefly describe the project or business opportunity."}
                      value={mValues.viesti}
                      onChange={(e) => setMValues((v) => ({ ...v, viesti: e.target.value }))}
                      onBlur={() => setMTouched((t) => ({ ...t, viesti: true }))}
                      className={`${mInputCls("viesti")} resize-none`}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                      {t("form.yritys")} *
                    </label>
                    <input
                      type="text" autoComplete="organization"
                      placeholder={fi ? "Yrityksen nimi" : "Company name"}
                      value={mValues.yritys}
                      onChange={(e) => setMValues((v) => ({ ...v, yritys: e.target.value }))}
                      className={mInputCls("yritys")}
                    />
                  </div>
                  <div className="mt-1 flex flex-col items-start gap-3 @min-[22rem]:flex-row @min-[22rem]:items-center @min-[22rem]:gap-4">
                    <button
                      type="submit"
                      disabled={mStatus === "sending"}
                      className="btn-primary shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span className="btn-label">{mStatus === "sending" ? "..." : fi ? "Lähetä viesti" : "Send message"}</span>
                      <span className="btn-arrow text-w-black/40">→</span>
                    </button>
                    <span className="font-mono text-[0.5625rem] tracking-[0.04em] text-w-white-30">
                      {fi ? "Vastaamme 24h sisällä." : "We respond within 24h."}
                    </span>
                  </div>
                  {mSubmitError && (
                    <p role="alert" className="font-mono text-[0.75rem] leading-snug text-red-300/95">
                      {mSubmitError}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </main>
  );
}
