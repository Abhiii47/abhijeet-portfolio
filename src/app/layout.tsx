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
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            try {
              const saved = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', saved);
            } catch (e) {}
          })();
        `}} />
      </head>
      <body>
        <div className="mesh-gradients" aria-hidden="true">
          <div className="mesh-blob mesh-blob--1" />
          <div className="mesh-blob mesh-blob--2" />
          <div className="mesh-blob mesh-blob--3" />
        </div>
        {children}
      </body>
    </html>
  );
}
