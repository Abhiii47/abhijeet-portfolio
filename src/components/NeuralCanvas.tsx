"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ACCENT = "132,204,22";
    const WHITE  = "240,237,232";
    const NODE_COUNT = 72;
    const MAX_DIST = 160;
    const MOUSE_RADIUS = 200;

    let W = 0, H = 0;
    const nodes: Node[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Seed nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 0.6,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Update positions
      for (const n of nodes) {
        // Gentle mouse repulsion
        const dx = n.x - mx;
        const dy = n.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - d) / MOUSE_RADIUS;
          n.vx += (dx / d) * force * 0.4;
          n.vy += (dy / d) * force * 0.4;
        }

        // Speed cap & damping
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 1.2) { n.vx *= 1.2 / speed; n.vy *= 1.2 / speed; }
        n.vx *= 0.995;
        n.vy *= 0.995;

        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges
        if (n.x < 0) n.x = W;
        if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H;
        if (n.y > H) n.y = 0;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const opacity = (1 - dist / MAX_DIST) * 0.18;

          // Check if either node is near mouse — highlight edge
          const aNearMouse = Math.hypot(a.x - mx, a.y - my) < MOUSE_RADIUS;
          const bNearMouse = Math.hypot(b.x - mx, b.y - my) < MOUSE_RADIUS;
          const highlight  = aNearMouse || bNearMouse;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = highlight
            ? `rgba(${ACCENT},${Math.min(opacity * 4, 0.55)})`
            : `rgba(${WHITE},${opacity})`;
          ctx.lineWidth = highlight ? 0.8 : 0.4;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const nearMouse = Math.hypot(n.x - mx, n.y - my) < MOUSE_RADIUS;
        const pulse = Math.sin(n.pulsePhase + frame * 0.018) * 0.5 + 0.5;

        // Glow
        if (nearMouse) {
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12);
          grd.addColorStop(0, `rgba(${ACCENT},0.25)`);
          grd.addColorStop(1, `rgba(${ACCENT},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, nearMouse ? n.radius * 2 : n.radius * (0.7 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = nearMouse
          ? `rgba(${ACCENT},0.9)`
          : `rgba(${WHITE},${0.25 + pulse * 0.2})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
      aria-hidden
    />
  );
}
