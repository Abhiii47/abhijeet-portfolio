"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";
const METRICS = [
  { value:"Top 0.1%", label:"Amazon ML School",    note:"of 100,000+ applicants" },
  { value:"99.9%",   label:"Cloud Uptime",          note:"post-migration at Ecovis" },
  { value:"60%",     label:"Reporting Time Cut",    note:"Next.js internal tooling" },
  { value:"5+",      label:"Products Shipped",      note:"end-to-end in production" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".a-el", {
      scrollTrigger:{ trigger:ref.current, start:"top 72%" },
      y:28,opacity:0,duration:0.9,stagger:0.09,ease:"power3.out",
    });
    gsap.from(".a-metric", {
      scrollTrigger:{ trigger:".a-metrics", start:"top 88%" },
      y:20,opacity:0,duration:0.65,stagger:0.07,ease:"power2.out",
    });
  }, { scope:ref });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background:"#f7f5f0",
        color:"#0d0f14",
        padding:"clamp(72px,10vw,120px) clamp(24px,6vw,80px)",
        position:"relative",overflow:"hidden",
      }}
    >
      {/* ghost 01 */}
      <span aria-hidden style={{
        position:"absolute",right:"2%",top:"50%",transform:"translateY(-50%)",
        fontFamily:"'Cormorant Garamond',Georgia,serif",
        fontSize:"clamp(8rem,20vw,20rem)",fontWeight:900,lineHeight:1,
        color:"transparent",WebkitTextStroke:"1px rgba(13,15,20,0.04)",
        pointerEvents:"none",userSelect:"none",
      }}>01</span>

      <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1 }}>
        <p className="a-el" style={{ fontFamily:"monospace",fontSize:10,letterSpacing:"0.35em",color:ACCENT,textTransform:"uppercase",marginBottom:44 }}>01 / About</p>

        {/* two-col */}
        <div className="a-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,6vw,96px)",alignItems:"start" }}>

          <h2 className="a-el" style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(2rem,3.8vw,3.4rem)",
            fontWeight:700,lineHeight:1.1,letterSpacing:"-0.02em",
            color:"#0d0f14",margin:0,
          }}>Building systems that scale &amp; products that ship.</h2>

          <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
            <p className="a-el" style={{ fontSize:"clamp(0.92rem,1.05vw,1rem)",color:"rgba(13,15,20,0.6)",lineHeight:1.75,maxWidth:"54ch" }}>
              At <strong style={{color:"#0d0f14"}}>Ecovis RKCA</strong> I lead cloud migration to AWS &amp; Azure, build
              internal Next.js tooling that cut manual reporting time by 60%, and own the product
              roadmap from requirements to sprint delivery across cross-functional teams.
            </p>
            <p className="a-el" style={{ fontSize:"clamp(0.92rem,1.05vw,1rem)",color:"rgba(13,15,20,0.6)",lineHeight:1.75,maxWidth:"54ch" }}>
              Selected for the <strong style={{color:"#0d0f14"}}>Amazon ML Summer School</strong> (top 0.1% of 100k+
              applicants). Built Microsoft Fabric ETL pipelines and earned the DP-600
              Analytics Engineer certification.
            </p>
            <p className="a-el" style={{ fontSize:"clamp(0.92rem,1.05vw,1rem)",color:"rgba(13,15,20,0.6)",lineHeight:1.75,maxWidth:"54ch" }}>
              I bridge engineering depth and product thinking — comfortable writing infra-level
              code and presenting roadmaps to stakeholders in the same day.
            </p>

            <div className="a-el" style={{ display:"flex",gap:18,alignItems:"center",marginTop:8,flexWrap:"wrap" }}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                  display:"inline-flex",alignItems:"center",gap:6,
                  padding:"10px 22px",
                  background:"#0d0f14",color:"#f7f5f0",
                  borderRadius:9999,fontFamily:"monospace",
                  fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",
                  textDecoration:"none",transition:"background 0.2s,color 0.2s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.background=ACCENT;e.currentTarget.style.color="#0d0f14";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#0d0f14";e.currentTarget.style.color="#f7f5f0";}}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1 9.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download CV
              </a>
              <a href="#contact"
                style={{ fontFamily:"monospace",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(13,15,20,0.38)",textDecoration:"none",transition:"color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color=ACCENT)}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(13,15,20,0.38)")}
              >Get in touch →</a>
            </div>
          </div>
        </div>

        {/* divider */}
        <div style={{ height:1,background:"rgba(13,15,20,0.08)",margin:"clamp(44px,6vw,72px) 0" }} />

        {/* metrics */}
        <div className="a-metrics" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2 }}>
          {METRICS.map((m,i)=>(
            <div key={i} className="a-metric" style={{
              padding:"clamp(20px,3vw,32px) clamp(14px,2.5vw,28px)",
              borderLeft: i===0?"none":"1px solid rgba(13,15,20,0.08)",
            }}>
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1.9rem,3.8vw,2.9rem)",fontWeight:700,color:"#0d0f14",lineHeight:1,marginBottom:8 }}>{m.value}</p>
              <p style={{ fontFamily:"monospace",fontSize:9,letterSpacing:"0.24em",textTransform:"uppercase",color:ACCENT,marginBottom:4 }}>{m.label}</p>
              <p style={{ fontSize:11,color:"rgba(13,15,20,0.38)",lineHeight:1.4 }}>{m.note}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .a-grid{grid-template-columns:1fr!important;}
          .a-metrics{grid-template-columns:1fr 1fr!important;}
          .a-metrics>div{border-left:none!important;border-top:1px solid rgba(13,15,20,0.08);}
        }
      `}</style>
    </section>
  );
}
