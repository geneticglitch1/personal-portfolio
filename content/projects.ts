/**
 * Card data. Deliberately lean.
 *
 * The card is the whole story — there is no detail view, no dossier, no
 * expandable row — so this file carries only what a card renders. The
 * long-form writing lives in content/archive.ts, which nothing imports, so it
 * stays in the repo without shipping in the payload.
 *
 * `diagram` keys into components/diagrams. Every project has one: the drawing
 * is what does the persuading, not the sentence above it.
 */

export interface ProjectLinks {
  github?: string;
  live?: string;
  /** Shown when the source can't be published. The card then isn't clickable. */
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
    desc: "Hosts a web server from my house on the public internet without ever exposing my home IP.",
    metric: { value: "1", label: "port open · nothing else surfaces" },
    tags: ["WireGuard", "Docker", "Cloudflare"],
    links: { note: "Private — infrastructure for my own network" },
    diagram: "periscope",
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    year: "2026",
    cat: "Infrastructure",
    desc: "An LLM agent that runs my homelab from one sentence and can't touch anything destructive without a dry run.",
    metric: { value: "0", label: "state changes without a confirm" },
    tags: ["Python", "Agent SDK", "MCP"],
    links: {
      github: "https://github.com/geneticglitch1/Sentinel",
      live: "https://sentinel.aryan-singh.dev/",
    },
    diagram: "sentinel",
  },
  {
    slug: "trading-agent",
    name: "Overnight Trading Agent",
    year: "2026",
    cat: "AI / ML",
    desc: "Four LLM personas share one local model overnight; a risk layer in code decides what actually gets ordered.",
    metric: { value: "4", label: "books, one model, one hard stop" },
    tags: ["Python", "MLX", "Alpaca"],
    links: { github: "https://github.com/geneticglitch1/trading-agent" },
    diagram: "trading",
  },
  {
    slug: "gpt2-cuda",
    name: "GPT-2 Inference Engine in CUDA",
    year: "2026",
    cat: "AI / ML",
    desc: "Every GPT-2 layer hand-written in CUDA with no PyTorch underneath. 250 ms a forward pass down to 10.",
    metric: { value: "24.2×", label: "forward-pass speedup" },
    tags: ["CUDA", "C++17", "CUTLASS"],
    links: {
      live: "https://gpt2.aryan-singh.dev/",
      note: "ECE 408 — source private per UIUC honor code",
    },
    diagram: "cuda",
  },
  {
    slug: "fpga-scheduler",
    name: "Hardware Job Scheduler",
    year: "2025",
    cat: "Hardware",
    desc: "Moved a Linux job scheduler off the CPU and onto a Xilinx Alveo U55C. Throughput doubled.",
    metric: { value: "2×", label: "throughput vs. the CPU baseline" },
    tags: ["C++", "Alveo U55C", "FPGA"],
    links: { note: "UIC internship — source is private" },
    diagram: "fpga",
  },
  {
    slug: "media-stack",
    name: "VPN-Gated Media Stack",
    year: "2026",
    cat: "Infrastructure",
    desc: "A download client and its automation suite with no route to the internet except through a VPN kill-switch.",
    metric: { value: "0", label: "packets leak if the tunnel drops" },
    tags: ["Gluetun", "Docker", "*arr"],
    links: { note: "Private — infrastructure for my own network" },
    diagram: "mediastack",
  },
  {
    slug: "malloc",
    name: "Custom Memory Allocator",
    year: "2025",
    cat: "Systems",
    desc: "A malloc and free written from scratch in C that beat the glibc allocator on the course benchmark.",
    metric: { value: "O(1)", label: "coalescing, address-ordered list" },
    tags: ["C", "POSIX", "sbrk"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "malloc",
  },
  {
    slug: "minecraft-craftdeck",
    name: "Minecraft Server + CraftDeck",
    year: "2026",
    cat: "Infrastructure",
    desc: "A Fabric server for friends plus the ops panel I got tired of not having.",
    tags: ["Next.js", "Docker", "RCON"],
    links: { github: "https://github.com/geneticglitch1/minecraft" },
    diagram: "craftdeck",
  },
  {
    slug: "k3s-homelab",
    name: "K3s Home Lab Cluster",
    year: "2024 —",
    cat: "Infrastructure",
    desc: "Six K3s nodes on Proxmox in my apartment, reconciled from Git. Everything on this site runs on them.",
    metric: { value: "6", label: "nodes, no public IP among them" },
    tags: ["K3s", "Proxmox", "Longhorn"],
    links: {},
    diagram: "k3s",
  },
  {
    slug: "socratic",
    name: "Socratic Code Companion",
    year: "2026",
    cat: "Tooling",
    desc: "A VS Code reviewer that asks one question instead of writing the fix, on a model that can't reach the network.",
    tags: ["TypeScript", "VS Code", "MLX"],
    links: { github: "https://github.com/geneticglitch1/socratic" },
    diagram: "socratic",
  },
  {
    slug: "stint-studio",
    name: "Stint Studio",
    year: "2026",
    cat: "Mobile",
    desc: "An iOS drive logger that records raw stints and never auto-merges them — you assemble the trips.",
    tags: ["Swift", "SwiftData", "MapKit"],
    links: { github: "https://github.com/geneticglitch1/stint-studio" },
    diagram: "stint",
  },
  {
    slug: "envsync",
    name: "EnvSync",
    year: "2026",
    cat: "Full Stack",
    desc: "A secret manager that encrypts on your machine and ships the server nothing but ciphertext.",
    tags: ["Rust", "Spring Boot", "AES-GCM"],
    links: { github: "https://github.com/geneticglitch1/EnvSync" },
    diagram: "envsync",
  },
  {
    slug: "schema",
    name: "Schema — Document Search",
    year: "2026",
    cat: "AI / ML",
    desc: "RAG over your own PDFs so the model cites real passages instead of inventing them. Handwriting included.",
    tags: ["FastAPI", "pgvector", "CUDA"],
    links: {},
    diagram: "schema",
  },
  {
    slug: "journaling",
    name: "AI Journaling Platform",
    year: "2025",
    cat: "Full Stack",
    desc: "Reads your webcam and your calendar, then writes a reflection prompt that fits the day you actually had.",
    tags: ["Next.js", "FastAPI", "MediaPipe"],
    links: {},
    diagram: "journaling",
  },
  {
    slug: "urban-analytics",
    name: "Pathway to Improved Cities",
    year: "2025",
    cat: "AI / ML",
    desc: "Models trained on a few million Chicago records to flag which neighbourhoods get shorted on services.",
    tags: ["XGBoost", "PySAL", "Streamlit"],
    links: {},
    diagram: "urban",
  },
  {
    slug: "nonstop-networking",
    name: "Nonstop Networking",
    year: "2025",
    cat: "Systems",
    desc: "An epoll server in C holding any number of connections on one thread — a state machine per socket.",
    tags: ["C", "epoll", "TCP"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "epoll",
  },
  {
    slug: "parallel-make",
    name: "Parallel Make",
    year: "2025",
    cat: "Systems",
    desc: "A multi-threaded make: parse the Makefile into a DAG, then run everything that isn't waiting.",
    tags: ["C", "pthreads", "DAG"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "make",
  },
  {
    slug: "sshell",
    name: "sshell — POSIX Shell",
    year: "2025",
    cat: "Systems",
    desc: "Pipes, redirection, && and ||, job control — with a tokenizer and parser written by hand.",
    tags: ["C", "POSIX", "signals"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "shell",
  },
  {
    slug: "finding-filesystems",
    name: "Finding Filesystems",
    year: "2025",
    cat: "Systems",
    desc: "Walks a raw ext2 image straight off the disk bytes, without asking the kernel anything.",
    tags: ["C", "ext2", "on-disk"],
    links: { note: "UIUC honor code — source is private" },
    diagram: "ext2",
  },
  {
    slug: "maze-robot",
    name: "Autonomous Maze Solver",
    year: "2024",
    cat: "Hardware",
    desc: "A dual-core Pi Pico maze robot. Giving every sensor its own core is what stopped it crashing.",
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
    desc: "Pulls the hidden text out of a PDF: invisible layers, white-on-white runs, strings buried in metadata.",
    tags: ["TypeScript", "PDF.js", "OCR"],
    links: { github: "https://github.com/geneticglitch1/XRayPDF" },
    diagram: "xray",
  },
  {
    slug: "seafile-mtls",
    name: "Seafile + mTLS",
    year: "2026",
    cat: "Infrastructure",
    desc: "A Seafile desktop-client fork that presents a client certificate on every handshake.",
    tags: ["C++", "Qt", "OpenSSL"],
    links: { github: "https://github.com/geneticglitch1/seafile-client" },
    diagram: "mtls",
  },
  {
    slug: "mnist-java",
    name: "Digit Net From Scratch",
    year: "2024",
    cat: "AI / ML",
    desc: "An MNIST network in Java with no ML library and no autograd. Backprop written out by hand.",
    tags: ["Java", "MNIST", "SGD"],
    links: {},
    diagram: "mnist",
  },
];
