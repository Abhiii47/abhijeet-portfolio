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
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(el, { x, y, duration: 1.2, ease: "power2.out" });
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
    gsap.set(nameRef.current,    { y: 80, filter: "blur(16px)" });
    gsap.set(taglineRef.current, { y: 30 });
    gsap.set(ctaRef.current,     { y: 20 });
    gsap.set(lineRef.current,    { scaleX: 0 });

    gsap.timeline()
      .to(nameRef.current, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.5, ease: "power3.out", delay: 0.4,
      })
      .to(lineRef.current,  { opacity: 1, scaleX: 1, duration: 1.0, ease: "expo.inOut" }, "-=0.7")
      .to(roleRef.current,  { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.5")
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3")
      .to(locationRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
      .to(scrollRef.current, { opacity: 0.5, duration: 0.8 }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 overflow-hidden"
    >
      <span
        className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 font-serif text-[28vw] font-black select-none pointer-events-none leading-none"
        style={{ WebkitTextStroke: "1px rgba(132,204,22,0.06)", color: "transparent" }}
        aria-hidden
      >
        01
      </span>

      <p
        ref={locationRef as React.RefObject<HTMLParagraphElement>}
        className="absolute top-28 left-6 md:left-12 font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase"
      >
        Mumbai, India &nbsp;·&nbsp; 20°41&apos;N 74°02&apos;E
      </p>

      <div className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 flex-col items-center gap-3 hidden md:flex">
        <span className="font-mono text-[8px] tracking-[0.35em] text-gray-700 uppercase [writing-mode:vertical-rl]">Status</span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <div className="w-px h-16 bg-gradient-to-b from-accent via-transparent to-transparent" />
        <span className="font-mono text-[8px] tracking-[0.35em] text-gray-700 uppercase [writing-mode:vertical-rl]">Available</span>
      </div>

      <div className="relative z-10">
        <h1
          ref={nameRef}
          className="font-serif font-black leading-[0.88] tracking-tighter select-none"
          style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
        >
          <span
            className="block cursor-pointer transition-all duration-500 hover:tracking-wide"
            style={{
              WebkitTextStroke: "1.5px #f0ede8",
              color: "transparent",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              (el.style as unknown as Record<string, string>)["webkitTextStroke"] = "1.5px #84cc16";
              el.style.color = "transparent";
              playFirst();
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              (el.style as unknown as Record<string, string>)["webkitTextStroke"] = "1.5px #f0ede8";
            }}
            data-cursor-label="HOVER"
          >
            {firstName}
          </span>

          <span className="relative block">
            <span
              className="cursor-pointer text-white hover:text-accent transition-colors duration-300"
              onMouseEnter={playLast}
            >
              {lastName}
            </span>
            <span
              className="absolute -bottom-3 left-0 h-[3px] w-3/4"
              style={{ background: "linear-gradient(90deg, #84cc16, transparent)" }}
            />
          </span>
        </h1>

        <div
          ref={lineRef}
          className="h-px w-full origin-left mt-10 mb-7"
          style={{ background: "linear-gradient(90deg, #84cc16 0%, rgba(240,237,232,0.1) 50%, transparent 100%)" }}
        />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div ref={roleRef} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
            <p
              className="font-mono text-xs md:text-sm tracking-[0.22em] uppercase"
              style={{
                color: roleVisible ? "#84cc16" : "transparent",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.38s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {ROLES[roleIdx]}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p
              ref={taglineRef}
              className="font-serif italic text-gray-500 text-sm md:text-base max-w-xs text-left md:text-right leading-relaxed"
            >
              Building products that ship,<br />not just ideas that sit.
            </p>

            <div ref={ctaRef} className="flex items-center gap-3 flex-wrap">
              <MagneticButton
                tag="a"
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-mono text-[11px] tracking-[0.2em] uppercase rounded-full hover:bg-lime-400 transition-colors duration-200 font-bold"
              >
                View Work
              </MagneticButton>
              <MagneticButton
                tag="a"
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-[11px] tracking-[0.2em] uppercase rounded-full hover:border-accent hover:text-accent transition-colors duration-200"
              >
                Contact
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent/40" />
        <span className="font-mono text-[9px] tracking-[0.3em] text-gray-600 uppercase">Scroll</span>
        <ArrowDown className="w-3 h-3 text-accent animate-bounce" />
      </div>
    </section>
  );
}
