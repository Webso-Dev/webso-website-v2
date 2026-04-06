# Sub-page Animations Reference

Saved for later use. These were removed from sub-pages to simplify them.

## Shared: GSAP + ScrollTrigger imports

```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

---

## PalvelutPage — BarGrid

Interactive 4x20 bar grid with random blue activations and pointer tracking.

```tsx
function BarGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const COLS = 20;
  const ROWS = 4;
  const BAR_W = 12;
  const GAP = 10;
  const THICK = 16;
  const DIM = 0.15;
  const VIEW_H = 100;

  const svgW = COLS * (BAR_W + GAP) - GAP;
  const xs = Array.from({ length: COLS }, (_, c) => c * (BAR_W + GAP));

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const rects = Array.from(containerRef.current?.querySelectorAll<SVGRectElement>(".bar-rect") ?? []);
    gsap.from(rects, { opacity: 0, duration: 0.3, stagger: 0.012, delay: 0.3 });

    const tids: ReturnType<typeof setTimeout>[] = [];

    const activate = (el: SVGRectElement, isHover = false) => {
      const origX = parseFloat(el.getAttribute("data-ox") ?? "0");
      const grow = (THICK - BAR_W) / 2;
      gsap.killTweensOf(el);
      gsap.timeline()
        .to(el, { opacity: 1, attr: { fill: "#1560D4", width: THICK, x: origX - grow }, duration: 0.15, ease: "power2.out" })
        .to(el, { opacity: DIM, attr: { fill: "#ffffff", width: BAR_W, x: origX }, duration: 0.55, ease: "power2.inOut", delay: isHover ? 0.8 : 0.2 });
    };

    const loop = () => {
      const tid = setTimeout(() => {
        activate(rects[Math.floor(Math.random() * rects.length)]);
        loop();
      }, 100 + Math.random() * 280);
      tids.push(tid);
    };
    loop();

    let lastHovered: SVGRectElement | null = null;
    let lastPX = -1, lastPY = -1;
    const onPointerMove = (e: PointerEvent) => {
      const cx = e.clientX, cy = e.clientY;
      const dx = cx - lastPX, dy = cy - lastPY;
      const steps = lastPX < 0 ? 1 : Math.max(1, Math.ceil(Math.sqrt(dx * dx + dy * dy) / 6));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const el = document.elementFromPoint(lastPX + dx * t, lastPY + dy * t);
        if (el instanceof SVGRectElement && el.classList.contains("bar-rect") && el !== lastHovered) {
          lastHovered = el;
          activate(el, true);
        }
      }
      lastPX = cx; lastPY = cy;
    };
    const container = containerRef.current;
    container?.addEventListener("pointermove", onPointerMove);

    return () => {
      tids.forEach(clearTimeout);
      gsap.killTweensOf(rects);
      container?.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex h-full flex-col gap-[10px]">
      {Array.from({ length: ROWS }, (_, r) => (
        <svg key={r} viewBox={`0 0 ${svgW} ${VIEW_H}`} preserveAspectRatio="none"
          width={svgW} className="min-h-0 flex-1" fill="none">
          {xs.map((x, c) => (
            <rect key={c} className="bar-rect cursor-default" data-ox={x}
              x={x} y={0} width={BAR_W} height={VIEW_H}
              fill="#ffffff" opacity={DIM} rx={1}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
```

**Usage in header:**
```tsx
<div className="absolute inset-y-0 right-0 flex items-stretch">
  <BarGrid />
</div>
```

**Scroll animation (`.pillar` cards):**
```tsx
gsap.utils.toArray<HTMLElement>(".pillar").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, y: 28, duration: 0.65, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%" }, delay: i * 0.1,
  });
});
```

---

## YhteistyotPage — NetworkGraph

4x4 node grid with animated pathfinding cursor and blue trail lines.

```tsx
const GX = [195, 275, 355, 435];
const GY = [25, 105, 185, 265];
const NET_NODES = GY.flatMap((y) => GX.map((x) => ({ x, y })));

const NET_EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],
  [4,5],[5,6],[6,7],
  [8,9],[9,10],[10,11],
  [12,13],[13,14],[14,15],
  [0,4],[4,8],[8,12],
  [1,5],[5,9],[9,13],
  [2,6],[6,10],[10,14],
  [3,7],[7,11],[11,15],
  [0,5],[1,6],[2,7],
  [4,9],[5,10],[6,11],
  [8,13],[9,14],[10,15],
  [1,4],[2,5],[3,6],
  [5,8],[6,9],[7,10],
  [9,12],[10,13],[11,14],
];

const HUB = 6;
const ADJ: number[][] = NET_NODES.map(() => []);
NET_EDGES.forEach(([a, b]) => { ADJ[a].push(b); ADJ[b].push(a); });

function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lineEls  = Array.from(svg.querySelectorAll<SVGLineElement>(".net-edge"));
    const nodeEls  = Array.from(svg.querySelectorAll<SVGCircleElement>(".net-node"));
    const trailEls = Array.from(svg.querySelectorAll<SVGLineElement>(".net-trail"));
    const cursorEl = svg.querySelector<SVGCircleElement>(".net-cursor")!;
    const haloEl   = svg.querySelector<SVGCircleElement>(".net-halo")!;

    gsap.from(lineEls, { opacity: 0, duration: 0.5, stagger: 0.018, ease: "power1.out", delay: 0.1 });
    gsap.from(nodeEls, { opacity: 0, duration: 0.35, stagger: 0.03, ease: "power1.out", delay: 0.35 });
    gsap.to(cursorEl, { opacity: 1, duration: 0.25, delay: 0.8 });

    gsap.to(svg.querySelector(".net-hub-glow"), {
      attr: { r: 12 }, opacity: 0.45, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    let current = HUB;
    let previous = -1;
    let trailIdx = 0;
    let stopped = false;

    function step() {
      if (stopped) return;
      const nbrs = ADJ[current].filter((n) => n !== previous);
      const candidates = nbrs.length > 0 ? nbrs : ADJ[current];
      const next = candidates[Math.floor(Math.random() * candidates.length)];
      const n1 = NET_NODES[current];
      const n2 = NET_NODES[next];
      const len = Math.sqrt((n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2);

      const trail = trailEls[trailIdx % trailEls.length];
      trailIdx++;
      gsap.killTweensOf(trail);
      gsap.killTweensOf(cursorEl);

      const DRAW = 0.55;

      gsap.set(trail, {
        attr: { x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y, strokeDasharray: len, strokeDashoffset: len },
        opacity: 1,
      });
      gsap.to(trail, { attr: { strokeDashoffset: 0 }, duration: DRAW, ease: "power1.inOut" });

      gsap.to(cursorEl, {
        attr: { cx: n2.x, cy: n2.y }, duration: DRAW, ease: "power1.inOut",
        onComplete: () => {
          gsap.set(haloEl, { attr: { cx: n2.x, cy: n2.y, r: 4 }, opacity: 0.75 });
          gsap.to(haloEl, { attr: { r: 16 }, opacity: 0, duration: 0.7, ease: "sine.out" });
          gsap.to(trail, { opacity: 0, duration: 2.8, delay: 0.2, ease: "sine.in" });
          previous = current;
          current = next;
          setTimeout(step, 420 + Math.random() * 280);
        },
      });
    }

    setTimeout(step, 900);
    return () => { stopped = true; };
  }, []);

  return (
    <svg ref={svgRef} viewBox="175 5 280 280" preserveAspectRatio="xMaxYMin meet"
      fill="none" className="pointer-events-none absolute inset-0 h-full w-full">
      {NET_EDGES.map(([a, b], i) => (
        <line key={i} className="net-edge" x1={NET_NODES[a].x} y1={NET_NODES[a].y} x2={NET_NODES[b].x} y2={NET_NODES[b].y} stroke="white" strokeOpacity="0.09" strokeWidth="1" />
      ))}
      {[...Array(8)].map((_, i) => (
        <line key={i} className="net-trail" x1="0" y1="0" x2="0" y2="0" stroke="#1560D4" strokeWidth="2.5" strokeLinecap="square" opacity={0} />
      ))}
      {NET_NODES.map((n, i) => i !== HUB && (
        <circle key={i} className="net-node" cx={n.x} cy={n.y} r="3.5" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="rgba(255,255,255,0.05)" />
      ))}
      <circle className="net-hub-glow" cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="7" fill="rgba(21,96,212,0.25)" stroke="none" opacity={0} />
      <circle className="net-node" cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="5.5" stroke="#1560D4" strokeWidth="1.2" fill="rgba(21,96,212,0.4)" />
      <circle className="net-halo" cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="5" stroke="#1560D4" strokeWidth="1" fill="none" opacity={0} />
      <circle className="net-cursor" cx={NET_NODES[HUB].x} cy={NET_NODES[HUB].y} r="3.5" fill="#1560D4" opacity={0} />
    </svg>
  );
}
```

**Scroll animations (`.case-row`, `.testimonial-card`):**
```tsx
gsap.utils.toArray<HTMLElement>(".case-row").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, y: 36, duration: 0.7, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 85%" }, delay: i * 0.12,
  });
});
gsap.from(".testimonial-card", {
  opacity: 0, y: 36, duration: 0.7, ease: "power2.out",
  scrollTrigger: { trigger: ".testimonial-card", start: "top 88%" },
});
```

---

## HeroArcs — Used on Meista, Ura, Ota yhteyttä

Animated SVG arc strokes that draw in from top-right corner.

### MeistaPage variant (4 arcs, gradient id: mg-grad)
```tsx
function HeroArcs() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const paths = Array.from(ref.current?.querySelectorAll<SVGPathElement>("path") ?? []);
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      gsap.fromTo(p,
        { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.0 + i * 0.1, ease: "power2.out", delay: 0.1 + i * 0.08 }
      );
    });
  }, []);
  const W = 520, H = 320;
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMin slice"
      fill="none" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="mg-grad" x1={W} y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1560D4" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[80, 150, 220, 290].map((r) => (
        <path key={r} d={`M ${W},${r} A ${r},${r} 0 0,1 ${W - r},0`}
          stroke="url(#mg-grad)" strokeWidth="0.85" />
      ))}
    </svg>
  );
}
```

### UraPage variant (5 arcs, gradient id: ug-grad)
Radii: `[70, 140, 210, 280, 350]`, timing: `duration: 0.9 + i * 0.1, delay: 0.05 + i * 0.07`

### OtaYhteyttaPage variant (4 arcs, gradient id: og-grad)
Radii: `[75, 145, 215, 285]`, timing: `duration: 0.9 + i * 0.1, delay: 0.05 + i * 0.08`

---

## Scroll Animation Targets Summary

| Page | Target Classes |
|------|---------------|
| PalvelutPage | `.pillar` |
| YhteistyotPage | `.case-row`, `.testimonial-card` |
| MeistaPage | `.meista-card`, `.principle-row`, `.team-card` |
| UraPage | `.ura-card` |
| OtaYhteyttaPage | `.contact-block` |
