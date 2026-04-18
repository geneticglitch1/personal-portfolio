"use client";

import { profile } from "@/content/profile";

const CATEGORY_KEY: Record<string, string> = {
  Languages: "languages",
  Frameworks: "frameworks",
  Databases: "databases",
  "AI / ML": "ai_ml",
  Infrastructure: "infrastructure",
  Tools: "tools",
};

export function Skills() {
  const entries = Object.entries(profile.skills) as [string, readonly string[]][];

  return (
    <section
      id="skills"
      className="relative px-6 md:px-12 pt-32 pb-24 border-t hairline"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-start gap-4">
            <span className="mono-meta leading-none pt-1.5">04</span>
            <span className="eyebrow">Stack / typedef</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-5">
          <div className="font-mono text-[12px] md:text-[13px] leading-[1.9] text-[color:var(--color-bone-2)] bg-[color:var(--color-ink-2)]/60 border hairline rounded-lg p-6 md:p-8 overflow-x-auto">
            <div className="text-[color:var(--color-muted)]">
              {"/* ~/include/aryan.h — skills, ordered by depth */"}
            </div>
            <div className="mt-4">
              <span className="text-[color:var(--color-alloc)]">typedef</span>{" "}
              <span className="text-[color:var(--color-alloc)]">struct</span>{" "}
              {"{"}
            </div>

            {entries.map(([group, items]) => {
              const key =
                CATEGORY_KEY[group] ??
                group.toLowerCase().replace(/\W+/g, "_");
              return (
                <div key={group} className="mt-3 pl-6">
                  <div className="text-[color:var(--color-muted)]">
                    {"/* "}
                    {group}
                    {" */"}
                  </div>
                  <div className="mt-1">
                    <span className="text-[color:var(--color-split)]">
                      const char* const
                    </span>{" "}
                    <span className="text-[color:var(--color-bone)]">
                      {key}
                    </span>
                    <span className="text-[color:var(--color-muted)]">
                      [{items.length}]
                    </span>{" "}
                    = {"{"}
                  </div>
                  <div className="pl-6 flex flex-wrap gap-x-1 gap-y-0.5">
                    {items.map((item, i) => (
                      <span key={item}>
                        <span className="text-[color:var(--color-alloc-2)]">
                          &quot;{item}&quot;
                        </span>
                        {i < items.length - 1 && (
                          <span className="text-[color:var(--color-muted)]">
                            ,{" "}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div>{"};"}</div>
                </div>
              );
            })}

            <div className="mt-4">
              {"} "}
              <span className="text-[color:var(--color-bone)]">
                aryan_skills_t
              </span>
              ;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
