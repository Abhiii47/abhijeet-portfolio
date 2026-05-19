"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  text: string;
  italic?: string;
  section?: string;
  size?: string;
  color?: string;
  accentColor?: string;
  fontFamily?: string;
  labelFontFamily?: string;
}

export default function AnimatedHeading({
  text,
  italic,
  section,
  size = "clamp(2.2rem,4.5vw,3.8rem)",
  color      = "var(--ink, #0E0A04)",
  accentColor = "var(--accent, #C4400A)",
  fontFamily = "'Cormorant Garamond',Georgia,serif",
  labelFontFamily = "var(--font-mono,'Inter',monospace)",
}: AnimatedHeadingProps) {
  const ref      = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  const mainWords = text.trim().split(/\s+/);
  const allWords  = italic ? [...mainWords, italic] : mainWords;

  useGSAP(() => {
    const inners = ref.current?.querySelectorAll<HTMLElement>(".ah-inner");
    const line   = lineRef.current;
    const label  = labelRef.current;
    if (!inners?.length) return;

    // Set initial state for line via GSAP (not inline style)
    if (line) gsap.set(line, { scaleX: 0, opacity: 0, transformOrigin: "left" });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
    });

    if (label) {
      tl.fromTo(label,
        { y: 10, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.5, ease: "power2.out" },
        0
      );
    }

    inners.forEach((inner, i) => {
      const isItalic = italic && i === allWords.length - 1;
      const delay    = 0.08 + i * 0.09 + (isItalic ? 0.06 : 0);
      tl.fromTo(
        inner,
        { clipPath: "inset(0 0 100% 0)", y: "40%", skewY: 3, opacity: 0 },
        { clipPath: "inset(0 0 0% 0)",   y: "0%",  skewY: 0, opacity: 1,
          duration: 0.72, ease: "power4.out" },
        delay
      );
    });

    if (line) {
      tl.fromTo(
        line,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.55, duration: 0.55, ease: "power2.inOut", transformOrigin: "left" },
        0.1 + allWords.length * 0.09 + 0.12
      );
    }
  }, { scope: ref });

  return (
    <div ref={ref}>
      {section && (
        <p
          ref={labelRef}
          style={{
            fontFamily: labelFontFamily,
            fontWeight: 400, fontSize: 10,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: 28,
            opacity: 0,
          }}
        >{section} / {text.trim().split(" ")[0]}</p>
      )}

      <div style={{
        display: "flex", flexWrap: "wrap",
        alignItems: "baseline",
        gap: "0 0.28em",
        marginBottom: 6,
      }}>
        {allWords.map((word, i) => {
          const isItalic = italic && i === allWords.length - 1;
          return (
            <div
              key={i}
              style={{
                overflow: "hidden",
                display: "inline-block",
                paddingBottom: "0.08em",
                marginBottom: "-0.08em",
              }}
            >
              <span
                className="ah-inner"
                style={{
                  display: "inline-block",
                  fontFamily,
                  fontStyle:  isItalic ? "italic"  : "normal",
                  fontWeight: isItalic ? 400 : 700,
                  fontSize:   size,
                  color:      isItalic ? accentColor : color,
                  lineHeight: 1.1,
                  willChange: "clip-path, transform",
                  clipPath: "inset(0 0 100% 0)",
                  opacity: 0,
                }}
              >{word}</span>
            </div>
          );
        })}
      </div>

      {/* Accent underline — initial state set by gsap.set above */}
      <div
        ref={lineRef}
        style={{
          height: 1.5,
          width: "clamp(48px,8vw,80px)",
          background: accentColor,
          marginBottom: "clamp(32px,4vw,52px)",
        }}
      />
    </div>
  );
}
