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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300..500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* RM-style magazine outer border frame */}
        <div id="page-frame" aria-hidden />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
