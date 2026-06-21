"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface StickyStackProps {
  children: React.ReactNode;
  /**
   * Background color of this panel — should match the section's bg.
   * Defaults to var(--bg-section, #FFFCF6)
   */
  bg?: string;
  /**
   * Stacking index — the higher the number the later it appears,
   * so it sits ON TOP of earlier panels.
   */
  index?: number;
}

/**
 * StickyStack — landing.love panel-over-panel transition.
 *
 * Usage: wrap each <section> with <StickyStack index={n} bg="...">.
 * The section pins to the top while the next one slides up from below
 * and covers it. Creates the cinematic "page reveals page" effect.
 *
 * Each panel needs a height multiplier so there's room to scroll.
 * The actual section height + 100vh of "pinned scroll budget" is handled
 * via the outer wrapper height.
 */
export default function StickyStack({ children, bg, index = 0 }: StickyStackProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Pin the inner panel while scroll budget is consumed
    ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "bottom top",
      pin: inner,
      pinSpacing: false,
      anticipatePin: 1,
    });

    // Subtle scale-down as next panel approaches (depth illusion)
    gsap.to(inner, {
      scrollTrigger: {
        trigger: outer,
        start: "80% top",
        end: "bottom top",
        scrub: 0.8,
      },
      scale: 0.96,
      borderRadius: 16,
      ease: "none",
    });
  });

  return (
    <div
      ref={outerRef}
      style={{
        // Extra height creates the scroll budget for pinning
        // 100vh = the panel itself; additional space lets the next panel climb
        minHeight: "100vh",
        position: "relative",
        zIndex: index,
      }}
    >
      <div
        ref={innerRef}
        style={{
          background: bg ?? "var(--bg-section, #FFFCF6)",
          transformOrigin: "center top",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
