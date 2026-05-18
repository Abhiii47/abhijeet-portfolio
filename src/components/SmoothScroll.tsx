"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { raf:(t:number)=>void; destroy:()=>void; on:(e:string,cb:()=>void)=>void } | null = null;

    const init = async () => {
      try {
        const mod = await import("@studio-freight/lenis" as string);
        const Lenis = (mod.default ?? mod) as new (o: object) => typeof lenis;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });
        lenis!.on("scroll", () => ScrollTrigger.update());
        gsap.ticker.add((time: number) => lenis!.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      } catch {
        /* Package not installed — native scroll, keep ScrollTrigger in sync */
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
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove((time: number) => lenis!.raf(time * 1000));
      }
    };
  }, []);

  return <>{children}</>;
}
