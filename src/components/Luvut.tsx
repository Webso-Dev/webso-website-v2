"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Luvut() {
  const t = useTranslations("luvut");
  const sectionRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as Array<{ value: string; suffix: string; label: string }>;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".luvut-item").forEach((item) => {
        const valueEl = item.querySelector(".luvut-value");
        if (!valueEl) return;
        const endVal = parseInt(valueEl.getAttribute("data-value") || "0", 10);
        const obj = { val: 0 };
        ScrollTrigger.create({ trigger: item, start: "top 88%", once: true,
          onEnter: () => {
            gsap.to(obj, { val: endVal, duration: 1.8, ease: "power2.out",
              onUpdate: () => { if (valueEl) valueEl.textContent = Math.round(obj.val).toString(); } });
            gsap.from(item, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-dashed border-w-white-15 bg-w-black">
      <div className="mx-auto max-w-[90rem] px-4 min-[1000px]:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className="luvut-item relative flex flex-col items-center justify-center p-8 sm:p-12 md:p-20 text-center"
            >
              {/* Left divider: on mobile show for odd columns, on desktop for all but first */}
              {i % 2 !== 0 && (
                <div className="absolute left-0 inset-y-0 w-px md:hidden" style={{ background: "var(--dash-v)" }} />
              )}
              {i > 0 && (
                <div className="absolute left-0 inset-y-0 w-px hidden md:block" style={{ background: "var(--dash-v)" }} />
              )}
              {/* Top divider: on mobile show for bottom row (items 2 & 3) */}
              {i >= 2 && (
                <div className="absolute top-0 inset-x-0 h-px md:hidden" style={{ background: "var(--dash-h)" }} />
              )}
              <div className="font-mono text-[2.5rem] font-normal tracking-[-0.07em] text-w-white sm:text-[3.25rem] md:text-[4.5rem]">
                <span className="luvut-value" data-value={item.value}>0</span>
                {item.suffix && <span className="text-w-white">{item.suffix}</span>}
              </div>
              <p className="mt-2 font-display text-[0.8125rem] tracking-[-0.01em] text-w-white">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
