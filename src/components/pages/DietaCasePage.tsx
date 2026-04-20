"use client";

import React from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Yhteydenotto } from "@/components/Yhteydenotto";

const stats = [
  { valueFi: "+24%", valueEn: "+24%", labelFi: "Verkkokauppatilausten kasvu vuoden aikana", labelEn: "E-commerce order growth year-on-year" },
  { valueFi: "+77%", valueEn: "+77%", labelFi: "Vierailijoiden konversioasteen kasvu", labelEn: "Visitor conversion rate growth" },
  { valueFi: "+22%", valueEn: "+22%", labelFi: "Verkkokaupan liikevaihdon kasvu", labelEn: "E-commerce revenue growth" },
];

const techStack = [
  { name: "Shopify", roleFi: "Verkkokauppa-alusta", roleEn: "Commerce platform" },
  { name: "Contentful", roleFi: "Sisällönhallinta", roleEn: "Content management" },
  { name: "Algolia", roleFi: "Hakukone", roleEn: "Search engine" },
  { name: "Next.js & React", roleFi: "Käyttöliittymäkehys", roleEn: "Frontend framework" },
];

const benefits = [
  {
    fi: "Arkkitehtuuri kestää aikaa. Jokainen palikka on vaihdettavissa.",
    en: "Architecture built to last. Every component is replaceable.",
  },
  {
    fi: "Käyttökokemusinnovaatioiden mahdollistaminen",
    en: "Enables user experience innovation",
  },
  {
    fi: "Joustavammat integraatiot eri järjestelmien välillä",
    en: "Smoother integrations between systems",
  },
  {
    fi: "Datan yhteneväisyyden ja laadun merkittävä parantuminen",
    en: "Significant improvement in data consistency and quality",
  },
  {
    fi: "Palvelutoimittajariippumattomuus — vendor lock -riskin minimointi",
    en: "Vendor independence — minimising lock-in risk",
  },
  {
    fi: "Mahdollisuus \u201cunelmatalon rakentamiseen\u201d k\u00e4ytt\u00e4en vain parhaita komponentteja",
    en: "The ability to build a \u201cdream home\u201d using only best-in-class components",
  },
];

export function DietaCasePage() {
  const locale = useLocale();
  const isFi = locale === "fi";

  return (
    <main className="bg-w-black">

      {/* ── Hero ── */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden md:h-[72vh]">
        <Image
          src="/images/cases/dieta-hero.webp"
          alt="Dieta"
          fill
          priority
          className="object-cover md:object-center" style={{ objectPosition: "50% 25%" }}
          sizes="100vw"
        />
        {/* Gradient overlay — taller on mobile */}
        <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, #03040a 0%, #03040a 30%, rgba(3,4,10,0.95) 44%, rgba(3,4,10,0.7) 58%, rgba(3,4,10,0.3) 72%, rgba(3,4,10,0) 85%)" }} />
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to top, #03040a 0%, #03040a 18%, rgba(3,4,10,0.95) 28%, rgba(3,4,10,0.7) 40%, rgba(3,4,10,0.3) 52%, rgba(3,4,10,0) 65%)" }} />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-[90rem] px-6 pb-6 md:px-10 md:pb-10">
            {/* Breadcrumb */}
            <div className="mb-3 flex items-center gap-2">
              <Link
                href={`/${locale}/yhteistyot`}
                className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-50 transition-colors hover:text-w-white"
              >
                {isFi ? "Yhteistyöt" : "Work"}
              </Link>
              <span className="font-mono text-[0.625rem] text-w-white-30">/</span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                Dieta
              </span>
            </div>

            {/* Logo */}
            <div className="mb-3">
              <Image
                src="/images/logos/dieta.avif"
                alt="Dieta"
                width={240}
                height={80}
                className="h-[44px] w-auto brightness-0 invert opacity-90"
              />
            </div>

            {/* Title */}
            <h1 className="max-w-3xl font-display text-[clamp(1.625rem,3.4vw,3rem)] font-normal leading-[1.08] tracking-[-0.03em] text-w-white">
              {isFi
                ? "Yksi Dieta — kaikki tuotteet ja palvelut yhteen myyntikanavaan"
                : "One Dieta — all products and services in a single sales channel"}
            </h1>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="tag">Composable Commerce</span>
              <span className="tag">Sovelluskehitys</span>
              <span className="tag">UI/UX Design</span>
              <span className="tag">2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-t border-b border-dashed border-w-white-15">
        <div className="flex flex-col md:flex-row">
          {stats.map((s, i) => (
            <React.Fragment key={s.valueFi}>
              {i > 0 && <div className="h-px w-full shrink-0 md:h-auto md:w-px md:self-stretch" style={{ background: "var(--dash-v)" }} />}
              <div className="flex-1 py-8 text-center md:py-12">
                <p className="font-mono text-[clamp(2rem,4.5vw,3.75rem)] font-normal leading-[1] tracking-[0.01em] text-w-white">
                  {isFi ? s.valueFi : s.valueEn}
                </p>
                <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-50">
                  {isFi ? s.labelFi : s.labelEn}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="grid grid-cols-1 gap-0 py-16 md:grid-cols-[1fr_2fr] md:gap-16 md:py-24">
            {/* Left label */}
            <div>
              <span className="tag mb-4 inline-block">{isFi ? "Projekti" : "Project"}</span>
              <div className="mt-2 space-y-1">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">Dieta Oy</p>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">2024</p>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.06em] text-w-white-30">
                  {isFi ? "Ammattikeittiöt" : "Professional kitchens"}
                </p>
              </div>
            </div>

            {/* Right text */}
            <div className="mt-5 md:mt-0">
              <p className="font-display text-[clamp(1.125rem,2vw,1.5rem)] font-normal leading-[1.55] tracking-[-0.015em] text-w-white-90">
                {isFi
                  ? "Dieta on toiminut jo yli 30 vuoden ajan luotettavana kumppanina ammattikeittiöissä, tarjoten kaiken tarvittavan laitteista astioihin ja palveluihin. Kun yrityksen vanha verkkokauppa ja jäykät IT-ratkaisut eivät enää tukeneet kasvutavoitteita, niin Dieta halusi ottaa merkittävän kasvuloikan eteenpäin."
                  : "Dieta has served as a trusted partner in professional kitchens for over 30 years, offering everything from equipment to tableware and services. When their legacy e-commerce platform and rigid IT systems could no longer support their growth ambitions, Dieta decided to take a significant leap forward."}
              </p>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-70">
                {isFi
                  ? "T\u00e4ss\u00e4 yhteisty\u00f6projektissa emme tyytyneet \u201cgood enough\u201d -ajatteluun, vaan rakensimme yhdess\u00e4 t\u00e4ysin uudenlaisen palvelualustan, joka vastaa sek\u00e4 nykypäivän haasteisiin että tulevaisuuden mahdollisuuksiin. Tuloksena syntyi ratkaisu, joka ei ainoastaan päivitä Dietan digitaalista läsnäoloa, vaan nostaa koko asiakaskokemuksen uudelle tasolle."
                  : "In this collaboration we refused to settle for \u201cgood enough\u201d \u2014 instead we built an entirely new service platform together that addresses both today\u2019s challenges and tomorrow\u2019s opportunities. The result is a solution that not only updates Dieta\u2019s digital presence but elevates the entire customer experience to a new level."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Haaste ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Haaste" : "Challenge"}</span>

            <div className="max-w-2xl">
              <p className="text-[1rem] leading-[1.75] text-w-white-70">
                {isFi
                  ? "Dietan vanha verkkokauppa oli ajan saatossa muuttunut kalliiksi ylläpitää ja vaikeaksi kehittää. Vanhat ratkaisut eivät enää palvelleet yrityksen kasvutavoitteita eivätkä tuoneet asiakkaan ansaitsemaa digitaalista lisäarvoa."
                  : "Dieta's legacy e-commerce platform had become costly to maintain and difficult to develop. Old solutions no longer served the company's growth goals or delivered the digital value their customers deserved."}
              </p>
              <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                {isFi
                  ? "Monoliittiset taustaratkaisut olivat ajaneet innovatiivisen yrityksen tilanteeseen, jossa kehitykselle oli selkeät, mutta ahtaat raamit — monoliitin yksinkertaisuus rajoitti innovointia."
                  : "Monolithic backend architecture had pushed an innovative company into a position where development had clear but narrow constraints — the simplicity of the monolith was limiting innovation."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Esiselvitys ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Esiselvitys" : "Discovery"}</span>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
              {/* Left: text */}
              <div>
                <h2 className="font-display text-[clamp(1.375rem,2.6vw,2.25rem)] font-normal leading-[1.2] tracking-[-0.025em] text-w-white">
                  {isFi
                    ? "Composable Commerce arkkitehtuurina"
                    : "Composable Commerce as architecture"}
                </h2>
                <p className="mt-5 text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "Dieta oli pitkään halunnut kiihdyttää verkkokaupan kasvua, kun aloitimme keskustelut uusista mahdollisuuksista. Websolla oli selkeänä visio miten modulaarisella sovellusarkkitehtuurilla tuodaan lisäarvoa liiketoiminnalle. Sovimme perusteellisen esiselvityksen tekemisestä, jolla kartoittaisimme kaikki potentiaaliset verkkokauppa-alustat ja tekniset vaihtoehdot. Tutkimme laajan kirjon B2B kauppa-alustoja, ja analysoimme perusteellisesti kunkin ratkaisun vahvuudet ja heikkoudet. Emme tyytyneet hyvään vaan etsimme erinomaista. Tavoitteena oli löytää Dietalle paras ratkaisu. Esiselvityksen lopputuloksena suosittelimme Composable Commerce -arkkitehtuuriin perustuvaa ratkaisua."
                    : "Dieta had long wanted to accelerate e-commerce growth when we began discussions about new possibilities. Webso had a clear vision for how modular application architecture could add business value. We agreed to conduct a thorough pre-study mapping all potential e-commerce platforms and technical options. We researched a wide range of B2B commerce platforms and thoroughly analysed the strengths and weaknesses of each solution. We didn't settle for good — we sought excellence. The goal was to find the best solution for Dieta. The pre-study concluded with a recommendation for a Composable Commerce architecture."}
                </p>
                <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                  {isFi
                    ? "Composable Commerce -arkkitehtuuri tarkoittaa käytännössä sitä, että monoliitin sijaan hyödynnetään usean eri huippuluokan palvelun rajapintoja, joista muodostetaan yksi kokonaisuus räätälöidyllä käyttöliittymällä."
                    : "Composable Commerce architecture means leveraging APIs from multiple best-in-class services to form a unified whole with a custom interface, rather than relying on a monolith."}
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
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Stack & Arkkitehtuuri" : "Stack & Architecture"}</span>

            <p className="mb-10 max-w-2xl text-[1rem] leading-[1.75] text-w-white-70">
              {isFi
                ? "Esiselvityksen perusteella Dieta teki päätöksen täysin uuden palvelualustan rakentamisesta Composable Commerce -arkkitehtuurilla. Kattavan esiselvityksen ansiosta valitsimme optimaalisen kokonaisuuden, joka koostuu seuraavista komponenteista:"
                : "Based on the pre-study, Dieta decided to build an entirely new service platform using Composable Commerce architecture. Thanks to the comprehensive pre-study, we selected the optimal combination consisting of the following components:"}
            </p>

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
                ? "Käyttöliittymä rakennettiin alusta loppuun täysin räätälöitynä, mikä mahdollisti aidon innovoinnin. Dietan digitiimin ei tarvinnut tinkiä helposta käyttökokemuksesta, sillä sen takaavat markkinoiden parhaat ratkaisut kuten Shopify ja Contentful."
                : "The frontend was built entirely custom from scratch, enabling genuine innovation. Dieta's digital team didn't have to compromise on usability, because that's guaranteed by best-in-class solutions like Shopify and Contentful."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Detail image ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem]">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src="/images/cases/dieta-photo-3.webp"
              alt={isFi ? "Dietan verkkokauppa" : "Dieta e-commerce"}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0" style={{ border: "1px dashed rgba(255,255,255,0.08)" }} />
            {/* Blue accent line — left edge */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-w-accent" />
          </div>
        </div>
      </section>

      {/* ── Implementaatio ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Implementaatio" : "Implementation"}</span>

            <div className="max-w-2xl">
              <p className="text-[1rem] leading-[1.75] text-w-white-70">
                {isFi
                  ? "Implementaatio aloitettiin kattavalla design sprint -kokonaisuudella, jossa tehtiin syväluotaus ostopolkuihin sekä käyttäjäsegmentteihin. Tavoitteena oli suunnitella palvelualusta, joka palvelee uusia asiakkaita intuitiivisesti sekä tarjoaa tehokäyttäjille mahdollisuuden ketterään interaktioon verkkopalvelun kanssa. Design-osuuden jälkeen jatkoimme tiivistä yhteistyötä kehityksen aikana kehityssprinttien avulla."
                  : "Implementation began with a comprehensive design sprint series, deep-diving into purchase journeys and user segments. The goal was to design a service platform that serves new customers intuitively while giving power users the ability to interact with the service efficiently. After the design phase, we continued close collaboration throughout development via development sprints."}
              </p>
              <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                {isFi
                  ? "Laajoihin IT-projekteihin liittyy aina omat haasteensa, ja markkinatutkimusten mukaan jopa 60 % projekteista jää tavoitteistaan. Keskeinen syy epäonnistumisiin on usein puutteellinen kommunikaatio ja odotusten yhteensovittaminen. Näihin riskeihin olimme varautuneet huolellisesti jo projektin suunnitteluvaiheessa. Meidän yhteisessä projektissa onnistuimme luomaan avoimen ja toimivan kommunikaation, tämä mahdollisti sujuvan yhteistyön."
                  : "Large IT projects always come with their own challenges, and market research shows up to 60% of projects fall short of their goals. The root cause is often inadequate communication and misaligned expectations — risks we addressed carefully during the planning phase. In our joint project, we succeeded in creating open and effective communication, which enabled smooth collaboration throughout."}
              </p>
              <p className="mt-4 text-[1rem] leading-[1.75] text-w-white-70">
                {isFi
                  ? "Projektin onnistumisen kannalta tärkeintä oli tiimien sulautuminen yhteen. Dietan digitiimi ja Webson iskuryhmä tekivät töitä rinta rinnan koko projektin ajan. Aikataulu sekä budjetti eivät olisi pysyneet hallinnassa ilman erinomaista synergiaa tiimien välillä."
                  : "The key to the project's success was the fusion of both teams. Dieta's digital team and Webso's strike team worked side by side throughout the entire project. The timeline and budget could not have been kept under control without the excellent synergy between the teams."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Loppukaneetti ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
          <div className="py-16 md:py-24">
            <span className="tag mb-10 inline-block">{isFi ? "Loppukaneetti" : "Conclusion"}</span>
            <p className="max-w-2xl text-[1rem] leading-[1.75] text-w-white-70">
              {isFi
                ? "Projekti osoittaa erinomaisesti, kuinka \u201cgood is the enemy of great\u201d -ajattelumme tuottaa tuloksia. Emme tyytyneet tavanomaiseen ratkaisuun, vaan rakensimme aidosti erinomaisen kokonaisuuden, joka palvelee Dietan asiakkaita ja liiketoimintaa ylivertaisesti vuosia eteenpäin."
                : "This project perfectly demonstrates how our \u201cgood is the enemy of great\u201d thinking delivers results. We didn\u2019t settle for an ordinary solution \u2014 we built a genuinely outstanding whole that serves Dieta\u2019s customers and business superbly for years to come."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Second photo ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem]">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src="/images/cases/dieta-photo-2.avif"
              alt={isFi ? "Dieta" : "Dieta"}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0" style={{ border: "1px dashed rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10 py-16 md:py-28">
          <div className="flex items-start gap-6">
            <div className="hidden md:block shrink-0 mt-2 w-px self-stretch bg-w-accent" />
            <div className="max-w-3xl">
              <blockquote className="font-display text-[clamp(1.375rem,2.8vw,2.25rem)] font-normal leading-[1.35] tracking-[-0.025em] text-w-white">
                &ldquo;
                {isFi
                  ? "Yhteinen projekti sujui ketterästi ja tehokkaasti, ja pystyimme ratkomaan haasteita nopeasti. Lopputulos on moderni ja visuaalisesti miellyttävä, mutta ennen kaikkea teknisesti huippuluokkaa."
                  : "The joint project ran agile and efficiently, and we were able to resolve challenges quickly. The result is modern and visually appealing, but above all technically top-notch."}
                &rdquo;
              </blockquote>
              <footer className="mt-8 flex items-center gap-5">
                <Image
                  src="/images/logos/dieta.avif"
                  alt="Dieta"
                  width={120}
                  height={42}
                  className="h-[28px] w-auto brightness-0 invert opacity-40"
                />
                <div className="h-6 w-px" style={{ background: "var(--dash-v)" }} />
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-70">
                    Jukka Poméll
                  </p>
                  <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                    eCommerce Manager, Dieta
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </section>

      <Yhteydenotto />

    </main>
  );
}
