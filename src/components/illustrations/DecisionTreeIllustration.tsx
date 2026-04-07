"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// Node centers
const ROOT  = { x: 100, y: 14 };
const L1    = [{ x: 55, y: 54 }, { x: 145, y: 54 }];
const L2    = [{ x: 24, y: 96 }, { x: 76, y: 96 }, { x: 124, y: 96 }, { x: 176, y: 96 }];
const BLUE_L2 = 3; // rightmost leaf is blue
const N = 7; // half-size of node square

// Edges: {x1,y1} → {x2,y2}
const EDGES = [
  { x1: ROOT.x, y1: ROOT.y + N, x2: L1[0].x, y2: L1[0].y - N },
  { x1: ROOT.x, y1: ROOT.y + N, x2: L1[1].x, y2: L1[1].y - N },
  { x1: L1[0].x, y1: L1[0].y + N, x2: L2[0].x, y2: L2[0].y - N },
  { x1: L1[0].x, y1: L1[0].y + N, x2: L2[1].x, y2: L2[1].y - N },
  { x1: L1[1].x, y1: L1[1].y + N, x2: L2[2].x, y2: L2[2].y - N },
  { x1: L1[1].x, y1: L1[1].y + N, x2: L2[3].x, y2: L2[3].y - N },
];

// Beam path: root → L1[1] → L2[3] (toward the blue leaf)
const BEAM_PATHS = [
  { x1: ROOT.x,   y1: ROOT.y + N,   x2: L1[1].x,   y2: L1[1].y - N, delay: 0 },
  { x1: L1[1].x,  y1: L1[1].y + N,  x2: L2[3].x,   y2: L2[3].y - N, delay: 0.4 },
  { x1: ROOT.x,   y1: ROOT.y + N,   x2: L1[0].x,   y2: L1[0].y - N, delay: 0.8 },
  { x1: L1[0].x,  y1: L1[0].y + N,  x2: L2[1].x,   y2: L2[1].y - N, delay: 1.2 },
];

export function DecisionTreeIllustration({ className = "" }: { className?: string }) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const uid     = useId().replace(/:/g, "");
  const glowId  = `dt-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Root appears
      tl.from(".dt-root", {
        opacity: 0, scale: 0, duration: 0.3, ease: "back.out(2)",
        transformOrigin: "center center",
      });

      // Level 1 edges draw, then nodes appear
      tl.from(gsap.utils.toArray(".dt-edge-l1", svgRef.current), {
        drawSVG: "0%", duration: 0.4, stagger: 0.08, ease: "power2.out",
      }, "+=0.05");
      tl.from(gsap.utils.toArray(".dt-l1-node", svgRef.current), {
        opacity: 0, scale: 0, stagger: 0.1, duration: 0.25,
        ease: "back.out(2)", transformOrigin: "center center",
      }, "-=0.2");

      // Level 2 edges draw, then leaf nodes appear
      tl.from(gsap.utils.toArray(".dt-edge-l2", svgRef.current), {
        drawSVG: "0%", duration: 0.4, stagger: 0.07, ease: "power2.out",
      }, "+=0.05");
      tl.from(gsap.utils.toArray(".dt-l2-node", svgRef.current), {
        opacity: 0, scale: 0, stagger: 0.07, duration: 0.22,
        ease: "back.out(2)", transformOrigin: "center center",
      }, "-=0.3");

      // Blue leaf breathing
      tl.to(".dt-blue", {
        opacity: 0.35, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut",
      }, "+=0.15");

      // Beams travel down paths
      tl.add(() => {
        const beams = gsap.utils.toArray<SVGLineElement>(".dt-beam", svgRef.current);
        beams.forEach((beam, i) => {
          const len  = beam.getTotalLength();
          const bLen = 12;
          gsap.fromTo(beam,
            { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
            { strokeDashoffset: -len, duration: 1.2, delay: BEAM_PATHS[i].delay, repeat: -1, ease: "none" },
          );
        });
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  const nodeRect = (cx: number, cy: number, blue = false) => (
    <rect
      x={cx - N} y={cy - N} width={N * 2} height={N * 2}
      fill={blue ? "#1560D4" : "rgba(255,255,255,0.05)"}
      stroke={blue ? "rgba(21,96,212,0.5)" : "rgba(255,255,255,0.28)"}
      strokeWidth="1"
    />
  );

  return (
    <div className={className}>
      <svg ref={svgRef} viewBox="0 0 200 116" fill="none" className="w-full">
        <defs>
          <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Level 1 edges */}
        {EDGES.slice(0, 2).map((e, i) => (
          <line key={i} className="dt-edge-l1"
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="rgba(255,255,255,0.18)" strokeWidth="1"
          />
        ))}

        {/* Level 2 edges */}
        {EDGES.slice(2).map((e, i) => (
          <line key={i} className="dt-edge-l2"
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke="rgba(255,255,255,0.18)" strokeWidth="1"
          />
        ))}

        {/* Beam lines */}
        {BEAM_PATHS.map((b, i) => (
          <line key={i} className="dt-beam"
            x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
            stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}

        {/* Root node */}
        <g className="dt-root">{nodeRect(ROOT.x, ROOT.y)}</g>

        {/* Level 1 nodes */}
        {L1.map((n, i) => (
          <g key={i} className="dt-l1-node">{nodeRect(n.x, n.y)}</g>
        ))}

        {/* Level 2 leaf nodes */}
        {L2.map((n, i) => (
          <g key={i} className={`dt-l2-node${i === BLUE_L2 ? " dt-blue" : ""}`}
            filter={i === BLUE_L2 ? `url(#${glowId})` : undefined}>
            {nodeRect(n.x, n.y, i === BLUE_L2)}
          </g>
        ))}
      </svg>
    </div>
  );
}
