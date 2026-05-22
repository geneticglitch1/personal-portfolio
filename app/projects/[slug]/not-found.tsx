import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="relative px-6 md:px-12 pt-40 pb-32 min-h-[80svh]">
      <div className="max-w-[760px] mx-auto text-center">
        <div className="small-caps mb-6">404 · Project not found</div>
        <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] text-[color:var(--color-bone)]">
          That project doesn&apos;t exist.
        </h1>
        <p className="mt-6 text-[16px] leading-[1.7] text-[color:var(--color-bone-2)] max-w-[44ch] mx-auto">
          The URL is either a typo or pointing at something that was never
          here. The full project index is one click away.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
          <Link
            href="/#projects"
            className="px-4 py-2.5 border hairline-strong rounded-full text-[color:var(--color-bone)] hover:bg-[color:var(--color-bone)] hover:text-[color:var(--color-ink)] transition-colors"
          >
            View all projects →
          </Link>
          <Link
            href="/"
            className="px-4 py-2.5 border hairline rounded-full text-[color:var(--color-bone-2)] hover:border-[color:var(--color-bone-2)] hover:text-[color:var(--color-bone)] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
