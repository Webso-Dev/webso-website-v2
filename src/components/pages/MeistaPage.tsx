"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const team = [{ name: "Pekka", role: "CEO, Co-Founder", image: "/images/team/pekka.webp" }];

const vals = {
  fi: [
    { n: "01", t: "Substanssi ennen myyntiä.", d: "Työn laatu puhuu puolestaan." },
    { n: "02", t: "Nopeus ilman oikopolkuja.", d: "Tehokkuus ei tarkoita hutilointia." },
    { n: "03", t: "Pieni tiimi, iso vaikutus.", d: "Jokainen meillä ratkaisee, ei vain toteuta." },
    { n: "04", t: "Aina eturintamassa.", d: "Uudet työkalut ja menetelmät otetaan käyttöön heti." },
  ],
  en: [
    { n: "01", t: "Substance over sales.", d: "Quality of work speaks for itself." },
    { n: "02", t: "Speed without shortcuts.", d: "Efficiency doesn't mean cutting corners." },
    { n: "03", t: "Small team, big impact.", d: "Everyone here solves, not just executes." },
    { n: "04", t: "Always on the frontier.", d: "New tools and methods adopted immediately." },
  ],
};

export function MeistaPage() {
  const locale = useLocale();
  const v = locale === "fi" ? vals.fi : vals.en;

  return (
    <>
      {/* Hero */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="border-b border-w-white-8 pt-32 pb-16 md:pt-40 md:pb-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Meistä" : "About"}</span>
              <h1 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-w-white">Webso</h1>
              <p className="mt-5 max-w-2xl font-body text-[0.9375rem] leading-[1.65] text-w-white-50">
                {locale === "fi"
                  ? "AI-natiivi ohjelmistotalo Helsingistä. Perustettu 2020, kannattavassa kasvussa. Rakennamme yritysten tietojärjestelmiä hyödyntäen tekoälyä koko kehitysprosessissa."
                  : "AI-native software engineering company from Helsinki. Founded 2020, growing profitably. We build enterprise information systems using AI throughout the entire development process."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="border-b border-w-white-8 py-20 md:py-28">
            <span className="tag mb-12 inline-block">{locale === "fi" ? "Periaatteet" : "Principles"}</span>
            <div className="grid gap-px bg-w-white-8 md:grid-cols-2">
              {v.map((item, i) => (
                <motion.div key={item.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }} className="bg-w-black p-8 md:p-10">
                  <span className="font-mono text-[0.75rem] font-bold text-w-accent">{item.n}</span>
                  <h3 className="mt-3 font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-w-white">{item.t}</h3>
                  <p className="mt-2 font-body text-[0.8125rem] leading-[1.6] text-w-white-50">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="border-b border-w-white-8 py-20 md:py-28">
            <span className="tag mb-12 inline-block">{locale === "fi" ? "Tiimi" : "Team"}</span>
            <div className="grid gap-8 md:grid-cols-4">
              {team.map((m, i) => (
                <motion.div key={m.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
                  <div className="relative aspect-[3/4] overflow-hidden"><Image src={m.image} alt={m.name} fill className="object-cover object-top" sizes="25vw" /></div>
                  <p className="mt-4 font-display text-[0.875rem] font-bold tracking-[-0.02em] text-w-white">{m.name}</p>
                  <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{m.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-w-black">
        <div className="mx-auto max-w-[90rem] px-6 py-24 text-center md:px-10 md:py-32">
          <Link href={`/${locale}/ota-yhteytta`} className="btn-primary inline-flex">
            <span className="btn-label">{locale === "fi" ? "Ota yhteyttä" : "Get in touch"}</span>
            <span className="btn-arrow border-w-white-15 text-w-black/40">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
