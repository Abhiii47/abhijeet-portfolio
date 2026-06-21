import Entry          from "@/components/Entry";
import About          from "@/components/About";
import Experience     from "@/components/Experience";
import Projects       from "@/components/Projects";
import Skills         from "@/components/Skills";
import SkillMatcher   from "@/components/SkillMatcher";
import Certifications from "@/components/Certifications";
import OpenSource     from "@/components/OpenSource";
import Contact        from "@/components/Contact";
import Preloader      from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Marquee        from "@/components/Marquee";
import PageReveal     from "@/components/PageReveal";
import SectionBorder  from "@/components/SectionBorder";
import Navbar         from "@/components/Navbar";
import CustomCursor   from "@/components/CustomCursor";
import SmoothScroll   from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll>
        <ScrollProgress />
        <PageReveal>
          <Navbar />
          <main>
            <SectionBorder speed={1.6} showCorners={true}>
              <Entry />
            </SectionBorder>

            <Marquee />

            <SectionBorder speed={1.2}>
              <About />
            </SectionBorder>

            <SectionBorder speed={2.0}>
              <Experience />
            </SectionBorder>

            <SectionBorder speed={0.9}>
              <Projects />
            </SectionBorder>

            <SectionBorder speed={1.4}>
              <Skills />
            </SectionBorder>

            <SectionBorder speed={1.1}>
              <SkillMatcher />
            </SectionBorder>

            <SectionBorder speed={1.5}>
              <Certifications />
            </SectionBorder>

            {/* Open Source Contributions */}
            <SectionBorder speed={1.3}>
              <OpenSource />
            </SectionBorder>

            <SectionBorder speed={2.2}>
              <Contact />
            </SectionBorder>
          </main>
        </PageReveal>
      </SmoothScroll>
    </>
  );
}
