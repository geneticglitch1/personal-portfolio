/**
 * Everything about the person, as opposed to the work. Single source of truth
 * for the hero, experience, skills, recognition, about and contact sections.
 */

export interface SkillGroup {
  label: string;
  tags: string[];
}

export interface ExperienceRecord {
  org: string;
  role: string;
  dates: string;
  location: string;
  type: string;
  headline: string;
  bullets: string[];
}

export interface Award {
  rank: string;
  title: string;
  detail: string;
  year: string;
}

export interface ContactLink {
  key: string;
  value: string;
  href: string;
  external?: boolean;
}

export const PROFILE = {
  name: { first: "Aryan", last: "Singh" },
  role: "Systems Engineer",

  lead: "I like working under the abstraction.",

  specs: [
    { k: "Focus", v: "Systems engineering" },
    { k: "Depth", v: "CUDA · FPGA · Infrastructure · Full stack" },
    { k: "Location", v: "Champaign · Chicago, IL" },
    { k: "Status", v: "Open to 2027 internships" },
  ],

  about:
    "CS and Math at UIUC, class of 2028. I started in C, moved to CUDA, and spent a summer moving an OS job scheduler onto an FPGA. Around then I got into self-hosting, which turned into a six-node cluster in my apartment and the CI that deploys to it. Lately I've been running local models on it. This site is served from that cluster.",

  education: [
    { k: "School", v: "UIUC" },
    { k: "Degree", v: "B.S. CS & Mathematics" },
    { k: "Graduating", v: "May 2028" },
    { k: "Focus", v: "Systems · HPC" },
  ],

  memberships: ["ACM at UIUC", "SIGCHI", "SIG AIDA"],

  contactHead: ["Get in", "touch."],
} as const;

export const EXPERIENCE: ExperienceRecord[] = [
  {
    org: "University of Illinois Chicago",
    role: "Software Engineering Intern",
    dates: "May 2025 — August 2025",
    location: "Chicago, IL",
    type: "Internship",
    headline:
      "Pulled the OS job scheduler off the CPU and onto an FPGA. Throughput doubled.",
    bullets: [
      "Put the scheduler on a Xilinx Alveo U55C. Once the FPGA owned scheduling, the host CPU stopped burning cycles babysitting work it should have just been running.",
      "The host and FPGA were copying the same data across the bus twice. Shared their physical memory instead, killed the redundant transfers, and throughput doubled.",
      "Wrote a three-thread C++ pipeline — Writer, Reader, Logger — to keep two FPGA kernels fed without stalling. Lock-free ring buffers on the hot path; mutexes only where contention didn't matter.",
      "Moved the task queue into hardware so urgent jobs skip the OS scheduler entirely. Latency dropped to microseconds.",
    ],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    tags: ["C", "C++", "Rust", "Python", "Java", "TypeScript", "Swift", "CUDA", "SQL"],
  },
  {
    label: "Systems & HPC",
    tags: [
      "CUDA",
      "CUTLASS",
      "Tensor Cores",
      "FlashAttention",
      "cuBLAS",
      "Nsight Systems",
      "Nsight Compute",
      "pthreads",
      "epoll",
      "Lock-free structures",
      "POSIX",
    ],
  },
  {
    label: "Hardware & FPGA",
    tags: [
      "Xilinx Alveo U55C",
      "FPGA offload",
      "Shared physical memory",
      "PCIe",
      "Raspberry Pi Pico",
      "Embedded C",
      "Sensor interfacing",
    ],
  },
  {
    label: "Infrastructure & DevOps",
    tags: [
      "K3s",
      "Docker",
      "Proxmox",
      "Komodo",
      "OPNsense",
      "WireGuard",
      "Traefik",
      "Longhorn",
      "Cloudflare",
      "Fleet",
      "Keycloak",
      "Tailscale",
    ],
  },
  {
    label: "AI / ML",
    tags: [
      "PyTorch",
      "Transformers",
      "Hugging Face",
      "Claude Agent SDK",
      "MCP",
      "LangGraph",
      "RAG",
      "MLX",
      "vLLM",
      "Ollama",
      "OpenCV",
      "TrOCR",
    ],
  },
  {
    label: "Web & Data",
    tags: [
      "Next.js",
      "React",
      "FastAPI",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "Supabase",
      "NumPy",
      "Pandas",
      "XGBoost",
    ],
  },
];

export const AWARDS: Award[] = [
  {
    rank: "1st",
    title: "CS 341 Malloc Performance Contest",
    detail: "Beat both stock and optimized glibc; first of roughly 400 submissions.",
    year: "2025",
  },
  {
    rank: "3rd",
    title: "UIUC Capture-the-Flag (CTF)",
    detail: "Binary exploitation, reversing, crypto, and web — 3rd of 25+ teams.",
    year: "2025",
  },
  {
    rank: "5th",
    title: "Science Olympiad — Robot Tour",
    detail: "Autonomous Pi Pico maze robot; 5th of 50 regional teams.",
    year: "2024",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { key: "Email", value: "asing271@illinois.edu", href: "mailto:asing271@illinois.edu" },
  {
    key: "GitHub",
    value: "@geneticglitch1",
    href: "https://github.com/geneticglitch1",
    external: true,
  },
  {
    key: "LinkedIn",
    value: "/in/aryan-singh06",
    href: "https://linkedin.com/in/aryan-singh06",
    external: true,
  },
  { key: "Résumé", value: "resume.pdf", href: "/resume.pdf", external: true },
];

/* The nav renders straight from this, so every entry has to name a section
   that exists. `index` used to point at the ledger, which the card grid
   replaced — the tab survived it and scrolled nowhere. */
export const SECTIONS = [
  { n: "01", id: "work", label: "Work" },
  { n: "02", id: "experience", label: "Experience" },
  { n: "03", id: "skills", label: "Skills" },
  { n: "04", id: "recognition", label: "Recognition" },
  { n: "05", id: "about", label: "About" },
  { n: "06", id: "contact", label: "Contact" },
] as const;
