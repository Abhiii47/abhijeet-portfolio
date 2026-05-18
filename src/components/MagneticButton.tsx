"use client";

import { useRef, ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  href?: string;
  strength?: number;
  tag?: "button" | "a";
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  href,
  strength = 0.38,
  tag = "button",
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top  - height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 600);
  };

  const props = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    className: `magnetic-btn ${className}`,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(tag === "a" ? { href, target, rel } : {}),
  };

  return tag === "a" ? (
    <a {...props}>{children}</a>
  ) : (
    <button {...props}>{children}</button>
  );
}
