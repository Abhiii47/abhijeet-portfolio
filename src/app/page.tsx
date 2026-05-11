import Entry from "@/components/Entry";
import About from "@/components/About";
import BentoSkills from "@/components/BentoSkills";
import SystemDeck from "@/components/SystemDeck";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import TracingBeam from "@/components/TracingBeam";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Hero — full bleed, outside TracingBeam */}
      <Entry />

      {/* TracingBeam spine connects all sections below hero */}
      <TracingBeam>
        {/* 02 — About */}
        <About />

        {/* 03 — Bento Skills Grid */}
        <BentoSkills />

        {/* 03b — Interactive System Control Deck */}
        <SystemDeck />

        {/* 04 — Projects */}
        <Projects />

        {/* 05 — Experience */}
        <Experience />

        {/* 06 — Certifications */}
        <Certifications />

        {/* 07 — Contact */}
        <Contact />
      </TracingBeam>
    </main>
  );
}
