import Entry from "@/components/Entry";
import About from "@/components/About";
import BentoSkills from "@/components/BentoSkills";
import SystemDeck from "@/components/SystemDeck";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import TracingBeam from "@/components/TracingBeam";
import LabubuBuddy from "@/components/LabubuBuddy";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Hero — full bleed */}
      <Entry />

      {/* TracingBeam spine */}
      <TracingBeam>
        <About />
        <BentoSkills />
        <SystemDeck />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </TracingBeam>

      {/* Labubu buddy — fixed overlay, outside TracingBeam */}
      <LabubuBuddy />
    </main>
  );
}
