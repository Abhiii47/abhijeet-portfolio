"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#00d4ff";

const ITEMS = [
  {
    title:   "DP-600 Fabric Analytics Engineer",
    issuer:  "Microsoft",
    year:    "2024",
    desc:    "Earned while building Bronze→Silver→Gold ETL pipelines on Microsoft Fabric.",
    color:   "#7719aa",
  },
  {
    title:   "Amazon ML Summer School",
    issuer:  "Amazon",
    year:    "2024",
    desc:    "Selected in the top 0.1% of 100,000+ applicants nationally.",
    color:   "#ff9900",
  },
  {
    title:   "Design Patent: Smart Inventory System",
    issuer:  "IP India",
    year:    "2024",
    desc:    "Intellectual Property Design No. 458179-001.",
    color:   ACCENT,
  },
  {
    title:   "Google Cloud Fundamentals",
    issuer:  "Google",
    year:    "2023",
    desc:    "Core infrastructure, compute, networking, and storage on GCP.",
    color:   "#34a853",
  },
];

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".cert-card",{
      scrollTrigger:{ trigger:ref.current, start:"top 78%" },
      y:28,opacity:0,duration:0.75,stagger:0.1,ease:"power3.out",
    });
  },{ scope:ref });

  return (
    <section
      id="certifications"
      ref={ref}
      style={{
        background:"#f7f5f0",
        color:"#0d0f14",
        padding:"clamp(72px,10vw,120px) clamp(24px,6vw,80px)",
        position:"relative",overflow:"hidden",
      }}
    >
      <span aria-hidden style={{
        position:"absolute",right:"2%",top:"50%",transform:"translateY(-50%)",
        fontFamily:"'Cormorant Garamond',Georgia,serif",
        fontSize:"clamp(8rem,20vw,20rem)",fontWeight:900,lineHeight:1,
        color:"transparent",WebkitTextStroke:"1px rgba(13,15,20,0.035)",
        pointerEvents:"none",userSelect:"none",
      }}>04</span>

      <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1 }}>
        <p style={{ fontFamily:"monospace",fontSize:10,letterSpacing:"0.35em",color:ACCENT,textTransform:"uppercase",marginBottom:44 }}>04 / Achievements</p>
        <h2 style={{
          fontFamily:"'Cormorant Garamond',Georgia,serif",
          fontSize:"clamp(2rem,3.8vw,3.4rem)",
          fontWeight:700,lineHeight:1.1,letterSpacing:"-0.02em",
          color:"#0d0f14",
          marginBottom:"clamp(44px,6vw,64px)",
        }}>Credentials &amp; recognition.</h2>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(280px,100%),1fr))",gap:16 }}>
          {ITEMS.map((item,i)=>(
            <div
              key={i}
              className="cert-card"
              style={{
                padding:"clamp(24px,3vw,36px)",
                background:"white",
                border:"1px solid rgba(13,15,20,0.07)",
                borderRadius:16,
                transition:"box-shadow 0.25s,transform 0.25s",
                cursor:"default",
              }}
              onMouseEnter={e=>{
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow=`0 16px 40px rgba(0,0,0,0.08),0 0 0 1px ${item.color}20`;
                el.style.transform="translateY(-3px)";
              }}
              onMouseLeave={e=>{
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow="none";
                el.style.transform="translateY(0)";
              }}
            >
              {/* colored top strip */}
              <div style={{ width:32,height:3,borderRadius:9999,background:item.color,marginBottom:20 }} />
              <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1rem,1.6vw,1.2rem)",fontWeight:700,color:"#0d0f14",lineHeight:1.2,marginBottom:8 }}>{item.title}</h3>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
                <span style={{ fontFamily:"monospace",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:item.color }}>{item.issuer}</span>
                <span style={{ width:1,height:10,background:"rgba(13,15,20,0.15)" }} />
                <span style={{ fontFamily:"monospace",fontSize:9,letterSpacing:"0.15em",color:"rgba(13,15,20,0.35)" }}>{item.year}</span>
              </div>
              <p style={{ fontSize:"clamp(0.8rem,1vw,0.88rem)",color:"rgba(13,15,20,0.5)",lineHeight:1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
