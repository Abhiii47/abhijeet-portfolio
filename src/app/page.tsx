import Entry        from "@/components/Entry";
import About        from "@/components/About";
import Experience   from "@/components/Experience";
import Projects     from "@/components/Projects";
import Skills       from "@/components/Skills";
import Contact      from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Entry />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
