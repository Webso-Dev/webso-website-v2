"use client";

import { useEffect, useRef } from "react";

export function AnimatedGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const spacing = 40;
    const dotSize = 1;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const cols = Math.ceil(rect.width / spacing);
      const rows = Math.ceil(rect.height / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;

          // Wave effect
          const dist = Math.sqrt(
            Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2)
          );
          const wave = Math.sin(dist * 0.005 - time * 0.02) * 0.5 + 0.5;
          const opacity = 0.03 + wave * 0.08;

          ctx.beginPath();
          ctx.arc(x, y, dotSize + wave * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${opacity})`;
          ctx.fill();
        }
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
