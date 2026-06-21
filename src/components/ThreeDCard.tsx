"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ThreeDCard({ children, className = "", style }: ThreeDCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cardRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max 10 degrees rotation
    const rotateX = -(y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3,
    });

    // Translate nested elements along the Z-axis
    const items = cardRef.current.querySelectorAll("[data-z]");
    items.forEach((item) => {
      const zValue = item.getAttribute("data-z") || "20";
      gsap.to(item, {
        z: parseFloat(zValue),
        ease: "power2.out",
        duration: 0.3,
      });
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5,
    });

    const items = cardRef.current.querySelectorAll("[data-z]");
    items.forEach((item) => {
      gsap.to(item, {
        z: 0,
        ease: "power2.out",
        duration: 0.5,
      });
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group/tilt ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <div
        ref={cardRef}
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}
