"use client";

import { motion } from "framer-motion";

/**
 * AI-natiivi prosessi — one human directs (vertical line + single command)
 * → AI core (blue circle) → fires multiple outputs simultaneously.
 * Story: 1 person × AI = many things done in parallel.
 */

// Human → AI command line
const CMD = "M 32,60 L 98,60";
const CMD_LEN = 66;

// AI → output fan (3 lines from circle edge at x=136)
const FAN_T = "M 136,60 L 192,22";
const FAN_M = "M 136,60 L 192,60";
const FAN_B = "M 136,60 L 192,98";
const FAN_DIAG_LEN = 70; // sqrt(56²+38²) ≈ 68, rounded up
const FAN_MID_LEN  = 56;

const BEAM_CMD = 22;
const BEAM_FAN = 18;

export function ProcessIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 120" fill="none" className="w-full">
        <defs>
          <filter id="proc-glow" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Human — vertical line ─────────────────────────────── */}
        <motion.line x1="32" y1="16" x2="32" y2="104"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Direction point — where the human connects */}
        <motion.circle cx="32" cy="60" r="3.5" fill="white"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.25, type: "spring", stiffness: 260 }}
          viewport={{ once: true }}
        />
        <motion.circle cx="32" cy="60" fill="none"
          stroke="rgba(255,255,255,0.35)" strokeWidth="0.75"
          animate={{ r: [3.5, 10, 3.5], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        />

        {/* ── Command line (human → AI) ─────────────────────────── */}
        <motion.path d={CMD}
          stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"
          initial={{ opacity: 1 }}
        />
        <motion.path d={CMD}
          stroke="#1560D4" strokeWidth="2.5" strokeLinecap="round" fill="none"
          strokeDasharray={`${BEAM_CMD} ${CMD_LEN + BEAM_CMD + 2}`}
          animate={{ strokeDashoffset: [BEAM_CMD, -CMD_LEN] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />

        {/* ── AI core ───────────────────────────────────────────── */}
        <motion.circle cx="117" cy="60" r="19"
          stroke="#1560D4" strokeWidth="1" fill="rgba(21,96,212,0.1)"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 180 }}
          viewport={{ once: true }}
        />
        <motion.circle cx="117" cy="60" r="19"
          fill="rgba(21,96,212,0.18)" stroke="none"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Output fan (AI → world) ───────────────────────────── */}
        {[FAN_T, FAN_M, FAN_B].map((d, i) => (
          <path key={i} d={d}
            stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none"
          />
        ))}

        {/* Fan beams — staggered, fire after command enters circle */}
        <motion.path d={FAN_T}
          stroke="#1560D4" strokeWidth="2" strokeLinecap="round" fill="none"
          strokeDasharray={`${BEAM_FAN} ${FAN_DIAG_LEN + BEAM_FAN + 2}`}
          animate={{ strokeDashoffset: [BEAM_FAN, -FAN_DIAG_LEN] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: 0.7 }}
        />
        <motion.path d={FAN_M}
          stroke="#1560D4" strokeWidth="2" strokeLinecap="round" fill="none"
          strokeDasharray={`${BEAM_FAN} ${FAN_MID_LEN + BEAM_FAN + 2}`}
          animate={{ strokeDashoffset: [BEAM_FAN, -FAN_MID_LEN] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear", delay: 0.85 }}
        />
        <motion.path d={FAN_B}
          stroke="#1560D4" strokeWidth="2" strokeLinecap="round" fill="none"
          strokeDasharray={`${BEAM_FAN} ${FAN_DIAG_LEN + BEAM_FAN + 2}`}
          animate={{ strokeDashoffset: [BEAM_FAN, -FAN_DIAG_LEN] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: 1.0 }}
        />
      </svg>
    </div>
  );
}
