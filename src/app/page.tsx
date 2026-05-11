import Entry from "@/components/Entry";
import About from "@/components/About";
import SkillStack from "@/components/SkillStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="relative w-full">
      <Entry />
      <About />
      <SkillStack />
      <Projects />
      <Experience />
      <Certifications />
      <CTA />
    </main>
  );
}
