export type ProjectSize = "L" | "M" | "S";
export type ProjectCategory =
  | "systems"
  | "fullstack"
  | "ai"
  | "hardware"
  | "infra"
  | "tool";

export interface Project {
  slug: string;
  name: string;
  year: string;
  lang: string[];
  size: ProjectSize;
  addr: string;
  bytes: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: {
    github?: string;
    live?: string;
    note?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "malloc",
    name: "High-Performance Custom Memory Allocator",
    year: "Oct 2025",
    lang: ["C"],
    size: "L",
    addr: "0x7ff0a0001000",
    bytes: "0x8000",
    category: "systems",
    tagline: "1st / 400 in the CS 341 malloc contest — beat glibc.",
    description:
      "A compact sbrk-backed memory allocator implementing malloc, calloc, realloc, and free from scratch for systems-level performance experimentation.",
    highlights: [
      "Placed 1st in the CS 341 Malloc Contest out of 400 students, achieving a 122.6 performance score compared to 114.91 for optimized glibc on the same benchmark suite (scored relative to an unoptimized glibc baseline).",
      "Outperformed the baseline across runtime and memory efficiency metrics.",
      "Designed block metadata management, an address-sorted free list with coalescing, in-place realloc growth, and fragmentation-aware splitting strategies to improve throughput and reduce memory fragmentation.",
    ],
    stack: ["C", "sbrk", "POSIX", "glibc benchmarks"],
    links: { note: "CS 341 — private per UIUC honor code" },
  },
  {
    slug: "envsync",
    name: "EnvSync",
    year: "2026",
    lang: ["TypeScript", "Rust", "Java"],
    size: "L",
    addr: "0x7ff0a0009000",
    bytes: "0x4000",
    category: "fullstack",
    tagline: "Zero-knowledge secret manager for teams that stopped trusting Slack.",
    description:
      "A full-stack secret management platform that versions, diffs, and syncs .env files across teams, eliminating secret drift and the habit of sharing credentials over Slack/Discord.",
    highlights: [
      "Designed a zero-knowledge encryption model using XSalsa20-Poly1305 and Argon2id where all secrets are encrypted client-side before leaving the machine. The server stores only ciphertext and is physically unable to read vault contents.",
      "Wrote a Rust CLI (envsync push/pull/diff/rollback) with OAuth2 device-code login, automatic token refresh, and a full snapshot history, giving developers a git-like workflow for secrets without touching the web dashboard.",
      "Automated the full deployment pipeline using Jenkins, triggering on GitHub push events to build and test the Next.js frontend, inject environment secrets, package a Docker image, and deploy to the cluster.",
    ],
    stack: [
      "Next.js",
      "Spring Boot",
      "Rust",
      "PostgreSQL",
      "Keycloak",
      "MinIO",
      "Jenkins",
    ],
    links: { github: "https://github.com/geneticglitch1/EnvSync" },
  },
  {
    slug: "gpt-2-cuda",
    name: "GPT-2 CUDA Inference Engine",
    year: "2026",
    lang: ["CUDA", "C++"],
    size: "L",
    addr: "0x7ff0a000c000",
    bytes: "0x8000",
    category: "ai",
    tagline: "High-performance forward pass of GPT-2 built entirely from scratch in CUDA.",
    description:
      "Engineered a highly optimized, complete forward pass (inference) of OpenAI's GPT-2 model using raw C++ CUDA. Specifically built custom GPU kernels for all transformer layers to maximize NVIDIA Streaming Multiprocessor occupancy and minimize global memory latency.",
    highlights: [
      "Built custom GPU kernels for the Encoder, LayerNorm, Multi-Head Self-Attention (with causal masking), Feed-Forward Networks, and GeLU activations from scratch without utilizing high-level PyTorch abstractions.",
      "Engineered deep performance tuning including joint shared memory and register tiling for MatMul, tensor-core TF32 utilization, cuBLAS integration, and highly parallelized warp-level reductions.",
      "Implemented cutting-edge architectural optimizations including a custom FlashAttention mechanism for IO-aware tiling, autoregressive KV-Caching for O(1) text generation, and CUTLASS device GEMM templates with fused epilogues to maximize memory bandwidth.",
      "Thoroughly profiled and optimized memory access patterns (coalescing, data swizzling) using Nsight Systems and Nsight Compute, achieving massive speedups over reference CPU baselines."
    ],
    stack: [
      "CUDA",
      "C++",
      "Nsight Systems",
      "Nsight Compute",
      "CUTLASS",
      "NVIDIA A40"
    ],
    links: { note: "ECE 408 — private per UIUC honor code" },
  },
  {
    slug: "schema",
    name: "Schema",
    year: "2026",
    lang: ["Python", "TypeScript"],
    size: "L",
    addr: "0x7ff0a000d000",
    bytes: "0x4000",
    category: "ai",
    tagline: "Semantic document search — rank PDFs by meaning, not keywords.",
    description:
      "A semantic document storage platform where users organize PDFs into collections and search by meaning, returning results ranked by similarity with PDF name, collection, page number, and chunk preview.",
    highlights: [
      "Designed an async ingestion pipeline with dual extraction paths (PyMuPDF for typed PDFs and TrOCR for handwritten text), chunking into overlapping sentence-aware windows and batch-embedding 64 chunks at a time via hkunlp/instructor-xl with CUDA.",
      "Deployed a FastAPI backend with Supabase JWT auth, user-scoped Actian Vector filtering, and cascading deletion across PostgreSQL, filesystem, and vector storage to prevent orphaned data.",
    ],
    stack: [
      "React",
      "FastAPI",
      "Supabase",
      "Actian Vector",
      "PyMuPDF",
      "TrOCR",
      "instructor-xl",
    ],
    links: {},
  },
  {
    slug: "homelab",
    name: "High-Availability Kubernetes Cluster",
    year: "May 2024 – Present",
    lang: ["YAML", "Shell"],
    size: "L",
    addr: "0x7ff0a0011000",
    bytes: "0x4000",
    category: "infra",
    tagline: "Self-hosted K3s cluster — 6 Proxmox VMs, 99.9% uptime.",
    description:
      "A self-hosted Kubernetes cluster running everything I ship, from photo storage to document management to this site.",
    highlights: [
      "Deployed a self-hosted Kubernetes cluster across 6 Proxmox VMs using K3s, hosting photo storage, document management, and a portfolio website with 99.9% uptime.",
      "Engineered network infrastructure with OPNsense firewall behind double NAT, configuring WAN/LAN firewall rules, hybrid outbound NAT, and WireGuard VPN for secure remote access.",
      "Configured Longhorn distributed storage for persistent volumes and Traefik ingress controller with automatic SSL certificate management.",
      "Implemented a GitOps workflow with Fleet for automated deployments across the cluster.",
    ],
    stack: [
      "K3s",
      "Proxmox",
      "OPNsense",
      "WireGuard",
      "Longhorn",
      "Traefik",
      "Fleet",
    ],
    links: {},
  },
  {
    slug: "robot-tour",
    name: "Autonomous Maze Solver: Robot Tour",
    year: "2024",
    lang: ["C", "C++"],
    size: "M",
    addr: "0x7ff0a0015000",
    bytes: "0x2000",
    category: "hardware",
    tagline: "5th / 50 at UIUC State Science Olympiad — dual-core Pi Pico, precision maze nav.",
    description:
      "A robot I built and programmed to autonomously navigate a complex maze based on pre-programmed exact distances and turns. The challenge: integrating multiple sensors and driving inexpensive yellow motors with precision neither had by default.",
    highlights: [
      'Overcame "Integration Hell" by designing a custom dual-core architecture using a Raspberry Pi Pico. Core 0 handled the primary sensor input, while Core 1 managed simultaneous interrupts from secondary sensors, preventing system crashes.',
      "Engineered a dynamic rotation algorithm that mitigated surface friction and inertia overshoots by requiring both the target gyro angle (e.g., 90 degrees) and an angular velocity of zero before terminating the turn.",
      "Implemented a C preprocessor function to convert command arrays into optimized formats for the main loop, maximizing robot speed and responsiveness.",
      "Hardware: Raspberry Pi Pico, LM393 light encoders, HC-SR04 ultrasonic sensors, TB6612 motor driver, MP1584 voltage regulator, HC-05 Bluetooth module for wireless testing.",
    ],
    stack: [
      "C/C++",
      "Raspberry Pi Pico",
      "LM393",
      "HC-SR04",
      "TB6612",
      "HC-05 BLE",
    ],
    links: {
      github: "https://github.com/geneticglitch/Autonomous-self-driving-robot",
    },
  },
  {
    slug: "nonstop-networking",
    name: "Nonstop Networking",
    year: "2025",
    lang: ["C"],
    size: "M",
    addr: "0x7ff0a0017000",
    bytes: "0x2000",
    category: "systems",
    tagline: "Epoll + state machine client-server that never stalls.",
    description:
      "An asynchronous, event-driven client-server architecture using epoll and non-blocking I/O. A robust state machine handles concurrent connections, manages partial network reads/writes, and implements a custom binary protocol to process GET, PUT, DELETE, and LIST requests over TCP without thread starvation.",
    highlights: [
      "Single-threaded reactor over epoll handling arbitrary numbers of clients without blocking or spawning per-connection threads.",
      "Per-connection state machine resumes partial reads and writes exactly where the last EAGAIN left off.",
      "Custom binary framing protocol for GET / PUT / DELETE / LIST over TCP with explicit error codes.",
    ],
    stack: ["C", "epoll", "POSIX sockets", "non-blocking I/O"],
    links: { note: "CS 341 — private per UIUC honor code" },
  },
  {
    slug: "parallel-make",
    name: "Parallel Make",
    year: "2025",
    lang: ["C"],
    size: "M",
    addr: "0x7ff0a0019000",
    bytes: "0x2000",
    category: "systems",
    tagline: "Multi-threaded make(1) that respects DAG dependencies.",
    description:
      "A multi-threaded build system in C that parses a Makefile into a dependency DAG and dynamically coordinates worker threads to execute rules in dependency order, using synchronization primitives to process large builds efficiently.",
    highlights: [
      "DAG builder with cycle detection — refuses to schedule circular dependencies.",
      "Thread-pool executor with condition variables guarding the ready queue — wakes workers only when a new rule becomes runnable.",
      "Correct handling of build failures: propagates up the DAG without leaking threads or leaving partially-built targets.",
    ],
    stack: ["C", "pthreads", "mutex / cond vars", "DAG scheduling"],
    links: { note: "CS 341 — private per UIUC honor code" },
  },
  {
    slug: "sshell",
    name: "sshell — POSIX Shell",
    year: "2025",
    lang: ["C"],
    size: "M",
    addr: "0x7ff0a001b000",
    bytes: "0x2000",
    category: "systems",
    tagline: "A UNIX-like shell with pipes, redirection, and logical operators.",
    description:
      "A UNIX-like shell capable of executing commands with complex argument parsing, handling background processes, managing logical operators, and supporting file redirection.",
    highlights: [
      "Tokenizer and parser handle quoted arguments, pipes, `&&` / `||` / `;`, and `<` / `>` / `>>` redirection.",
      "Process management via fork / execvp / waitpid with explicit signal handling for Ctrl-C and Ctrl-Z.",
      "Background processes report completion asynchronously without clobbering the prompt.",
    ],
    stack: ["C", "POSIX", "fork / exec / wait", "signals"],
    links: { note: "CS 341 — private per UIUC honor code" },
  },
  {
    slug: "finding-filesystems",
    name: "Finding Filesystems",
    year: "2025",
    lang: ["C"],
    size: "S",
    addr: "0x7ff0a001d000",
    bytes: "0x1000",
    category: "systems",
    tagline: "ext2 on-disk inode parser.",
    description:
      "A tool that walks a raw ext2 filesystem image: parses the superblock, traverses inode and block group descriptor tables, and reconstructs the directory tree without relying on kernel filesystem support.",
    highlights: [
      "Parses ext2 superblock and block group descriptors directly from disk bytes.",
      "Resolves inode → block mappings including direct, singly, and doubly indirect pointers.",
      "Rebuilds directory hierarchy from on-disk dir_entry records.",
    ],
    stack: ["C", "ext2", "on-disk structures"],
    links: { note: "CS 341 — private per UIUC honor code" },
  },
  {
    slug: "mnist-nn",
    name: "Handwritten Digit Neural Network (From Scratch)",
    year: "2024",
    lang: ["Java"],
    size: "S",
    addr: "0x7ff0a001e000",
    bytes: "0x1000",
    category: "ai",
    tagline: "MNIST classifier — no ML libraries, just math.",
    description:
      "A deep learning neural network engineered entirely from scratch in Java without utilizing any external ML libraries, trained on the MNIST dataset to recognize handwritten digits from 0 to 9.",
    highlights: [
      "Implemented forward propagation, backpropagation, and mathematical activation functions directly in Java to solidify an understanding of core machine learning mathematics.",
      "Trained on the MNIST dataset with SGD, recognizing digits 0–9.",
    ],
    stack: ["Java", "Linear algebra", "MNIST"],
    links: {},
  },
  {
    slug: "xraypdf",
    name: "XRayPDF",
    year: "2026",
    lang: ["TypeScript"],
    size: "S",
    addr: "0x7ff0a001f000",
    bytes: "0x1000",
    category: "tool",
    tagline: "Uncover hidden text in PDFs.",
    description:
      "A tool that surfaces sneaky hidden text in PDFs — invisible layers, white-on-white text, and metadata-buried strings that slip past a normal reader.",
    highlights: [],
    stack: ["TypeScript", "PDF.js"],
    links: { github: "https://github.com/geneticglitch1/XRayPDF" },
  },
  {
    slug: "seafile-mtls",
    name: "Seafile + mTLS",
    year: "2026",
    lang: ["C++", "C"],
    size: "S",
    addr: "0x7ff0a0020000",
    bytes: "0x1000",
    category: "infra",
    tagline: "Mutual TLS patch for the Seafile desktop client.",
    description:
      "A fork of the Seafile desktop client adding mutual-TLS support so the client can authenticate itself to the server via a client certificate in addition to password auth.",
    highlights: [],
    stack: ["C++", "Qt", "OpenSSL", "Seafile"],
    links: { github: "https://github.com/geneticglitch1/seafile-client" },
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
