import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/ui/SmoothScroll";
import HUDOverlay from "@/components/ui/HUDOverlay";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhijeet Kadu | Frontend Engineer",
  description: "Senior Frontend Engineer & Motion Designer portfolio. Building systems, not just screens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <SmoothScroll>
          <CustomCursor />
          <HUDOverlay />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
