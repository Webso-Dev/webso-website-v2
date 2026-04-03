"use client";

import { useEffect, useRef } from "react";

// Classic Perlin noise implementation
class Noise {
  private perm: number[];

  constructor() {
    const p = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    this.perm = [...p, ...p];
  }

  private fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : -x;
    const v = h === 0 || h === 3 ? y : -y;
    return u + v;
  }

  perlin2(x: number, y: number) {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);

    const aa = this.perm[this.perm[xi] + yi];
    const ab = this.perm[this.perm[xi] + yi + 1];
    const ba = this.perm[this.perm[xi + 1] + yi];
    const bb = this.perm[this.perm[xi + 1] + yi + 1];

    return this.lerp(
      this.lerp(this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf), u),
      this.lerp(this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1), u),
      v
    );
  }
}

interface WaveCanvasProps {
  className?: string;
  lineColor?: string;
  bgColor?: string;
}

export function WaveCanvas({
  className = "",
  lineColor = "#AEA6B6",
  bgColor = "#010101",
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise = new Noise();
    let animId: number;
    let time = 0;
    let isVisible = true;

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      sx: -1000,
      sy: -1000,
      vx: 0,
      vy: 0,
      svx: 0,
      svy: 0,
    };

    // Responsive params
    const getParams = () => {
      const w = window.innerWidth;
      let scale = 1;
      let ampScale = 1;
      if (w < 480) {
        scale = 1.4;
        ampScale = 0.5;
      } else if (w < 768) {
        scale = 1.2;
        ampScale = 0.7;
      }
      return {
        xGap: 10 * scale,
        yGap: 36 * scale,
        ampX: 20 * ampScale,
        ampY: 20 * ampScale,
        lineWidth: w < 480 ? 1.6 : 2,
        maxLines: 130,
        maxPoints: 90,
        speedX: 0.04,
        speedY: 0.01,
      };
    };

    // Points grid
    interface Point {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      vx: number;
      vy: number;
    }

    let lines: Point[][] = [];
    let params = getParams();

    const buildGrid = () => {
      params = getParams();
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      const cols = Math.min(Math.ceil(rect.width / params.xGap), params.maxLines);
      const rows = Math.min(Math.ceil(rect.height / params.yGap) + 2, params.maxPoints);

      lines = [];
      for (let i = 0; i < cols; i++) {
        const line: Point[] = [];
        for (let j = 0; j < rows; j++) {
          line.push({
            baseX: i * params.xGap,
            baseY: j * params.yGap,
            x: i * params.xGap,
            y: j * params.yGap,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
          });
        }
        lines.push(line);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const prevX = mouse.x;
      const prevY = mouse.y;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.vx = mouse.x - prevX;
      mouse.vy = mouse.y - prevY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // Smooth mouse
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;
      mouse.svx += (mouse.vx - mouse.svx) * 0.1;
      mouse.svy += (mouse.vy - mouse.svy) * 0.1;

      const mouseSpeed = Math.sqrt(mouse.svx ** 2 + mouse.svy ** 2);
      const mouseAngle = Math.atan2(mouse.svy, mouse.svx);
      const mouseRadius = Math.max(175, mouseSpeed * 3);

      time += 1;

      // Update points
      for (const line of lines) {
        for (const p of line) {
          // Perlin noise displacement
          const nx = p.baseX * 0.003 + time * params.speedX * 0.02;
          const ny = p.baseY * 0.003 + time * params.speedY * 0.02;
          const noiseX = noise.perlin2(nx, ny) * params.ampX;
          const noiseY = noise.perlin2(nx + 100, ny + 100) * params.ampY;

          // Mouse displacement
          const distX = mouse.sx - p.baseX;
          const distY = mouse.sy - p.baseY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < mouseRadius && mouse.x > 0) {
            const force = (1 - dist / mouseRadius) * Math.min(25, mouseSpeed * 0.5 + 5);
            p.dx += Math.cos(mouseAngle) * force * 0.3;
            p.dy += Math.sin(mouseAngle) * force * 0.3;
          }

          // Spring back
          p.dx *= 0.9;
          p.dy *= 0.9;
          p.dx += -p.dx * 0.01;
          p.dy += -p.dy * 0.01;

          p.x = p.baseX + noiseX + p.dx;
          p.y = p.baseY + noiseY + p.dy;
        }
      }

      // Draw lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = params.lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (const line of lines) {
        if (line.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y);

        for (let j = 1; j < line.length - 1; j++) {
          const midX = (line[j].x + line[j + 1].x) / 2;
          const midY = (line[j].y + line[j + 1].y) / 2;
          ctx.quadraticCurveTo(line[j].x, line[j].y, midX, midY);
        }

        const last = line[line.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    // IntersectionObserver for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    buildGrid();
    draw();

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", buildGrid);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", buildGrid);
      observer.disconnect();
    };
  }, [lineColor, bgColor]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
