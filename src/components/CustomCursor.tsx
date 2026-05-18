"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Hide on touch devices */
    if (window.matchMedia("(hover: none)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* Show cursors */
    dot.style.opacity  = "1";
    ring.style.opacity = "1";
    document.documentElement.style.cursor = "none";

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let rafId: number;
    let isExpanded = false;

    /* RAF loop — ring follows with lag */
    const tick = () => {
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;

      dot.style.transform  = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    /* Track mouse */
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    /* Expand ring on interactive elements */
    const onEnterInteractive = () => {
      if (isExpanded) return;
      isExpanded = true;
      ring.style.width   = "56px";
      ring.style.height  = "56px";
      ring.style.borderColor = "rgba(0,212,255,0.6)";
      ring.style.background  = "rgba(0,212,255,0.05)";
      dot.style.background   = "#00d4ff";
    };
    const onLeaveInteractive = () => {
      if (!isExpanded) return;
      isExpanded = false;
      ring.style.width   = "36px";
      ring.style.height  = "36px";
      ring.style.borderColor = "rgba(255,255,255,0.25)";
      ring.style.background  = "transparent";
      dot.style.background   = "#f0ede8";
    };

    /* Hide when leaving window */
    const onLeaveWindow  = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnterWindow  = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    /* Delegate interactive detection */
    const handleOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a,button,[role='button'],[role='link'],input,textarea,select,.proj-card");
      if (el) onEnterInteractive(); else onLeaveInteractive();
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  handleOver);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    /* Also hide native cursors on all children */
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
          position: "fixed",
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: "50%",
          background: "#f0ede8",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          mixBlendMode: "difference",
          transition: "background 0.18s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transition: "width 0.28s cubic-bezier(0.16,1,0.3,1), height 0.28s cubic-bezier(0.16,1,0.3,1), border-color 0.28s, background 0.28s",
          willChange: "transform",
        }}
      />
    </>
  );
}
