"use client";

/**
 * SectionBorder
 * Wraps any section with a resumematcher.fyi-inspired animated
 * conic-gradient rotating border + corner registration marks.
 *
 * Usage:
 *   <SectionBorder>
 *     <YourSection />
 *   </SectionBorder>
 *
 * The border is purely decorative and uses @property --rm-angle so it
 * works in all modern browsers (Chrome 85+, Firefox 128+, Safari 16.4+).
 * Graceful fallback: a static 1px accent-dimmed border on older browsers.
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  /** Speed multiplier — 1 = default 8 s spin. Higher = slower. */
  speed?: number;
  /** Accent override colour (defaults to --accent). */
  accent?: string;
  /** If true the border glows brighter on scroll proximity */
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Show corner brackets */
  showCorners?: boolean;
};

export default function SectionBorder({
  children,
  speed = 1,
  accent,
  glow = true,
  className = "",
  style,
  showCorners = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Brighten the border as the section approaches viewport centre
  useGSAP(() => {
    if (!glow) return;
    const el = wrapRef.current;
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 15%",
      onEnter:     () => el.classList.add("sb--active"),
      onLeave:     () => el.classList.remove("sb--active"),
      onEnterBack: () => el.classList.add("sb--active"),
      onLeaveBack: () => el.classList.remove("sb--active"),
    });
  });

  const dur = `${8 * speed}s`;
  const col = accent ?? "var(--accent)";

  return (
    <div
      ref={wrapRef}
      className={`sb-wrap ${className}`}
      style={{
        position: "relative",
        // The rotating conic border is faked with a ::before pseudo-element
        // that we inject via the global CSS below.
        // We store accent colour as a custom property so each section can
        // override it independently without coupling to global CSS.
        ["--sb-accent" as string]: col,
        ["--sb-dur"    as string]: dur,
        ...style,
      }}
    >
      {showCorners && (
        <>
          {/* Corner registration marks — top-left */}
          <span aria-hidden className="sb-corner sb-corner--tl" />
          {/* top-right */}
          <span aria-hidden className="sb-corner sb-corner--tr" />
          {/* bottom-left */}
          <span aria-hidden className="sb-corner sb-corner--bl" />
          {/* bottom-right */}
          <span aria-hidden className="sb-corner sb-corner--br" />
        </>
      )}

      {children}
    </div>
  );
}
