import { SPREADS } from "@/content/spreads";
import Spread from "@/components/spreads/Spread";
import {
  TopBar,
  Opening,
  IndexList,
  Experience,
  About,
  Contact,
} from "@/components/spreads/Sections";

export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Opening />
        <div id="work">
          {SPREADS.map((s, i) => (
            <Spread key={s.slug} meta={s} n={i + 1} />
          ))}
        </div>
        <IndexList />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}
