"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Copy, Check, ArrowUpRight, FileText, Briefcase, User } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const EMAIL = "abhijeetkadu85@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(80px,10vw,120px) clamp(20px,5vw,72px)",
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }
        .audience-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        .audience-card {
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .contact-btn {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 6px;
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          margin-top: 12px;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .audience-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative" }}>
        
        <AnimatedHeading section="07" text="Let's" italic="Talk" />

        <div className="contact-grid">
          
          {/* Left Column */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              marginBottom: 12,
            }}>Let's build something real.</h3>
            
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: "52ch",
              margin: 0,
            }}>
              Open to full-time AI/ML roles, research internships, and meaningful collaborations. I respond within 24 hours.
            </p>

            <div className="audience-cards">
              {/* Card 1: For Recruiters */}
              <div className="audience-card glass-panel-light">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-primary)", marginBottom: 10 }}>
                    <Briefcase size={14} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase" }}>
                      For Recruiters
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    Full-time SDE/ML roles. Open to FAANG, series B/C startups, remote relocations.
                  </p>
                </div>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="contact-btn glass-pill">
                  View Resume <ArrowUpRight size={10} />
                </a>
              </div>

              {/* Card 2: For Clients */}
              <div className="audience-card glass-panel-light">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-primary)", marginBottom: 10 }}>
                    <User size={14} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase" }}>
                      For Clients
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    Full-stack web builds, custom AI/ML integrations, and custom dashboard pipelines.
                  </p>
                </div>
                <a href={`mailto:${EMAIL}?subject=Project Scope Discussion`} className="contact-btn glass-pill">
                  Let's Scope It <Mail size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="glass-panel-light" style={{
            borderRadius: "16px",
            padding: "clamp(20px, 3vw, 32px)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}>
            {/* Copyable Email block */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 8,
              }}>Direct Email</p>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1.5px solid var(--border-subtle)",
                borderRadius: 8,
                padding: "10px 14px",
                background: "var(--bg-primary)",
              }}>
                <a
                  href={`mailto:${EMAIL}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(0.8rem, 0.9rem, 1rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    textDecoration: "none",
                  }}
                >{EMAIL}</a>
                <button
                  onClick={handleCopy}
                  aria-label="Copy email address"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: copied ? "var(--accent-primary)" : "var(--text-muted)",
                    transition: "color 0.15s ease",
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Timezone and Availability details */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 4,
              }}>Response Time & Timezone</p>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 13.5,
                color: "var(--text-secondary)",
                margin: 0,
                lineHeight: 1.5,
              }}>
                Within 24 hours &bull; IST Timezone (UTC+5:30)
              </p>
            </div>

            {/* Social Channels */}
            <div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 8,
              }}>Connect</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  { href: "https://github.com/Abhiii47",          icon: <Github size={12} />,   label: "GitHub" },
                  { href: "https://linkedin.com/in/abhijeet-kadu", icon: <Linkedin size={12} />, label: "LinkedIn" },
                  { href: "/resume.pdf",                          icon: <FileText size={12} />,  label: "Resume" },
                 ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-pill"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {icon}{label}<ArrowUpRight size={10} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}>Designed &amp; Built by Abhijeet Kadu &mdash; 2026</p>
        </div>
      </div>
    </section>
  );
}
