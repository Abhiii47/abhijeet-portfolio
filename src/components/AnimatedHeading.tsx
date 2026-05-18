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
  /** Main word colour. Defaults to dark-mode white */
  color?: string;
  /** Italic/accent word colour. Defaults to cyan */
  accentColor?: string;
  /** Heading font family */
  fontFamily?: string;
  /** Section label font family */
  labelFontFamily?: string;
}

export default function AnimatedHeading({
  text,
  italic,
  section,
  size = "clamp(2.2rem,4.5vw,3.8rem)",
  color = "var(--ink, #f0ede8)",
  accentColor = "var(--accent, #00d4ff)",
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

    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
    });

    if (label) tl.from(label, { opacity: 0, y: 8, duration: 0.4, ease: "power2.out" }, 0);

    inners.forEach((inner, i) => {
      const isItalic = italic && i === allWords.length - 1;
      tl.from(
        inner,
        { y: "100%", opacity: 0, duration: 0.7, ease: "power4.out" },
        0.1 + i * 0.08 + (isItalic ? 0.1 : 0)
      );
    });

    if (line) {
      tl.from(
        line,
        { scaleX: 0, duration: 0.6, ease: "power2.inOut", transformOrigin: "left" },
        0.1 + allWords.length * 0.08 + 0.15
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
              className="ah-clip"
              style={{ overflow: "hidden", display: "inline-block" }}
            >
              <span
                className="ah-inner"
                style={{
                  display: "inline-block",
                  fontFamily,
                  fontStyle: isItalic ? "italic" : "normal",
                  fontWeight: isItalic ? 400 : 700,
                  fontSize: size,
                  color: isItalic ? accentColor : color,
                  lineHeight: 1.1,
                }}
              >{word}</span>
            </div>
          );
        })}
      </div>

      {/* Accent underline */}
      <div
        ref={lineRef}
        style={{
          height: 1.5,
          width: "clamp(48px,8vw,80px)",
          background: accentColor,
          marginBottom: "clamp(32px,4vw,52px)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
