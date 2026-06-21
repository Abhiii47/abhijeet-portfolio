"use client";

import { useEffect, useRef, useState } from "react";

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
  color      = "var(--text-primary)",
  accentColor = "var(--accent-primary)",
  fontFamily = "var(--font-serif)",
  labelFontFamily = "var(--font-mono,'Inter',monospace)",
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const onChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -20% 0px", // Trigger when 80% in viewport (20% from bottom)
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  const mainWords = text.trim().split(/\s+/);
  const allWords  = italic ? [...mainWords, italic] : mainWords;

  return (
    <div
      ref={ref}
      style={{
        opacity: reducedMotion ? 1 : (visible ? 1 : 0),
        transform: reducedMotion ? "none" : (visible ? "translateY(0)" : "translateY(20px)"),
        transition: "opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {section && (
        <p
          style={{
            fontFamily: labelFontFamily,
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: 28,
            opacity: reducedMotion ? 1 : (visible ? 1 : 0),
            transform: reducedMotion ? "none" : (visible ? "translateY(0)" : "translateY(10px)"),
            transition: "opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s",
          }}
        >
          {section} / {text.trim().split(" ")[0]}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "0 0.28em",
          marginBottom: 6,
        }}
      >
        {allWords.map((word, i) => {
          const isItalic = italic && i === allWords.length - 1;
          const delay = reducedMotion ? 0 : 0.06 * (i + 1);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontFamily,
                fontStyle: isItalic ? "italic" : "normal",
                fontWeight: isItalic ? 400 : 700,
                fontSize: size,
                color: isItalic ? accentColor : color,
                lineHeight: 1.1,
                opacity: reducedMotion ? 1 : (visible ? 1 : 0),
                transform: reducedMotion ? "none" : (visible ? "translateY(0)" : "translateY(15px)"),
                transition: `opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Accent underline */}
      <div
        style={{
          height: 1.5,
          width: "clamp(48px,8vw,80px)",
          background: accentColor,
          marginBottom: "clamp(32px,4vw,52px)",
          opacity: reducedMotion ? 0.55 : (visible ? 0.55 : 0),
          transform: reducedMotion ? "scaleX(1)" : (visible ? "scaleX(1)" : "scaleX(0)"),
          transformOrigin: "left",
          transition: `opacity 0.2s ease-out ${allWords.length * 0.06}s, transform 0.25s ease-out ${allWords.length * 0.06}s`,
        }}
      />
    </div>
  );
}
