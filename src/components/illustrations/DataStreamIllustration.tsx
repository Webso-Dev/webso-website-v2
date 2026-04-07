"use client";

import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

const CHANNELS = [
  { y: 16, speed: 0.85 },
  { y: 34, speed: 1.05 },
  { y: 54, speed: 0.70 }, // blue — index 2
  { y: 74, speed: 1.10 },
  { y: 92, speed: 0.90 },
];
const BLUE = 2;

export function DataStreamIllustration({ className = "" }: { className?: string }) {
  const svgRef    = useRef<SVGSVGElement>(null);
  const blueBeam  = useRef<SVGLineElement>(null);
  const uid       = useId().replace(/:/g, "");
  const glowId    = `ds-glow-${uid}`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 88%", once: true },
      });

      // Tracks draw in
      tl.from(gsap.utils.toArray(".ds-track", svgRef.current), {
        drawSVG: "0%", duration: 0.7, stagger: 0.1, ease: "power2.out",
      });

      // Endpoint dots appear
      tl.from(gsap.utils.toArray(".ds-dot", svgRef.current), {
        opacity: 0, scale: 0, stagger: 0.04, duration: 0.2,
        transformOrigin: "center center", ease: "back.out(2)",
      }, "-=0.3");

      // Start streams after entrance
      tl.add(() => {
        // White channels: continuous dashed flow
        const flows = gsap.utils.toArray<SVGLineElement>(".ds-flow", svgRef.current);
        flows.forEach((el, i) => {
          if (i === BLUE) return;
          const period = 24; // dasharray period: 8 + 16
          gsap.to(el, {
            strokeDashoffset: -period,
            duration: CHANNELS[i].speed,
            repeat: -1,
            ease: "none",
          });
        });

        // Blue beam — single traveling pulse
        const bb = blueBeam.current!;
        const len  = bb.getTotalLength();
        const bLen = 35;
        gsap.fromTo(bb,
          { strokeDasharray: `${bLen} ${len + bLen + 2}`, strokeDashoffset: bLen },
          { strokeDashoffset: -len, duration: 2.0, repeat: -1, ease: "none" },
        );
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={className}>
      <svg ref={svgRef} viewBox="0 0 200 110" fill="none" className="w-full">
        <defs>
          <filter id={glowId} x="-300%" y="-400%" width="700%" height="900%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {CHANNELS.map((ch, i) => (
          <g key={ch.y}>
            {/* Track */}
            <line className="ds-track"
              x1="12" y1={ch.y} x2="188" y2={ch.y}
              stroke={i === BLUE ? "rgba(21,96,212,0.2)" : "rgba(255,255,255,0.07)"}
              strokeWidth="1"
            />

            {/* Flowing dashes (white channels only) */}
            {i !== BLUE && (
              <line className="ds-flow"
                x1="12" y1={ch.y} x2="188" y2={ch.y}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="1"
                strokeDasharray="8 16"
              />
            )}

            {/* Endpoints */}
            <circle className="ds-dot" cx="12" cy={ch.y} r="2.5"
              fill={i === BLUE ? "rgba(21,96,212,0.6)" : "rgba(255,255,255,0.1)"}
              stroke={i === BLUE ? "#1560D4" : "rgba(255,255,255,0.2)"} strokeWidth="1"
            />
            <circle className="ds-dot" cx="188" cy={ch.y} r="2.5"
              fill={i === BLUE ? "rgba(21,96,212,0.6)" : "rgba(255,255,255,0.1)"}
              stroke={i === BLUE ? "#1560D4" : "rgba(255,255,255,0.2)"} strokeWidth="1"
            />
          </g>
        ))}

        {/* Blue beam overlay */}
        <line ref={blueBeam}
          x1="12" y1={CHANNELS[BLUE].y} x2="188" y2={CHANNELS[BLUE].y}
          stroke="#1560D4" strokeWidth="2.5" strokeLinecap="round"
          filter={`url(#${glowId})`}
        />
      </svg>
    </div>
  );
}
