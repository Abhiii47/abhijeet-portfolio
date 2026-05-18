"use client";

import { useEffect, useRef } from "react";

type CursorState = "default" | "hover" | "drag" | "view";

export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    dot.style.opacity  = "1";
    ring.style.opacity = "1";
    document.documentElement.style.cursor = "none";

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let rafId: number;
    let state: CursorState = "default";

    /* RAF loop */
    const tick = () => {
      const lag = state === "drag" ? 0.08 : 0.13;
      ringX += (mouseX - ringX) * lag;
      ringY += (mouseY - ringY) * lag;
      dot.style.transform  = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    /* Apply state styles */
    const applyState = (next: CursorState) => {
      if (state === next) return;
      state = next;

      // Reset
      ring.style.width        = "36px";
      ring.style.height       = "36px";
      ring.style.borderColor  = "rgba(255,255,255,0.25)";
      ring.style.background   = "transparent";
      ring.style.borderRadius = "50%";
      dot.style.opacity       = "1";
      dot.style.background    = "#f0ede8";
      label.style.opacity     = "0";
      label.textContent       = "";

      if (next === "hover") {
        ring.style.width      = "56px";
        ring.style.height     = "56px";
        ring.style.borderColor = "rgba(0,212,255,0.6)";
        ring.style.background  = "rgba(0,212,255,0.05)";
        dot.style.background   = "#00d4ff";
      }

      if (next === "drag") {
        ring.style.width        = "72px";
        ring.style.height       = "72px";
        ring.style.borderColor  = "rgba(0,212,255,0.5)";
        ring.style.background   = "rgba(0,212,255,0.07)";
        ring.style.borderRadius = "50%";
        dot.style.opacity       = "0";
        label.textContent       = "DRAG";
        label.style.opacity     = "1";
        label.style.color       = "#00d4ff";
      }

      if (next === "view") {
        ring.style.width        = "64px";
        ring.style.height       = "64px";
        ring.style.borderColor  = "rgba(255,255,255,0.4)";
        ring.style.background   = "rgba(255,255,255,0.04)";
        dot.style.opacity       = "0";
        label.textContent       = "VIEW";
        label.style.opacity     = "1";
        label.style.color       = "rgba(255,255,255,0.75)";
      }
    };

    /* Delegate state detection */
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(".proj-drag-zone")) {
        applyState("drag"); return;
      }
      if (target.closest("img, [data-cursor='view']")) {
        applyState("view"); return;
      }
      if (target.closest("a,button,[role='button'],[role='link'],input,textarea,select")) {
        applyState("hover"); return;
      }
      applyState("default");
    };

    const onLeaveWindow = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnterWindow = () => { dot.style.opacity = state === "default" ? "1" : "0"; ring.style.opacity = "1"; };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  handleOver);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    const styleTag = document.createElement("style");
    styleTag.id = "cursor-override";
    styleTag.textContent = "*{cursor:none!important}";
    document.head.appendChild(styleTag);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  handleOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      document.documentElement.style.cursor = "";
      document.getElementById("cursor-override")?.remove();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 6, height: 6, borderRadius: "50%",
          background: "#f0ede8",
          pointerEvents: "none", zIndex: 99999, opacity: 0,
          mixBlendMode: "difference",
          transition: "background 0.18s, opacity 0.18s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 36, height: 36, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "transparent",
          pointerEvents: "none", zIndex: 99998, opacity: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition:
            "width 0.32s cubic-bezier(0.16,1,0.3,1)," +
            "height 0.32s cubic-bezier(0.16,1,0.3,1)," +
            "border-color 0.28s, background 0.28s, border-radius 0.28s",
          willChange: "transform",
        }}
      >
        {/* Label inside ring for DRAG / VIEW states */}
        <span
          ref={labelRef}
          aria-hidden
          style={{
            fontFamily: "'Inter',monospace",
            fontSize: 8, fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0,
            transition: "opacity 0.2s",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
}
