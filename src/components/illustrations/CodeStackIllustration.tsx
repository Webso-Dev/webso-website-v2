"use client";

import { motion } from "framer-motion";

/**
 * AI-natiivi sovelluskehitys — Four stacked horizontal bars, narrowing upward.
 * Clean architecture metaphor. Blue accent = AI layer embedded in the middle.
 */
export function CodeStackIllustration({ className = "" }: { className?: string }) {
  const layers = [
    { y: 96, w: 160, delay: 0.05 },
    { y: 76, w: 130, delay: 0.12 },
    { y: 56, w: 100, delay: 0.2, accent: true },
    { y: 36, w: 70,  delay: 0.28 },
  ];
  const cx = 20;

  return (
    <div className={className}>
      <svg viewBox="0 0 200 140" fill="none" className="w-full">

        {layers.map((l, i) => {
          const x = cx + (160 - l.w) / 2;
          return (
            <motion.rect key={i}
              x={x} y={l.y} width={l.w} height={16}
              stroke={l.accent ? "#1560D4" : "rgba(255,255,255,0.5)"}
              strokeWidth={l.accent ? "1" : "0.75"}
              fill={l.accent ? "rgba(21,96,212,0.22)" : "rgba(255,255,255,0.04)"}
              initial={{ opacity: 0, y: l.y + 6 }}
              whileInView={{ opacity: 1, y: l.y }}
              transition={{ duration: 0.4, delay: l.delay }}
              viewport={{ once: true }}
            />
          );
        })}

        {/* Blue layer breathing */}
        <motion.rect x={cx + 30} y={56} width={100} height={16}
          fill="rgba(21,96,212,0.15)" stroke="none"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

      </svg>
    </div>
  );
}
