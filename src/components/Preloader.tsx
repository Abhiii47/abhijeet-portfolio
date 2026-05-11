"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [count, setCount]     = useState(0);
  const [done, setDone]       = useState(false);
  const [hidden, setHidden]   = useState(false);
  const topRef    = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scroll while loading
    document.body.style.overflow = "hidden";

    // Count 0 → 100
    let n = 0;
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 4) + 1;
      if (n >= 100) {
        n = 100;
        clearInterval(id);
        setCount(100);
        setTimeout(() => setDone(true), 260);
      } else {
        setCount(n);
      }
    }, 28);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!done) return;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setHidden(true);
      },
    });

    // Line expands
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: "expo.inOut",
    })
    // Panels split apart
    .to(topRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut",
    }, "+=0.1")
    .to(bottomRef.current, {
      yPercent: 100,
      duration: 0.9,
      ease: "expo.inOut",
    }, "<")
    // Whole wrapper fades out
    .to(wrapRef.current, {
      opacity: 0,
      duration: 0.3,
    }, "-=0.2");
  }, [done]);

  if (hidden) return null;

  const display = String(count).padStart(3, "0");

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[99999] pointer-events-all"
      style={{ fontFamily: "var(--font-mono-custom, 'Courier New', monospace)" }}
    >
      {/* Top panel */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#080808] flex items-end justify-between px-8 md:px-16 pb-6"
      >
        <span className="text-[10px] tracking-[0.35em] text-gray-600 uppercase">
          Abhijeet Kadu
        </span>
        <span className="text-[10px] tracking-[0.35em] text-gray-600 uppercase">
          AI / ML Engineer
        </span>
      </div>

      {/* Bottom panel */}
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#080808] flex items-start justify-between px-8 md:px-16 pt-6"
      >
        <span className="text-[10px] tracking-[0.35em] text-gray-600 uppercase">
          Mumbai, India
        </span>
        <span className="text-[10px] tracking-[0.35em] text-gray-600 uppercase">
          Portfolio 2025
        </span>
      </div>

      {/* Center — counter + line */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
        {/* Big counter */}
        <div
          className="tabular-nums select-none"
          style={{
            fontSize: "clamp(5rem, 18vw, 14rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: count === 100 ? "#84cc16" : "#f0ede8",
            transition: "color 0.4s ease",
            fontFamily: "var(--font-playfair, Georgia, serif)",
          }}
        >
          {display}
        </div>

        {/* Expanding line */}
        <div
          ref={lineRef}
          className="w-full max-w-xs md:max-w-sm h-px origin-center"
          style={{
            background: "linear-gradient(90deg, transparent, #84cc16, transparent)",
            transform: `scaleX(${count / 100})`,
            transition: "transform 0.06s linear",
          }}
        />

        {/* Loading label */}
        <span
          className="text-[9px] tracking-[0.4em] uppercase"
          style={{ color: count === 100 ? "#84cc16" : "#525252" }}
        >
          {count < 100 ? "Loading" : "Ready"}
        </span>
      </div>
    </div>
  );
}
