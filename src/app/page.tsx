import Entry from "@/components/Entry";
import About from "@/components/About";
import SkillStack from "@/components/SkillStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import CTA from "@/components/CTA";
import SectionSeparator from "@/components/ui/SectionSeparator";

export default function Home() {
  return (
    <main className="relative w-full">
      <Entry />
      <SectionSeparator />
      <About />
      <SectionSeparator /> {/* Deck / Skills */}
      <SkillStack />

      <SectionSeparator /> {/* Projects (SmartResume etc) */}
      <Projects />

      <SectionSeparator /> {/* Experience */}
      <Experience />

      <SectionSeparator />
      <Certifications />

      <CTA />
    </main>
  );
}
