"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Mood = "idle" | "happy" | "wave" | "think" | "sleep" | "excited";

const MESSAGES: Record<Mood, string[]> = {
  idle:    ["Psst... scroll down!", "I see you 👀", "Click me!", "...boop?", "I'm watching your cursor 🔍"],
  happy:   ["Yay! Hi there! 🎉", "You found me!", "Let's be friends!", "\\(^o^)/"],
  wave:    ["Heyyy!! 👋", "Don't leave me!", "Come back!", "*waves frantically*"],
  think:   ["Hmm... thinking...", "Processing... 🤔", "Loading big brain...", "404: thought not found"],
  sleep:   ["zzz... 💤", "*snoring sounds*", "Shh I'm dreaming", "5 more minutes..."],
  excited: ["HIRE ABHIJEET!!!", "Top 0.1% ML engineer!", "He built ME! 🤖", "Check the projects!! 👆"],
};

export default function LabubuBuddy() {
  const [mood, setMood]           = useState<Mood>("idle");
  const [message, setMessage]     = useState("");
  const [showMsg, setShowMsg]     = useState(false);
  const [blinking, setBlinking]   = useState(false);
  const [bouncing, setBouncing]   = useState(false);
  const [pos, setPos]             = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth  - 110 : 0,
    y: typeof window !== "undefined" ? window.innerHeight - 160 : 0,
  }));
  const [dragging, setDragging]   = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos]       = useState({ x: 0, y: 0 });
  const [isInit]                  = useState(() => typeof window !== "undefined");
  const idleTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const msgTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buddyRef   = useRef<HTMLDivElement>(null);

  // Blink randomly
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 180);
      setTimeout(blink, 2500 + Math.random() * 3000);
    };
    const t = setTimeout(blink, 1500);
    return () => clearTimeout(t);
  }, []);

  const speak = useCallback((m: Mood) => {
    const lines = MESSAGES[m];
    const line = lines[Math.floor(Math.random() * lines.length)];
    setMood(m);
    setMessage(line);
    setShowMsg(true);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
    if (msgTimer.current) clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setShowMsg(false), 3000);
  }, []);

  // Idle → sleep after inactivity
  useEffect(() => {
    const reset = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (mood === "sleep") setMood("idle");
      idleTimer.current = setTimeout(() => speak("sleep"), 12000);
    };
    window.addEventListener("mousemove", reset);
    window.addEventListener("scroll", reset);
    reset();
    return () => {
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("scroll", reset);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [mood, speak]);

  // Eyes follow cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!buddyRef.current) return;
      const rect = buddyRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 3;
      setEyePos({
        x: (dx / Math.max(dist, 1)) * Math.min(dist / 40, maxOffset),
        y: (dy / Math.max(dist, 1)) * Math.min(dist / 40, maxOffset),
      });
      // (arm angle removed — waving handled via CSS animation)
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Drag
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth  - 90, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 120, e.clientY - dragOffset.y)),
      });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",  onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",  onUp);
    };
  }, [dragging, dragOffset]);

  // Random excited messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) speak("excited");
      else if (Math.random() < 0.5) speak("think");
    }, 18000);
    return () => clearInterval(interval);
  }, [speak]);

  if (!isInit) return null;

  const isSleeping = mood === "sleep";
  const isWaving   = mood === "wave" || mood === "excited";

  // Eye shape
  const eyeStyle = {
    transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
    transition: "transform 0.08s ease",
  };

  return (
    <div
      ref={buddyRef}
      className="fixed z-50 select-none"
      style={{
        left: pos.x,
        top:  pos.y,
        width: 88,
        cursor: dragging ? "grabbing" : "grab",
        filter: "drop-shadow(0 8px 24px rgba(132,204,22,0.25))",
        transition: dragging ? "none" : "left 0.1s, top 0.1s",
      }}
      onMouseDown={onMouseDown}
      onClick={() => !dragging && speak("happy")}
    >
      {/* Speech bubble */}
      {showMsg && (
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] px-3 py-2 rounded-xl pointer-events-none"
          style={{
            background: "#0d0d0d",
            border: "1px solid rgba(132,204,22,0.4)",
            color: "#84cc16",
            boxShadow: "0 4px 20px rgba(132,204,22,0.15)",
            animation: "fadeInUp 0.25s ease",
            maxWidth: "180px",
            whiteSpace: "normal",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {message}
          {/* Tail */}
          <div
            className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
            style={{ background: "#0d0d0d", border: "1px solid rgba(132,204,22,0.4)", borderTop: "none", borderLeft: "none" }}
          />
        </div>
      )}

      {/* Buddy SVG */}
      <svg
        viewBox="0 0 88 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: bouncing ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          animation: isSleeping ? "none" : "buddyFloat 3s ease-in-out infinite",
        }}
      >
        {/* Ear left */}
        <ellipse cx="14" cy="32" rx="10" ry="14" fill="#1a1a1a" stroke="#84cc16" strokeWidth="1.5" />
        <ellipse cx="14" cy="32" rx="6" ry="9" fill="#84cc1620" />
        {/* Ear right */}
        <ellipse cx="74" cy="32" rx="10" ry="14" fill="#1a1a1a" stroke="#84cc16" strokeWidth="1.5" />
        <ellipse cx="74" cy="32" rx="6" ry="9" fill="#84cc1620" />

        {/* Body */}
        <rect x="20" y="70" width="48" height="44" rx="12" fill="#111" stroke="#84cc1640" strokeWidth="1" />
        {/* Belly */}
        <ellipse cx="44" cy="88" rx="16" ry="12" fill="#84cc1610" stroke="#84cc1625" strokeWidth="1" />
        {/* Belly dot */}
        <circle cx="44" cy="88" r="3" fill="#84cc1640" />

        {/* Left arm */}
        <g
          style={{
            transformOrigin: "22px 78px",
            transform: isWaving ? undefined : "rotate(-10deg)",
            animation: isWaving ? "waveArm 0.4s ease-in-out infinite alternate" : "none",
            transition: isWaving ? "none" : "transform 0.3s",
          }}
        >
          <rect x="8" y="74" width="14" height="28" rx="7" fill="#111" stroke="#84cc1640" strokeWidth="1" />
          {/* Hand */}
          <circle cx="15" cy="104" r="7" fill="#1a1a1a" stroke="#84cc1640" strokeWidth="1" />
        </g>
        {/* Right arm */}
        <g style={{ transformOrigin: "66px 78px", transform: "rotate(10deg)", transition: "transform 0.3s" }}>
          <rect x="66" y="74" width="14" height="28" rx="7" fill="#111" stroke="#84cc1640" strokeWidth="1" />
          <circle cx="73" cy="104" r="7" fill="#1a1a1a" stroke="#84cc1640" strokeWidth="1" />
        </g>

        {/* Legs */}
        <rect x="26" y="110" width="14" height="8" rx="5" fill="#111" stroke="#84cc1630" strokeWidth="1" />
        <rect x="48" y="110" width="14" height="8" rx="5" fill="#111" stroke="#84cc1630" strokeWidth="1" />

        {/* HEAD */}
        <circle cx="44" cy="44" r="30" fill="#111" stroke="#84cc16" strokeWidth="1.5" />
        {/* Head shine */}
        <ellipse cx="33" cy="26" rx="8" ry="5" fill="white" opacity="0.04" transform="rotate(-30 33 26)" />

        {/* BIG EARS on head */}
        <ellipse cx="18" cy="28" rx="7" ry="11" fill="#1a1a1a" stroke="#84cc16" strokeWidth="1.5" />
        <ellipse cx="70" cy="28" rx="7" ry="11" fill="#1a1a1a" stroke="#84cc16" strokeWidth="1.5" />

        {/* EYES */}
        {isSleeping ? (
          <>
            {/* Sleeping eyes — closed lines */}
            <line x1="33" y1="44" x2="39" y2="44" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" />
            <line x1="49" y1="44" x2="55" y2="44" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Eye whites */}
            <circle cx="36" cy="44" r="9" fill="#1a1a1a" />
            <circle cx="52" cy="44" r="9" fill="#1a1a1a" />
            {/* Pupils (follow cursor) */}
            <circle
              cx={36 + eyePos.x}
              cy={44 + eyePos.y}
              r={blinking ? 0.5 : 5}
              fill="#84cc16"
              style={eyeStyle}
            />
            <circle
              cx={52 + eyePos.x}
              cy={44 + eyePos.y}
              r={blinking ? 0.5 : 5}
              fill="#84cc16"
              style={eyeStyle}
            />
            {/* Pupil shine */}
            {!blinking && (
              <>
                <circle cx={37 + eyePos.x} cy={42 + eyePos.y} r="1.5" fill="white" opacity="0.6" />
                <circle cx={53 + eyePos.x} cy={42 + eyePos.y} r="1.5" fill="white" opacity="0.6" />
              </>
            )}
          </>
        )}

        {/* MOUTH */}
        {mood === "happy" || mood === "excited" ? (
          <path d="M 36 56 Q 44 64 52 56" stroke="#84cc16" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : mood === "sleep" ? (
          <path d="M 38 57 Q 44 60 50 57" stroke="#84cc1660" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        ) : mood === "think" ? (
          <path d="M 38 58 Q 44 56 50 58" stroke="#84cc1680" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        ) : (
          <path d="M 38 57 Q 44 62 50 57" stroke="#84cc1680" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        )}

        {/* BLUSH */}
        <ellipse cx="28" cy="52" rx="6" ry="3" fill="#ef4444" opacity="0.18" />
        <ellipse cx="60" cy="52" rx="6" ry="3" fill="#ef4444" opacity="0.18" />

        {/* Mood indicator — little glow dot on forehead */}
        <circle
          cx="44" cy="20"
          r="3"
          fill={mood === "excited" ? "#ef4444" : mood === "sleep" ? "#64748b" : mood === "think" ? "#d946ef" : "#84cc16"}
          opacity={0.8}
          style={{ filter: `blur(2px)` }}
        />

        {/* ZZZ for sleep */}
        {isSleeping && (
          <>
            <text x="58" y="20" fontSize="8" fill="#84cc1680" fontFamily="monospace">z</text>
            <text x="64" y="14" fontSize="10" fill="#84cc1660" fontFamily="monospace">z</text>
            <text x="71" y="7" fontSize="12" fill="#84cc1640" fontFamily="monospace">z</text>
          </>
        )}
      </svg>

      <style>{`
        @keyframes buddyFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes waveArm {
          from { transform: rotate(-40deg); }
          to   { transform: rotate(-10deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
