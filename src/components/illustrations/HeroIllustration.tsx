"use client";

import { motion } from "framer-motion";

const VW = 900, VH = 560;
// Arc center exactly at the bottom-right corner
const CX = VW, CY = VH;

function arcPath(r: number) {
  return `M ${CX - r},${CY} A ${r},${r} 0 0,0 ${CX},${CY - r}`;
}

function arcLen(r: number) {
  return (Math.PI / 2) * r;
}

const RADII = [220, 320, 430, 540, 660, 780];

const BEAMS = [
  { r: 220,  beamFrac: 0.26, duration: 1.8, delay: 0.4,  width: 2.5 },
  { r: 320,  beamFrac: 0.22, duration: 2.2, delay: 0.0,  width: 3.0 },
  { r: 430,  beamFrac: 0.19, duration: 2.9, delay: 2.3,  width: 2.0 },
  { r: 540,  beamFrac: 0.16, duration: 2.8, delay: 0.9,  width: 3.0 },
  { r: 660,  beamFrac: 0.14, duration: 2.6, delay: 1.2,  width: 2.0 },
  { r: 780,  beamFrac: 0.13, duration: 2.4, delay: 1.7,  width: 3.0 },
];

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMaxYMax slice"
        fill="none"
        overflow="hidden"
        className="h-full w-full"
      >
        <defs>
          {/* Arc stroke: blue at bottom → white mid → transparent at top */}
          <linearGradient id="arc-grad" x1="0" y1={VH} x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1560D4" stopOpacity="0.7" />
            <stop offset="30%"  stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"   />
          </linearGradient>

          {/* Glow filter for blue rays */}
          <filter id="ray-glow" x="-300%" y="-10%" width="700%" height="120%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Curved arcs — gradient stroke, bottom blue → transparent top */}
        {RADII.map((r, i) => (
          <motion.path
            key={r}
            d={arcPath(r)}
            stroke="url(#arc-grad)"
            strokeWidth="1.1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05 + i * 0.07, ease: "easeOut" }}
          />
        ))}

        {/* Blue rays — travel from bottom of arc upward, back and forth */}
        {BEAMS.map(({ r, beamFrac, duration, delay, width }, i) => {
          const C = arcLen(r);
          const beamLen = beamFrac * C;
          const dashArray = `${beamLen} ${C + beamLen}`;
          return (
            <motion.path
              key={i}
              d={arcPath(r)}
              stroke="#1560D4"
              strokeWidth={width}
              strokeLinecap="round"
              fill="none"
              filter="url(#ray-glow)"
              strokeDasharray={dashArray}
              animate={{ strokeDashoffset: [beamLen, -C] }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
