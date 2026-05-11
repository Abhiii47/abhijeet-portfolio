"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ModuleData = {
  id: string;
  label: string;
  status: "active" | "standby" | "warning";
  desc: string;
  color: string;
};

const modules: ModuleData[] = [
  { id: "Py",  label: "PYTHON",        status: "active",  desc: "Core Language. Data Science Stack.",         color: "#3b82f6" },
  { id: "Sql", label: "SQL",           status: "active",  desc: "Complex Querying. Database Management.",    color: "#f97316" },
  { id: "Dsa", label: "DSA",           status: "active",  desc: "Algorithmic Efficiency. Optimization.",     color: "#8b5cf6" },
  { id: "Cpp", label: "C++",           status: "active",  desc: "Low-level Systems. Memory Mgmt.",           color: "#60a5fa" },
  { id: "Git", label: "GIT",           status: "active",  desc: "Version Control. CI/CD Workflows.",         color: "#f43f5e" },
  { id: "Ml",  label: "ML",            status: "active",  desc: "Predictive Modeling. Feature Eng.",         color: "#10b981" },
  { id: "Reg", label: "REGRESSION",    status: "active",  desc: "Linear/Logistic. Trend Analysis.",          color: "#14b8a6" },
  { id: "Clf", label: "CLASSIFY",      status: "active",  desc: "Decision Trees. SVM. Random Forest.",       color: "#06b6d4" },
  { id: "Pt",  label: "PYTORCH",       status: "active",  desc: "Deep Learning. Neural Networks.",           color: "#ef4444" },
  { id: "Nlp", label: "NLP",           status: "active",  desc: "Text Processing. Tokenization. Spacy.",     color: "#d946ef" },
  { id: "Pd",  label: "PANDAS",        status: "active",  desc: "Data Manipulation. Analysis.",              color: "#4f94ef" },
  { id: "Np",  label: "NUMPY",         status: "active",  desc: "Numerical Computing. Matrix Ops.",          color: "#38bdf8" },
  { id: "Pbi", label: "POWER BI",      status: "active",  desc: "Visual Analytics. Business Intel.",         color: "#eab308" },
  { id: "Da",  label: "DATA ANALYSIS", status: "active",  desc: "EDA. Statistical Inference.",               color: "#a855f7" },
  { id: "Skl", label: "SKLEARN",       status: "active",  desc: "Classic ML Algorithms. Tools.",             color: "#f97316" },
  { id: "Api", label: "FASTAPI",       status: "active",  desc: "High-perf Async APIs. Swagger.",           color: "#009688" },
  { id: "Rst", label: "REST API",      status: "active",  desc: "Standard Protocol. Integration.",          color: "#64748b" },
  { id: "Gcp", label: "G-CLOUD",       status: "active",  desc: "Vertex AI. Cloud Functions.",              color: "#4285F4" },
  { id: "Fab", label: "MS FABRIC",     status: "active",  desc: "Big Data Analytics. Data Lake.",           color: "#00a4ef" },
  { id: "Dp",  label: "DP-600",        status: "active",  desc: "Fabric Analytics Engineer Cert.",          color: "#ffd700" },
  { id: "Gai", label: "GEN AI",        status: "active",  desc: "LLMs. RAG. Prompt Engineering.",           color: "#a855f7" },
  { id: "Rl",  label: "RL",            status: "standby", desc: "Reinforcement Learning. Agents.",          color: "#ec4899" },
  { id: "Etl", label: "ETL",           status: "active",  desc: "Extract Transform Load Pipelines.",        color: "#84cc16" },
  { id: "Pg",  label: "POSTGRES",      status: "active",  desc: "Adv Relational DB. Extensions.",           color: "#336791" },
  { id: "Sb",  label: "SUPABASE",      status: "active",  desc: "Open Source Firebase. Realtime.",          color: "#3ecf8e" },
];

export default function SystemDeck() {
  const containerRef = useRef<HTMLElement>(null);
  const deckRef      = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState<ModuleData | null>(null);
  const [hoveredId, setHoveredId]       = useState<string | null>(null);

  useGSAP(() => {
    if (!deckRef.current || !containerRef.current) return;

    // ── 1. Scroll-driven 3D rotation ──
    // As user scrolls INTO the section the deck tilts from isometric → face-on
    gsap.fromTo(
      deckRef.current,
      { rotateX: 55, rotateZ: 8, rotateY: -12, scale: 0.82, opacity: 0, y: 60 },
      {
        rotateX: 0, rotateZ: 0, rotateY: 0, scale: 1, opacity: 1, y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end:   "top 20%",
          scrub: 1.4,
        },
      }
    );

    // ── 2. Stagger keys pop in ──
    gsap.from(".module-key", {
      scale: 0, opacity: 0, duration: 0.4,
      stagger: { amount: 0.6, from: "center", grid: [5, 5] },
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
      },
    });

    // ── 3. Subtle idle float ──
    gsap.to(deckRef.current, {
      y: "-=8",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, { scope: containerRef });

  // ── Hover parallax tilt ──
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!deckRef.current) return;
    const { left, top, width, height } = deckRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    gsap.to(deckRef.current, {
      rotateY: x * 14,
      rotateX: -y * 10,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(deckRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 1.2, ease: "elastic.out(1, 0.4)",
    });
  };

  const accentColor = activeModule?.color ?? "#84cc16";

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Ghost section number */}
      <span
        className="absolute left-4 top-20 font-serif text-[18vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.04)", color: "transparent" }}
        aria-hidden
      >
        03
      </span>

      <div className="max-w-7xl mx-auto">
        <h2 className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">
          03 / System Control
        </h2>
        <p className="text-gray-600 text-sm font-mono mb-20 max-w-md">
          Click any module to inspect. Hover the deck to rotate.
        </p>

        <div
          className="flex flex-col xl:flex-row items-center justify-center gap-16"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* ── 3D Keyboard Deck ── */}
          <div
            ref={deckRef}
            className="relative grid grid-cols-5 gap-3 p-7 rounded-2xl will-change-transform"
            style={{
              background: "#111",
              border: `1px solid ${accentColor}22`,
              boxShadow: `0 40px 80px -20px ${accentColor}20, 0 0 0 1px rgba(255,255,255,0.04)`,
              transformStyle: "preserve-3d",
              transition: "border-color 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {/* Deck base plate */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "#0a0a0a",
                transform: "translateZ(-14px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              }}
            />

            {modules.map((mod) => {
              const isActive  = activeModule?.id === mod.id;
              const isHovered = hoveredId === mod.id;

              return (
                <div
                  key={mod.id}
                  className="module-key group relative w-16 h-16 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isActive ? "translateZ(2px)" : "translateZ(16px)",
                    transition: "transform 0.15s ease",
                  }}
                  onClick={() => setActiveModule(isActive ? null : mod)}
                  onMouseEnter={() => setHoveredId(mod.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Key body */}
                  <div
                    className="absolute inset-0 rounded-[5px]"
                    style={{
                      background: isActive
                        ? `linear-gradient(145deg, ${mod.color}22, #1a1a1a)`
                        : "#1c1c1c",
                      border: isActive || isHovered
                        ? `1px solid ${mod.color}60`
                        : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: isActive
                        ? `0 0 20px ${mod.color}40, inset 0 1px 0 ${mod.color}30`
                        : isHovered
                        ? `0 0 10px ${mod.color}25`
                        : "0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {/* Key face */}
                    <div
                      className="absolute inset-[2px] rounded-[4px] flex flex-col items-center justify-center gap-1"
                      style={{
                        background: isActive ? `${mod.color}12` : "#181818",
                        transform: "translateZ(2px)",
                      }}
                    >
                      {/* Status dot */}
                      <div
                        className="rounded-full"
                        style={{
                          width: "5px",
                          height: "5px",
                          background: mod.color,
                          boxShadow: isActive || isHovered
                            ? `0 0 8px ${mod.color}, 0 0 16px ${mod.color}60`
                            : "none",
                          transition: "box-shadow 0.2s ease",
                        }}
                      />
                      {/* Label */}
                      <span
                        className="font-mono font-bold tracking-wide text-center leading-tight"
                        style={{
                          fontSize: "8px",
                          color: isActive ? mod.color : isHovered ? "#e5e5e5" : "#666",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {mod.label}
                      </span>
                    </div>

                    {/* Bottom thickness shadow */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[6px] rounded-b-[5px]"
                      style={{ background: "rgba(0,0,0,0.5)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Terminal Panel ── */}
          <div
            className="w-full max-w-sm xl:max-w-xs font-mono relative"
            style={{
              border: `1px solid ${accentColor}30`,
              borderRadius: "12px",
              background: "#0d0d0d",
              transition: "border-color 0.4s ease",
              boxShadow: `0 0 40px ${accentColor}10`,
            }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: `${accentColor}20` }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span
                className="ml-auto text-[9px] tracking-widest uppercase"
                style={{ color: accentColor, opacity: 0.7 }}
              >
                sys.inspect
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 min-h-[200px] space-y-4">
              {!activeModule ? (
                <>
                  <p className="text-[11px] animate-pulse" style={{ color: accentColor }}>
                    &gt; AWAITING MODULE SELECTION...
                  </p>
                  <p className="text-[11px] text-gray-700">
                    Click any key to inspect parameters.
                  </p>
                  <div className="mt-6 space-y-1">
                    {["active", "standby", "warning"].map(s => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background:
                              s === "active"  ? "#84cc16" :
                              s === "standby" ? "#64748b" : "#f97316",
                          }}
                        />
                        <span className="text-[9px] text-gray-700 uppercase tracking-widest">{s}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex items-center justify-between pb-3 border-b"
                    style={{ borderColor: `${activeModule.color}25` }}
                  >
                    <div>
                      <p
                        className="text-base font-bold tracking-wider"
                        style={{ color: activeModule.color }}
                      >
                        {activeModule.label}
                      </p>
                      <p className="text-[9px] text-gray-600 mt-0.5 uppercase tracking-widest">
                        {activeModule.id} · module
                      </p>
                    </div>
                    <span
                      className="text-[9px] px-2 py-1 rounded uppercase tracking-widest"
                      style={{
                        background: `${activeModule.color}15`,
                        color: activeModule.color,
                        border: `1px solid ${activeModule.color}30`,
                      }}
                    >
                      {activeModule.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {activeModule.desc}
                  </p>

                  <div
                    className="grid grid-cols-3 gap-2 pt-2 text-[9px]"
                    style={{ borderTop: `1px solid ${activeModule.color}15` }}
                  >
                    {[["LOAD", "HIGH"], ["SYNC", "ACTIVE"], ["VER", "2.x"]].map(([k, v]) => (
                      <div key={k}>
                        <div className="text-gray-700 uppercase tracking-widest">{k}</div>
                        <div style={{ color: activeModule.color }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none rounded-xl opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
