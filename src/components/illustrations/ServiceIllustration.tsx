"use client";

import { motion } from "framer-motion";

export function CodeIllustration({ className = "" }: { className?: string }) {
  const lines = [
    { width: "60%", delay: 0 },
    { width: "80%", delay: 0.1 },
    { width: "45%", delay: 0.2 },
    { width: "70%", delay: 0.3 },
    { width: "55%", delay: 0.4 },
    { width: "65%", delay: 0.5 },
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="rounded-xl border border-webso-blue-800/50 bg-webso-navy/80 p-6 backdrop-blur-sm">
        {/* Window dots */}
        <div className="mb-4 flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-webso-accent/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-webso-blue-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-webso-blue-700/40" />
        </div>
        {/* Animated code lines */}
        <div className="flex flex-col gap-2.5">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className="h-2 rounded-full"
              style={{
                width: line.width,
                background:
                  i % 3 === 0
                    ? "linear-gradient(90deg, rgba(34,211,238,0.3), rgba(34,211,238,0.05))"
                    : i % 3 === 1
                    ? "linear-gradient(90deg, rgba(91,167,255,0.2), rgba(91,167,255,0.05))"
                    : "linear-gradient(90deg, rgba(148,163,184,0.15), rgba(148,163,184,0.03))",
              }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: line.delay,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            />
          ))}
        </div>
        {/* Cursor blink */}
        <motion.div
          className="mt-3 h-3.5 w-[2px] bg-webso-accent"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export function AIIllustration({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 50, y: 30, r: 6 },
    { x: 20, y: 60, r: 4 },
    { x: 80, y: 55, r: 5 },
    { x: 35, y: 85, r: 4 },
    { x: 65, y: 85, r: 4 },
    { x: 50, y: 60, r: 8 },
  ];

  const connections = [
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [0, 1],
    [0, 2],
    [3, 4],
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="rounded-xl border border-webso-blue-800/50 bg-webso-navy/80 p-6 backdrop-blur-sm">
        <svg viewBox="0 0 100 110" className="h-full w-full">
          {/* Connections */}
          {connections.map(([from, to], i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${nodes[from].x}`}
              y1={`${nodes[from].y}`}
              x2={`${nodes[to].x}`}
              y2={`${nodes[to].y}`}
              stroke="rgba(34,211,238,0.15)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true }}
            />
          ))}

          {/* Data pulses along connections */}
          {connections.slice(0, 5).map(([from, to], i) => (
            <motion.circle
              key={`pulse-${i}`}
              r="1.5"
              fill="rgba(34,211,238,0.6)"
              animate={{
                cx: [nodes[from].x, nodes[to].x],
                cy: [nodes[from].y, nodes[to].y],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
            />
          ))}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={
                i === 5
                  ? "rgba(34,211,238,0.3)"
                  : "rgba(91,167,255,0.15)"
              }
              stroke={
                i === 5
                  ? "rgba(34,211,238,0.6)"
                  : "rgba(91,167,255,0.3)"
              }
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                type: "spring",
              }}
              viewport={{ once: true }}
            />
          ))}

          {/* Center glow */}
          <circle
            cx="50"
            cy="60"
            r="16"
            fill="rgba(34,211,238,0.05)"
            className="animate-pulse-glow"
          />
        </svg>
      </div>
    </div>
  );
}
