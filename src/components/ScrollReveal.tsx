"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drop this anywhere to auto-reveal children on scroll.
 * Usage: <ScrollReveal><YourContent /></ScrollReveal>
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 36,
  duration = 0.65,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0, opacity: 1, duration, delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, [delay, duration, y]);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
