"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/fx/motion";

/**
 * Hero backdrop: a slow-drifting network of nodes (classrooms, campuses,
 * properties) with signals travelling between them. Canvas, one layer,
 * paused when off screen or for reduced motion. Decorative.
 */
type Node = { x: number; y: number; vx: number; vy: number; r: number; hub: boolean };
type Pulse = { a: number; b: number; t: number; speed: number };

export default function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const LINK = 170;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(26, (w * h) / 22000)));
      nodes.length = 0;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() < 0.12 ? 2.6 : 1.4,
          hub: Math.random() < 0.12,
        });
      }
    }

    function spawnPulse() {
      const a = Math.floor(Math.random() * nodes.length);
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(nodes[i].x - nodes[a].x, nodes[i].y - nodes[a].y);
        if (d < LINK && d < bestD && Math.random() > 0.3) {
          best = i;
          bestD = d;
        }
      }
      if (best >= 0) pulses.push({ a, b: best, t: 0, speed: 0.008 + Math.random() * 0.01 });
    }

    function draw(animate: boolean) {
      ctx!.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (animate) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(127,166,255,${(1 - d / LINK) * 0.22})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx!.fillStyle = n.hub ? "rgba(158,197,255,0.9)" : "rgba(127,166,255,0.55)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (animate) p.t += p.speed;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const g = ctx!.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, "rgba(190,215,255,0.95)");
        g.addColorStop(1, "rgba(127,166,255,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(x, y, 8, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      if (visible) {
        if (Math.random() < 0.06 && pulses.length < 14) spawnPulse();
        draw(true);
      }
      frame = requestAnimationFrame(loop);
    }

    resize();
    if (reduced) {
      draw(false);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const onResize = () => {
      resize();
      if (reduced) draw(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />;
}
