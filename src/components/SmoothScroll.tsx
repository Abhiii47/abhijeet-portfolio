"use client";

import { useEffect, useRef } from "react";

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    let raf: number;

    (async () => {
      try {
        const mod = await import("lenis" as string);
        const Lenis = (mod.default ?? mod) as new (o: object) => LenisInstance;
        const lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.8,
        } as object);
        lenisRef.current = lenis;
        const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
      } catch {
        // lenis not installed — native scroll used as fallback
      }
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
