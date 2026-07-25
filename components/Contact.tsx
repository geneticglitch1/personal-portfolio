"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { PROFILE, CONTACT_LINKS } from "@/content/profile";

/**
 * Contact is the call to action, so nothing here is hidden by default.
 *
 * The previous version revealed the heading with a timed mask (translateY 110%
 * inside an overflow-hidden line box) and the links behind a scrubbed clip. Any
 * failure to run that animation — a backgrounded tab, a throttled frame loop —
 * left the heading and the contact details invisible with no way to recover.
 *
 * Everything now renders visible. The only motion is a rule that draws itself
 * under the heading, which is additive: if it never runs, you get a plain rule
 * instead of missing content.
 */
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <span className="lbl red">07 / Contact</span>

        <div className="contact-headwrap" ref={ref}>
          <h2 className="contact-head">
            {PROFILE.contactHead.map((line) => (
              <span className="ln" key={line}>
                {line}
              </span>
            ))}
          </h2>
          <motion.i
            className="rule"
            aria-hidden="true"
            style={reduced ? undefined : { scaleX }}
          />
        </div>

        <div className="maillabel">
          <div className="ml-l">
            <div className="ml-rows">
              {CONTACT_LINKS.map((l) => (
                <a
                  className="c-link"
                  key={l.key}
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="k">{l.key}</span>
                  <span className="v">{l.value} →</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footline">
          <span className="lbl">
            © 2026 · {PROFILE.name.first} {PROFILE.name.last}
          </span>
          <span className="lbl">Built and deployed from my own cluster</span>
        </div>
      </div>
    </section>
  );
}
