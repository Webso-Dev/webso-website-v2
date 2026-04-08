"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FormSuccess } from "@/components/FormSuccess";

const outcomes = [
  { fi: "Reaaliaikainen\nlaskenta", en: "Real-time\ncalculation" },
  { fi: "Täysi\nmobiilituki", en: "Full\nmobile support" },
  { fi: "Moderni\nkäyttöliittymä", en: "Modern\ninterface" },
];

const techStack = [
  { name: "Laravel", roleFi: "REST-rajapinta", roleEn: "REST API" },
  { name: "React", roleFi: "Käyttöliittymäkehys", roleEn: "Frontend framework" },
  { name: "MySQL", roleFi: "Tietokanta", roleEn: "Database" },
  { name: "Directus CMS", roleFi: "Sisällönhallinta", roleEn: "Content management" },
];

const benefits = [
  {
    fi: "Reaaliaikainen laskenta aiemman vuorokausipäivityksen sijaan",
    en: "Real-time calculation replacing the previous daily update cycle",
  },
  {
    fi: "Optimoitu suorituskyky myös laajalle tietokannalle",
    en: "Optimised performance even for a large database",
  },
  {
    fi: "Täysi mobiilituki kentällä tapahtuvaan havainnointiin",
    en: "Full mobile support for field observations",
  },
  {
    fi: "Joustava arkkitehtuuri tulevaisuuden laajennuksia varten",
    en: "Flexible architecture for future extensions",
  },
  {
    fi: "Helposti ylläpidettävä ja päivitettävä tekninen toteutus",
    en: "Easy to maintain and update technical implementation",
  },
  {
    fi: "Mahdollisuus siirtyä päivitettyihin IOC-lajilistoihin",
    en: "Ability to migrate to updated IOC species lists",
  },
];

export function BongariliittoCasePage() {
  const locale = useLocale();
  const isFi = locale === "fi";

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [values, setValues] = useState({ nimi: "", sahkoposti: "", viesti: "", yritys: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validators: Record<string, (v: string) => boolean> = {
    nimi: (v) => v.trim().length >= 2,
    sahkoposti: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    viesti: (v) => v.trim().length >= 10,
    yritys: (v) => v.trim().length >= 1,
  };
  const fieldOk = (k: string) => touched[k] && validators[k]?.(values[k as keyof typeof values] ?? "");
  const fieldErr = (k: string) => touched[k] && validators[k] && !validators[k](values[k as keyof typeof values] ?? "");
  const isComplete = Object.entries(validators).every(([k, fn]) => fn(values[k as keyof typeof values] ?? ""));
  const inputCls = (k: string) =>
    `w-full bg-transparent px-3 py-2.5 text-[0.875rem] text-w-white outline-none transition-all duration-200 placeholder:text-white/25 dashed-box${fieldErr(k) ? " opacity-80" : ""}`;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ nimi: true, sahkoposti: true, viesti: true, yritys: true });
    if (!isComplete) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <main className="bg-w-black">

      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden md:h-[72vh]">
        <Image
          src="/images/cases/bongariliitto-hero.webp"
          alt="Bongariliitto"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #03040a 0%, #03040a 18%, rgba(3,4,10,0.9) 30%, rgba(3,4,10,0) 47%)" }} />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-[90rem] px-6 pb-12 md:px-10 md:pb-16">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2">
              <Link
                href={`/${locale}/yhteistyot`}
                className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-50 transition-colors hover:text-w-white"
              >
                {isFi ? "Yhteistyöt" : "Work"}
              </Link>
              <span className="font-mono text-[0.625rem] text-w-white-30">/</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                Bongariliitto
              </span>
            </div>

            {/* Logo */}
            <div className="mb-5">
              <Image
                src="/images/logos/bongariliitto.avif"
                alt="Bongariliitto"
                width={240}
                height={80}
                className="h-[44px] w-auto brightness-0 invert opacity-90"
              />
            </div>

            {/* Title */}
            <h1 className="max-w-3xl font-display text-[clamp(1.625rem,3.4vw,3rem)] font-normal leading-[1.08] tracking-[-0.03em] text-w-white">
              {isFi
                ? "Lintuilun teknologiaharppaus"
                : "A technological leap for birdwatching"}
            </h1>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="tag">Sovelluskehitys</span>
              <span className="tag">UI/UX Design</span>
              <span className="tag">Architecture Design</span>
              <span className="tag">2021</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Outcomes bar ── */}
      <section className="border-t border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex">
            {outcomes.map((o, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px shrink-0 self-stretch" style={{ background: "var(--dash-v)" }} />}
                <div className="flex-1 py-8 text-center md:py-12">
                  <p className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.2] tracking-[0.01em] text-w-white whitespace-pre-line">
                    {isFi ? o.fi : o.en}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-0 py-16 md:grid-cols-[1fr_2fr] md:gap-16 md:py-24">
            {/* Left label */}
            <div>
              <span className="tag mb-4 inline-block">{isFi ? "Projekti" : "Project"}</span>
              <div className="mt-2 space-y-1">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">Suomen Bongariliitto ry</p>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">2021</p>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                  {isFi ? "Lintuharrastus" : "Birdwatching"}
                </p>
              </div>
            </div>

            {/* Right text */}
            <div>
              <p className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-normal leading-[1.55] tracking-[-0.015em] text-w-white-90">
                {isFi
                  ? "Suomen Bongariliitto ry on toiminut jo vuosikymmeniä suomalaisten lintuharrastajien keskeisenä yhteisönä, tarjoten jäsenilleen monipuolisia palveluita harrastuksen tukemiseksi."
                  : "Suomen Bongariliitto ry has served for decades as the central community for Finnish birdwatching enthusiasts, offering its members a wide range of services to support the hobby."}
              </p>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-70">
                {isFi
                  ? "Rakensimme kokonaan uuden sovelluksen, joka mahdollistaa reaaliaikaisen lintubongauksen dokumentoinnin missä ja milloin tahansa. Vanha Pinnari-j\u00e4rjestelm\u00e4 korvattiin modernilla kokonaisratkaisulla, joka palvelee harrastajia sek\u00e4 toimistolla ett\u00e4 maastossa."
                  : "We built an entirely new application enabling real-time birdwatching documentation anywhere, anytime. The legacy Pinnari system was replaced with a modern complete solution that serves enthusiasts both at the desk and in the field."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Haaste ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Haaste" : "Challenge"}</span>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
              {/* Left: challenge text */}
              <div>
                <p className="text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "Pinnari-j\u00e4rjestelm\u00e4 oli kasvanut ulos alkuper\u00e4isist\u00e4 suunnitteluraameistaan. Tietokanta oli paisunut miljooniin havaintoriveihin, mik\u00e4 aiheutti merkitt\u00e4vi\u00e4 suorituskykyongelmia."
                    : "The Pinnari system had outgrown its original design parameters. The database had swollen to millions of observation rows, causing significant performance issues."}
                </p>
                <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "J\u00e4rjestelm\u00e4 pystyi p\u00e4ivitt\u00e4m\u00e4\u00e4n pisteit\u00e4 ja listoja vain kerran vuorokaudessa. K\u00e4ytt\u00f6liittym\u00e4\u00e4 ei oltu suunniteltu mobiililaitteille \u2014 kriittinen puute aktiiviselle kentt\u00e4harrastajalle."
                    : "The system could only update scores and lists once a day. The interface wasn\u2019t designed for mobile devices \u2014 a critical shortcoming for an active field enthusiast."}
                </p>
              </div>

              {/* Right: challenge highlights */}
              <div className="dashed-box p-6 md:p-8">
                <div className="mb-4 h-px w-8 bg-w-accent" />
                <ul className="space-y-4">
                  {[
                    { fi: "Tietokannassa miljoonia havaintorivej\u00e4", en: "Millions of observation rows in the database" },
                    { fi: "Pistep\u00e4ivitys vain kerran vuorokaudessa", en: "Score updates only once per day" },
                    { fi: "Ei mobiilitukea kent\u00e4ll\u00e4 ty\u00f6skentelyyn", en: "No mobile support for field use" },
                    { fi: "Vanhat IOC-lajilistat k\u00e4yt\u00f6ss\u00e4", en: "Outdated IOC species lists in use" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-w-accent" />
                      <span className="text-[0.9375rem] leading-[1.6] text-w-white-70">
                        {isFi ? item.fi : item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Esiselvitys ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Esiselvitys" : "Discovery"}</span>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
              {/* Left: text */}
              <div>
                <h2 className="font-display text-[clamp(1.375rem,2.6vw,2.25rem)] font-normal leading-[1.2] tracking-[-0.025em] text-w-white">
                  {isFi
                    ? "Moderni komponenteista koostuva kokonaisratkaisu"
                    : "A modern component-based complete solution"}
                </h2>
                <p className="mt-5 text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "Aloitimme yhteisty\u00f6n kartoittamalla perusteellisesti sek\u00e4 liiton ett\u00e4 sen j\u00e4senten tarpeet. Analysoimme vanhan j\u00e4rjestelm\u00e4n arkkitehtuurin, tietokannan rakenteen ja k\u00e4ytt\u00e4jien toimintatavat kent\u00e4ll\u00e4."
                    : "We began the collaboration by thoroughly mapping the needs of both the association and its members. We analysed the old system\u2019s architecture, database structure, and how users actually operated in the field."}
                </p>
                <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "P\u00e4\u00e4dyimme suosittelemaan modernista komponenteista koostuvaa kokonaisratkaisua, joka rakennettaisiin alusta alkaen mobiili edell\u00e4. Uusi j\u00e4rjestelm\u00e4 ei ainoastaan korvaisi vanhaa \u2014 se mahdollistaisi toiminnot, jotka eiv\u00e4t olleet aiemmin mahdollisia."
                    : "We concluded by recommending a modern component-based complete solution built mobile-first from the ground up. The new system wouldn\u2019t just replace the old one \u2014 it would enable functionality that simply hadn\u2019t been possible before."}
                </p>
              </div>

              {/* Right: benefits list */}
              <div>
                <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                  {isFi ? "Hyödyt" : "Benefits"}
                </p>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-w-accent" />
                      <span className="text-[0.9375rem] leading-[1.6] text-w-white-70">
                        {isFi ? b.fi : b.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Stack & Arkkitehtuuri" : "Stack & Architecture"}</span>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0">
              {techStack.map((t, i) => (
                <div
                  key={t.name}
                  className="dashed-box p-6 md:p-8"
                  style={i > 0 ? { marginLeft: "-1px" } : {}}
                >
                  <p className="font-mono text-[clamp(0.875rem,1.4vw,1.125rem)] font-normal uppercase tracking-[0.02em] text-w-white">
                    {t.name}
                  </p>
                  <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                    {isFi ? t.roleFi : t.roleEn}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-[1rem] leading-[1.75] text-w-white-70">
              {isFi
                ? "J\u00e4rjestelm\u00e4 konteissa Docker-ymp\u00e4rist\u00f6ss\u00e4, mik\u00e4 mahdollistaa joustavan skaalauksen ja helpon ymp\u00e4rist\u00f6jen hallinnan. Directus CMS antaa liiton hallinnon yll\u00e4pit\u00e4\u00e4 sis\u00e4lt\u00f6\u00e4 ilman teknist\u00e4 osaamista."
                : "The system runs in Docker containers for flexible scaling and easy environment management. Directus CMS allows the association\u2019s admins to manage content without technical expertise."}
            </p>
          </div>
        </div>
      </section>

      {/* ── UI screenshot ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem]">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src="/images/cases/bongariliitto-photo-2.webp"
              alt={isFi ? "Bongariliitto sovellus" : "Bongariliitto app"}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0" style={{ border: "1px dashed rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ── Implementaatio ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Implementaatio" : "Implementation"}</span>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
              {/* Left: text */}
              <div>
                <p className="text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? '"Mobile first" -suunnittelu oli projektin kulmakivi. Jokainen n\u00e4kym\u00e4 ja interaktio suunniteltiin ensin pienelle n\u00e4yt\u00f6lle \u2014 kent\u00e4ll\u00e4 seisova bongaaja puhelimessaan. Vasta sen j\u00e4lkeen laajennettiin desktop-n\u00e4kym\u00e4ksi.'
                    : '"Mobile first" design was the cornerstone of the project. Every view and interaction was designed first for the small screen \u2014 a birdwatcher standing in the field with their phone. Only then was it expanded to a desktop view.'}
                </p>
                <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "Sovelsimme kevennetty\u00e4 sprint-mallia, jossa jokainen toiminnallisuus validoitiin oikeiden k\u00e4ytt\u00e4jien kanssa ennen seuraavaan vaiheeseen siirtymist\u00e4. Suurimpana haasteena oli ymm\u00e4rt\u00e4\u00e4 vanhan j\u00e4rjestelm\u00e4n monimutkaiset laskentamallit ja toteuttaa ne uudelleen reaaliajassa."
                    : "We applied a lightweight sprint model where each feature was validated with real users before moving to the next phase. The greatest challenge was understanding the old system\u2019s complex calculation models and reimplementing them in real time."}
                </p>
                <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "IOC-lajilistojen p\u00e4ivitys oli strategisesti merkitt\u00e4v\u00e4 askel \u2014 j\u00e4rjestelm\u00e4 rakennettiin siten, ett\u00e4 tulevat lista-p\u00e4ivitykset voidaan tehd\u00e4 ilman koodimuutoksia."
                    : "Updating to the IOC species lists was a strategically significant step \u2014 the system was built so that future list updates can be made without code changes."}
                </p>
              </div>

              {/* Right: outcomes */}
              <div className="dashed-box p-6 md:p-8">
                <div className="mb-4 h-px w-8 bg-w-accent" />
                <p className="mb-5 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                  {isFi ? "Lopputulos" : "Outcome"}
                </p>
                <ul className="space-y-4">
                  {[
                    { fi: "Reaaliaikainen havaintojen kirjaaminen ja laskenta", en: "Real-time observation logging and calculation" },
                    { fi: "T\u00e4ysi k\u00e4ytett\u00e4vyys mobiililaitteilla maastossa", en: "Full usability on mobile devices in the field" },
                    { fi: "Siirtyminen p\u00e4ivitettyihin IOC-lajilistoihin", en: "Migration to updated IOC species lists" },
                    { fi: "Merkitt\u00e4v\u00e4sti parantunut k\u00e4ytt\u00e4j\u00e4tyytyv\u00e4isyys liiton j\u00e4senten keskuudessa", en: "Significantly improved user satisfaction among members" },
                    { fi: "Moderni ja kaunis k\u00e4ytt\u00f6liittym\u00e4", en: "Modern and beautiful interface" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-w-accent" />
                      <span className="text-[0.9375rem] leading-[1.6] text-w-white-70">
                        {isFi ? item.fi : item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Second photo ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem]">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src="/images/cases/bongariliitto-hero.webp"
              alt={isFi ? "Bongariliitto" : "Bongariliitto"}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0" style={{ border: "1px dashed rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="border-b border-dashed border-w-white-15 overflow-hidden">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-10 md:py-16">

            {/* Section label + heading */}
            <div className="mb-8 md:mb-12">
              <span className="tag mb-6 inline-block">{isFi ? "Ota yhteyttä" : "Get in touch"}</span>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-normal leading-[1.08] tracking-[-0.03em] text-w-white">
                {isFi
                  ? "Kiinnostaako vastaava projekti?"
                  : "Interested in a similar project?"}
              </h2>
              <p className="mt-4 whitespace-nowrap text-[1rem] leading-[1.65] text-w-white-50">
                {isFi
                  ? "Vastaamme 24 tunnin sisällä. Tarjous viidessä arkipäivässä."
                  : "We respond within 24 hours. Proposal in five business days."}
              </p>
            </div>

            {/* 2-col: Pekka left, form right */}
            <div className="grid gap-4 md:grid-cols-2">

              {/* Left: Pekka photo + quote */}
              <div className="relative min-h-[480px] overflow-hidden md:min-h-0">
                <Image
                  src="/images/team/pekka_no_bg.avif"
                  alt="Pekka"
                  fill
                  className="object-contain"
                  style={{ objectPosition: "center calc(100% - 80px)" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(3,4,10,1) 0%, rgba(3,4,10,0.95) 18%, rgba(3,4,10,0.4) 38%, rgba(3,4,10,0) 55%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                  <p className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] font-normal leading-[1.25] tracking-[-0.03em] text-w-white">
                    {isFi ? "Kiinnostunut? Ota yhteyttä." : "Interested? Get in touch."}
                  </p>
                  <div className="mt-4">
                    <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-w-white-70">
                      Pekka Koskinen
                    </p>
                    <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                      {isFi ? "Toimitusjohtaja" : "CEO"}, Webso
                    </p>
                    <div className="mt-3 flex flex-col gap-1">
                      <a href="mailto:pekka@webso.fi" className="font-mono text-[0.75rem] text-w-white-30 transition-colors hover:text-w-white">
                        pekka@webso.fi
                      </a>
                      <a href="tel:+358445066448" className="font-mono text-[0.75rem] text-w-white-30 transition-colors hover:text-w-white">
                        +358 44 506 6448
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="dashed-box p-5 sm:p-7">
                {status === "sent" ? (
                  <div className="flex h-full min-h-[18rem] flex-col justify-center">
                    <FormSuccess fi={isFi} />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                          {isFi ? "Nimi" : "Name"} *
                        </label>
                        {fieldOk("nimi") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                      </div>
                      <input
                        name="nimi" type="text" autoComplete="name"
                        placeholder={isFi ? "Etunimi Sukunimi" : "First Last"}
                        value={values.nimi}
                        onChange={(e) => setValues((v) => ({ ...v, nimi: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, nimi: true }))}
                        className={inputCls("nimi")}
                      />
                      {fieldErr("nimi") && <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">{isFi ? "Syötä nimesi" : "Enter your name"}</p>}
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                          {isFi ? "Sähköposti" : "Email"} *
                        </label>
                        {fieldOk("sahkoposti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                      </div>
                      <input
                        name="sahkoposti" type="email" autoComplete="email"
                        placeholder={isFi ? "sinä@yritys.fi" : "you@company.com"}
                        value={values.sahkoposti}
                        onChange={(e) => setValues((v) => ({ ...v, sahkoposti: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, sahkoposti: true }))}
                        className={inputCls("sahkoposti")}
                      />
                      {fieldErr("sahkoposti") && <p className="mt-1 font-mono text-[0.5rem] text-w-white-30">{isFi ? "Tarkista sähköpostiosoite" : "Check your email address"}</p>}
                    </div>

                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                          {isFi ? "Viesti" : "Message"} *
                        </label>
                        {fieldOk("viesti") && <span className="font-mono text-[0.5625rem] text-w-accent">✓</span>}
                      </div>
                      <textarea
                        name="message" rows={4}
                        placeholder={isFi ? "Kerro lyhyesti projektista tai liiketoiminta mahdollisuudesta." : "Briefly describe the project or business opportunity."}
                        value={values.viesti}
                        onChange={(e) => setValues((v) => ({ ...v, viesti: e.target.value }))}
                        onBlur={() => setTouched((t) => ({ ...t, viesti: true }))}
                        className={`${inputCls("viesti")} resize-none`}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-w-white-50">
                        {isFi ? "Yritys" : "Company"} *
                      </label>
                      <input
                        name="yritys" type="text" autoComplete="organization"
                        placeholder={isFi ? "Yrityksen nimi" : "Company name"}
                        value={values.yritys}
                        onChange={(e) => setValues((v) => ({ ...v, yritys: e.target.value }))}
                        className={inputCls("yritys")}
                      />
                    </div>

                    <div className="mt-1 flex items-center gap-4">
                      <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-40">
                        <span className="btn-label">
                          {status === "sending" ? "..." : isFi ? "Lähetä viesti" : "Send message"}
                        </span>
                        <span className="btn-arrow text-w-black/40">→</span>
                      </button>
                      <span className="font-mono text-[0.5625rem] tracking-[0.04em] text-w-white-30">
                        {isFi ? "Vastaamme 24h sisällä." : "We respond within 24h."}
                      </span>
                    </div>

                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
