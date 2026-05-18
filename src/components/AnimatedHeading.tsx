"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  text: string;       /* e.g. "Skills &" */
  italic?: string;    /* e.g. "expertise" — rendered last in rust italic */
  section?: string;   /* e.g. "03" — section number label */
  size?: string;      /* CSS font-size, defaults to clamp */
  color?: string;
  rustColor?: string;
}

export default function AnimatedHeading({
  text,
  italic,
  section,
  size = "clamp(2.2rem,4.5vw,3.8rem)",
  color = "#1A1208",
  rustColor = "#C4400A",
}: AnimatedHeadingProps) {
  const ref        = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);

  /* Build word list — main words + optional italic word at end */
  const mainWords   = text.trim().split(/\s+/);
  const allWords    = italic ? [...mainWords, italic] : mainWords;

  useGSAP(() => {
    const wrappers = ref.current?.querySelectorAll<HTMLElement>(".ah-clip");
    const inners   = ref.current?.querySelectorAll<HTMLElement>(".ah-inner");
    const line     = lineRef.current;
    const label    = labelRef.current;
    if (!wrappers?.length || !inners?.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    });

    /* Section label fades in first */
    if (label) {
      tl.from(label, { opacity: 0, y: 8, duration: 0.4, ease: "power2.out" }, 0);
    }

    /* Words reveal: y:100% → 0 */
    inners.forEach((inner, i) => {
      const isItalic = italic && i === allWords.length - 1;
      const delay    = isItalic ? i * 0.08 + 0.1 : i * 0.08;
      tl.from(
        inner,
        { y: "100%", opacity: 0, duration: 0.7, ease: "power4.out" },
        0.1 + delay
      );
    });

    /* Rust underline scaleX after words land */
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
      {/* Section label */}
      {section && (
        <p
          ref={labelRef}
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 400, fontSize: 10,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: rustColor,
            marginBottom: 28,
          }}
        >{section} / {italic ? text.split(" ")[0] === "Skills" ? "Skills" : text.split(" ")[0] : text}</p>
      )}

      {/* Heading */}
      <div
        style={{
          display: "flex", flexWrap: "wrap",
          alignItems: "baseline",
          gap: "0 0.28em",
          marginBottom: 6,
        }}
      >
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
                  fontFamily: "'DM Serif Display',Georgia,serif",
                  fontStyle: isItalic ? "italic" : "normal",
                  fontWeight: 400,
                  fontSize: size,
                  color: isItalic ? rustColor : color,
                  lineHeight: 1.1,
                }}
              >{word}</span>
            </div>
          );
        })}
      </div>

      {/* Rust underline */}
      <div
        ref={lineRef}
        style={{
          height: 1.5,
          width: "clamp(48px,8vw,80px)",
          background: rustColor,
          marginBottom: "clamp(32px,4vw,52px)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
