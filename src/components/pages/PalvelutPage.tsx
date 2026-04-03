"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

export function PalvelutPage() {
  const t = useTranslations("palvelut");
  const locale = useLocale();
  const p1Items = t.raw("pillar1.items") as string[];
  const p2Items = t.raw("pillar2.items") as string[];

  const pillars = [
    { num: "01", title: t("pillar1.title"), desc: t("pillar1.description"), items: p1Items },
    { num: "02", title: t("pillar2.title"), desc: t("pillar2.description"), items: p2Items },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="border-b border-w-white-8 pt-32 pb-16 md:pt-40 md:pb-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="tag mb-8 inline-block">{t("title")}</span>
              <h1 className="max-w-3xl font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-w-white">
                {locale === "fi" ? "Rakennamme järjestelmiä jotka tuottavat kilpailuetua." : "We build systems that create competitive advantage."}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      {pillars.map((p, i) => (
        <section key={p.num} className="bg-w-black">
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="grid border-b border-w-white-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="border-b border-w-white-8 py-16 md:border-b-0 md:border-r md:border-w-white-8 md:pr-12 md:py-20"
              >
                <div className="corner-brackets relative mb-7 flex h-[3.25rem] w-[3.25rem] items-center justify-center border border-w-white-15">
                  <span className="font-mono text-[0.8125rem] font-bold text-w-accent">{p.num}</span>
                </div>
                <h2 className="font-display text-[1.375rem] font-bold leading-[1.2] tracking-[-0.03em] text-w-white md:text-[1.75rem]">{p.title}</h2>
                <p className="mt-4 font-body text-[0.875rem] leading-[1.65] text-w-white-50">{p.desc}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-center py-16 md:pl-12 md:py-20"
              >
                <ul className="flex flex-col gap-3.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.8125rem] leading-[1.55] text-w-white-50">
                      <span className="mt-[0.55rem] block h-px w-4 shrink-0 bg-w-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 py-24 text-center md:px-10 md:py-32">
          <h2 className="font-display text-[1.375rem] font-bold tracking-[-0.03em] text-w-white md:text-[1.75rem]">
            {locale === "fi" ? "Kerro projektistasi." : "Tell us about your project."}
          </h2>
          <Link href={`/${locale}/ota-yhteytta`} className="btn-primary mt-8 inline-flex">
            <span className="btn-label">{locale === "fi" ? "Ota yhteyttä" : "Get in touch"}</span>
            <span className="btn-arrow border-w-white-15 text-w-black/40">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
