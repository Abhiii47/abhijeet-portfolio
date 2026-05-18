import Navbar from "@/components/Navbar";
import Entry from "@/components/Entry";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />
      <Entry />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
    </main>
  );
}
