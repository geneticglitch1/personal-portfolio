import { AWARDS, EXPERIENCE, PROFILE, SKILLS } from "@/content/profile";
import { PROJECTS } from "@/content/projects";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/content/site";

/**
 * JSON-LD for the one page there is.
 *
 * Built from content/, never written out by hand, so the markup cannot drift
 * from what the page actually renders. Everything lives in a single @graph
 * with @id cross-references rather than three separate script tags — parsers
 * resolve the references, and it keeps the Person defined once.
 *
 * The types earn their bytes: Person and ProfilePage are what a knowledge
 * panel is assembled from, and the project ItemList is the only structured
 * form of the work that exists — the page itself renders it as 23 drawings.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;
const PAGE_ID = `${SITE_URL}/#webpage`;

const GITHUB = "https://github.com/geneticglitch1";
const LINKEDIN = "https://linkedin.com/in/aryan-singh06";
const EMAIL = "asing271@illinois.edu";

/** Every skill tag, deduped — SKILLS repeats CUDA across two groups. */
const knowsAbout = [...new Set(SKILLS.flatMap((group) => group.tags))];

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** "May 2025" → "2025-05". Anything unparseable (e.g. "Present") → null. */
function toIsoMonth(part: string): string | null {
  const m = part.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS.indexOf(m[1].toLowerCase());
  if (month < 0) return null;
  return `${m[2]}-${String(month + 1).padStart(2, "0")}`;
}

/**
 * Splits the human-facing "May 2025 — August 2025" that profile.ts stores for
 * display. An ongoing role has no parseable end, and schema.org reads a
 * missing endDate as current, which is the behaviour we want anyway.
 */
function parseDateRange(dates: string): [string | null, string | null] {
  const [start, end] = dates.split(/\s*[—–-]\s*/);
  return [toIsoMonth(start ?? ""), toIsoMonth(end ?? "")];
}

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: `${PROFILE.name.first} ${PROFILE.name.last}`,
      givenName: PROFILE.name.first,
      familyName: PROFILE.name.last,
      jobTitle: PROFILE.role,
      description: PROFILE.lead,
      url: SITE_URL,
      image: `${SITE_URL}/icon-512.png`,
      email: `mailto:${EMAIL}`,
      sameAs: [GITHUB, LINKEDIN],
      knowsAbout,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Champaign",
        addressRegion: "IL",
        addressCountry: "US",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Illinois Urbana-Champaign",
        sameAs: "https://illinois.edu",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: "Bachelor of Science",
        about: "Computer Science and Mathematics",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "University of Illinois Urbana-Champaign",
        },
      },
      memberOf: PROFILE.memberships.map((name) => ({
        "@type": "Organization",
        name,
      })),
      award: AWARDS.map((a) => `${a.rank} — ${a.title} (${a.year}). ${a.detail}`),
      // schema.org's Role pattern: the wrapper repeats the property name it
      // sits under, so worksFor holds a role which itself holds the org.
      worksFor: EXPERIENCE.map((role) => {
        const [start, end] = parseDateRange(role.dates);
        return {
          "@type": "OrganizationRole",
          roleName: role.role,
          description: role.headline,
          ...(start && { startDate: start }),
          ...(end && { endDate: end }),
          worksFor: { "@type": "Organization", name: role.org },
        };
      }),
      seeks: {
        "@type": "Demand",
        name: "Software engineering internship, Summer 2027",
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": PERSON_ID },
      author: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": PAGE_ID,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "en-US",
      primaryImageOfPage: `${SITE_URL}/og.png`,
      significantLink: [GITHUB, LINKEDIN, `${SITE_URL}/resume.pdf`],
      hasPart: {
        "@type": "ItemList",
        name: "Projects",
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.desc,
            dateCreated: project.year.replace(/\D.*$/, ""),
            keywords: project.tags.join(", "),
            genre: project.cat,
            author: { "@id": PERSON_ID },
            ...(project.links.github && { codeRepository: project.links.github }),
            ...(project.links.live && { url: project.links.live }),
          },
        })),
      },
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` is what stops a stray "</script" inside any of the
      // content strings from closing this tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
