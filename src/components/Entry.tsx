"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

const ROLES = [
  "AI / ML Engineer",
  "Applied Data Science",
  "Competitive Programmer",
  "Open to Opportunities",
];

export default function Entry() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const nameRef       = useRef<HTMLHeadingElement>(null);
  const roleTickerRef = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const locationRef   = useRef<HTMLParagraphElement>(null);

  // ── Scramble hook ──
  const [nameText, setNameText] = useState("ABHIJEET KADU");
  const scramble = (target: string) => {
    let pos = 0;
    const id = setInterval(() => {
      setNameText(
        target.split("").map((ch, i) =>
          i < pos ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      pos += 1 / 3;
      if (pos > target.length) clearInterval(id);
    }, 30);
  };

  // ── Role ticker ──
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx(p => (p + 1) % ROLES.length);
        setRoleVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set([nameRef.current, taglineRef.current, locationRef.current,
               lineRef.current, roleTickerRef.current, scrollRef.current],
      { opacity: 0 });
    gsap.set(nameRef.current,    { y: 60, filter: "blur(12px)" });
    gsap.set(taglineRef.current, { y: 30 });
    gsap.set(locationRef.current,{ y: 20 });
    gsap.set(lineRef.current,    { scaleX: 0 });

    tl
      .to(nameRef.current, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.4, ease: "power3.out",
        delay: 0.3,
        onStart: () => scramble("ABHIJEET KADU"),
      })
      .to(lineRef.current, {
        opacity: 1, scaleX: 1,
        duration: 0.9, ease: "power2.inOut"
      }, "-=0.6")
      .to(roleTickerRef.current, {
        opacity: 1, duration: 0.6, ease: "power2.out",
      }, "-=0.4")
      .to(taglineRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      }, "-=0.3")
      .to(locationRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
      }, "-=0.4")
      .to(scrollRef.current, {
        opacity: 0.5, duration: 0.8, ease: "power2.out",
      }, "-=0.2");
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 overflow-hidden"
    >
      {/* Background large number */}
      <span
        className="absolute right-6 top-1/2 -translate-y-1/2 font-serif text-[22vw] font-black text-white/[0.025] select-none pointer-events-none leading-none"
        aria-hidden
      >
        01
      </span>

      {/* Top label row */}
      <p
        ref={locationRef}
        className="absolute top-28 left-6 md:left-12 font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase"
      >
        Mumbai, India &nbsp;·&nbsp; 20°41&apos;N 74°02&apos;E
      </p>

      {/* Main name — left-aligned, huge, Awwwards-style */}
      <div className="relative z-10">
        <h1
          ref={nameRef}
          onMouseEnter={() => scramble("ABHIJEET KADU")}
          className="font-serif font-black leading-[0.88] tracking-tighter text-white cursor-pointer select-none"
          style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
        >
          ABHIJEET<br />KADU
        </h1>

        {/* Horizontal rule */}
        <div
          ref={lineRef}
          className="h-px w-full bg-gradient-to-r from-accent via-white/20 to-transparent origin-left mt-6 mb-5"
        />

        {/* Bottom row — role ticker + tagline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          {/* Role ticker */}
          <div ref={roleTickerRef} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
            <p
              className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase transition-all duration-400"
              style={{
                color: roleVisible ? "#84cc16" : "transparent",
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? "translateY(0)" : "translateY(6px)",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {ROLES[roleIdx]}
            </p>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="font-serif italic text-gray-500 text-sm md:text-base max-w-xs text-left md:text-right"
          >
            Building models that ship,<br />not just notebooks that run.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-gray-600 uppercase [writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 text-accent animate-bounce" />
      </div>
    </section>
  );
}
