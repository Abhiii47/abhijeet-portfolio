"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const STATS = [
  { end: 0.1,  suffix: "%",  prefix: "Top ", label: "Amazon ML School",    note: "of 60,000+ applicants" },
  { end: 99.9, suffix: "%",  prefix: "",     label: "Cloud Uptime",         note: "post-migration at Ecovis" },
  { end: 60,   suffix: "%",  prefix: "",     label: "Reporting Time Cut",   note: "Next.js internal tooling" },
  { end: 5,    suffix: "+",  prefix: "",     label: "Products Shipped",     note: "end-to-end in production" },
];

const SKILLS = [
  {
    category: "Backend & Systems",
    color: ACCENT,
    items: ["Node.js", "FastAPI", "REST APIs", "Socket.io", "SSE", "Docker", "CI/CD", "OAuth2", "RBAC"],
  },
  {
    category: "ML & Data",
    color: "#a78bfa",
    items: ["XGBoost", "LightGBM", "CatBoost", "Scikit-learn", "Pandas", "NumPy", "FAISS", "RAG", "LLMs"],
  },
  {
    category: "Cloud & Infra",
    color: "#fb923c",
    items: ["AWS (EC2/S3/IAM)", "GCP Vertex AI", "GCP Vision", "Microsoft Fabric", "DP-600", "CloudWatch"],
  },
  {
    category: "Frontend & BI",
    color: "#4ade80",
    items: ["React", "Next.js", "Tailwind", "TypeScript", "Power BI", "DAX", "GSAP"],
  },
];

/* ── Animated counter ── */
function Counter({ end, suffix, prefix, triggered }: { end: number; suffix: string; prefix: string; triggered: boolean }) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(parseFloat((eased * end).toFixed(end < 1 ? 1 : 0)));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [triggered, end]);

  return (
    <span>{prefix}{val < 1 && end < 1 ? val.toFixed(1) : Math.round(val)}{suffix}</span>
  );
}

export default function About() {
  const ref         = useRef<HTMLElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFired(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useGSAP(() => {
    gsap.from(".ab-el", {
      scrollTrigger: { trigger: ref.current, start: "top 74%" },
      y: 32, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
    });
    gsap.from(".skill-group", {
      scrollTrigger: { trigger: ".skills-section", start: "top 82%" },
      y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out",
    });
  }, { scope: ref });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#f7f5f0",
        color: "#0d0f14",
        padding: "clamp(80px,10vw,128px) clamp(20px,5vw,72px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ghost 01 */}
      <span aria-hidden style={{
        position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Bebas Neue','Arial Black',sans-serif",
        fontSize: "clamp(10rem,24vw,26rem)",
        lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(13,15,20,0.045)",
        pointerEvents: "none", userSelect: "none",
      }}>01</span>

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* section label */}
        <p className="ab-el" style={{
          fontFamily: "'Inter',monospace", fontSize: 10,
          letterSpacing: "0.38em", color: ACCENT,
          textTransform: "uppercase", marginBottom: 48,
        }}>01 / About</p>

        {/* ── Asymmetric two-col: pull quote left | body right ── */}
        <div className="about-2col" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(48px,7vw,100px)",
          alignItems: "start",
          marginBottom: "clamp(56px,7vw,96px)",
        }}>
          {/* LEFT — pull quote */}
          <div>
            <h2 className="ab-el" style={{
              fontFamily: "'Bebas Neue','Arial Black',sans-serif",
              fontSize: "clamp(2.8rem,5vw,5rem)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "0.01em",
              color: "#0d0f14",
              margin: 0,
            }}>
              Building systems<br />
              <span style={{ color: ACCENT }}>that scale.</span><br />
              Products<br />
              <span style={{
                color: "transparent",
                WebkitTextStroke: "1.5px #0d0f14",
              }}>that ship.</span>
            </h2>

            {/* divider */}
            <div className="ab-el" style={{
              height: 1,
              background: `linear-gradient(90deg,${ACCENT}60,transparent)`,
              margin: "32px 0",
              width: "70%",
            }} />

            {/* Quick ident */}
            <div className="ab-el" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Currently",  "Ecovis RKCA — SDE & PM"],
                ["Graduating", "2026 · Computer Engineering"],
                ["Certified",  "DP-600 · Microsoft Fabric"],
                ["Selected",   "Amazon ML Summer School"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{
                    fontFamily: "'Inter',monospace", fontSize: 8,
                    letterSpacing: "0.28em", color: ACCENT,
                    textTransform: "uppercase", flexShrink: 0, width: 72,
                  }}>{k}</span>
                  <span style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 12,
                    color: "rgba(13,15,20,0.6)",
                  }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — body copy + CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 6 }}>
            <p className="ab-el" style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "clamp(0.92rem,1.05vw,1.02rem)",
              color: "rgba(13,15,20,0.62)",
              lineHeight: 1.8, maxWidth: "52ch",
            }}>
              I&rsquo;ve been writing code that runs in production since my second year.
              Not toy projects &mdash; a room-finder platform with live users, a resume
              analysis engine scoring <strong style={{ color: "#0d0f14" }}>50,000+ CVs</strong>,
              an OCR finance system processing receipts in real time.
            </p>
            <p className="ab-el" style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "clamp(0.92rem,1.05vw,1.02rem)",
              color: "rgba(13,15,20,0.62)",
              lineHeight: 1.8, maxWidth: "52ch",
            }}>
              Right now I&rsquo;m at <strong style={{ color: "#0d0f14" }}>Ecovis RKCA</strong>:
              migrating legacy infra to AWS, building a RAG assistant on GCP, and acting as PM
              on a client-facing product &mdash; all at the same time.
            </p>
            <p className="ab-el" style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "clamp(0.92rem,1.05vw,1.02rem)",
              color: "rgba(13,15,20,0.62)",
              lineHeight: 1.8, maxWidth: "52ch",
            }}>
              I graduate in 2026. I&rsquo;m looking for a backend, ML, or full-stack role
              where I can own something end-to-end from day one.
            </p>

            <div className="ab-el" style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
              <a
                href="/resume.pdf"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "11px 24px",
                  background: "#0d0f14", color: "#f7f5f0",
                  borderRadius: 9999,
                  fontFamily: "'Inter',monospace",
                  fontSize: 9, letterSpacing: "0.24em",
                  textTransform: "uppercase", fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.2s,color 0.2s,transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#0d0f14"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0d0f14"; e.currentTarget.style.color = "#f7f5f0"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download CV
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: "'Inter',monospace", fontSize: 9,
                  letterSpacing: "0.24em", textTransform: "uppercase",
                  color: "rgba(13,15,20,0.38)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(13,15,20,0.38)")}
              >Get in touch &rarr;</a>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1px solid rgba(13,15,20,0.08)",
            borderBottom: "1px solid rgba(13,15,20,0.08)",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: "clamp(24px,4vw,40px) clamp(16px,2.5vw,28px)",
              borderLeft: i === 0 ? "none" : "1px solid rgba(13,15,20,0.08)",
            }}>
              <p style={{
                fontFamily: "'Bebas Neue','Arial Black',sans-serif",
                fontSize: "clamp(2.4rem,4.5vw,3.8rem)",
                fontWeight: 400,
                color: "#0d0f14",
                lineHeight: 1,
                marginBottom: 8,
                letterSpacing: "0.02em",
              }}>
                <Counter end={s.end} suffix={s.suffix} prefix={s.prefix} triggered={fired} />
              </p>
              <p style={{
                fontFamily: "'Inter',monospace", fontSize: 9,
                letterSpacing: "0.26em", textTransform: "uppercase",
                color: ACCENT, marginBottom: 4,
              }}>{s.label}</p>
              <p style={{
                fontFamily: "'Inter',sans-serif", fontSize: 11,
                color: "rgba(13,15,20,0.38)", lineHeight: 1.4,
              }}>{s.note}</p>
            </div>
          ))}
        </div>

        {/* ── Skills section ── */}
        <div className="skills-section" style={{ marginTop: "clamp(56px,7vw,88px)" }}>
          <p style={{
            fontFamily: "'Inter',monospace", fontSize: 10,
            letterSpacing: "0.38em", color: "rgba(13,15,20,0.35)",
            textTransform: "uppercase", marginBottom: 36,
          }}>Skills & Stack</p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(260px,100%),1fr))",
            gap: 2,
          }}>
            {SKILLS.map((group, i) => (
              <div
                key={i}
                className="skill-group"
                style={{
                  padding: "clamp(22px,3vw,32px)",
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid rgba(13,15,20,0.06)",
                  transition: "transform 0.25s,box-shadow 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.07),0 0 0 1px ${group.color}22`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: group.color }} />
                  <span style={{
                    fontFamily: "'Inter',monospace", fontSize: 9,
                    letterSpacing: "0.26em", textTransform: "uppercase",
                    color: group.color, fontWeight: 500,
                  }}>{group.category}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {group.items.map(item => (
                    <span key={item} style={{
                      fontFamily: "'Inter',sans-serif",
                      fontSize: 11, color: "rgba(13,15,20,0.65)",
                      padding: "4px 10px",
                      background: `${group.color}0e`,
                      border: `1px solid ${group.color}20`,
                      borderRadius: 9999,
                      lineHeight: 1,
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile overrides */}
      <style>{`
        @media(max-width:768px){
          .about-2col{grid-template-columns:1fr!important;}
          [ref="statsRef"]{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:540px){
          [ref="statsRef"]{grid-template-columns:1fr!important;}
        }
      `}</style>
    </section>
  );
}
