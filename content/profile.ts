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
  research?: {
    title: string;
    href: string;
    citation: string;
    summary: string;
    results: { value: string; label: string }[];
  };
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
  role: "Software & Systems Engineer",

  specs: [
    { k: "Focus", v: "Software & systems" },
    { k: "Depth", v: "Full stack · Linux · FPGA · DevOps" },
    { k: "Location", v: "Champaign · Chicago, IL" },
    { k: "Status", v: "Open to 2027 internships" },
  ],

  about:
    "I'm studying Computer Science and Mathematics at UIUC, graduating in 2028. I work on full stack applications, Linux infrastructure, and low level systems in C/C++, CUDA, and FPGA research. I also operate websites and projects serving 30K+ monthly unique visitors and over a million requests per month. I enjoy understanding how things work and making them reliable.",

  education: [
    { k: "School", v: "UIUC" },
    { k: "Degree", v: "B.S. CS & Mathematics" },
    { k: "Graduating", v: "May 2028" },
    { k: "Focus", v: "Software · Systems · HPC" },
  ],

  memberships: ["ACM at UIUC", "SIGCHI", "SIG AIDA"],

  contactHead: ["Get in", "touch."],
} as const;

export const EXPERIENCE: ExperienceRecord[] = [
  {
    org: "University of Illinois Chicago",
    role: "Undergraduate Researcher",
    dates: "August 2025 — Present",
    location: "Chicago, IL",
    type: "Research · Prof. Debjit Pal's group",
    headline:
      "HPC scheduling across software and FPGA hardware.",
    bullets: [
      "Coauthored BoostedSOSA, a dual-FPGA scheduler that uses ML predictions of job runtime. The team's evaluation reports up to 63.85% lower prediction error than user estimates and an average 17× speedup over an AVX-optimized software baseline.",
      "Currently implementing two zero-copy, lock-free host–FPGA ring buffers to replace flag polling and reduce PCIe handoff overhead. The integration is still in progress.",
    ],
    research: {
      title:
        "BoostedSOSA: Accelerated Inferencing for Low Variance Stochastic Online Scheduling",
      href: "https://arxiv.org/html/2608.25346v1",
      citation:
        "Adam H. Ross, Riccardo Revalor, Aryan Singh, Ayush Jain, and Debjit Pal · arXiv preprint, August 2026",
      summary:
        "The team's dual-FPGA architecture combines XGBoost runtime prediction with hardware scheduling for HPC workloads.",
      results: [
        { value: "17×", label: "average speedup over the AVX-optimized software baseline" },
        { value: "63.85%", label: "lower prediction error than user estimates, at best" },
      ],
    },
  },
  {
    org: "University of Illinois Chicago",
    role: "Software Engineering Intern",
    dates: "May 2025 — August 2025",
    location: "Chicago, IL",
    type: "Internship",
    headline:
      "From batch I/O to a continuous scheduling pipeline.",
    bullets: [
      "Converted an FPGA scheduler from batch-oriented I/O into a free-running streaming pipeline, so jobs could be scheduled as they arrived.",
      "Built nonblocking Vitis HLS Reader/Writer kernels and multithreaded C++/XRT host I/O for continuous job dispatch.",
      "Designed and verified the systolic scheduling datapath, virtual FIFO, and cost calculator with roughly 1,100 lines of Monte Carlo-driven Vitis HLS tests on an Alveo U55C.",
    ],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    tags: ["C", "C++", "Python", "TypeScript", "Bash", "Rust", "Java", "Swift", "CUDA", "SQL"],
  },
  {
    label: "Full stack & data",
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
    ],
  },
  {
    label: "Linux & HPC",
    tags: [
      "Linux",
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
      "Vitis HLS",
      "XRT",
      "FPGA offload",
      "Zero-copy pipelines",
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
      "Ansible",
      "Jenkins",
      "CI/CD",
      "Prometheus",
      "Grafana",
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
      "XGBoost",
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
];

export const AWARDS: Award[] = [
  {
    rank: "1st",
    title: "CS 341 Malloc Performance Contest",
    detail: "Top-performing memory allocator among 400 students.",
    year: "2025",
  },
  {
    rank: "4th",
    title: "UIUC Capture-the-Flag — Advanced Track",
    detail: "Fourth place in the advanced track of UIUC CTF.",
    year: "2026",
  },
  {
    rank: "3rd",
    title: "UIUC Capture-the-Flag (CTF)",
    detail: "Third place at UIUC CTF.",
    year: "2025",
  },
  {
    rank: "5th",
    title: "Science Olympiad — Robot Tour",
    detail: "Autonomous Pi Pico maze robot; 5th of 50 schools at UIUC State Science Olympiad.",
    year: "2024",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { key: "Email", value: "s.aryan0328@gmail.com", href: "mailto:s.aryan0328@gmail.com" },
  { key: "University email", value: "asing271@illinois.edu", href: "mailto:asing271@illinois.edu" },
  {
    key: "GitHub",
    value: "github.com/geneticglitch1",
    href: "https://github.com/geneticglitch1",
    external: true,
  },
  {
    key: "LinkedIn",
    value: "linkedin.com/in/aryan-singh06",
    href: "https://linkedin.com/in/aryan-singh06",
    external: true,
  },
  { key: "Résumé", value: "View / download PDF", href: "/resume.pdf", external: true },
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
