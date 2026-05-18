import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhijeet Kadu — SDE & Product Manager",
  description: "SDE & Product Manager at Ecovis RKCA. Cloud systems, AI, and full-stack web. Based in Mumbai.",
  keywords: ["Abhijeet Kadu", "SDE", "Product Manager", "Cloud", "AWS", "Azure", "Next.js", "Machine Learning", "Mumbai"],
  openGraph: {
    title: "Abhijeet Kadu — SDE & Product Manager",
    description: "Building cloud systems & shipping products that matter.",
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
