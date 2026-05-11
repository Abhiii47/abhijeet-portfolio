import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/ui/SmoothScroll";
import HUDOverlay from "@/components/ui/HUDOverlay";
import Navbar from "@/components/Navbar";
import NeuralCanvas from "@/components/NeuralCanvas";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ScrollCounter from "@/components/ScrollCounter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhijeet Kadu | AI/ML Engineer",
  description:
    "AI/ML Engineer & Computer Engineering student. Top 0.1% Amazon ML Summer School. Building transformer-based models and scalable ML systems.",
  openGraph: {
    title: "Abhijeet Kadu | AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in Transformer models, ensemble learning, and production ML pipelines.",
    url: "https://abhijeet-portfolio-tau.vercel.app",
    siteName: "Abhijeet Kadu",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Abhijeet Kadu — AI/ML Engineer" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Kadu | AI/ML Engineer",
    description: "AI/ML Engineer. Top 0.1% Amazon ML Summer School.",
    images: ["/og-image.png"],
  },
  keywords: ["AI Engineer","ML Engineer","Machine Learning","Python","PyTorch","FastAPI","Next.js","Computer Engineering"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground overflow-x-hidden`}>
        {/* Cinematic preloader — mounts first, unmounts after reveal */}
        <Preloader />

        {/* Global ambient neural network background */}
        <NeuralCanvas />

        {/* Context-aware custom cursor */}
        <Cursor />

        {/* Fixed right-side scroll position indicator */}
        <ScrollCounter />

        <SmoothScroll>
          <HUDOverlay />
          <Navbar />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
