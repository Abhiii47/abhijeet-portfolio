"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SectionWipe({ id }: { id: string }) {
  const ref     = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = ref.current;
    const bar     = barRef.current;
    if (!trigger) return;
    const nextSection = trigger.nextElementSibling as HTMLElement | null;
    if (!nextSection) return;

    /* Init next section hidden */
    gsap.set(nextSection, {
      clipPath: "inset(5% 0% 0% 0%)",
      opacity: 0,
      willChange: "clip-path, opacity",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top 88%",
        once: true,
      },
    });

    /* 1. Rust flash bar grows left → right */
    if (bar) {
      tl.fromTo(bar,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.28, ease: "expo.out", transformOrigin: "left" }
      )
      /* 2. Bar shrinks right → left (wipe away) */
      .to(bar,
        { scaleX: 0, duration: 0.22, ease: "expo.in", transformOrigin: "right" },
        "+=0.04"
      );
    }

    /* 3. Section reveals (overlaps bar wipe) */
    tl.to(nextSection,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      bar ? 0.18 : 0
    );
  }, { scope: ref });

  return (
    <div
      id={id}
      ref={ref}
      aria-hidden
      style={{ position: "relative", height: 2, overflow: "visible", pointerEvents: "none" }}
    >
      {/* Rust flash bar */}
      <div
        ref={barRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, var(--accent), var(--accent-bright))",
          transform: "scaleX(0)",
          transformOrigin: "left",
          zIndex: 10,
        }}
      />
    </div>
  );
}
