"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "text" | "link";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Determine cursor state from target
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [data-cursor='link'], .magnetic-btn");
      const isText = target.closest("h1, h2, h3, p, [data-cursor='text']");
      const label  = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? "";

      setLabel(label);
      if (isLink)       setState("link");
      else if (isText)  setState("text");
      else              setState("default");
    };

    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Smooth ring lag animation
    const animate = () => {
      const ease = 0.12;
      ring.current.x += (pos.current.x - ring.current.x) * ease;
      ring.current.y += (pos.current.y - ring.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform  = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  const isHover = state === "link";
  const isText  = state === "text";

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width:  isHover ? "6px" : "5px",
          height: isHover ? "6px" : "5px",
          background: "#84cc16",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        style={{
          width:  isHover ? "52px" : isText ? "2px" : "34px",
          height: isHover ? "52px" : isText ? "28px" : "34px",
          border: isHover
            ? "1px solid rgba(132,204,22,0.7)"
            : isText
            ? "1px solid rgba(240,237,232,0.15)"
            : "1px solid rgba(240,237,232,0.25)",
          opacity: visible ? 1 : 0,
          transition:
            "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, opacity 0.3s ease",
          backdropFilter: isHover ? "blur(2px)" : "none",
        }}
      >
        {/* Label inside ring on hover */}
        {isHover && label && (
          <span
            style={{
              fontSize: "8px",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              color: "#84cc16",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
