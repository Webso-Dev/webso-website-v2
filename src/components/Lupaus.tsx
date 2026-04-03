"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProcessIllustration } from "./illustrations/ProcessIllustration";
import { TalentIllustration } from "./illustrations/TalentIllustration";
import { PartnerIllustration } from "./illustrations/PartnerIllustration";

gsap.registerPlugin(ScrollTrigger);

const illustrations = [ProcessIllustration, TalentIllustration, PartnerIllustration];

export function Lupaus() {
  const t = useTranslations("lupaus");
  const sectionRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as Array<{ number: string; title: string; description: string }>;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".lupaus-card").forEach((card, i) => {
        gsap.from(card, { opacity: 0, y: 36, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%" }, delay: i * 0.1 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10">
        <div className="py-6 md:py-10">
          <p className="mb-10 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-w-white">
            Miksi Webso
          </p>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {items.map((item, idx) => {
              const Illust = illustrations[idx];
              return (
                <div key={item.number} className="lupaus-card dashed-box p-6 md:p-8" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                  {/* Illustration */}
                  <div className="mb-6 max-w-[11rem]">
                    <Illust />
                  </div>

<h3 className="font-mono text-[1.25rem] font-normal uppercase leading-[1.3] tracking-[0.01em] text-w-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-white/70">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
