"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import AnimatedHeading from "./AnimatedHeading";
import { RMSticker, RMZigzag, RMHr, RMSectionLabel, RMNumberedBlock } from "./RMDecorations";

const ACCENT = "#C4400A";
const INK    = "#0E0A04";

type Cert = {
  id: string;
  issuer: string;
  name: string;
  year: string;
  skills: string[];
  accent?: boolean;
  badge?: string;
  link?: string;
};

const CERTS: Cert[] = [
  {
    id: "c1", issuer: "Amazon", name: "ML Summer School",
    year: "2024", accent: true,
    skills: ["Supervised Learning", "XGBoost", "Feature Engineering", "Model Evaluation"],
    badge: "🏆",
    link: "https://github.com/Abhiii47/AmazonML_challange",
  },
  {
    id: "c2", issuer: "Google", name: "Data Analytics Professional",
    year: "2023",
    skills: ["SQL", "Tableau", "R", "Data Cleaning", "Visualization"],
  },
  {
    id: "c3", issuer: "IBM", name: "Data Science Professional",
    year: "2023",
    skills: ["Python", "Machine Learning", "Databases", "Data Visualization"],
  },
  {
    id: "c4", issuer: "Coursera", name: "Deep Learning Specialization",
    year: "2024",
    skills: ["Neural Nets", "CNNs", "RNNs", "TensorFlow"],
  },
  {
    id: "c5", issuer: "Meta", name: "Frontend Developer Professional",
    year: "2023",
    skills: ["React", "JavaScript", "CSS", "UX"],
  },
  {
    id: "c6", issuer: "AWS", name: "Cloud Practitioner Essentials",
    year: "2024",
    skills: ["EC2", "S3", "Lambda", "IAM", "VPC"],
  },
];

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -4, duration: 0.2, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.2, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onClick={() => setOpen(o => !o)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="proj-card-reveal"
      style={{
        animationDelay: `${index * 0.07}s`,
        background: cert.accent ? "rgba(196,64,10,0.04)" : "var(--bg-card)",
        border: cert.accent
          ? `1.5px solid rgba(196,64,10,0.22)`
          : "1px solid rgba(14,10,4,0.07)",
        borderRadius: 10,
        padding: "clamp(16px,2.2vw,24px)",
        cursor: "pointer",
        transition: "border-color 0.2s,box-shadow 0.2s",
        position: "relative",
        overflow: "hidden",
        boxShadow: cert.accent ? "3px 3px 0 rgba(196,64,10,0.15)" : "none",
      }}
    >
      {/* Ghost index number */}
      <span aria-hidden style={{
        position: "absolute", right: 10, top: 4,
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "3.5rem", color: "rgba(14,10,4,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>{String(index + 1).padStart(2, "0")}</span>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(14,10,4,0.30)", marginBottom: 5 }}>
            {cert.issuer} &middot; {cert.year}
          </p>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: INK, lineHeight: 1.3 }}>{cert.name}</h3>
        </div>
        {cert.accent && <RMSticker text="top pick" accent rotate={2} />}
        {!cert.accent && cert.badge && <span style={{ fontSize: 20 }}>{cert.badge}</span>}
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: open ? 12 : 0 }}>
        {cert.skills.map(s => (
          <span key={s} className="proj-tag tag-normal">{s}</span>
        ))}
      </div>

      {/* Expand area */}
      {open && (
        <div style={{
          marginTop: 12,
          borderTop: "1px dashed rgba(14,10,4,0.10)",
          paddingTop: 12,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(14,10,4,0.50)",
          lineHeight: 1.65,
        }}>
          {cert.link && (
            <a href={cert.link} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: ACCENT, textDecoration: "none" }}
              onClick={e => e.stopPropagation()}
            >View related project ↗</a>
          )}
          {!cert.link && <span>Click to collapse</span>}
        </div>
      )}

      {/* Expand hint */}
      <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(14,10,4,0.22)" }}>
        {open ? "▲ collapse" : "▼ expand"}
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" style={{
      background: "var(--bg-base)",
      padding: "clamp(72px,9vw,120px) clamp(20px,5vw,72px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ghost text */}
      <span aria-hidden style={{
        position: "absolute", left: "-0.02em", bottom: 40,
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "clamp(4rem,10vw,10rem)",
        color: "rgba(14,10,4,0.03)", letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
      }}>CERTS</span>

      <style>{`
        @keyframes cardReveal {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .proj-card-reveal {
          opacity: 0;
          animation: cardReveal 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: "clamp(28px,4vw,48px)" }}>
          <AnimatedHeading
            text="Certifications"
            italic="& credentials"
            section="06"
            color={INK}
            accentColor={ACCENT}
            fontFamily="'Cormorant Garamond',Georgia,serif"
          />
          <RMSticker text={`${CERTS.length} certificates`} rotate={-1.5} />
        </div>

        <RMHr label="verified learning" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(300px,100%),1fr))",
          gap: "clamp(10px,1.5vw,16px)",
          marginTop: "clamp(20px,3vw,32px)",
        }}>
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: "clamp(40px,6vw,72px)" }}>
        <RMZigzag color="rgba(196,64,10,0.08)" />
      </div>
    </section>
  );
}
