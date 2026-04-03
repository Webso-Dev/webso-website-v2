"use client";

import { motion } from "framer-motion";

interface FloatingOrbProps {
  size?: number;
  color?: "accent" | "blue" | "purple";
  className?: string;
  delay?: number;
}

const colorMap = {
  accent: "from-webso-accent/20 to-webso-accent-dark/5",
  blue: "from-webso-blue-500/20 to-webso-blue-700/5",
  purple: "from-purple-500/15 to-webso-blue-600/5",
};

export function FloatingOrb({
  size = 300,
  color = "accent",
  className = "",
  delay = 0,
}: FloatingOrbProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full bg-gradient-to-br blur-[80px] ${colorMap[color]} ${className}`}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
