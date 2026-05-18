import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import CustomCursor  from "@/components/CustomCursor";
import SmoothScroll  from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhijeet Kadu — SDE & Product Manager",
  description:
    "Final-year CE student. SDE & PM at Ecovis RKCA. Cloud systems, ML pipelines, full-stack web. Based in Mumbai.",
  keywords: [
    "Abhijeet Kadu", "SDE", "Product Manager", "Cloud", "AWS", "GCP",
    "Next.js", "Machine Learning", "RAG", "FastAPI", "Mumbai",
  ],
  openGraph: {
    title: "Abhijeet Kadu — SDE & Product Manager",
    description: "I build systems that ship.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Bebas Neue (display) + Inter (body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300..500&display=swap"
          rel="stylesheet"
        />

        {/* Noise grain overlay — fixed, full-screen, pointer-events none */}
        <style dangerouslySetInnerHTML={{ __html: `
          body::after {
            content: '';
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 99997;
            opacity: 0.028;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            background-size: 180px 180px;
            background-repeat: repeat;
          }
          html { scroll-behavior: auto; } /* Lenis handles smooth scroll */
          ::selection { background: rgba(0,212,255,0.18); color: inherit; }
        ` }} />
      </head>
      <body>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
