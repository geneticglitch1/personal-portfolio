/**
 * Card data. Deliberately lean.
 *
 * The card is the whole story — there is no detail view, no dossier, no
 * expandable row — so this file carries only what a card renders. The
 * long-form writing lives in content/archive.ts, which nothing imports, so it
 * stays in the repo without shipping in the payload.
 *
 * `diagram` keys into components/diagrams and is rendered on featured cards.
 */

export interface ProjectLinks {
  github?: string;
  live?: string;
  /** Short availability note, for example when course source is private. */
  note?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  cat: Category;
  /** One line. Around fifteen words. Never two sentences. */
  desc: string;
  metric?: ProjectMetric;
  /** Exactly three. */
  tags: [string, string, string];
  links: ProjectLinks;
  diagram: string;
  /**
   * Flagship. Renders as an open card — the drawing included. Everything else
   * renders closed: the same facts, no figure.
   */
  featured?: true;
}

export type Category =
  | "Infrastructure"
  | "Systems"
  | "AI / ML"
  | "Hardware"
  | "Full Stack"
  | "Tooling"
  | "Mobile";

export const CATEGORIES: Category[] = [
  "Infrastructure",
  "Systems",
  "AI / ML",
  "Hardware",
  "Full Stack",
  "Tooling",
  "Mobile",
];

export const PROJECTS: Project[] = [
  {
    slug: "periscope",
    name: "Periscope",
    year: "2026",
    cat: "Infrastructure",
    desc: "Publishes self-hosted web services through a VPN exit and reverse proxy, keeping the home IP private.",
    metric: { value: "1", label: "public service port" },
    tags: ["WireGuard", "Docker", "Cloudflare"],
    links: { note: "Private — infrastructure for my own network" },
    diagram: "periscope",
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    year: "2026",
    cat: "Infrastructure",
    desc: "An assistant for homelab administration, with dry-run previews and confirmation before infrastructure changes.",
    metric: { value: "Dry run", label: "review changes before execution" },
    tags: ["Python", "Agent SDK", "MCP"],
    links: {
      github: "https://github.com/geneticglitch1/Sentinel",
      live: "https://sentinel.aryan-singh.dev/",
    },
    diagram: "sentinel",
    featured: true,
  },
  {
    slug: "vega",
    name: "Vega",
    year: "2026",
    cat: "AI / ML",
    desc: "A local-model trading experiment with four research personas and a separate risk-control layer.",
    metric: { value: "4", label: "personas with separate portfolios" },
    tags: ["Python", "MLX", "Alpaca"],
    links: { github: "https://github.com/geneticglitch1/trading-agent" },
    diagram: "trading",
  },
  {
    slug: "gpt2-cuda",
    name: "GPT-2 Inference Engine in CUDA",
    year: "2026",
    cat: "AI / ML",
    desc: "Built with a four-person team; my work included FlashAttention-2, memory tiling, and CUDA kernel profiling.",
    metric: { value: "24.2×", label: "team end-to-end speedup on A40" },
    tags: ["CUDA", "C++17", "CUTLASS"],
    links: {
      live: "https://gpt2.aryan-singh.dev/",
      note: "ECE 408 — source private per UIUC honor code",
    },
    diagram: "cuda",
    featured: true,
  },
  {
    slug: "fpga-scheduler",
    name: "FPGA Scheduling Research",
    year: "2025 —",
    cat: "Hardware",
    desc: "Host–FPGA pipeline for hardware scheduling; implementing a zero-copy ring-buffer interface.",
    tags: ["C++ / XRT", "Vitis HLS", "Alveo U55C"],
    links: {
      live: "https://arxiv.org/html/2608.25346v1",
      note: "Research source private · co-authored paper available",
    },
    diagram: "fpga",
    featured: true,
  },
  {
    slug: "media-stack",
    name: "VPN-Gated Media Stack",
    year: "2026",
    cat: "Infrastructure",
    desc: "Containerized media services with outbound traffic routed through a VPN and protected by a kill-switch.",
    metric: { value: "VPN", label: "outbound traffic gated by the tunnel" },
    tags: ["Gluetun", "Docker", "*arr"],
    links: { note: "Private — infrastructure for my own network" },
    diagram: "mediastack",
  },
  {
    slug: "malloc",
    name: "Custom Memory Allocator",
    year: "2025",
    cat: "Systems",
    desc: "A C allocator with address-sorted free lists, coalescing, and in-place realloc growth, built for CS 341.",
    metric: { value: "1st", label: "of 400 · CS 341 Malloc Contest" },
    tags: ["C", "POSIX", "sbrk"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "malloc",
    featured: true,
  },
  {
    slug: "minecraft-craftdeck",
    name: "Minecraft Server + CraftDeck",
    year: "2026",
    cat: "Infrastructure",
    desc: "A Fabric server for friends with a Next.js operations panel for server management.",
    tags: ["Next.js", "Docker", "RCON"],
    links: { github: "https://github.com/geneticglitch1/minecraft" },
    diagram: "craftdeck",
  },
  {
    slug: "k3s-homelab",
    name: "K3s Home Lab Cluster",
    year: "2024 —",
    cat: "Infrastructure",
    desc: "Self-hosted services across two Linux hosts and a three-node HA K3s cluster, with automated deployment and monitoring.",
    metric: { value: "3", label: "HA K3s nodes on Proxmox" },
    tags: ["K3s / Proxmox", "Ansible", "Jenkins"],
    links: {},
    diagram: "k3s",
  },
  {
    slug: "socratic",
    name: "Socratic Code Companion",
    year: "2026",
    cat: "Tooling",
    desc: "A VS Code companion that uses a local model to guide code review through questions.",
    tags: ["TypeScript", "VS Code", "MLX"],
    links: { github: "https://github.com/geneticglitch1/socratic" },
    diagram: "socratic",
  },
  {
    slug: "stint-studio",
    name: "Stint Studio",
    year: "2026",
    cat: "Mobile",
    desc: "An iOS drive logger with recorded stints, map views, and manual trip assembly.",
    tags: ["Swift", "SwiftData", "MapKit"],
    links: { github: "https://github.com/geneticglitch1/stint-studio" },
    diagram: "stint",
    featured: true,
  },
  {
    slug: "envsync",
    name: "EnvSync",
    year: "2026",
    cat: "Full Stack",
    desc: "Encrypted .env sharing for my ACM team, with a Rust CLI, version history, and a Next.js dashboard.",
    tags: ["Rust", "Spring Boot", "Next.js"],
    links: { github: "https://github.com/geneticglitch1/EnvSync" },
    diagram: "envsync",
    featured: true,
  },
  {
    slug: "freeway",
    name: "Freeway",
    year: "2026",
    cat: "Full Stack",
    desc: "A self-hosted LLM gateway with one API for 12 providers, caching, failover, and quota management.",
    metric: { value: "80%", label: "fewer paid calls · 184-request benchmark" },
    tags: ["TypeScript", "Node.js", "SQLite"],
    links: { github: "https://github.com/geneticglitch1/freeway" },
    diagram: "schema",
  },
  {
    slug: "schema",
    name: "Schema — Document Search",
    year: "2026",
    cat: "AI / ML",
    desc: "Document search over PDFs and handwritten notes, with retrieved passages supporting model responses.",
    tags: ["FastAPI", "pgvector", "CUDA"],
    links: {},
    diagram: "schema",
  },
  {
    slug: "journaling",
    name: "AI Journaling Platform",
    year: "2025",
    cat: "Full Stack",
    desc: "A journaling application that combines calendar context and webcam analysis to suggest reflection prompts.",
    tags: ["Next.js", "FastAPI", "MediaPipe"],
    links: {},
    diagram: "journaling",
  },
  {
    slug: "urban-analytics",
    name: "Pathway to Improved Cities",
    year: "2025",
    cat: "AI / ML",
    desc: "Urban-data analysis using machine learning and spatial methods to explore disparities in Chicago services.",
    tags: ["XGBoost", "PySAL", "Streamlit"],
    links: {},
    diagram: "urban",
  },
  {
    slug: "nonstop-networking",
    name: "Nonstop Networking",
    year: "2025",
    cat: "Systems",
    desc: "A C epoll server supporting thousands of concurrent TCP clients with nonblocking per-connection state machines.",
    tags: ["C", "epoll", "TCP"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "epoll",
  },
  {
    slug: "parallel-make",
    name: "Parallel Make",
    year: "2025",
    cat: "Systems",
    desc: "A multithreaded make implementation that schedules build dependencies using a DAG, mutexes, and condition variables.",
    tags: ["C", "pthreads", "DAG"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "make",
  },
  {
    slug: "sshell",
    name: "sshell — POSIX Shell",
    year: "2025",
    cat: "Systems",
    desc: "A POSIX shell in C with command parsing, redirection, signal handling, and process management.",
    tags: ["C", "POSIX", "signals"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "shell",
  },
  {
    slug: "finding-filesystems",
    name: "Finding Filesystems",
    year: "2025",
    cat: "Systems",
    desc: "A filesystem reader in C that traverses directories and files directly from a raw ext2 image.",
    tags: ["C", "ext2", "on-disk"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "ext2",
  },
  {
    slug: "maze-robot",
    name: "Autonomous Maze Solver",
    year: "2024",
    cat: "Hardware",
    desc: "A Raspberry Pi Pico maze-solving robot built in C/C++, with sensor integration and dual-core processing.",
    tags: ["C / C++", "Pi Pico", "Sensors"],
    links: {
      github: "https://github.com/geneticglitch/Autonomous-self-driving-robot",
    },
    diagram: "pico",
  },
  {
    slug: "xraypdf",
    name: "XRayPDF",
    year: "2026",
    cat: "Tooling",
    desc: "A PDF inspection tool for hidden text layers, low-contrast content, and text stored in metadata.",
    tags: ["TypeScript", "PDF.js", "OCR"],
    links: { github: "https://github.com/geneticglitch1/XRayPDF" },
    diagram: "xray",
  },
  {
    slug: "seafile-mtls",
    name: "Seafile + mTLS",
    year: "2026",
    cat: "Infrastructure",
    desc: "A Seafile desktop-client fork with client-certificate support for mutual TLS authentication.",
    tags: ["C++", "Qt", "OpenSSL"],
    links: { github: "https://github.com/geneticglitch1/seafile-client" },
    diagram: "mtls",
  },
  {
    slug: "mnist-java",
    name: "Digit Net From Scratch",
    year: "2024",
    cat: "AI / ML",
    desc: "An MNIST classifier in Java, with neural-network training and backpropagation implemented from scratch.",
    tags: ["Java", "MNIST", "SGD"],
    links: {},
    diagram: "mnist",
  },
];

/**
 * Display order: the six flagships first, then the rest in their authored
 * order. `sort` is stable, so this only lifts the featured group — it doesn't
 * shuffle anything inside either half.
 */
export const ORDERED: Project[] = [...PROJECTS].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
);

export const FEATURED_COUNT = PROJECTS.filter((p) => p.featured).length;
