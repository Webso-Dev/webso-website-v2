"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export function OtaYhteyttaPage() {
  const t = useTranslations("yhteydenotto");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  const inputCls = "w-full border-b border-w-white-15 bg-transparent py-3 font-body text-[0.875rem] text-w-white outline-none transition-colors duration-200 placeholder:text-w-white-30 focus:border-w-accent";

  return (
    <section className="bg-w-black">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="pt-32 pb-24 md:pt-40 md:pb-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="tag mb-8 inline-block">{locale === "fi" ? "Yhteydenotto" : "Contact"}</span>
            <h1 className="max-w-2xl font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-w-white">{t("title")}</h1>
            <p className="mt-3 font-body text-[0.875rem] leading-[1.6] text-w-white-50">{t("subtitle")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-16 grid gap-16 border-t border-w-white-8 pt-16 md:grid-cols-[1fr,20rem] md:gap-24">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {(["nimi", "sahkoposti", "yritys", "puhelin"] as const).map((f) => (
                <div key={f}>
                  <label className="mb-1.5 block font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">{t(`form.${f}`)} {f !== "puhelin" && "*"}</label>
                  <input name={f} type={f === "sahkoposti" ? "email" : f === "puhelin" ? "tel" : "text"} required={f !== "puhelin"} className={inputCls} />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">{t("form.viesti")}</label>
                <textarea name="message" rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div className="mt-5">
                <button type="submit" disabled={status !== "idle"} className="btn-primary disabled:opacity-40">
                  <span className="btn-label">{status === "idle" ? t("form.laheta") : status === "sending" ? "..." : "✓"}</span>
                  <span className="btn-arrow border-w-white-15 text-w-black/40">→</span>
                </button>
              </div>
            </form>

            <div>
              <div className="mb-6 h-52 w-40 overflow-hidden"><Image src="/images/team/pekka.webp" alt="Pekka" width={160} height={208} className="h-full w-full object-cover object-top" /></div>
              <p className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-w-white">{t("pekka.name")}</p>
              <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">{t("pekka.role")}</p>
              <div className="mt-5 flex flex-col gap-1.5">
                <a href={`mailto:${t("pekka.email")}`} className="font-body text-[0.8125rem] text-w-white-50 transition-colors duration-200 hover:text-w-white">{t("pekka.email")}</a>
                <a href={`tel:${t("pekka.phone").replace(/\s/g, "")}`} className="font-body text-[0.8125rem] text-w-white-50 transition-colors duration-200 hover:text-w-white">{t("pekka.phone")}</a>
              </div>
              <p className="mt-5 font-body text-[0.75rem] italic text-w-white-30">{t("pekka.note")}</p>
              <div className="mt-6 border-t border-w-white-8 pt-6">
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-15">{locale === "fi" ? "Osoite" : "Address"}</p>
                <p className="mt-1.5 font-body text-[0.8125rem] text-w-white-50">Itämerenkatu 3A, 00180 Helsinki</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
