"use client";

import React, { useEffect, useRef } from "react";

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  maxAlpha: number;
}

interface SparklesProps {
  className?: string;
  color?: string; // hex or rgb color
  density?: number; // average number of particles
}

export default function Sparkles({ className = "", color, density = 40 }: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: SparkleParticle[] = [];

    // Get color from design token or prop
    const getSparkleColor = () => {
      if (color) return color;
      // Get --accent-bright from computed styles or fallback
      if (typeof window !== "undefined") {
        const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent-bright").trim();
        return accent || "#E8572A";
      }
      return "#E8572A";
    };

    const activeColor = getSparkleColor();

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 10000) * (density / 40);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
          maxAlpha: Math.random() * 0.6 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.alpha += p.speed;
        if (p.alpha > p.maxAlpha || p.alpha < 0) {
          p.speed = -p.speed;
        }

        // Keep alpha bounded
        p.alpha = Math.max(0, Math.min(p.alpha, p.maxAlpha));

        ctx.fillStyle = activeColor;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        // Draw small sparkle star shape or circle
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    // Resize observer to handle container size changes
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();
    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
