"use client";

import { motion } from "framer-motion";

/**
 * Applied AI Engineering — Minimal node graph.
 * One center node (blue) connected to 5 outer nodes by clean lines.
 * Abstract, modern. No clutter.
 */
export function AINetworkIllustration({ className = "" }: { className?: string }) {
  const cx = 100, cy = 70;
  const outer = [
    { x: 40,  y: 35  },
    { x: 160, y: 35  },
    { x: 30,  y: 105 },
    { x: 170, y: 105 },
    { x: 100, y: 22  },
  ];

  return (
    <div className={className}>
      <svg viewBox="0 0 200 140" fill="none" className="w-full">

        {/* Edges */}
        {outer.map((n, i) => (
          <motion.line key={i}
            x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke="rgba(255,255,255,0.3)" strokeWidth="0.75"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.05 * i }} viewport={{ once: true }} />
        ))}

        {/* Outer nodes */}
        {outer.map((n, i) => (
          <motion.rect key={i}
            x={n.x - 6} y={n.y - 6} width={12} height={12}
            stroke="rgba(255,255,255,0.5)" strokeWidth="0.75" fill="rgba(255,255,255,0.04)"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }} viewport={{ once: true }} />
        ))}

        {/* Center node — blue accent */}
        <motion.rect x={cx - 12} y={cy - 12} width={24} height={24}
          stroke="#1560D4" strokeWidth="1" fill="rgba(21,96,212,0.25)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }} viewport={{ once: true }} />

        {/* Center breathing */}
        <motion.rect x={cx - 12} y={cy - 12} width={24} height={24}
          fill="rgba(21,96,212,0.18)" stroke="none"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

        {/* Moving pulse on one edge */}
        <motion.rect width="5" height="5" fill="rgba(21,96,212,0.9)"
          animate={{ x: [157, 97], y: [32, 67], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "linear" }} />

      </svg>
    </div>
  );
}
