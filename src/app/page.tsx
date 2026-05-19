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
import StickyStack    from "@/components/StickyStack";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <PageReveal>
        <main style={{ position: "relative" }}>

          {/* 1 ── Hero */}
          <StickyStack index={1} bg="var(--bg-base, #FFFCF6)">
            <Entry />
          </StickyStack>

          {/* Marquee divider — not sticky, lives between panels */}
          <div style={{ position: "relative", zIndex: 10 }}>
            <Marquee />
          </div>

          {/* 2 ── About */}
          <StickyStack index={2} bg="var(--bg-section, #F5F2EB)">
            <About />
          </StickyStack>

          {/* 3 ── Experience */}
          <StickyStack index={3} bg="var(--bg-base, #FFFCF6)">
            <Experience />
          </StickyStack>

          {/* 4 ── Projects */}
          <StickyStack index={4} bg="var(--bg-section, #F5F2EB)">
            <Projects />
          </StickyStack>

          {/* 5 ── Skills */}
          <StickyStack index={5} bg="var(--bg-base, #FFFCF6)">
            <Skills />
            <SkillMatcher />
          </StickyStack>

          {/* 6 ── Certifications */}
          <StickyStack index={6} bg="var(--bg-section, #F5F2EB)">
            <Certifications />
          </StickyStack>

          {/* 7 ── Contact — sticky reveal from below */}
          <div style={{ position: "relative", zIndex: 7 }}>
            <div style={{ height: "60vh", pointerEvents: "none" }} />
            <div style={{ position: "sticky", bottom: 0, zIndex: 7 }}>
              <Contact />
            </div>
          </div>

        </main>
      </PageReveal>
    </>
  );
}
