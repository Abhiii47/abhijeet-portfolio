import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhijeet Kadu — Software Engineer (Full-Stack · ML)",
  description:
    "Final-year Computer Engineering student. SDE at Ecovis RKCA. Full-stack web, cloud systems, and ML pipelines. 4 merged PRs in TensorFlow & MLflow. Mumbai, open to remote.",
  openGraph: {
    title: "Abhijeet Kadu — Software Engineer (Full-Stack · ML)",
    description: "Full-stack and ML engineer. I build systems that ship.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
