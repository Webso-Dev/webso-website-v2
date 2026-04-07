"use client";

/**
 * AI-natiivi prosessi
 * Five process nodes arranged in a pentagon around a central blue AI core.
 * Beams radiate outward from the center — AI drives every step, not just one.
 */

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

const CX = 100;
const CY = 60;

// Pentagon of process nodes (adjusted for 200×120 viewbox)
const NODES = [
  { x: 100, y: 11  },  // top
  { x: 170, y: 41  },  // top-right
  { x: 148, y: 101 },  // bottom-right
  { x:  52, y: 101 },  // bottom-left
  { x:  30, y: 41  },  // top-left
];

export function AINativeIllustration({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid    = useId().replace(/:/g, "");
  const glow   = `ain-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Central AI core appears first
      tl.from(".ain-core", {
        scale: 0, duration: 0.4, ease: "back.out(2)", svgOrigin: `${CX} ${CY}`,
      });

      // Spoke lines draw outward from center
      tl.from(gsap.utils.toArray(".ain-spoke", svgRef.current), {
        drawSVG: "0%", duration: 0.45, stagger: 0.07, ease: "power2.out",
      }, "-=0.1");

      // Process nodes scale in
      tl.from(gsap.utils.toArray(".ain-node", svgRef.current), {
        opacity: 0, scale: 0, stagger: 0.07, duration: 0.28,
        ease: "back.out(2)", transformOrigin: "center center",
      }, "-=0.3");

      // Core breathing
      tl.to(".ain-core", {
        opacity: 0.45, duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut",
      }, "+=0.1");

      // Beams radiate outward from center continuously
      tl.add(() => {
        const beams = gsap.utils.toArray<SVGLineElement>(".ain-beam", svgRef.current);
        beams.forEach((beam, i) => {
          const len  = beam.getTotalLength();
          const bLen = 13;
          gsap.fromTo(beam,
            { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
            { strokeDashoffset: -len, duration: 1.3, delay: i * 0.26, repeat: -1, ease: "none" },
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
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Spokes */}
        {NODES.map((n, i) => (
          <line key={i} className="ain-spoke"
            x1={CX} y1={CY} x2={n.x} y2={n.y}
            stroke="rgba(255,255,255,0.11)" strokeWidth="1"
          />
        ))}

        {/* Beams (same geometry, animated) */}
        {NODES.map((n, i) => (
          <line key={i} className="ain-beam"
            x1={CX} y1={CY} x2={n.x} y2={n.y}
            stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}

        {/* Process nodes */}
        {NODES.map((n, i) => (
          <circle key={i} className="ain-node"
            cx={n.x} cy={n.y} r="6"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.28)" strokeWidth="1"
          />
        ))}

        {/* Central AI core — blue */}
        <rect className="ain-core"
          x={CX - 9} y={CY - 9} width="18" height="18"
          fill="#1560D4" stroke="rgba(21,96,212,0.5)" strokeWidth="7"
          filter={`url(#${glow})`}
        />
      </svg>
    </div>
  );
}
