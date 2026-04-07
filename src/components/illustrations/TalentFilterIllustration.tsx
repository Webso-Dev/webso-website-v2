"use client";

/**
 * Suomen terävintä osaamista
 * Five lines enter from the left and converge into a blue diamond gate.
 * Only two emerge on the right — the selected few who passed.
 */

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// Diamond tips (rotated square centered at 100, 60)
const DL = { x: 85,  y: 60 };  // left tip  — where inputs arrive
const DR = { x: 115, y: 60 };  // right tip — where outputs depart
const DT = { x: 100, y: 46 };  // top tip
const DB = { x: 100, y: 74 };  // bottom tip

// Input lines: fan from left edge to diamond left tip
const INPUTS = [
  { x1: 14, y1: 18  },
  { x1: 14, y1: 37  },
  { x1: 14, y1: 60  },
  { x1: 14, y1: 83  },
  { x1: 14, y1: 102 },
];

// Output lines: only 2 pass through
const OUTPUTS = [
  { x2: 186, y2: 40 },
  { x2: 186, y2: 80 },
];

export function TalentFilterIllustration({ className = "" }: { className?: string }) {
  const svgRef     = useRef<SVGSVGElement>(null);
  const diamondRef = useRef<SVGPathElement>(null);
  const uid        = useId().replace(/:/g, "");
  const glow       = `tf-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Input lines draw in from the left
      tl.from(gsap.utils.toArray(".tf-in", svgRef.current), {
        drawSVG: "0%", duration: 0.5, stagger: 0.06, ease: "power2.out",
      });

      // Diamond filter appears
      tl.from(diamondRef.current, {
        scale: 0, duration: 0.35, ease: "back.out(2)", svgOrigin: "100 60",
      }, "-=0.1");

      // Output lines draw from diamond rightward
      tl.from(gsap.utils.toArray(".tf-out", svgRef.current), {
        drawSVG: "0%", duration: 0.4, stagger: 0.1, ease: "power2.out",
      }, "-=0.05");

      // Diamond pulse
      tl.to(diamondRef.current, {
        opacity: 0.45, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut",
      }, "+=0.1");

      // Beams on inputs converge toward filter
      tl.add(() => {
        const inBeams = gsap.utils.toArray<SVGLineElement>(".tf-in-beam", svgRef.current);
        inBeams.forEach((beam, i) => {
          const len  = beam.getTotalLength();
          const bLen = 14;
          gsap.fromTo(beam,
            { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
            { strokeDashoffset: -len, duration: 1.3, delay: i * 0.2, repeat: -1, ease: "none" },
          );
        });

        // Beams on outputs — fewer, exit the filter
        const outBeams = gsap.utils.toArray<SVGLineElement>(".tf-out-beam", svgRef.current);
        outBeams.forEach((beam, i) => {
          const len  = beam.getTotalLength();
          const bLen = 16;
          gsap.fromTo(beam,
            { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
            { strokeDashoffset: -len, duration: 1.1, delay: 0.4 + i * 0.3, repeat: -1, ease: "none" },
          );
        });
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  const diamond = `M ${DL.x},${DL.y} L ${DT.x},${DT.y} L ${DR.x},${DR.y} L ${DB.x},${DB.y} Z`;

  return (
    <div className={className}>
      <svg ref={svgRef} viewBox="0 0 200 120" fill="none" className="w-full">
        <defs>
          <filter id={glow} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Input tracks */}
        {INPUTS.map((s, i) => (
          <line key={i} className="tf-in"
            x1={s.x1} y1={s.y1} x2={DL.x} y2={DL.y}
            stroke="rgba(255,255,255,0.12)" strokeWidth="1"
          />
        ))}

        {/* Input beams */}
        {INPUTS.map((s, i) => (
          <line key={i} className="tf-in-beam"
            x1={s.x1} y1={s.y1} x2={DL.x} y2={DL.y}
            stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}

        {/* Output tracks */}
        {OUTPUTS.map((o, i) => (
          <line key={i} className="tf-out"
            x1={DR.x} y1={DR.y} x2={o.x2} y2={o.y2}
            stroke="rgba(255,255,255,0.2)" strokeWidth="1"
          />
        ))}

        {/* Output beams */}
        {OUTPUTS.map((o, i) => (
          <line key={i} className="tf-out-beam"
            x1={DR.x} y1={DR.y} x2={o.x2} y2={o.y2}
            stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round"
          />
        ))}

        {/* Blue diamond filter */}
        <path ref={diamondRef} d={diamond}
          fill="rgba(21,96,212,0.15)" stroke="#1560D4" strokeWidth="1.5"
          filter={`url(#${glow})`}
        />
      </svg>
    </div>
  );
}
