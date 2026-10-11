import { CONTACT_LINKS } from "@/content/profile";
import { RESUME_PDF } from "@/content/resume";

export default function ContactLinks({ className }: { className: string }) {
  return (
    <div className={className}>
      {CONTACT_LINKS.map((link) => {
        const resume = link.href === RESUME_PDF;
        return (
          <a
            className="c-link"
            key={link.key}
            href={link.href}
            {...(resume ? { "data-resume": "" } : {})}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="k">{link.key}</span>
            <span className="v">
              {resume ? "View résumé" : link.value}
              <span className="arw" aria-hidden="true">↗</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
