"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// Center of radar
const CX = 100;
const CY = 60;
const RADII = [20, 38, 54];
// Blip at ~50° clockwise from top on middle ring
const BLIP_ANGLE = 50 * (Math.PI / 180);
const BLIP_R = RADII[1];
const BLIP_X = CX + BLIP_R * Math.sin(BLIP_ANGLE);
const BLIP_Y = CY - BLIP_R * Math.cos(BLIP_ANGLE);

export function RadarIllustration({ className = "" }: { className?: string }) {
  const svgRef    = useRef<SVGSVGElement>(null);
  const sweepRef  = useRef<SVGGElement>(null);
  const pulseRef  = useRef<SVGCircleElement>(null);
  const uid       = useId().replace(/:/g, "");
  const glowId    = `radar-glow-${uid}`;
  const gradId    = `radar-grad-${uid}`;

  // Sweep period in seconds
  const PERIOD = 3;
  // Blip fires when sweep reaches 50°: t = (50/360) * 3 ≈ 0.417s
  const BLIP_DELAY = (BLIP_ANGLE / (2 * Math.PI)) * PERIOD;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Circles draw in
      tl.from(gsap.utils.toArray(".radar-ring", svgRef.current), {
        drawSVG: "0%", duration: 0.6, stagger: 0.12, ease: "power2.out",
      });

      // Crosshair fades in
      tl.from(gsap.utils.toArray(".radar-cross", svgRef.current), {
        opacity: 0, duration: 0.3, stagger: 0.06,
      }, "-=0.2");

      // Blip appears
      tl.from(".radar-blip", { opacity: 0, scale: 0, duration: 0.25, ease: "back.out(2)", svgOrigin: `${BLIP_X} ${BLIP_Y}` }, "-=0.1");

      // Start sweep rotation
      tl.add(() => {
        gsap.to(sweepRef.current, {
          rotation: 360,
          duration: PERIOD,
          repeat: -1,
          ease: "none",
          svgOrigin: `${CX} ${CY}`,
        });

        // Pulse ring expands and fades in sync with sweep hitting the blip
        gsap.to(pulseRef.current, {
          attr: { r: BLIP_R * 0.6 },
          opacity: 0,
          duration: 0.55,
          repeat: -1,
          repeatDelay: PERIOD - 0.55,
          delay: BLIP_DELAY,
          ease: "power2.out",
        });
      });
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
          {/* Radial gradient for sweep sector */}
          <radialGradient id={gradId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(${CX} ${CY}) scale(${RADII[2]})`}>
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Concentric rings */}
        {RADII.map((r, i) => (
          <circle key={i} className="radar-ring"
            cx={CX} cy={CY} r={r}
            stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"
          />
        ))}

        {/* Crosshair */}
        <line className="radar-cross"
          x1={CX - RADII[2]} y1={CY} x2={CX + RADII[2]} y2={CY}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1"
        />
        <line className="radar-cross"
          x1={CX} y1={CY - RADII[2]} x2={CX} y2={CY + RADII[2]}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1"
        />

        {/* Sweep group — rotated by GSAP */}
        <g ref={sweepRef}>
          {/* Sector fill */}
          <path
            d={`M ${CX} ${CY} L ${CX} ${CY - RADII[2]} A ${RADII[2]} ${RADII[2]} 0 0 1 ${CX + RADII[2] * Math.sin(0.35)} ${CY - RADII[2] * Math.cos(0.35)} Z`}
            fill={`url(#${gradId})`}
          />
          {/* Leading sweep line */}
          <line
            x1={CX} y1={CY} x2={CX} y2={CY - RADII[2]}
            stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"
          />
        </g>

        {/* Blue blip */}
        <circle className="radar-blip"
          cx={BLIP_X} cy={BLIP_Y} r="3"
          fill="#1560D4" filter={`url(#${glowId})`}
        />
        {/* Expanding pulse ring */}
        <circle ref={pulseRef}
          cx={BLIP_X} cy={BLIP_Y} r="3"
          stroke="#1560D4" strokeWidth="1.5" fill="none"
          opacity="0"
          filter={`url(#${glowId})`}
        />

        {/* Static secondary blip — faint */}
        <circle
          cx={CX - RADII[0] * 0.7} cy={CY + RADII[0] * 0.5} r="2"
          fill="rgba(255,255,255,0.2)"
        />
      </svg>
    </div>
  );
}
