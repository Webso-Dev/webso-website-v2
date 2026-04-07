"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// Scatter points — roughly linear trend with noise
const DOTS: [number, number][] = [
  [26, 94], [40, 84], [52, 89], [66, 76], [76, 79],
  [90, 66], [100, 70], [112, 58], [124, 62], [136, 49],
  [148, 53], [162, 40], [174, 44],
];

// Linear regression line
const REG_X1 = 18;
const REG_Y1 = 100;
const REG_X2 = 182;
const REG_Y2 = 32;

export function ScatterIllustration({ className = "" }: { className?: string }) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const regRef  = useRef<SVGLineElement>(null);
  const uid     = useId().replace(/:/g, "");
  const glowId  = `sc-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Axes
      tl.from(gsap.utils.toArray(".sc-axis", svgRef.current), {
        drawSVG: "0%", duration: 0.35, stagger: 0.1, ease: "power2.out",
      });

      // Dots scatter in
      tl.from(gsap.utils.toArray(".sc-dot", svgRef.current), {
        opacity: 0, scale: 0, stagger: 0.055, duration: 0.25,
        ease: "back.out(2)", transformOrigin: "center center",
      }, "-=0.1");

      // Regression line draws left to right
      tl.from(regRef.current, {
        drawSVG: "0%", duration: 1.0, ease: "power1.inOut",
      }, "+=0.15");

      // Subtle glow pulse on regression line
      tl.to(regRef.current, {
        opacity: 0.5, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut",
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={className}>
      <svg ref={svgRef} viewBox="0 0 200 120" fill="none" className="w-full">
        <defs>
          <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Axes */}
        <line className="sc-axis" x1="14" y1="10" x2="14" y2="108"
          stroke="rgba(255,255,255,0.18)" strokeWidth="1"
        />
        <line className="sc-axis" x1="14" y1="108" x2="192" y2="108"
          stroke="rgba(255,255,255,0.18)" strokeWidth="1"
        />

        {/* Faint grid lines */}
        {[35, 60, 85].map((y, i) => (
          <line key={i}
            x1="14" y1={y} x2="192" y2={y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1"
          />
        ))}

        {/* Regression line — blue with glow */}
        <line ref={regRef}
          x1={REG_X1} y1={REG_Y1} x2={REG_X2} y2={REG_Y2}
          stroke="#1560D4" strokeWidth="2" strokeLinecap="round"
          filter={`url(#${glowId})`}
        />

        {/* Scatter dots */}
        {DOTS.map(([x, y], i) => (
          <circle key={i} className="sc-dot"
            cx={x} cy={y} r="3"
            fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}
