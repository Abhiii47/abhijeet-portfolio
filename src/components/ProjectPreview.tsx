"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

interface Preview {
  title: string;
  tags: string[];
  color: string;
  liveUrl?: string;
  githubUrl: string;
}

// microlink.io screenshot API — free, no API key, returns real browser screenshot
function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

const PREVIEWS: Record<string, Preview> = {
  "01": {
    title: "SmartResume",
    tags: ["FastAPI", "XGBoost", "Python"],
    color: "#C4400A",
    liveUrl: "https://smart-resume-orcin.vercel.app/",
    githubUrl: "https://github.com/Abhiii47/SmartResume",
  },
  "02": {
    title: "Room & Food",
    tags: ["Node.js", "Socket.io", "Next.js"],
    color: "#7C3AED",
    liveUrl: "https://room-and-food.vercel.app/",
    githubUrl: "https://github.com/Abhiii47/Room_and_Food",
  },
  "03": {
    title: "RAG Assistant",
    tags: ["RAG", "Vertex AI", "FAISS"],
    color: "#0D9488",
    githubUrl: "https://github.com/Abhiii47",
  },
  "04": {
    title: "Amazon ML",
    tags: ["XGBoost", "150K rows", "Top 0.1%"],
    color: "#B45309",
    githubUrl: "https://github.com/Abhiii47/AmazonML_challange",
  },
};

export function useProjectPreview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const initQuick = useCallback(() => {
    if (!previewRef.current || quickX.current) return;
    quickX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.45, ease: "power3.out" });
    quickY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.45, ease: "power3.out" });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    initQuick();
    quickX.current?.(e.clientX + 24);
    quickY.current?.(e.clientY - 80);
  }, [initQuick]);

  const onEnter = useCallback((id: string) => {
    setActive(id);
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.32, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    gsap.to(previewRef.current, {
      opacity: 0, scale: 0.93, duration: 0.22, ease: "power2.in",
      onComplete: () => setActive(null),
    });
  }, []);

  return { previewRef, active, onMouseMove, onEnter, onLeave };
}

export function ProjectPreviewCard({
  previewRef,
  active,
}: {
  previewRef: React.RefObject<HTMLDivElement | null>;
  active: string | null;
}) {
  const p = active ? PREVIEWS[active] : null;
  const imgSrc = p?.liveUrl
    ? screenshotUrl(p.liveUrl)
    : p?.githubUrl
    ? `https://opengraph.githubassets.com/1/${p.githubUrl.replace("https://github.com/", "")}`
    : null;

  return (
    <div
      ref={previewRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9000,
        opacity: 0,
        scale: 0.93,
        transformOrigin: "top left",
        willChange: "transform, opacity",
      }}
    >
      {p && (
        <div
          style={{
            width: 280,
            background: "#FFFCF6",
            border: `1px solid ${p.color}25`,
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: `0 24px 64px rgba(14,10,4,0.13), 0 0 0 1px ${p.color}12`,
          }}
        >
          {/* Live screenshot */}
          <div
            style={{
              width: "100%",
              height: 160,
              background: `${p.color}08`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt={`${p.title} preview`}
                width={280}
                height={160}
                loading="eager"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top left",
                  display: "block",
                }}
                onError={(e) => {
                  // fallback to GitHub OG image if microlink fails
                  const fallback = `https://opengraph.githubassets.com/1/${p.githubUrl.replace("https://github.com/", "")}`;
                  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                }}
              />
            )}
            {/* Color bar overlay at bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: p.color,
                opacity: 0.8,
              }}
            />
          </div>

          {/* Card info */}
          <div style={{ padding: "14px 16px 16px" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 17,
                fontWeight: 700,
                color: INK,
                lineHeight: 1.2,
                marginBottom: 8,
              }}
            >
              {p.title}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Inter',monospace",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    padding: "3px 8px",
                    borderRadius: 99,
                    background: `${p.color}10`,
                    border: `1px solid ${p.color}25`,
                    color: p.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {p.liveUrl && (
              <p
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: 8,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: `${p.color}70`,
                  marginTop: 8,
                }}
              >
                ● LIVE
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
