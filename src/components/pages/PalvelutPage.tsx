"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// 4×15 bar grid — bars randomly activate to blue + thick
function BarGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const COLS = 20;
  const ROWS = 4;
  const BAR_W = 12;
  const GAP = 10;
  const THICK = 16;
  const DIM = 0.15;
  const VIEW_H = 100; // viewBox height per row (stretched via flex)

  const svgW = COLS * (BAR_W + GAP) - GAP; // 185
  const xs = Array.from({ length: COLS }, (_, c) => c * (BAR_W + GAP));

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const rects = Array.from(containerRef.current?.querySelectorAll<SVGRectElement>(".bar-rect") ?? []);

    gsap.from(rects, { opacity: 0, duration: 0.3, stagger: 0.012, delay: 0.3 });

    const tids: ReturnType<typeof setTimeout>[] = [];

    const activate = (el: SVGRectElement, isHover = false) => {
      const origX = parseFloat(el.getAttribute("data-ox") ?? "0");
      const grow = (THICK - BAR_W) / 2;
      gsap.killTweensOf(el);
      gsap.timeline()
        .to(el, { opacity: 1, attr: { fill: "#1560D4", width: THICK, x: origX - grow }, duration: 0.15, ease: "power2.out" })
        .to(el, { opacity: DIM, attr: { fill: "#ffffff", width: BAR_W, x: origX }, duration: 0.55, ease: "power2.inOut", delay: isHover ? 0.8 : 0.2 });
    };

    const loop = () => {
      const tid = setTimeout(() => {
        activate(rects[Math.floor(Math.random() * rects.length)]);
        loop();
      }, 100 + Math.random() * 280);
      tids.push(tid);
    };
    loop();

    let lastHovered: SVGRectElement | null = null;
    let lastPX = -1, lastPY = -1;
    const onPointerMove = (e: PointerEvent) => {
      const cx = e.clientX, cy = e.clientY;
      const dx = cx - lastPX, dy = cy - lastPY;
      const steps = lastPX < 0 ? 1 : Math.max(1, Math.ceil(Math.sqrt(dx * dx + dy * dy) / 6));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const el = document.elementFromPoint(lastPX + dx * t, lastPY + dy * t);
        if (el instanceof SVGRectElement && el.classList.contains("bar-rect") && el !== lastHovered) {
          lastHovered = el;
          activate(el, true);
        }
      }
      lastPX = cx; lastPY = cy;
    };
    const container = containerRef.current;
    container?.addEventListener("pointermove", onPointerMove);

    return () => {
      tids.forEach(clearTimeout);
      gsap.killTweensOf(rects);
      container?.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex h-full flex-col gap-[10px]">
      {Array.from({ length: ROWS }, (_, r) => (
        <svg key={r} viewBox={`0 0 ${svgW} ${VIEW_H}`} preserveAspectRatio="none"
          width={svgW} className="min-h-0 flex-1" fill="none">
          {xs.map((x, c) => (
            <rect key={c} className="bar-rect cursor-default" data-ox={x}
              x={x} y={0} width={BAR_W} height={VIEW_H}
              fill="#ffffff" opacity={DIM} rx={1}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}

export function PalvelutPage() {
  const t = useTranslations("palvelut");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  const pillars = [
    { num: "01", title: t("pillar1.title"), desc: t("pillar1.description"), items: t.raw("pillar1.items") as string[], cta: t("pillar1.cta") },
    { num: "02", title: t("pillar2.title"), desc: t("pillar2.description"), items: t.raw("pillar2.items") as string[], cta: t("pillar2.cta") },
    { num: "03", title: t("pillar3.title"), desc: t("pillar3.description"), items: t.raw("pillar3.items") as string[], cta: t("pillar3.cta") },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".pillar").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 28, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" }, delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="bg-w-black">

      {/* Header */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 flex items-stretch">
            <BarGrid />
          </div>
          <div className="mx-auto max-w-[90rem] px-6 md:px-10">
            <div className="py-24 md:py-32">
              <span className="tag mb-8 inline-block">{t("title")}</span>
              <h1 className="font-display text-[clamp(2rem,3.8vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-w-white md:max-w-[55%]">
                {locale === "fi" ? "Rakennamme järjestelmiä jotka tuottavat kilpailuetua." : "We build systems that create competitive advantage."}
              </h1>
              <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-white/70">
                {locale === "fi"
                  ? "Tekoäly on integroitu kaikkeen — suunnittelusta, koodauksesta testaukseen. Nopeampi toimitus, parempi laatu."
                  : "AI is integrated into everything — from planning and coding to testing. Faster delivery, better quality."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars — matches homepage Palvelut pattern */}
      <section className="border-b border-dashed border-w-white-15">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10">
          <div className="flex flex-col md:flex-row">
            {/* Sticky left */}
            <div className="shrink-0 border-b border-dashed border-w-white-15 py-10 md:sticky md:top-[4.25rem] md:w-[36%] md:self-start md:border-b-0 md:py-0 md:pb-24 md:pt-10 md:pr-14">
              <span className="tag mb-8 inline-block">{locale === "fi" ? "Palvelut" : "Services"}</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
                {locale === "fi" ? "Mitä me teemme" : "What we do"}
              </h2>
              <p className="mt-5 text-[1rem] leading-[1.7] text-w-white-50">
                {locale === "fi"
                  ? "Kolme ydinpalvelua, yksi filosofia: tekoäly mukana joka vaiheessa."
                  : "Three core services, one philosophy: AI at every stage."}
              </p>
            </div>

            {/* Full-height separator */}
            <div className="hidden shrink-0 self-stretch md:block" style={{ width: "1px", background: "var(--dash-v)" }} />

            {/* Right — pillars */}
            <div className="flex-1 py-10 md:pb-24 md:pt-10 md:pl-10">
              {pillars.map((p, i) => (
                <div key={p.num} className={`pillar dashed-box p-5 sm:p-8 md:p-10 ${i < pillars.length - 1 ? "mb-4" : ""}`}>
                  <h3 className="font-mono text-[clamp(1.125rem,2vw,1.5rem)] font-normal uppercase leading-[1.15] tracking-[0.01em] text-w-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-white/70">{p.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.items.map((item) => <span key={item} className="tag">{item}</span>)}
                  </div>
                  <div className="mt-8">
                    <Link href={`/${locale}/ota-yhteytta`} className="btn-outline inline-flex">
                      <span className="btn-label">{p.cta}</span>
                      <span className="btn-arrow text-w-white-30">→</span>
                    </Link>
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
              {locale === "fi" ? "Kerro projektistasi." : "Tell us about your project."}
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
