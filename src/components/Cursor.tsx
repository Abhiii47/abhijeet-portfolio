"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#00d4ff";

type CursorState = "default" | "hover" | "text";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);
  const [state,   setState]   = useState<CursorState>("default");
  const [label,   setLabel]   = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [role='button'], [data-cursor='link']");
      const isText = target.closest("h1, h2, h3, p, [data-cursor='text']");
      const lbl    = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? "";
      setLabel(lbl);
      if (isLink) setState("hover");
      else if (isText) setState("text");
      else setState("default");
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onDown   = () => setPressed(true);
    const onUp     = () => setPressed(false);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    const ease = 0.11;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * ease;
      ring.current.y += (pos.current.y - ring.current.y) * ease;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isHover = state === "hover";
  const isText  = state === "text";

  /* sizes */
  const dotSize  = pressed ? "3px" : isHover ? "4px" : "5px";
  const ringSize = pressed ? "28px" : isHover ? "48px" : isText ? "2px" : "32px";
  const ringH    = isText ? "24px" : ringSize;

  return (
    <>
      {/* ── dot ── */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: dotSize, height: dotSize,
          borderRadius: "50%",
          background: ACCENT,
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          mixBlendMode: "screen",
          boxShadow: `0 0 ${isHover ? 12 : 6}px ${ACCENT}`,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease, box-shadow 0.2s ease",
          willChange: "transform",
        }}
      />

      {/* ── lagging ring ── */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: ringSize, height: ringH,
          borderRadius: isText ? "3px" : "50%",
          border: `1px solid ${isHover ? ACCENT : isText ? "rgba(255,255,255,0.2)" : "rgba(0,212,255,0.35)"}`,
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? (isText ? 0.5 : 0.8) : 0,
          backdropFilter: isHover ? "blur(1px)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: isHover ? `0 0 24px ${ACCENT}30` : "none",
          transition:
            "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, opacity 0.3s ease, box-shadow 0.25s ease, border-radius 0.2s ease",
          willChange: "transform",
        }}
      >
        {isHover && label && (
          <span style={{
            fontSize: "8px", fontFamily: "monospace",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: ACCENT, whiteSpace: "nowrap",
          }}>{label}</span>
        )}
      </div>
    </>
  );
}
