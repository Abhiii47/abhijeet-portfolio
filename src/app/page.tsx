import Entry          from "@/components/Entry";
import About          from "@/components/About";
import Experience     from "@/components/Experience";
import Projects       from "@/components/Projects";
import Skills         from "@/components/Skills";
import SkillMatcher   from "@/components/SkillMatcher";
import Certifications from "@/components/Certifications";
import Contact        from "@/components/Contact";
import Preloader      from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Marquee        from "@/components/Marquee";
import PageReveal     from "@/components/PageReveal";
import SectionBorder  from "@/components/SectionBorder";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <PageReveal>
        <main>
          {/* Hero — slower spin, slightly dimmer */}
          <SectionBorder speed={1.6}>
            <Entry />
          </SectionBorder>

          <Marquee />

          {/* About */}
          <SectionBorder speed={1.2}>
            <About />
          </SectionBorder>

          {/* Experience — opposite spin feel (different speed) */}
          <SectionBorder speed={2.0}>
            <Experience />
          </SectionBorder>

          {/* Projects — fastest, draws eye to work */}
          <SectionBorder speed={0.9}>
            <Projects />
          </SectionBorder>

          {/* Skills */}
          <SectionBorder speed={1.4}>
            <Skills />
          </SectionBorder>

          {/* Skill Matcher */}
          <SectionBorder speed={1.1}>
            <SkillMatcher />
          </SectionBorder>

          {/* Certifications */}
          <SectionBorder speed={1.5}>
            <Certifications />
          </SectionBorder>

          {/* Contact — slowest, calm closing feel */}
          <SectionBorder speed={2.2}>
            <Contact />
          </SectionBorder>
        </main>
      </PageReveal>
    </>
  );
}
