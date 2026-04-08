"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const vals = {
  fi: [
    { n: "01", t: "Substanssi.", d: "Työn laatu puhuu puolestaan." },
    { n: "02", t: "Nopeus ja tarkkuus.", d: "Toimitamme tehokkaasti, jokainen yksityiskohta viimeisteltynä." },
    { n: "03", t: "Iso vaikutus.", d: "Keskitymme tuloksiin, jotka ovat merkityksellisiä liiketoiminnalle." },
    { n: "04", t: "Aina eturintamassa.", d: "Uudet työkalut ja menetelmät otetaan käyttöön heti." },
  ],
  en: [
    { n: "01", t: "Substance.", d: "The quality of our work speaks for itself." },
    { n: "02", t: "Speed and precision.", d: "We deliver efficiently, every detail finished." },
    { n: "03", t: "Big impact.", d: "We focus on outcomes that are meaningful to the business." },
    { n: "04", t: "Always on the frontier.", d: "New tools and methods adopted immediately." },
  ],
};

const team = [
  { name: "Pekka Mattinen",  role: { fi: "CEO, Co-Founder",               en: "CEO, Co-Founder" },               image: "/images/team/pekka.avif" },
  { name: "Vellu",           role: { fi: "Senior ohjelmistokehittäjä",     en: "Senior Software Developer" },     image: "/images/team/vellu.webp" },
  { name: "Miikka",          role: { fi: "Ohjelmistokehittäjä",            en: "Software Developer" },            image: "/images/team/miikka.webp" },
  { name: "Leevi",           role: { fi: "Ohjelmistokehittäjä",            en: "Software Developer" },            image: "/images/team/leevi.webp" },
  { name: "Roope",           role: { fi: "Myynti",                         en: "Sales" },                         image: "/images/team/roope.webp" },
  { name: "Aleksi",          role: { fi: "Junior ohjelmistokehittäjä",     en: "Junior Software Developer" },     image: "/images/team/aleksi.webp" },
  { name: "Paavo",           role: { fi: "Ohjelmistokehittäjä",            en: "Software Developer" },            image: "/images/team/paavo.webp" },
  { name: "Paulus",          role: { fi: "Ohjelmistokehittäjä",            en: "Software Developer" },            image: "/images/team/paulus.webp" },
  { name: "Pekko Pesonen",   role: { fi: "Junior ohjelmistokehittäjä",     en: "Junior Software Developer" },     image: "/images/team/pekko.webp" },
  { name: "Juuso",           role: { fi: "Head of Design",                 en: "Head of Design" },               image: "/images/team/pekko.webp" },
  { name: "Kim",             role: { fi: "Head of Finance",                en: "Head of Finance" },               image: "/images/team/pekko.webp" },
];

export function MeistaPage() {
  const locale = useLocale();
  const v = locale === "fi" ? vals.fi : vals.en;

  return (
    <main className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-24 md:py-32">
            <span className="tag mb-8 inline-block">{locale === "fi" ? "Meistä" : "About"}</span>
            <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "AI-natiivi ohjelmistotalo Helsingistä." : "AI-native software house from Helsinki."}
            </h1>
            <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
              {locale === "fi"
                ? "Perustettu 2020. AI-natiivi ohjelmistotalo Helsingissä."
                : "Founded 2020. AI-native software house in Helsinki."}
            </p>
          </div>
        </div>
      </section>

      {/* Story sticky two-column with stats */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex flex-col md:flex-row">
            <div className="shrink-0 border-b border-dashed border-w-white-15 py-10 md:sticky md:top-[4.25rem] md:w-[36%] md:self-start md:border-b-0 md:py-0 md:pb-24 md:pt-10 md:pr-14">
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Yritys" : "Company"}</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
                {locale === "fi" ? "Teemme ohjelmistokehitystä paremmin." : "We do software development better."}
              </h2>
              <p className="mt-5 text-[1rem] leading-[1.75] text-w-white-50">
                {locale === "fi"
                  ? "Webso syntyi tarpeesta tehdä ohjelmistokehitystä paremmin. Tekoäly on sisäänrakennettu työtapaamme — tämä tarkoittaa nopeampaa kehitystä ja parempaa laatua."
                  : "Webso was born from the need to do software development better. AI is built into how we work — this means faster development and higher quality."}
              </p>
            </div>

            <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

            {/* Stats */}
            <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2020", label: locale === "fi" ? "Perustettu" : "Founded" },
                  { value: "15+", label: locale === "fi" ? "Konsulttia" : "Consultants" },
                  { value: "60+", label: locale === "fi" ? "Projektia" : "Projects" },
                  { value: "98%", label: locale === "fi" ? "Asiakastyytyväisyys" : "Client satisfaction" },
                ].map((s) => (
                  <div key={s.label} className="dashed-box p-5 sm:p-8">
                    <p className="font-mono text-[clamp(2rem,4vw,3rem)] font-normal leading-none tracking-[-0.04em] text-w-white">{s.value}</p>
                    <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">

          {/* Section header row */}
          <div className="flex items-center justify-between border-b border-dashed border-w-white-15 py-6">
            <span className="tag">{locale === "fi" ? "Periaatteet" : "Principles"}</span>
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
              {locale === "fi" ? "Miten me toimimme" : "How we operate"}
            </span>
          </div>

          {/* Principle rows */}
          {v.map((item, i) => (
            <div
              key={item.n}
              className={`grid grid-cols-[2rem_1fr] gap-x-6 gap-y-4 py-10 md:grid-cols-[3rem_1fr_minmax(0,38%)] md:gap-x-12 md:py-14${i < v.length - 1 ? " border-b border-dashed border-w-white-15" : ""}`}
            >
              <span className="font-mono text-[0.625rem] tracking-[0.08em] text-w-white-30 pt-[0.6em]">{item.n}</span>
              <h3 className="font-display text-[clamp(1.75rem,3.5vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white md:col-start-2">
                {item.t}
              </h3>
              <p className="col-start-2 text-[0.9375rem] leading-[1.75] text-w-white-50 md:col-start-3 md:row-start-1 md:pt-[0.5em]">
                {item.d}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Team carousel */}
      <section className="border-b border-dashed border-w-white-15">
        <style>{`
          @keyframes team-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .team-track {
            animation: team-marquee 75s linear infinite;
            will-change: transform;
          }
          .team-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex items-center justify-between border-b border-dashed border-w-white-15 py-8">
            <span className="tag">{locale === "fi" ? "Tiimi" : "Team"}</span>
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
              {team.length} {locale === "fi" ? "henkilöä" : "people"}
            </span>
          </div>
        </div>

        <div
          className="overflow-hidden py-8 md:py-10"
          style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
        >
          <div className="team-track flex w-max gap-4">
            {[...team, ...team].map((person, i) => (
              <div key={i} className="w-[13.5rem] shrink-0 dashed-box flex flex-col overflow-hidden">
                <div className="relative aspect-square w-full overflow-hidden bg-w-white-4">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover object-center grayscale"
                    sizes="216px"
                  />
                  <div className="absolute inset-0 bg-w-black/10" />
                </div>
                <div className="border-t border-dashed border-w-white-15 px-4 py-4">
                  <p className="font-mono text-[0.8125rem] font-normal uppercase tracking-[0.01em] text-w-white leading-tight">{person.name}</p>
                  <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{person.role[locale === "fi" ? "fi" : "en"]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Rakennetaan jotain merkittävää." : "Let's build something significant."}
            </h2>
            <Link href={`/${locale}/ota-yhteytta`} className="btn-primary shrink-0">
              <span className="btn-label">{locale === "fi" ? "Ota yhteyttä" : "Get in touch"}</span>
              <span className="btn-arrow text-w-black/40">→</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
