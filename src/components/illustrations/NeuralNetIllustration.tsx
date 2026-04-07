"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

const IN_X = 22;
const HID_X = 100;
const OUT_X = 178;
const IN_Y  = [26, 60, 94];
const HID_Y = [18, 46, 74, 102];
const OUT_Y = 60;

const EDGES = [
  ...IN_Y.flatMap(iy => HID_Y.map(hy => ({ x1: IN_X, y1: iy, x2: HID_X, y2: hy }))),
  ...HID_Y.map(hy => ({ x1: HID_X, y1: hy, x2: OUT_X, y2: OUT_Y })),
];

const BEAMS = [
  { x1: IN_X, y1: IN_Y[0], x2: HID_X, y2: HID_Y[1], delay: 0.0 },
  { x1: IN_X, y1: IN_Y[1], x2: HID_X, y2: HID_Y[2], delay: 0.55 },
  { x1: IN_X, y1: IN_Y[2], x2: HID_X, y2: HID_Y[3], delay: 1.1 },
  { x1: HID_X, y1: HID_Y[1], x2: OUT_X, y2: OUT_Y, delay: 0.3 },
  { x1: HID_X, y1: HID_Y[2], x2: OUT_X, y2: OUT_Y, delay: 0.85 },
];

export function NeuralNetIllustration({ className = "" }: { className?: string }) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const uid     = useId().replace(/:/g, "");
  const glowId  = `nn-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      tl.from(gsap.utils.toArray(".nn-edge", svgRef.current), {
        drawSVG: "0%", duration: 0.5, stagger: 0.018, ease: "power2.out",
      });

      tl.from(gsap.utils.toArray(".nn-node", svgRef.current), {
        opacity: 0, scale: 0, stagger: 0.06, duration: 0.3,
        ease: "back.out(2)", transformOrigin: "center center",
      }, "-=0.35");

      tl.to(gsap.utils.toArray(".nn-out", svgRef.current), {
        opacity: 0.35, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut",
      }, "+=0.1");

      tl.add(() => {
        const beams = gsap.utils.toArray<SVGLineElement>(".nn-beam", svgRef.current);
        beams.forEach((beam, i) => {
          const len  = beam.getTotalLength();
          const bLen = 15;
          gsap.fromTo(beam,
            { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
            { strokeDashoffset: -len, duration: 1.4, delay: BEAMS[i].delay, repeat: -1, ease: "none" },
          );
        });
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

        {/* Edges */}
        {EDGES.map((e, i) => (
          <line key={i} className="nn-edge"
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="rgba(255,255,255,0.09)" strokeWidth="1"
          />
        ))}

        {/* Beams */}
        {BEAMS.map((b, i) => (
          <line key={i} className="nn-beam"
            x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
            stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}

        {/* Input nodes */}
        {IN_Y.map((y, i) => (
          <circle key={i} className="nn-node"
            cx={IN_X} cy={y} r="4.5"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.28)" strokeWidth="1"
          />
        ))}

        {/* Hidden nodes */}
        {HID_Y.map((y, i) => (
          <circle key={i} className="nn-node"
            cx={HID_X} cy={y} r="4.5"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.28)" strokeWidth="1"
          />
        ))}

        {/* Output node — blue */}
        <circle className="nn-node nn-out"
          cx={OUT_X} cy={OUT_Y} r="9"
          fill="#1560D4" stroke="rgba(21,96,212,0.5)" strokeWidth="7"
          filter={`url(#${glowId})`}
        />
      </svg>
    </div>
  );
}
