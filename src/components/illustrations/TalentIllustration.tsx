"use client";

import { motion } from "framer-motion";

/**
 * Suomen terävintä osaamista — three lines fanning from left, converging to
 * a large focal circle. Beams travel along each line toward the focus.
 */

const FOCAL = { cx: 152, cy: 60 };
// r=22: edge at x=130. Lines end at x=130.
const SOURCES = [
  { x: 8,  y: 12,  delay: 0, beamDelay: 0 },
  { x: 8,  y: 60,  delay: 0.1, beamDelay: 0.55 },
  { x: 8,  y: 108, delay: 0.2, beamDelay: 1.1 },
];

function lineLen(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function TalentIllustration({ className = "" }: { className?: string }) {
  const beam = 38;

  return (
    <div className={className}>
      <svg viewBox="0 0 200 120" fill="none" className="w-full">
        <defs>
          <linearGradient id="tal-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.45)" />
          </linearGradient>
          <filter id="tal-glow" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {SOURCES.map((s, i) => {
          const ex = FOCAL.cx - 22; // stop at circle edge
          const ey = FOCAL.cy;
          const L = Math.round(lineLen(s.x, s.y, ex, ey));
          const dash = `${beam} ${L + beam + 2}`;

          return (
            <g key={i}>
              {/* Static background line */}
              <motion.line x1={s.x} y1={s.y} x2={ex} y2={ey}
                stroke="rgba(255,255,255,0.22)" strokeWidth="1"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: s.delay }}
                viewport={{ once: true }}
              />
              {/* Traveling beam */}
              <motion.line x1={s.x} y1={s.y} x2={ex} y2={ey}
                stroke="#1560D4" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={dash}
                animate={{ strokeDashoffset: [beam, -L] }}
                transition={{
                  duration: 2.2, repeat: Infinity,
                  ease: "linear", delay: s.beamDelay,
                }}
                filter="url(#tal-glow)"
              />
            </g>
          );
        })}

        {/* Focal circle */}
        <motion.circle cx={FOCAL.cx} cy={FOCAL.cy} r="22"
          stroke="#1560D4" strokeWidth="1" fill="rgba(21,96,212,0.1)"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35, type: "spring", stiffness: 150 }}
          viewport={{ once: true }}
        />
        <motion.circle cx={FOCAL.cx} cy={FOCAL.cy} r="22"
          fill="rgba(21,96,212,0.18)" stroke="none"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
