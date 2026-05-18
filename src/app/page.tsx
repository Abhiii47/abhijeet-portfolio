import Entry from "@/components/Entry";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Certifications from "@/components/Certifications";

export default function Home() {
  return (
    <main className="relative w-full">
      <Entry />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
    </main>
  );
}
