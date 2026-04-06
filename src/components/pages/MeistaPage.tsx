"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

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

const team = [
  { name: "Pekka", role: "CEO", image: "/images/team/pekka.webp" },
  { name: "Aleksi", role: "Lead Engineer", image: null },
  { name: "Mikko", role: "Full Stack Developer", image: null },
  { name: "Sami", role: "AI Engineer", image: null },
  { name: "Joonas", role: "Full Stack Developer", image: null },
  { name: "Lauri", role: "Backend Engineer", image: null },
  { name: "Tommi", role: "DevOps Engineer", image: null },
  { name: "Antti", role: "Frontend Developer", image: null },
  { name: "Ville", role: "Software Engineer", image: null },
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
                ? "Perustettu 2020. Rakennamme tietojärjestelmiä hyödyntäen tekoälyä koko kehitysprosessissa."
                : "Founded 2020. We build enterprise systems using AI throughout the entire development process."}
            </p>
          </div>
        </div>
      </section>

      {/* Story — sticky two-column with stats */}
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
                  ? "Webso syntyi tarpeesta tehdä ohjelmistokehitystä paremmin. Tekoäly ei ole meillä trendi — se on integroitu kaikkeen."
                  : "Webso was born from the need to do software development better. AI isn't a trend here — it's integrated into everything."}
              </p>
            </div>

            <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

            {/* Stats */}
            <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2020", label: locale === "fi" ? "Perustettu" : "Founded" },
                  { value: "15+", label: locale === "fi" ? "Konsulttia" : "Consultants" },
                  { value: "30+", label: locale === "fi" ? "Projektia" : "Projects" },
                  { value: "98%", label: locale === "fi" ? "Asiakastyytyväisyys" : "Client satisfaction" },
                ].map((s) => (
                  <div key={s.label} className="dashed-box p-5 sm:p-8">
                    <p className="font-mono text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em] text-w-white">{s.value}</p>
                    <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles — card grid */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-10 md:py-20">
            <p className="mb-10 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Periaatteet" : "Principles"}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {v.map((item) => (
                <div key={item.n} className="dashed-box bg-w-black p-5 sm:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-4 bg-w-accent" />
                    <span className="font-mono text-[0.625rem] tracking-[0.06em] text-w-accent">{item.n}</span>
                  </div>
                  <h3 className="font-mono text-[1rem] font-normal uppercase leading-[1.3] tracking-[0.01em] text-w-white">
                    {item.t}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-[1.65] text-w-white-50">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team — 3x3 grid */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-10 md:pb-24 md:pt-10">
            <div className="mb-10 flex items-center justify-between border-b border-dashed border-w-white-15 pb-8">
              <span className="tag">{locale === "fi" ? "Tiimi" : "Team"}</span>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                {team.length} {locale === "fi" ? "henkilöä" : "people"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
              {team.map((person) => (
                <div key={person.name} className="dashed-box flex flex-col overflow-hidden">
                  {/* Photo or placeholder */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-w-white-4">
                    {person.image ? (
                      <>
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-w-black/10" />
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-none tracking-[-0.04em] text-w-white-8">
                          {person.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="border-t border-dashed border-w-white-15 px-4 py-4 sm:px-5 sm:py-5">
                    <p className="font-mono text-[0.875rem] font-normal uppercase tracking-[0.01em] text-w-white">{person.name}</p>
                    <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>
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
