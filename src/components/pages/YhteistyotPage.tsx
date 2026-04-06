"use client";

import { useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Perfect 4×4 square grid — 80px spacing, all edges exactly H/V/45°
const GX = [195, 275, 355, 435];
const GY = [25, 105, 185, 265];
const NET_NODES = GY.flatMap((y) => GX.map((x) => ({ x, y })));

const NET_EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],
  [4,5],[5,6],[6,7],
  [8,9],[9,10],[10,11],
  [12,13],[13,14],[14,15],
  [0,4],[4,8],[8,12],
  [1,5],[5,9],[9,13],
  [2,6],[6,10],[10,14],
  [3,7],[7,11],[11,15],
  [0,5],[1,6],[2,7],
  [4,9],[5,10],[6,11],
  [8,13],[9,14],[10,15],
  [1,4],[2,5],[3,6],
  [5,8],[6,9],[7,10],
  [9,12],[10,13],[11,14],
];

const HUB = 6;
const ADJ: number[][] = NET_NODES.map(() => []);
NET_EDGES.forEach(([a, b]) => { ADJ[a].push(b); ADJ[b].push(a); });

function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lineEls  = Array.from(svg.querySelectorAll<SVGLineElement>(".net-edge"));
    const nodeEls  = Array.from(svg.querySelectorAll<SVGCircleElement>(".net-node"));
    const trailEls = Array.from(svg.querySelectorAll<SVGLineElement>(".net-trail"));
    const cursorEl = svg.querySelector<SVGCircleElement>(".net-cursor")!;
    const haloEl   = svg.querySelector<SVGCircleElement>(".net-halo")!;

    gsap.from(lineEls, { opacity: 0, duration: 0.5, stagger: 0.018, ease: "power1.out", delay: 0.1 });
    gsap.from(nodeEls, { opacity: 0, duration: 0.35, stagger: 0.03,  ease: "power1.out", delay: 0.35 });
    gsap.to(cursorEl,  { opacity: 1, duration: 0.25, delay: 0.8 });

    gsap.to(svg.querySelector(".net-hub-glow"), {
      attr: { r: 12 }, opacity: 0.45, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    let current = HUB;
    let previous = -1;
    let trailIdx = 0;
    let stopped = false;

    function step() {
      if (stopped) return;
      const nbrs = ADJ[current].filter((n) => n !== previous);
      const candidates = nbrs.length > 0 ? nbrs : ADJ[current];
      const next = candidates[Math.floor(Math.random() * candidates.length)];
      const n1 = NET_NODES[current];
      const n2 = NET_NODES[next];
      const len = Math.sqrt((n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2);

      const trail = trailEls[trailIdx % trailEls.length];
      trailIdx++;

      gsap.killTweensOf(trail);
      gsap.killTweensOf(cursorEl);

      const DRAW = 0.55;

      gsap.set(trail, {
        attr: { x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, strokeDasharray: len, strokeDashoffset: len },
        opacity: 1,
      });
      gsap.to(trail, { attr: { strokeDashoffset: 0 }, duration: DRAW, ease: "power1.inOut" });

      gsap.to(cursorEl, {
        attr: { cx: n2.x, cy: n2.y }, duration: DRAW, ease: "power1.inOut",
        onComplete: () => {
          gsap.set(haloEl, { attr: { cx: n2.x, cy: n2.y, r: 4 }, opacity: 0.75 });
          gsap.to(haloEl,  { attr: { r: 16 }, opacity: 0, duration: 0.7, ease: "sine.out" });
          gsap.to(trail,   { opacity: 0, duration: 2.8, delay: 0.2, ease: "sine.in" });
          previous = current;
          current = next;
          setTimeout(step, 420 + Math.random() * 280);
        },
      });
    }

    setTimeout(step, 900);
    return () => { stopped = true; };
  }, []);

  return (
    <svg ref={svgRef} viewBox="175 5 280 280" preserveAspectRatio="xMaxYMin meet"
      fill="none" className="pointer-events-none absolute inset-0 h-full w-full">
      {NET_EDGES.map(([a, b], i) => (
        <line key={i} className="net-edge"
          x1={NET_NODES[a].x} y1={NET_NODES[a].y}
          x2={NET_NODES[b].x} y2={NET_NODES[b].y}
          stroke="white" strokeOpacity="0.09" strokeWidth="1"
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <line key={i} className="net-trail"
          x1="0" y1="0" x2="0" y2="0"
          stroke="#1560D4" strokeWidth="2.5"
          strokeLinecap="square" opacity={0}
        />
      ))}
      {NET_NODES.map((n, i) => i !== HUB && (
        <circle key={i} className="net-node"
          cx={n.x} cy={n.y} r="3.5"
          stroke="white" strokeOpacity="0.25" strokeWidth="0.8"
          fill="rgba(255,255,255,0.05)"
        />
      ))}
      <circle className="net-hub-glow"
        cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="7"
        fill="rgba(21,96,212,0.25)" stroke="none" opacity={0}
      />
      <circle className="net-node"
        cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="5.5"
        stroke="#1560D4" strokeWidth="1.2" fill="rgba(21,96,212,0.4)"
      />
      <circle className="net-halo"
        cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="5"
        stroke="#1560D4" strokeWidth="1" fill="none" opacity={0}
      />
      <circle className="net-cursor"
        cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="3.5"
        fill="#1560D4" opacity={0}
      />
    </svg>
  );
}

const allCases = [
  {
    id: "dieta",
    titleFi: "Composable commerce -järjestelmä",
    titleEn: "Composable commerce system",
    descFi: "Modulaarinen verkkokauppajärjestelmä joka korvasi vanhentuneen alustan — nopeampi toimitus, alhaisemmat ylläpitokustannukset.",
    descEn: "Modular e-commerce system replacing an outdated platform — faster delivery, lower maintenance costs.",
    image: "/images/cases/dieta-hero.webp",
    logo: "/images/logos/dieta.avif",
    tag: "Sovelluskehitys",
    year: "2024",
  },
  {
    id: "evolver",
    titleFi: "AI-pohjainen prosessiautomaatio",
    titleEn: "AI-powered process automation",
    descFi: "Rakensimme AI-agentin joka automatisoi manuaalisen datan käsittelyn. Toistuva työ poistui — tiimi pystyi keskittymään olennaiseen.",
    descEn: "We built an AI agent that automates manual data processing. Repetitive work eliminated — the team could focus on what matters.",
    image: "/images/cases/dieta-detail.webp",
    logo: null,
    tag: "AI Engineering",
    year: "2024",
  },
  {
    id: "bongariliitto",
    titleFi: "Lintuhavaintojärjestelmän modernisointi",
    titleEn: "Birdwatching system modernisation",
    descFi: "Havaintojärjestelmä uudelleenrakennettu modernilla teknologiapinolla — suorituskyky moninkertaistui.",
    descEn: "Observation system rebuilt on a modern stack — performance multiplied.",
    image: "/images/cases/bongariliitto-hero.webp",
    logo: "/images/logos/bongariliitto.avif",
    tag: "Sovelluskehitys",
    year: "2021",
  },
];

const testimonial = {
  quoteFi: "Lopputulos on moderni ja visuaalisesti miellyttävä, mutta ennen kaikkea teknisesti huippuluokkaa.",
  quoteEn: "The end result is modern and visually appealing, but above all technically top-notch.",
  name: "Jukka Poméll",
  role: "Director",
  company: "Dieta",
  logo: "/images/logos/dieta.avif",
};

export function YhteistyotPage() {
  const locale = useLocale();
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-row").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 36, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          delay: i * 0.12,
        });
      });
      gsap.from(".testimonial-card", {
        opacity: 0, y: 36, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".testimonial-card", start: "top 88%" },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="relative overflow-hidden">
          <NetworkGraph />
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="py-24 md:py-32">
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Yhteistyöt" : "Work"}</span>
              <h1 className="max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.035em] text-w-white">
                {locale === "fi" ? "Katso mitä olemme rakentaneet." : "See what we've built."}
              </h1>
              <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
                {locale === "fi"
                  ? "Asiakkaidemme kanssa olemme rakentaneet järjestelmiä jotka toimivat ja skaalautuvat."
                  : "Together with our clients we've built systems that work and scale."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases — exact same card style as homepage */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="py-6 md:py-10">
            {allCases.map((c, i) => (
              <div
                key={c.id}
                className={`case-row group flex flex-col dashed-box md:flex-row ${i < allCases.length - 1 ? "mb-6" : ""}`}
              >
                {/* Image — full card height */}
                <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-auto md:w-[36%] md:self-stretch">
                  <Image
                    src={c.image}
                    alt={locale === "fi" ? c.titleFi : c.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-w-black/20 transition-opacity duration-500 group-hover:bg-w-black/10" />
                  <div className="pointer-events-none absolute inset-0 z-10" style={{ border: "1px dashed rgba(255,255,255,0.15)" }} />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                  <div>
                    {/* Logo */}
                    {c.logo && (
                      <div className="mb-3">
                        <Image
                          src={c.logo}
                          alt={c.id}
                          width={220}
                          height={72}
                          className="h-[40px] w-auto brightness-0 invert opacity-70 md:h-[58px]"
                        />
                      </div>
                    )}
                    {!c.logo && (
                      <p className="mb-3 font-mono text-[1.25rem] font-bold uppercase tracking-[0.02em] text-w-white-70 md:text-[1.5rem]">
                        {c.id.charAt(0).toUpperCase() + c.id.slice(1)}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{c.tag}</span>
                      <span className="text-w-white-15">&middot;</span>
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">{c.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 font-mono text-[clamp(1.25rem,2.2vw,1.75rem)] font-normal uppercase leading-[1.12] tracking-[0.01em] text-w-white">
                      {locale === "fi" ? c.titleFi : c.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.65] text-white/70">
                      {locale === "fi" ? c.descFi : c.descEn}
                    </p>
                  </div>

                  {/* Learn more */}
                  <div className="mt-8">
                    <Link href={`/${locale}/yhteistyot`} className="btn-outline inline-flex">
                      <span className="btn-label">{locale === "fi" ? "Lue lisää" : "Learn more"}</span>
                      <span className="btn-arrow text-w-white-30">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-12 sm:py-20 md:py-28">
          <div className="testimonial-card">
            <span className="tag mb-10 inline-block">
              {locale === "fi" ? "Referenssi" : "Testimonial"}
            </span>

            <div className="flex items-start gap-6">
              <div className="hidden md:block shrink-0 mt-2 w-px self-stretch bg-w-accent" />

              <blockquote className="max-w-3xl">
                <p className="font-display text-[clamp(1.375rem,2.8vw,2.25rem)] font-normal leading-[1.35] tracking-[-0.025em] text-w-white">
                  &ldquo;{locale === "fi" ? testimonial.quoteFi : testimonial.quoteEn}&rdquo;
                </p>

                <footer className="mt-8 flex items-center gap-5">
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.company}
                    width={120}
                    height={42}
                    className="h-[28px] w-auto brightness-0 invert opacity-40"
                  />
                  <div className="h-6 w-px" style={{ background: "var(--dash-v)" }} />
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-w-white-70">
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.06em] text-w-white-30">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 py-16 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-[-0.03em] text-w-white">
              {locale === "fi" ? "Kiinnostaako vastaava projekti?" : "Interested in a similar project?"}
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
