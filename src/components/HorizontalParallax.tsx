"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalParallaxProps {
  /** The ghost/watermark text to render */
  text: string;
  /**
   * Multiplier for horizontal movement.
   * Positive = drift right on scroll-down.
   * Negative = drift left (counter-scroll) — more dramatic.
   * Default: -0.35
   */
  speed?: number;
  /** CSS color — keep very faint, e.g. "rgba(14,10,4,0.04)" */
  color?: string;
  /** Font size — large watermark recommended */
  fontSize?: string;
  /** Additional class */
  className?: string;
}

/**
 * HorizontalParallax — animates large ghost text horizontally on scroll.
 * Drop this inside any section as a decorative layer.
 *
 * Example:
 *   <HorizontalParallax text="ABOUT" speed={-0.4} />
 */
export default function HorizontalParallax({
  text,
  speed = -0.35,
  color = "rgba(14,10,4,0.04)",
  fontSize = "clamp(10rem,22vw,22rem)",
  className = "",
}: HorizontalParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Calculate max travel distance based on element width
    const distance = el.offsetWidth * Math.abs(speed) * 0.6;
    const dir = speed < 0 ? -1 : 1;

    gsap.fromTo(
      el,
      { x: dir * -distance * 0.5 },
      {
        x: dir * distance * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "var(--font-serif), 'Bebas Neue', Georgia, serif",
        fontSize,
        fontWeight: 700,
        lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: `1px ${color}`,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
        willChange: "transform",
        zIndex: 0,
      }}
    >
      {text}
    </div>
  );
}
