"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionWipe — a 1px-tall invisible element that, when scrolled into view,
 * fires a GSAP clip-path + opacity wipe on the NEXT sibling section.
 * Gives the illusion of sections being "revealed" by a sliding curtain.
 */
export default function SectionWipe({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = ref.current;
    if (!trigger) return;
    const nextSection = trigger.nextElementSibling as HTMLElement | null;
    if (!nextSection) return;

    /* Set initial clip — hidden from bottom */
    gsap.set(nextSection, {
      clipPath: "inset(6% 0% 0% 0%)",
      opacity: 0.0,
      willChange: "clip-path, opacity",
    });

    /* Wipe reveal on scroll */
    gsap.to(nextSection, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 1.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger,
        start: "top 88%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div
      id={id}
      ref={ref}
      aria-hidden
      style={{ height: 1, overflow: "hidden", pointerEvents: "none" }}
    />
  );
}
