import Entry          from "@/components/Entry";
import About          from "@/components/About";
import Experience     from "@/components/Experience";
import Projects       from "@/components/Projects";
import Skills         from "@/components/Skills";
import SkillMatcher   from "@/components/SkillMatcher";
import Certifications from "@/components/Certifications";
import Contact        from "@/components/Contact";
import Preloader      from "@/components/Preloader";
import SectionWipe    from "@/components/SectionWipe";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollSkew     from "@/components/ScrollSkew";
import Marquee        from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <main style={{ position: "relative" }}>
        <Entry />
        <Marquee />
        <SectionWipe id="about-wipe" />
        <About />
        <SectionWipe id="exp-wipe" />
        <Experience />
        <SectionWipe id="projects-wipe" />
        <ScrollSkew maxSkew={4}>
          <Projects />
        </ScrollSkew>
        <SectionWipe id="skills-wipe" />
        <Skills />
        <SkillMatcher />
        <SectionWipe id="certs-wipe" />
        <Certifications />

        {/* ── Sticky footer reveal ──
            Contact sits sticky at the bottom of the stacking context.
            As Certifications scrolls away, Contact is revealed beneath it.
        */}
        <div style={{
          position: "relative",
          zIndex: 0,
        }}>
          {/* Spacer so sticky contact has room to reveal */}
          <div style={{ height: "60vh", pointerEvents: "none" }} />
          <div style={{
            position: "sticky",
            bottom: 0,
            zIndex: 0,
          }}>
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
}
