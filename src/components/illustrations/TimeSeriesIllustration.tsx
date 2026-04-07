"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// Historical data path — a noisy upward trend (SVG y decreases upward)
const DATA_PATH =
  "M 18,96 C 26,90 32,86 44,82 C 52,80 58,86 72,76 " +
  "C 82,70 88,74 102,64 C 112,57 118,62 132,52 " +
  "C 142,45 150,50 162,38";

// Prediction extension — continues from last point, dashed blue
const PRED_PATH = "M 162,38 C 170,32 176,26 188,20";

// Data point markers along the path (approximate positions)
const POINTS = [
  [18, 96], [44, 82], [72, 76], [102, 64], [132, 52], [162, 38],
] as const;

export function TimeSeriesIllustration({ className = "" }: { className?: string }) {
  const svgRef    = useRef<SVGSVGElement>(null);
  const dataRef   = useRef<SVGPathElement>(null);
  const predRef   = useRef<SVGPathElement>(null);
  const uid       = useId().replace(/:/g, "");
  const glowId    = `ts-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Axes draw in
      tl.from(gsap.utils.toArray(".ts-axis", svgRef.current), {
        drawSVG: "0%", duration: 0.4, stagger: 0.1, ease: "power2.out",
      });

      // Tick marks
      tl.from(gsap.utils.toArray(".ts-tick", svgRef.current), {
        opacity: 0, duration: 0.2, stagger: 0.03,
      }, "-=0.1");

      // Data line draws itself left to right
      tl.from(dataRef.current, {
        drawSVG: "0%", duration: 1.2, ease: "power1.inOut",
      }, "-=0.1");

      // Data points appear as line reaches them
      tl.from(gsap.utils.toArray(".ts-point", svgRef.current), {
        opacity: 0, scale: 0, stagger: 0.18, duration: 0.2,
        ease: "back.out(2)", transformOrigin: "center center",
      }, "-=1.1");

      // Blue prediction draws itself
      tl.from(predRef.current, {
        drawSVG: "0%", duration: 0.6, ease: "power2.out",
      }, "+=0.1");

      // Prediction endpoint pulses
      tl.to(".ts-pred-dot", {
        opacity: 0.3, scale: 2.5, duration: 1.2, yoyo: true, repeat: -1,
        ease: "sine.inOut", transformOrigin: "center center",
      }, "-=0.2");
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={className}>
      <svg ref={svgRef} viewBox="0 0 200 120" fill="none" className="w-full">
        <defs>
          <filter id={glowId} x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Axes */}
        <line className="ts-axis" x1="14" y1="10" x2="14" y2="106"
          stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        />
        <line className="ts-axis" x1="14" y1="106" x2="194" y2="106"
          stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        />

        {/* Y-axis ticks */}
        {[30, 55, 80].map((y, i) => (
          <line key={i} className="ts-tick"
            x1="10" y1={y} x2="14" y2={y}
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"
          />
        ))}

        {/* X-axis ticks */}
        {[44, 72, 102, 132, 162].map((x, i) => (
          <line key={i} className="ts-tick"
            x1={x} y1="106" x2={x} y2="110"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"
          />
        ))}

        {/* Faint grid lines */}
        {[30, 55, 80].map((y, i) => (
          <line key={i}
            x1="14" y1={y} x2="194" y2={y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1"
          />
        ))}

        {/* Divider between historical and prediction */}
        <line
          x1="162" y1="14" x2="162" y2="106"
          stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 4"
        />

        {/* Historical data line */}
        <path ref={dataRef} d={DATA_PATH}
          stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />

        {/* Data points */}
        {POINTS.map(([x, y], i) => (
          <circle key={i} className="ts-point"
            cx={x} cy={y} r="2.5"
            fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"
          />
        ))}

        {/* Blue prediction path */}
        <path ref={predRef} d={PRED_PATH}
          stroke="#1560D4" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="5 4"
          filter={`url(#${glowId})`}
        />

        {/* Prediction endpoint dot */}
        <circle className="ts-pred-dot"
          cx="188" cy="20" r="3"
          fill="#1560D4"
          filter={`url(#${glowId})`}
        />
      </svg>
    </div>
  );
}
