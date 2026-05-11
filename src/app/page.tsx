import Entry from "@/components/Entry";
import About from "@/components/About";
import BentoSkills from "@/components/BentoSkills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import TracingBeam from "@/components/TracingBeam";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Hero sits outside TracingBeam — full bleed */}
      <Entry />

      {/* TracingBeam wraps everything below hero */}
      <TracingBeam>
        <About />
        <BentoSkills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </TracingBeam>
    </main>
  );
}
