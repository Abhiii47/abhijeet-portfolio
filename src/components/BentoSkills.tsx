"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const skills = [
  {
    id: "ml", title: "Machine Learning", size: "large",
    tags: ["PyTorch", "XGBoost", "Scikit-learn", "Ensemble"],
    stat: "Top 0.1%", statLabel: "Amazon ML",
    color: "#84cc16",
    desc: "Predictive modeling, feature engineering, ensemble methods — top 0.1% in Amazon ML Summer School.",
  },
  {
    id: "cloud", title: "Cloud & DevOps", size: "medium",
    tags: ["AWS", "Azure", "CI/CD", "Vertex AI"],
    stat: "99.9%", statLabel: "Uptime",
    color: "#4285F4",
    desc: "Cloud migration, CI/CD pipelines, Vertex AI, automated deployments at Ecovis RKCA.",
  },
  {
    id: "data", title: "Data Engineering", size: "medium",
    tags: ["Pandas", "SQL", "ETL", "MS Fabric"],
    stat: "2M+", statLabel: "Rows / day",
    color: "#3b82f6",
    desc: "End-to-end pipelines, complex SQL, ETL on Microsoft Fabric — DP-600 certified.",
  },
  {
    id: "backend", title: "Backend & APIs", size: "small",
    tags: ["FastAPI", "REST", "Supabase"],
    color: "#10b981",
    desc: "High-performance async APIs, Swagger docs, Postgres.",
  },
  {
    id: "pm", title: "Product Management", size: "small",
    tags: ["Roadmap", "Sprints", "KPIs"],
    color: "#f59e0b",
    desc: "End-to-end product ownership from requirements to sprint delivery.",
  },
  {
    id: "viz", title: "Data Viz & BI", size: "small",
    tags: ["Power BI", "Matplotlib", "Plotly"],
    color: "#eab308",
    desc: "Business intelligence dashboards and statistical visualisations.",
  },
  {
    id: "dl", title: "Deep Learning & GenAI", size: "wide",
    tags: ["Transformers", "RAG", "LLMs", "NLP", "Agents"],
    stat: "3+", statLabel: "Production Models",
    color: "#d946ef",
    desc: "Transformer architectures, fine-tuning LLMs, RAG pipelines, agentic workflows.",
  },
  {
    id: "web", title: "Web Development", size: "medium",
    tags: ["Next.js", "TypeScript", "React"],
    color: "#ef4444",
    desc: "Full-stack Next.js apps, internal tooling — 60% reduction in manual reporting time at Ecovis.",
  },
];

function sizeToClass(size: string) {
  switch (size) {
    case "large":  return "md:col-span-2 md:row-span-2";
    case "wide":   return "md:col-span-2";
    case "medium": return "md:col-span-1 md:row-span-1";
    default:       return "md:col-span-1";
  }
}

function GlowCard({
  children, color, className = "", style,
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.background = `radial-gradient(320px circle at ${x}px ${y}px, ${color}30, transparent 65%)`;
    const tiltX = ((y / rect.height) - 0.5) * 5;
    const tiltY = ((x / rect.width)  - 0.5) * -5;
    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01,1.01,1.01)`;
  }, [color]);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    glow.style.background = "transparent";
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div ref={glowRef} className="absolute inset-0 rounded-xl pointer-events-none" style={{ zIndex: 0, transition: "background 0.07s ease" }} />
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: `inset 0 0 0 1px ${color}45`, zIndex: 1 }} />
      <div className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${color}90, transparent)`, zIndex: 2 }} />
      <div className="relative h-full" style={{ zIndex: 3 }}>{children}</div>
    </div>
  );
}

function Sparkles({ color }: { color: string }) {
  const sparks = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 2.5 + 1.5,
    delay: Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {sparks.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            background: s.id % 4 === 0 ? color : "rgba(255,255,255,0.6)",
            animation: `sparkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
            boxShadow: `0 0 ${s.size * 2}px ${s.id % 4 === 0 ? color : "rgba(255,255,255,0.4)"}`,
          }}
        />
      ))}
      <style>{`@keyframes sparkle { 0%,100%{opacity:0;transform:scale(0.3)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  );
}

export default function BentoSkills() {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        backgroundImage: "radial-gradient(rgba(132,204,22,0.08) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
      }} />
      <span className="absolute -right-4 top-16 font-serif text-[18vw] font-black select-none pointer-events-none leading-none" style={{ WebkitTextStroke: "1px rgba(132,204,22,0.03)", color: "transparent" }} aria-hidden>03</span>

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase mb-4">03 / Skills</p>
          <h2 className="font-serif font-black leading-tight" style={{ fontSize: "clamp(2rem,5vw,4rem)", WebkitTextStroke: "1px rgba(240,237,232,0.15)", color: "transparent" }}>Technical Arsenal</h2>
          <h2 className="font-serif font-black leading-tight -mt-2" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>Built to Ship.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {skills.map((skill, i) => (
            <GlowCard
              key={skill.id}
              color={skill.color}
              className={`bento-card ${sizeToClass(skill.size)}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)" : "translateY(40px) scale(0.96)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {skill.size === "large" && <Sparkles color={skill.color} />}
              <div className="relative h-full p-6 flex flex-col justify-between" onClick={() => setActive(active === skill.id ? null : skill.id)}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {skill.tags.map(tag => (
                        <span key={tag} className="font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full transition-all duration-300" style={{ color: skill.color, background: `${skill.color}12`, border: `1px solid ${skill.color}25` }}>{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-serif font-bold text-white/90 text-lg leading-tight">{skill.title}</h3>
                  </div>
                  {skill.stat && (
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="font-mono font-black tabular-nums" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", color: skill.color, textShadow: `0 0 20px ${skill.color}60` }}>{skill.stat}</div>
                      <div className="font-mono text-[8px] text-gray-600 uppercase tracking-widest mt-0.5">{skill.statLabel}</div>
                    </div>
                  )}
                </div>
                <p className="font-mono text-[11px] text-gray-500 leading-relaxed transition-all duration-300" style={{ opacity: active === skill.id ? 1 : 0, transform: active === skill.id ? "translateY(0)" : "translateY(6px)", maxHeight: active === skill.id ? "80px" : "0", overflow: "hidden" }}>{skill.desc}</p>
                <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-500" style={{ width: active === skill.id ? "100%" : "0%", background: `linear-gradient(90deg, ${skill.color}, transparent)` }} />
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full transition-all duration-300" style={{ background: skill.color, boxShadow: `0 0 ${active === skill.id ? "14px" : "5px"} ${skill.color}`, opacity: 0.75 }} />
              </div>
            </GlowCard>
          ))}
        </div>
        <p className="font-mono text-[9px] text-gray-700 tracking-[0.25em] uppercase text-center mt-8">Click any card to expand</p>
      </div>
    </section>
  );
}
