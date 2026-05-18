import Entry        from "@/components/Entry";
import About        from "@/components/About";
import Experience   from "@/components/Experience";
import Projects     from "@/components/Projects";
import Skills       from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact      from "@/components/Contact";
import Preloader    from "@/components/Preloader";
import SectionWipe  from "@/components/SectionWipe";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Entry />
        <SectionWipe id="about-wipe" />
        <About />
        <SectionWipe id="exp-wipe" />
        <Experience />
        <SectionWipe id="projects-wipe" />
        <Projects />
        <SectionWipe id="skills-wipe" />
        <Skills />
        <SectionWipe id="certs-wipe" />
        <Certifications />
        <SectionWipe id="contact-wipe" />
        <Contact />
      </main>
    </>
  );
}
