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

  lead:
    "I work under the abstraction — CUDA kernels, allocators, a job scheduler I moved onto an FPGA — and on the infrastructure that keeps all of it fed.",

  specs: [
    { k: "Focus", v: "Systems engineering" },
    { k: "Depth", v: "CUDA · FPGA · Infrastructure · Full stack" },
    { k: "Location", v: "Champaign · Chicago, IL" },
    { k: "Status", v: "Open to 2026 internships" },
  ],

  about:
    "CS and Math at UIUC, graduating May 2027. I like taking a problem apart and making it faster underneath the abstraction — that's what pulled me into systems programming in C, then CUDA, then a summer spent moving an OS job scheduler onto an FPGA. Around the same time I got into self-hosting and networking, which grew into a six-node cluster I run at home and the CI that deploys onto it. Lately I've been running local models and building agentic workflows on top of them. Everything on this site runs on that cluster.",

  education: [
    { k: "School", v: "UIUC" },
    { k: "Degree", v: "B.S. CS & Mathematics" },
    { k: "Graduating", v: "May 2027" },
    { k: "Focus", v: "Systems · HPC" },
  ],

  memberships: ["ACM at UIUC", "SIGCHI", "SIG AIDA"],

  contactHead: ["Get in", "touch."],
} as const;

export const EXPERIENCE: ExperienceRecord[] = [
  {
    org: "University of Illinois Chicago",
    role: "Systems Engineer",
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
      "Jenkins",
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
    rank: "4th",
    title: "UIUC Capture-the-Flag (CTF)",
    detail: "Binary exploitation, reversing, crypto, and web — 4th of 25+ teams.",
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

export const SECTIONS = [
  { n: "01", id: "work", label: "Work" },
  { n: "02", id: "index", label: "Index" },
  { n: "03", id: "experience", label: "Experience" },
  { n: "04", id: "skills", label: "Skills" },
  { n: "05", id: "recognition", label: "Recognition" },
  { n: "06", id: "about", label: "About" },
  { n: "07", id: "contact", label: "Contact" },
] as const;
