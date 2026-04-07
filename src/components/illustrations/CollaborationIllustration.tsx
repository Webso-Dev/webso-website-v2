"use client";

/**
 * Kumppani, ei toimittaja
 * Two equal nodes on each side — client and Webso. Both send lines toward
 * a shared blue center zone. Beams flow from both sides simultaneously,
 * building the solution together.
 */

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// Node squares
const LN = { cx: 36,  cy: 60, half: 9 };   // left node center
const RN = { cx: 164, cy: 60, half: 9 };   // right node center

// Shared center zone
const ZONE = { x: 80, y: 46, w: 40, h: 28, cx: 100, cy: 60 };

// Connection lines: 3 per side (top, mid, bot)
// Left side: from node right-edge to zone left-edge
const L_LINES = [
  { x1: LN.cx + LN.half, y1: LN.cy - 6, x2: ZONE.x, y2: ZONE.y + 4       },
  { x1: LN.cx + LN.half, y1: LN.cy,     x2: ZONE.x, y2: ZONE.cy           },
  { x1: LN.cx + LN.half, y1: LN.cy + 6, x2: ZONE.x, y2: ZONE.y + ZONE.h - 4 },
];
// Right side (paths go right→left so beam direction is R→L)
const R_LINES = [
  { x1: RN.cx - RN.half, y1: RN.cy - 6, x2: ZONE.x + ZONE.w, y2: ZONE.y + 4       },
  { x1: RN.cx - RN.half, y1: RN.cy,     x2: ZONE.x + ZONE.w, y2: ZONE.cy           },
  { x1: RN.cx - RN.half, y1: RN.cy + 6, x2: ZONE.x + ZONE.w, y2: ZONE.y + ZONE.h - 4 },
];

export function CollaborationIllustration({ className = "" }: { className?: string }) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const zoneRef = useRef<SVGRectElement>(null);
  const uid     = useId().replace(/:/g, "");
  const glow    = `col-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Both nodes scale in simultaneously — equal partners
      tl.from(gsap.utils.toArray(".col-node", svgRef.current), {
        scale: 0, duration: 0.4, ease: "back.out(1.8)",
        transformOrigin: "center center",
      });

      // Center zone appears
      tl.from(zoneRef.current, {
        scale: 0, duration: 0.35, ease: "back.out(1.5)", svgOrigin: `${ZONE.cx} ${ZONE.cy}`,
      }, "-=0.1");

      // Connection lines draw from center zone outward toward each node
      tl.from(gsap.utils.toArray(".col-line-l", svgRef.current), {
        drawSVG: "100% 100%", duration: 0.4, stagger: 0.06, ease: "power2.out",
      }, "-=0.15");
      tl.from(gsap.utils.toArray(".col-line-r", svgRef.current), {
        drawSVG: "100% 100%", duration: 0.4, stagger: 0.06, ease: "power2.out",
      }, "<");

      // Zone pulse
      tl.to(zoneRef.current, {
        opacity: 0.4, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut",
      }, "+=0.1");

      // Left beams travel L→R toward center zone
      // Right beams travel R→L toward center zone
      tl.add(() => {
        const lBeams = gsap.utils.toArray<SVGLineElement>(".col-beam-l", svgRef.current);
        lBeams.forEach((beam, i) => {
          const len  = beam.getTotalLength();
          const bLen = 12;
          gsap.fromTo(beam,
            { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
            { strokeDashoffset: -len, duration: 1.2, delay: i * 0.2, repeat: -1, ease: "none" },
          );
        });

        // Right beams: lines go R→L (x1=node, x2=zone), so beam travels R→L naturally
        const rBeams = gsap.utils.toArray<SVGLineElement>(".col-beam-r", svgRef.current);
        rBeams.forEach((beam, i) => {
          const len  = beam.getTotalLength();
          const bLen = 12;
          gsap.fromTo(beam,
            { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
            { strokeDashoffset: -len, duration: 1.2, delay: 0.1 + i * 0.2, repeat: -1, ease: "none" },
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
          <filter id={glow} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Left connection tracks */}
        {L_LINES.map((l, i) => (
          <line key={i} className="col-line-l"
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.12)" strokeWidth="1"
          />
        ))}

        {/* Right connection tracks */}
        {R_LINES.map((l, i) => (
          <line key={i} className="col-line-r"
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.12)" strokeWidth="1"
          />
        ))}

        {/* Left beams */}
        {L_LINES.map((l, i) => (
          <line key={i} className="col-beam-l"
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}

        {/* Right beams (drawn R→L) */}
        {R_LINES.map((l, i) => (
          <line key={i} className="col-beam-r"
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}

        {/* Shared center zone — blue */}
        <rect ref={zoneRef}
          x={ZONE.x} y={ZONE.y} width={ZONE.w} height={ZONE.h}
          fill="rgba(21,96,212,0.18)" stroke="#1560D4" strokeWidth="1.5"
          filter={`url(#${glow})`}
        />

        {/* Left node */}
        <rect className="col-node"
          x={LN.cx - LN.half} y={LN.cy - LN.half}
          width={LN.half * 2} height={LN.half * 2}
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"
        />

        {/* Right node */}
        <rect className="col-node"
          x={RN.cx - RN.half} y={RN.cy - RN.half}
          width={RN.half * 2} height={RN.half * 2}
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"
        />
      </svg>
    </div>
  );
}
