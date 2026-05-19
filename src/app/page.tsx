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

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <PageReveal>
        <main>
          <Entry />
          <Marquee />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <SkillMatcher />
          <Certifications />
          <Contact />
        </main>
      </PageReveal>
    </>
  );
}
