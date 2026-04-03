"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { WaveCanvas } from "../WaveCanvas";

export function UraPage() {
  const t = useTranslations("ura");
  const locale = useLocale();
  const items = t.raw("items") as Array<{ number: string; title: string; description: string }>;

  return (
    <>
      {/* Hero with wave */}
      <section className="relative overflow-hidden" style={{ height: "55vh", minHeight: "22rem" }}>
        <WaveCanvas lineColor="#AEA6B6" bgColor="#01060D" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(200deg, rgba(8,68,161,0) 20%, rgba(8,68,161,0.85) 75%)" }} />
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-[90rem] px-6 pb-12 md:px-10 md:pb-16">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Ura" : "Careers"}</span>
              <h1 className="max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-w-white">
                {locale === "fi" ? "Tule rakentamaan tulevaisuutta." : "Come build the future."}
              </h1>
              <p className="mt-4 max-w-2xl font-body text-[clamp(0.875rem,1.5vw,1.125rem)] leading-[1.55] text-w-white-50">
                {locale === "fi" ? "Etsimme huippuosaajia jotka haluavat tehdä ohjelmistokehitystä tavalla, joka määrittelee alan suunnan." : "We're looking for top talent who want to do software engineering in a way that defines the direction of the industry."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="border-b border-w-white-8 py-20 md:py-28">
            {items.map((item, i) => (
              <motion.div key={item.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }} className={`group flex items-center justify-between py-7 ${i < items.length - 1 ? "border-b border-w-white-8" : ""}`}>
                <div className="flex items-center gap-5">
                  <span className="tag-accent hidden md:inline-flex">{item.number}</span>
                  <div>
                    <h3 className="font-display text-[1rem] font-bold tracking-[-0.02em] text-w-white">{item.title}</h3>
                    <p className="mt-1 font-body text-[0.8125rem] leading-[1.5] text-w-white-50">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 py-24 text-center md:px-10 md:py-32">
          <p className="font-body text-[0.875rem] text-w-white-50">{locale === "fi" ? "Emme löytäneet sopivaa roolia? Lähetä avoin hakemus." : "Don't see a fitting role? Send an open application."}</p>
          <Link href={`/${locale}/ota-yhteytta`} className="btn-primary mt-8 inline-flex">
            <span className="btn-label">{locale === "fi" ? "Lähetä hakemus" : "Send application"}</span>
            <span className="btn-arrow border-w-white-15 text-w-black/40">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
