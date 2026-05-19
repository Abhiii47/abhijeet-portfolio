"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

interface Preview {
  title: string;
  tags: string[];
  color: string;
  emoji: string;
}

const PREVIEWS: Record<string, Preview> = {
  "01": { title: "SmartResume",    tags: ["FastAPI","XGBoost","Python"],      color: "#C4400A", emoji: "📊" },
  "02": { title: "Room & Food",    tags: ["Node.js","Socket.io","Next.js"],   color: "#7C3AED", emoji: "🏠" },
  "03": { title: "RAG Assistant", tags: ["RAG","Vertex AI","FAISS"],         color: "#0D9488", emoji: "🧠" },
  "04": { title: "ML Pipeline",   tags: ["XGBoost","150K rows","Top 0.1%"], color: "#B45309", emoji: "🤖" },
};

export function useProjectPreview() {
  const previewRef  = useRef<HTMLDivElement>(null);
  const [active, setActive]   = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const initQuick = useCallback(() => {
    if (!previewRef.current || quickX.current) return;
    quickX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.45, ease: "power3.out" });
    quickY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.45, ease: "power3.out" });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    initQuick();
    quickX.current?.(e.clientX + 20);
    quickY.current?.(e.clientY - 60);
  }, [initQuick]);

  const onEnter = useCallback((id: string) => {
    setActive(id);
    setVisible(true);
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(previewRef.current, {
      opacity: 0, scale: 0.92, duration: 0.22, ease: "power2.in",
      onComplete: () => setVisible(false),
    });
  }, []);

  return { previewRef, active, visible, onMouseMove, onEnter, onLeave };
}

export function ProjectPreviewCard({ previewRef, active }: {
  previewRef: React.RefObject<HTMLDivElement | null>;
  active: string | null;
}) {
  const p = active ? PREVIEWS[active] : null;

  return (
    <div
      ref={previewRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        zIndex: 9000,
        opacity: 0,
        scale: 0.92,
        transformOrigin: "top left",
        willChange: "transform, opacity",
      }}
    >
      {p && (
        <div style={{
          width: 200,
          padding: "20px 22px",
          background: "#FFFCF6",
          border: `1px solid ${p.color}30`,
          borderRadius: 14,
          boxShadow: `0 20px 60px rgba(14,10,4,0.10), 0 0 0 1px ${p.color}15`,
        }}>
          {/* Color bar top */}
          <div style={{
            height: 2,
            background: p.color,
            borderRadius: 99,
            marginBottom: 14,
            opacity: 0.7,
          }} />
          <div style={{ fontSize: 28, marginBottom: 10 }}>{p.emoji}</div>
          <p style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontStyle: "italic",
            fontSize: 18, fontWeight: 700,
            color: INK, lineHeight: 1.2,
            marginBottom: 10,
          }}>{p.title}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {p.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Inter',monospace",
                fontSize: 9, letterSpacing: "0.18em",
                padding: "3px 8px", borderRadius: 99,
                background: `${p.color}10`,
                border: `1px solid ${p.color}25`,
                color: p.color,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
