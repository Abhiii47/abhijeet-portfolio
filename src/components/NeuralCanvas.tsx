"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = document.body.scrollHeight;
    let raf: number;

    const resize = () => {
      W = window.innerWidth;
      H = document.body.scrollHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    const COUNT = 55;
    const nodes: Node[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.5 + 0.5,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
    resize();

    const MAX_DIST  = 160;
    const REPEL_R   = 90;
    const REPEL_STR = 0.4;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        // repel from mouse
        const dx = n.x - mouseRef.current.x;
        const dy = n.y - mouseRef.current.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < REPEL_R && d > 0) {
          n.vx += (dx / d) * REPEL_STR * (1 - d / REPEL_R);
          n.vy += (dy / d) * REPEL_STR * (1 - d / REPEL_R);
        }

        // dampen
        n.vx *= 0.97;
        n.vy *= 0.97;
        n.x  += n.vx;
        n.y  += n.vy;

        // bounce
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.x = Math.max(0, Math.min(W, n.x));
        n.y = Math.max(0, Math.min(H, n.y));
      }

      // edges
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const midX = (nodes[i].x + nodes[j].x) / 2;
          const midY = (nodes[i].y + nodes[j].y) / 2;
          const mDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
          const glow  = mDist < 180;

          const alpha = (1 - dist / MAX_DIST) * (glow ? 0.25 : 0.06);
          ctx.strokeStyle = glow ? `rgba(132,204,22,${alpha})` : `rgba(240,237,232,${alpha})`;
          ctx.lineWidth   = glow ? 0.8 : 0.4;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // nodes
      for (const n of nodes) {
        const dx    = n.x - mouseRef.current.x;
        const dy    = n.y - mouseRef.current.y;
        const close = Math.sqrt(dx * dx + dy * dy) < 120;
        ctx.beginPath();
        ctx.arc(n.x, n.y, close ? n.r * 2 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = close ? "rgba(132,204,22,0.5)" : "rgba(240,237,232,0.12)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      // Dimmed to 8% — background, not foreground
      style={{ zIndex: 0, opacity: 0.08 }}
      aria-hidden
    />
  );
}
