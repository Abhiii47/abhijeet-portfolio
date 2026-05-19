"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Try 'lenis' (new package name) first, then '@studio-freight/lenis' as fallback.
// Install the correct one with: npm i lenis
type LenisInstance = { raf:(t:number)=>void; destroy:()=>void; on:(e:string,cb:()=>void)=>void };

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: LenisInstance | null = null;
    let rafId: ReturnType<typeof requestAnimationFrame> | null = null;

    const init = async () => {
      try {
        // Prefer the new 'lenis' package (not scoped)
        let mod: { default?: unknown };
        try {
          mod = await import("lenis" as string);
        } catch {
          mod = await import("@studio-freight/lenis" as string);
        }

        const Lenis = (mod.default ?? mod) as new (o: object) => LenisInstance;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });

        lenis.on("scroll", () => ScrollTrigger.update());

        const tick = (time: number) => {
          lenis!.raf(time);
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        gsap.ticker.lagSmoothing(0);

      } catch {
        // Neither package installed — fall back to native scroll
        const onScroll = () => ScrollTrigger.update();
        window.addEventListener("scroll", onScroll, { passive: true });
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        let t: ReturnType<typeof setTimeout>;
        const onResize = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 150); };
        window.addEventListener("resize", onResize);
      }
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
