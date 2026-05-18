"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
      on: (event: string, cb: (e: { scroll: number }) => void) => void;
    } | null = null;

    const initLenis = async () => {
      try {
        /* Dynamic import so it only runs client-side */
        const LenisModule = await import("@studio-freight/lenis");
        const LenisClass  = LenisModule.default ?? LenisModule;

        lenis = new (LenisClass as new (opts: object) => typeof lenis)({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.6,
        });

        lenisRef.current = lenis;

        /* Sync Lenis with GSAP ScrollTrigger */
        lenis!.on("scroll", () => ScrollTrigger.update());

        /* GSAP ticker drives Lenis RAF */
        gsap.ticker.add((time: number) => {
          lenis!.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

      } catch {
        /* Lenis not installed — fall back to native scroll silently */
      }
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove((time: number) => lenis!.raf(time * 1000));
      }
    };
  }, []);

  return <>{children}</>;
}
