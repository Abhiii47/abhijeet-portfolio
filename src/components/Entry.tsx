"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ACCENT = "#00d4ff";
const ROLES  = [
  "SDE & Product Manager",
  "Cloud Engineer · AWS / Azure",
  "ML · Next.js · TypeScript",
];

function useTypewriter(strings: string[], speed = 55, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx,  setIdx]  = useState(0);
  const [phase, setPhase] = useState<"type"|"wait"|"erase">("type");
  const char = useRef(0);

  useEffect(() => {
    const t = strings[idx];
    if (phase === "type") {
      if (char.current <= t.length) {
        const id = setTimeout(() => { setDisplay(t.slice(0, char.current)); char.current++; }, speed);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setPhase("wait"), pause); return () => clearTimeout(id);
    }
    if (phase === "wait") { const id = setTimeout(() => setPhase("erase"), 300); return () => clearTimeout(id); }
    if (phase === "erase") {
      if (char.current > 0) {
        const id = setTimeout(() => { char.current--; setDisplay(t.slice(0, char.current)); }, speed * 0.55);
        return () => clearTimeout(id);
      }
      setIdx(i => (i + 1) % strings.length); setPhase("type");
    }
  }, [phase, display, idx, strings, speed, pause]);

  return display;
}

export default function Entry() {
  const ref  = useRef<HTMLElement>(null);
  const role = useTypewriter(ROLES);

  useGSAP(() => {
    gsap.from([".h-label", ".h-name", ".h-role", ".h-tag", ".h-cta", ".h-meta"], {
      y: 36, opacity: 0, duration: 1.1,
      stagger: 0.09, ease: "power3.out", delay: 0.15,
    });
  }, { scope: ref });

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: "100svh",
        background: "#080c14",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "100px clamp(24px,6vw,80px) clamp(48px,7vw,80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* grid */}
      <div aria-hidden style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(0,212,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.018) 1px,transparent 1px)",
        backgroundSize:"72px 72px",
        maskImage:"radial-gradient(ellipse 90% 80% at 50% 100%,black 20%,transparent 75%)",
      }} />
      {/* ambient glow */}
      <div aria-hidden style={{
        position:"absolute",top:"-15%",right:"-8%",
        width:"55vw",height:"55vh",
        background:"radial-gradient(ellipse,rgba(0,212,255,0.04) 0%,transparent 65%)",
        pointerEvents:"none",
      }} />

      {/* availability badge — top right */}
      <div style={{
        position:"absolute",top:"clamp(20px,4vw,36px)",right:"clamp(24px,6vw,80px)",
        display:"flex",alignItems:"center",gap:8,
      }}>
        <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ade80",animation:"pulse 2s infinite",display:"inline-block" }} />
        <span style={{ fontFamily:"monospace",fontSize:9,letterSpacing:"0.3em",color:"rgba(255,255,255,0.3)",textTransform:"uppercase" }}>Available</span>
      </div>

      {/* content */}
      <div style={{ maxWidth:1000,position:"relative",zIndex:2 }}>
        <p className="h-label" style={{ fontFamily:"monospace",fontSize:10,letterSpacing:"0.38em",color:ACCENT,textTransform:"uppercase",marginBottom:24 }}>
          Abhijeet Kadu &nbsp;·&nbsp; Mumbai, India
        </p>

        <h1 className="h-name" style={{
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:"clamp(4.5rem,13vw,11rem)",
          fontWeight:900,lineHeight:0.92,
          letterSpacing:"-0.03em",
          color:"#f0ede8",
          margin:0,
        }}>
          Abhijeet<br/>
          <em style={{ fontStyle:"italic", color:ACCENT }}>Kadu.</em>
        </h1>

        <div className="h-role" style={{ marginTop:28,display:"flex",alignItems:"center",gap:12,minHeight:20 }}>
          <span style={{ width:24,height:1,background:ACCENT,opacity:0.6,flexShrink:0 }} />
          <span style={{ fontFamily:"monospace",fontSize:"clamp(0.65rem,1.1vw,0.82rem)",color:"rgba(255,255,255,0.5)",letterSpacing:"0.12em" }}>
            {role}<span style={{ borderRight:`1.5px solid ${ACCENT}`,marginLeft:2,animation:"blink 1s step-end infinite" }}>&thinsp;</span>
          </span>
        </div>

        <p className="h-tag" style={{
          marginTop:16,
          fontFamily:"sans-serif",fontSize:"clamp(0.85rem,1.1vw,0.97rem)",
          color:"rgba(255,255,255,0.25)",maxWidth:"46ch",lineHeight:1.65,
        }}>Building cloud infrastructure &amp; shipping products at Ecovis RKCA.</p>

        <div className="h-cta" style={{ marginTop:40,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap" }}>
          <a href="#projects"
            style={{
              display:"inline-flex",alignItems:"center",gap:8,
              padding:"12px 28px",
              background:ACCENT,color:"#080c14",
              borderRadius:9999,fontFamily:"monospace",
              fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:700,
              textDecoration:"none",transition:"opacity 0.2s",
            }}
            onMouseEnter={e=>(e.currentTarget.style.opacity="0.82")}
            onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
          >
            View Work
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact"
            style={{
              display:"inline-flex",alignItems:"center",
              padding:"12px 28px",
              border:"1px solid rgba(0,212,255,0.2)",
              color:"rgba(255,255,255,0.45)",
              borderRadius:9999,fontFamily:"monospace",
              fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",
              textDecoration:"none",transition:"border-color 0.2s,color 0.2s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=ACCENT;e.currentTarget.style.color=ACCENT;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,212,255,0.2)";e.currentTarget.style.color="rgba(255,255,255,0.45)";}}
          >Get in touch</a>
        </div>

        <div className="h-meta" style={{ marginTop:52,display:"flex",gap:32,flexWrap:"wrap" }}>
          {[["Role","SDE & PM"],["Company","Ecovis RKCA"],["Location","Mumbai, IN"]].map(([k,v])=>(
            <div key={k}>
              <p style={{ fontFamily:"monospace",fontSize:8,letterSpacing:"0.3em",color:"rgba(255,255,255,0.18)",textTransform:"uppercase",marginBottom:4 }}>{k}</p>
              <p style={{ fontFamily:"monospace",fontSize:11,color:"rgba(255,255,255,0.5)" }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{ position:"absolute",bottom:"clamp(24px,4vw,40px)",right:"clamp(24px,6vw,80px)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:0.28 }}>
        <span style={{ fontFamily:"monospace",fontSize:8,letterSpacing:"0.3em",color:"white",textTransform:"uppercase",writingMode:"vertical-rl" }}>Scroll</span>
        <div style={{ width:1,height:40,background:"linear-gradient(to bottom,white,transparent)" }} />
      </div>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
      `}</style>
    </section>
  );
}
