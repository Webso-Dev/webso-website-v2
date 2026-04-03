"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

/**
 * Kumppani, ei toimittaja — two circles connected by a squiggly line.
 * GSAP: DrawSVGPlugin draws the squiggle in; strokeDashoffset drives the beams.
 */

const SQUIGGLE_FWD = "M 62,60 C 74,40 88,80 100,60 C 112,40 126,80 138,60";
const SQUIGGLE_REV = "M 138,60 C 126,40 112,80 100,60 C 88,40 74,80 62,60";

export function PartnerIllustration({ className = "" }: { className?: string }) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const circleL = useRef<SVGCircleElement>(null);
  const circleR = useRef<SVGCircleElement>(null);
  const squigRef = useRef<SVGPathElement>(null);
  const beamFwd  = useRef<SVGPathElement>(null);
  const beamRev  = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cL   = circleL.current!;
      const cR   = circleR.current!;
      const squig = squigRef.current!;
      const bFwd  = beamFwd.current!;
      const bRev  = beamRev.current!;

      // Measure actual path length for beam dasharray
      const len     = squig.getTotalLength();
      const beamLen = 32;

      // ── Initial states ────────────────────────────────────────────
      gsap.set(cL,  { scale: 0, svgOrigin: "35 60" });
      gsap.set(cR,  { scale: 0, svgOrigin: "165 60" });
      gsap.set([bFwd, bRev], {
        strokeDasharray:  `${beamLen} ${len + beamLen + 2}`,
        strokeDashoffset: beamLen, // hidden just before path start
      });

      if (reduced) {
        gsap.set([cL, cR], { scale: 1 });
        return;
      }

      // ── Entrance sequence (scroll-triggered) ──────────────────────
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%" },
      });

      // Circles scale in
      tl.to(cL, { scale: 1, duration: 0.4, ease: "back.out(1.5)" })
        .to(cR, { scale: 1, duration: 0.4, ease: "back.out(1.5)" }, "-=0.25")

        // Squiggle draws itself — DrawSVGPlugin
        .from(squig, { drawSVG: "0%", duration: 0.75, ease: "power2.out" }, "-=0.1")

        // Start the repeating beams once entrance is done
        .add(() => {
          gsap.fromTo(bFwd,
            { strokeDashoffset: beamLen },
            { strokeDashoffset: -len, duration: 2.4, repeat: -1, ease: "none" }
          );
          gsap.fromTo(bRev,
            { strokeDashoffset: beamLen },
            { strokeDashoffset: -len, duration: 2.4, delay: 1.2, repeat: -1, ease: "none" }
          );
        });

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={className}>
      <svg ref={svgRef} viewBox="0 0 200 120" fill="none" className="w-full">
        <defs>
          <filter id="part-glow" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle ref={circleL} cx="35" cy="60" r="24"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none" />

        <circle ref={circleR} cx="165" cy="60" r="24"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1" fill="none" />

        {/* Squiggle — drawn in by DrawSVGPlugin */}
        <path ref={squigRef} d={SQUIGGLE_FWD}
          stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />

        {/* Blue beams — GSAP strokeDashoffset tweens */}
        <path ref={beamFwd} d={SQUIGGLE_FWD}
          stroke="#1560D4" strokeWidth="2.5" strokeLinecap="round" fill="none"
          filter="url(#part-glow)" />

        <path ref={beamRev} d={SQUIGGLE_REV}
          stroke="#1560D4" strokeWidth="2.5" strokeLinecap="round" fill="none"
          filter="url(#part-glow)" />
      </svg>
    </div>
  );
}
