import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Ledger from "@/components/Ledger";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Recognition from "@/components/Recognition";
import About from "@/components/About";
import Contact from "@/components/Contact";
import DossierProvider from "@/components/DossierProvider";
import InkSpine from "@/components/motion/InkSpine";

export default function Page() {
  return (
    <>
      <Nav />
      <DossierProvider>
        <main>
          <InkSpine />
          <Hero />
          <Work />
          <Ledger />
          <Experience />
          <Skills />
          <Recognition />
          <About />
          <Contact />
        </main>
      </DossierProvider>
    </>
  );
}
