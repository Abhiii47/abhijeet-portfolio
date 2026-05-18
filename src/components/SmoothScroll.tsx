"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — zero external dependencies.
 * Keeps GSAP ScrollTrigger in sync with the native scroll position.
 * For true lerp smooth scroll, install `lenis` and uncomment the block below.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    /* Keep ScrollTrigger refreshed on every scroll event */
    const onScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Refresh ScrollTrigger after fonts / images load */
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    /* Refresh on resize */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load",   onLoad);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <>{children}</>;
}
