"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const NAV_ITEMS = [
  { label: "01", name: "About",        href: "#about" },
  { label: "02", name: "Skills",        href: "#skills" },
  { label: "03", name: "Work",          href: "#projects" },
  { label: "04", name: "Experience",    href: "#experience" },
  { label: "05", name: "Contact",       href: "#contact" },
];

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Scroll progress + hide/show
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll  = doc.scrollHeight - doc.clientHeight;
      setProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
      setScrolled(scrollTop > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sections = NAV_ITEMS.map(i => document.querySelector(i.href));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Entry animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.8 }
    );
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={barRef}
        className="scroll-progress"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        {/* Logo mark */}
        <a
          href="/"
          className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase hover:text-white transition-colors duration-200"
        >
          AK.
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={e => handleClick(e, item.href)}
                className={`group flex items-baseline gap-1.5 text-[11px] font-mono tracking-[0.2em] uppercase transition-colors duration-200 ${
                  active === item.href ? "text-accent" : "text-gray-500 hover:text-white"
                }`}
              >
                <span className="text-accent/50 text-[9px]">{item.label}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right: availability badge */}
        <a
          href="mailto:abhijeetkadu007@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full text-[11px] font-mono tracking-widest uppercase text-gray-400 hover:border-accent/50 hover:text-accent transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available
        </a>
      </nav>
    </>
  );
}
