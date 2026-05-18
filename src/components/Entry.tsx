"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";

const ROLES = [
  "SDE / Product Manager",
  "Cloud & Internal Tools",
  "AI + Web Experiences",
  "Open to Opportunities",
];

function useScramble(target: string, autoPlay = false) {
  const [text, setText] = useState(target);
  const idRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = () => {
    if (idRef.current) clearInterval(idRef.current);
    let pos = 0;
    idRef.current = setInterval(() => {
      setText(
        target.split("").map((ch, i) => {
          if (ch === " ") return " ";
          return i < pos ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );
      pos += 0.4;
      if (pos > target.length) {
        setText(target);
        if (idRef.current) clearInterval(idRef.current);
      }
    }, 28);
  };

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(play, 900);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  return { text, play };
}

/* ─── Floating Particles ─────────────────────────────────────── */
function FloatingParticles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 14 + 10,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.35 + 0.05,
    lime: i % 7 === 0,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            background: p.lime ? "#84cc16" : "#f0ede8",
            animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Aurora Background ──────────────────────────────────────── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Animated aurora blobs */}
      <div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: "70vw", height: "55vh",
          top: "5%", left: "-15%",
          background: "radial-gradient(ellipse, rgba(132,204,22,0.07) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)",
          animation: "auroraMove1 18s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: "60vw", height: "50vh",
          top: "10%", right: "-10%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, rgba(217,70,239,0.04) 50%, transparent 70%)",
          animation: "auroraMove2 22s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute rounded-full blur-[140px]"
        style={{
          width: "50vw", height: "40vh",
          bottom: "10%", left: "20%",
          background: "radial-gradient(ellipse, rgba(132,204,22,0.05) 0%, rgba(20,184,166,0.04) 60%, transparent 75%)",
          animation: "auroraMove3 26s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes auroraMove1 {
          0%   { transform: translate(0, 0)    scale(1); }
          100% { transform: translate(8vw, 5vh) scale(1.1); }
        }
        @keyframes auroraMove2 {
          0%   { transform: translate(0, 0)     scale(1); }
          100% { transform: translate(-6vw, 8vh) scale(1.08); }
        }
        @keyframes auroraMove3 {
          0%   { transform: translate(0, 0)   scale(1); }
          100% { transform: translate(5vw, -4vh) scale(1.12); }
        }
      `}</style>
    </div>
  );
}

/* ─── Background Beams ───────────────────────────────────────── */
function BackgroundBeams() {
  const beams = [
    { rotate: -38, opacity: 0.055, delay: 0,    width: 1.5 },
    { rotate: -26, opacity: 0.08,  delay: 0.8,  width: 1 },
    { rotate: -14, opacity: 0.11,  delay: 1.6,  width: 2 },
    { rotate: -4,  opacity: 0.13,  delay: 2.4,  width: 1 },
    { rotate:  6,  opacity: 0.11,  delay: 1.2,  width: 2 },
    { rotate:  18, opacity: 0.08,  delay: 2.0,  width: 1 },
    { rotate:  32, opacity: 0.055, delay: 0.4,  width: 1.5 },
    { rotate:  46, opacity: 0.035, delay: 1.0,  width: 1 },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
      style={{ perspective: "600px" }}
    >
      {beams.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            bottom: 0,
            left: "50%",
            width: `${b.width}px`,
            height: "120vh",
            transformOrigin: "bottom center",
            transform: `rotate(${b.rotate}deg)`,
            background: `linear-gradient(to top, #84cc16, rgba(132,204,22,0.3) 30%, transparent 75%)`,
            opacity: b.opacity,
            animation: `beamPulse 4s ${b.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Radial glow at beam origin */}
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "35vh",
          background: "radial-gradient(ellipse at bottom, rgba(132,204,22,0.08) 0%, transparent 65%)",
        }}
      />

      <style>{`
        @keyframes beamPulse {
          0%   { opacity: var(--base-op, 0.08); }
          100% { opacity: calc(var(--base-op, 0.08) * 1.8); }
        }
      `}</style>
    </div>
  );
}

/* ─── Noise Grain Overlay ─────────────────────────────────────── */
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        opacity: 0.022,
        mixBlendMode: "overlay",
      }}
    />
  );
}

/* ─── Grid Lines ─────────────────────────────────────────────── */
function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{
        backgroundImage:
          `linear-gradient(rgba(132,204,22,0.025) 1px, transparent 1px),
           linear-gradient(90deg, rgba(132,204,22,0.025) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }}
    />
  );
}


export default function Entry() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const roleRef      = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const locationRef  = useRef<HTMLElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);

  const { text: firstName, play: playFirst } = useScramble("ABHIJEET", true);
  const { text: lastName,  play: playLast  } = useScramble("KADU",     true);

  const [roleIdx, setRoleIdx]         = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx(p => (p + 1) % ROLES.length);
        setRoleVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to(el, { x, y, duration: 1.4, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useGSAP(() => {
    const els = [
      nameRef.current, taglineRef.current, locationRef.current,
      lineRef.current, roleRef.current, scrollRef.current, ctaRef.current,
    ];
    gsap.set(els, { opacity: 0 });
    gsap.set(nameRef.current,    { y: 60, filter: "blur(20px)" });
    gsap.set(taglineRef.current, { y: 24 });
    gsap.set(ctaRef.current,     { y: 16 });
    gsap.set(lineRef.current,    { scaleX: 0 });

    gsap.timeline()
      .to(nameRef.current, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.6, ease: "power3.out", delay: 0.3,
      })
      .to(lineRef.current,    { opacity: 1, scaleX: 1, duration: 1.1, ease: "expo.inOut" }, "-=0.8")
      .to(roleRef.current,    { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.5")
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .to(locationRef.current,{ opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.5")
      .to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
      .to(scrollRef.current,  { opacity: 0.5, duration: 0.8 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-14 overflow-hidden"
    >
      {/* ── BACKGROUND LAYERS (z-0) ── */}
      <AuroraBackground />
      <GridLines />
      <BackgroundBeams />
      <FloatingParticles />
      <NoiseOverlay />

      {/* Ghost section number */}
      <span
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 font-serif font-black select-none pointer-events-none leading-none z-0"
        style={{
          fontSize: "clamp(10rem, 22vw, 22rem)",
          WebkitTextStroke: "1px rgba(132,204,22,0.04)",
          color: "transparent",
        }}
        aria-hidden
      >
        01
      </span>

      {/* Location */}
      <p
        ref={locationRef as React.RefObject<HTMLParagraphElement>}
        className="absolute top-32 left-6 md:left-14 font-mono text-[9px] tracking-[0.32em] text-gray-600 uppercase z-10"
      >
        Mumbai, India &nbsp;·&nbsp; 20°41′N 74°02′E
      </p>

      {/* Right side status indicator */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-3 hidden md:flex z-10">
        <span className="font-mono text-[8px] tracking-[0.35em] text-gray-700 uppercase [writing-mode:vertical-rl]">Status</span>
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-accent to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <div className="w-px h-14 bg-gradient-to-b from-accent via-transparent to-transparent" />
        <span className="font-mono text-[8px] tracking-[0.35em] text-gray-700 uppercase [writing-mode:vertical-rl]">Available</span>
      </div>

      {/* ── MAIN CONTENT (z-10) ── */}
      <div className="relative z-10">

        <h1
          ref={nameRef}
          className="font-serif font-black select-none"
          style={{ lineHeight: 0.86 }}
        >
          <span
            className="block cursor-pointer"
            style={{
              fontSize: "clamp(4rem, 15vw, 13rem)",
              WebkitTextStroke: "1.5px #f0ede8",
              color: "transparent",
              letterSpacing: "-0.03em",
              transition: "letter-spacing 0.5s cubic-bezier(0.16,1,0.3,1), -webkit-text-stroke-color 0.3s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.letterSpacing = "0.01em";
              (el.style as unknown as Record<string,string>)["webkitTextStroke"] = "1.5px #84cc16";
              playFirst();
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.letterSpacing = "-0.03em";
              (el.style as unknown as Record<string,string>)["webkitTextStroke"] = "1.5px #f0ede8";
            }}
          >
            {firstName}
          </span>

          <span className="relative block" style={{ fontSize: "clamp(3.2rem, 12vw, 10.5rem)", letterSpacing: "-0.03em" }}>
            <span
              className="cursor-pointer text-white"
              style={{ transition: "color 0.3s ease" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#84cc16";
                playLast();
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
            >
              {lastName}
            </span>
            <span
              className="absolute left-0"
              style={{
                bottom: "-6px",
                height: "3px",
                width: "55%",
                background: "linear-gradient(90deg, #84cc16, transparent)",
              }}
            />
          </span>
        </h1>

        <div
          ref={lineRef}
          className="origin-left"
          style={{
            height: "1px",
            width: "100%",
            marginTop: "2rem",
            marginBottom: "1.5rem",
            background: "linear-gradient(90deg, #84cc16 0%, rgba(240,237,232,0.08) 55%, transparent 100%)",
          }}
        />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          <div ref={roleRef} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
            <p
              className="font-mono uppercase"
              style={{
                fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
                letterSpacing: "0.24em",
                color: roleVisible ? "#84cc16" : "transparent",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(6px)",
                transition: "all 0.38s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {ROLES[roleIdx]}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-5">
            <p
              ref={taglineRef}
              className="font-serif italic leading-snug text-left md:text-right"
              style={{
                fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
                color: "rgba(240,237,232,0.38)",
                maxWidth: "22ch",
              }}
            >
              Building products that ship,<br />not just ideas that sit.
            </p>

            <div ref={ctaRef} className="flex items-center gap-3 flex-wrap">
              <MagneticButton
                tag="a"
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-black font-mono font-bold tracking-[0.18em] uppercase rounded-full hover:bg-lime-300 transition-colors duration-200"
                style={{ fontSize: "0.65rem" }}
              >
                View Work
              </MagneticButton>
              <MagneticButton
                tag="a"
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 font-mono tracking-[0.18em] uppercase rounded-full transition-all duration-200"
                style={{
                  fontSize: "0.65rem",
                  border: "1px solid rgba(240,237,232,0.15)",
                  color: "rgba(240,237,232,0.6)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(132,204,22,0.5)";
                  el.style.color = "#84cc16";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(240,237,232,0.15)";
                  el.style.color = "rgba(240,237,232,0.6)";
                }}
              >
                Contact
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} className="absolute bottom-8 left-6 md:left-14 flex items-center gap-3 z-10">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-accent/35" />
        <span className="font-mono text-[8px] tracking-[0.32em] text-gray-700 uppercase">Scroll</span>
        <ArrowDown className="w-3 h-3 text-accent animate-bounce" />
      </div>
    </section>
  );
}
