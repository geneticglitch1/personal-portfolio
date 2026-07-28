import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Recognition from "@/components/Recognition";
import About from "@/components/About";
import Contact from "@/components/Contact";
import InkSpine from "@/components/motion/InkSpine";
import { DiagramDefs } from "@/components/diagrams";

export default function Page() {
  return (
    <>
      <Nav />
      {/* Arrowheads for all 23 drawings, defined once. */}
      <DiagramDefs />
      <main>
        <InkSpine />
        <Hero />
        <ProjectGrid />
        <Experience />
        <Skills />
        <Recognition />
        <About />
        <Contact />
      </main>
    </>
  );
}
