"use client";

import { useEffect, useRef } from "react";

type CursorState = "default" | "hover" | "drag" | "view" | "text" | "preview";

const RUST  = "#C4400A";
const INK   = "rgba(14,10,4,0.55)";

export default function CustomCursor() {
  const dotRef     = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot     = dotRef.current;
    const ring    = ringRef.current;
    const label   = labelRef.current;
    const preview = previewRef.current;
    const img     = imgRef.current;
    if (!dot || !ring || !label || !preview || !img) return;

    dot.style.opacity  = "1";
    ring.style.opacity = "1";

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX, ringY = mouseY;
    let prevX  = mouseX, prevY = mouseY;
    let rafId: number;
    let state: CursorState = "default";

    const tick = () => {
      const lag = state === "drag" ? 0.07 : 0.12;
      ringX += (mouseX - ringX) * lag;
      ringY += (mouseY - ringY) * lag;
      dot.style.transform  = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;

      if (state === "preview") {
        const dx = mouseX - prevX;
        // Floating preview card follows cursor with gentle lag
        preview.style.transform = `translate(${mouseX + 20}px,${mouseY - 60}px) rotate(${dx * 0.2}deg)`;
      }
      prevX = mouseX; prevY = mouseY;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    const applyState = (next: CursorState, imageUrl?: string) => {
      if (state === next && next !== "preview") return;
      state = next;

      // Reset
      ring.style.width        = "32px";
      ring.style.height       = "32px";
      ring.style.borderColor  = INK;
      ring.style.background   = "transparent";
      ring.style.borderRadius = "50%";
      ring.style.borderWidth  = "1px";
      dot.style.opacity       = "1";
      dot.style.background    = RUST;
      dot.style.width         = "5px";
      dot.style.height        = "5px";
      label.style.opacity     = "0";
      label.textContent       = "";
      preview.style.opacity   = "0";
      preview.style.pointerEvents = "none";

      if (next === "hover") {
        ring.style.width       = "52px";
        ring.style.height      = "52px";
        ring.style.borderColor = `rgba(196,64,10,0.55)`;
        ring.style.background  = `rgba(196,64,10,0.06)`;
      }

      if (next === "text") {
        ring.style.width        = "3px";
        ring.style.height       = "28px";
        ring.style.borderRadius = "2px";
        ring.style.borderColor  = RUST;
        ring.style.background   = RUST;
        dot.style.opacity       = "0";
      }

      if (next === "drag") {
        ring.style.width        = "68px";
        ring.style.height       = "68px";
        ring.style.borderColor  = `rgba(196,64,10,0.45)`;
        ring.style.background   = `rgba(196,64,10,0.06)`;
        ring.style.borderRadius = "50%";
        dot.style.opacity       = "0";
        label.textContent       = "DRAG";
        label.style.opacity     = "1";
      }

      if (next === "view") {
        ring.style.width        = "60px";
        ring.style.height       = "60px";
        ring.style.borderColor  = `rgba(196,64,10,0.40)`;
        ring.style.background   = `rgba(196,64,10,0.05)`;
        dot.style.opacity       = "0";
        label.textContent       = "VIEW";
        label.style.opacity     = "1";
      }

      if (next === "preview" && imageUrl && img) {
        ring.style.width        = "10px";
        ring.style.height       = "10px";
        ring.style.borderColor  = RUST;
        ring.style.background   = RUST;
        dot.style.opacity       = "0";
        img.src                 = imageUrl;
        preview.style.opacity   = "1";
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const previewEl = target.closest("[data-preview]");
      if (previewEl) {
        const url = previewEl.getAttribute("data-preview") ?? "";
        applyState("preview", url); return;
      }
      if (target.closest(".proj-drag-zone"))                                               { applyState("drag");  return; }
      if (target.closest("img,[data-cursor='view']"))                                     { applyState("view");  return; }
      if (target.closest("p,h1,h2,h3,h4,h5,span:not(button span)"))                      { applyState("text");  return; }
      if (target.closest("a,button,[role='button'],[role='link'],input,textarea,select")) { applyState("hover"); return; }
      applyState("default");
    };

    const onLeaveWindow = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnterWindow = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    document.addEventListener("mousemove",  onMove,        { passive: true });
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
          width: 5, height: 5, borderRadius: "50%",
          background: RUST,
          pointerEvents: "none", zIndex: 99999, opacity: 0,
          transition: "background 0.15s, opacity 0.15s, width 0.22s, height 0.22s",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 32, height: 32, borderRadius: "50%",
          border: `1px solid ${INK}`,
          background: "transparent",
          pointerEvents: "none", zIndex: 99998, opacity: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition:
            "width 0.30s cubic-bezier(0.16,1,0.3,1)," +
            "height 0.30s cubic-bezier(0.16,1,0.3,1)," +
            "border-color 0.25s, background 0.25s," +
            "border-radius 0.25s, border-width 0.25s",
          willChange: "transform",
        }}
      >
        <span
          ref={labelRef}
          aria-hidden
          style={{
            fontFamily: "'Inter',monospace",
            fontSize: 8, fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0,
            transition: "opacity 0.18s",
            userSelect: "none",
            pointerEvents: "none",
            color: RUST,
          }}
        />
      </div>

      {/* Project image preview — floats near cursor on [data-preview] hover */}
      <div
        ref={previewRef}
        aria-hidden
        style={{
          position: "fixed", top: 0, left: 0,
          width: 220, height: 140,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(14,10,4,0.18)",
          border: "1px solid rgba(196,64,10,0.15)",
          pointerEvents: "none",
          zIndex: 99997,
          opacity: 0,
          transition: "opacity 0.25s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
          transformOrigin: "left top",
        }}
      >
        <img
          ref={imgRef}
          alt="Project preview"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Fallback gradient when no image */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg,rgba(196,64,10,0.12),rgba(14,10,4,0.08))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 11, letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(196,64,10,0.55)",
          }}>View Project</span>
        </div>
      </div>
    </>
  );
}
