export type ProjectCategory =
  | "systems"
  | "fullstack"
  | "ai"
  | "hardware"
  | "infra"
  | "tool";

export interface HeroMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  category: ProjectCategory;
  tagline: string;
  intro: string;
  pullQuote: string;
  heroMetric?: HeroMetric;
  body: string[];
  stack: string[];
  links: {
    github?: string;
    live?: string;
    note?: string;
  };
  cover?: string;
}

export const projects: Project[] = [
  {
    slug: "malloc",
    name: "High-Performance Custom Memory Allocator",
    year: "2025",
    category: "systems",
    tagline:
      "A from-scratch malloc/calloc/realloc/free in C, tuned to outperform the glibc allocator on the CS 341 benchmark.",
    intro:
      "A complete dynamic memory allocator written in C on top of `sbrk`, implementing the full malloc/calloc/realloc/free interface. The goal was to match, then exceed, the highly optimized glibc allocator that ships with every Linux machine — measured on the CS 341 benchmark suite.",
    pullQuote:
      "Scored 122.6 on the shared benchmark against the optimized glibc baseline's 114.91 — the top result among roughly 400 submissions.",
    heroMetric: { value: "1st / 400", label: "CS 341 Malloc Contest" },
    body: [
      "The contest ran every student's allocator against glibc on a workload mix designed to expose fragmentation, alignment, and locality bugs. Submissions were ranked by a single score combining runtime and resident memory.",
      "Block metadata lives in a header immediately before each payload, so the free list walks without an external index. The list stays address-sorted, which makes coalescing O(1) at free time: a returning block checks its two physical neighbors in constant time and merges in place.",
      "Splitting is fragmentation-aware — rather than serving any block large enough for the request, the allocator favors blocks that leave a useful-sized remainder, falling back to exact-fit when none exists. `realloc` grows in place whenever the right-hand neighbor is free, avoiding the copy a naive implementation performs.",
      "The final design held up under both small-allocation churn and large mixed workloads — a practical exercise in cache lines, branch prediction, and the cost of a single conditional on a hot path.",
    ],
    stack: ["C", "POSIX", "sbrk", "glibc benchmark suite"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "envsync",
    name: "EnvSync",
    year: "2026",
    category: "fullstack",
    tagline:
      "A zero-knowledge secret manager for teams that have stopped trusting Slack with their API keys.",
    intro:
      "A full-stack platform that versions, diffs, and syncs `.env` files across machines and teammates — designed so the server is mathematically incapable of reading any secret it stores.",
    pullQuote:
      "Encrypted on-device with keys derived via Argon2id, sealed with AES-GCM, and sent to a server that only ever sees ciphertext.",
    body: [
      "Everything is encrypted on the client before it leaves. A passphrase derives a key through Argon2id (tuned to ~250 ms, slow enough to make brute force painful), then AES-GCM seals the secrets. The server only ever sees ciphertext. There is no admin override and no password reset — losing the passphrase means losing the vault, by design.",
      "The Rust CLI works the way `git` does: `envsync push`, `pull`, `diff`, `rollback`. Login is OAuth2 device-code with auto-refresh, so the CLI never sees the password. Each project keeps its own snapshot history, making a bad rotation a one-command undo.",
      "Conflict resolution is deterministic, so two teammates editing the same vault never diverge. Per-project scopes mean a leaked token compromises one vault, not everything. Every push builds, tests, and deploys to a K3s cluster through a Jenkins pipeline.",
    ],
    stack: [
      "Rust",
      "Cobra",
      "Next.js",
      "Spring Boot",
      "PostgreSQL",
      "Argon2id",
      "AES-GCM",
      "Keycloak",
      "MinIO",
      "Jenkins",
    ],
    links: { github: "https://github.com/geneticglitch1/EnvSync" },
  },
  {
    slug: "gpt-2-cuda",
    name: "GPT-2 Inference Engine — from Scratch in CUDA",
    year: "2026",
    category: "ai",
    tagline:
      "A complete GPT-2 forward pass written in raw CUDA, tuned from 249 ms to 10 ms per pass.",
    intro:
      "Every layer of OpenAI's GPT-2 (124 M parameters) implemented in raw C++/CUDA — no PyTorch, no high-level abstractions. The aim: make a 12-layer transformer fast enough to be interesting on a single A40.",
    pullQuote:
      "The end-to-end forward pass dropped from 249.8 ms to 10.3 ms — a 24.2× speedup. Per-token generation reached a 117× peak via KV caching.",
    heroMetric: { value: "24.2×", label: "Forward-pass speedup vs. baseline" },
    body: [
      "The reference implementation was a naive Python port at ~250 ms per forward pass on an A40. The CUDA version targets the same numeric output through custom kernels for every transformer block: encoder, LayerNorm, multi-head self-attention with causal masking, feed-forward, and GeLU activations.",
      "Performance work focused on three layers of the memory hierarchy. Shared-memory and register tiling move matmul operands close to the SMs; tensor-core TF32 math handles the bulk of the arithmetic; cuBLAS picks up the cases where a hand-written kernel would lose to the vendor library. Warp-level reductions keep softmax and LayerNorm tight.",
      "Attention uses a FlashAttention-style IO-aware tile schedule, keeping the working set in shared memory instead of streaming through HBM on every step. Autoregressive generation wraps a KV cache that turns the O(n²) attention cost into O(n) per new token — the source of the 117× peak per-token speedup at large batch sizes.",
      "CUTLASS device GEMM templates with fused epilogues collapse chains of small ops into single launches, cutting kernel-launch latency in the inner loop. Every optimization — coalescing, bank-conflict-free swizzles, warp-stall removal — was measured under Nsight Systems and Nsight Compute before being kept, rather than guessed at.",
    ],
    stack: [
      "CUDA",
      "C++17",
      "CUTLASS",
      "Tensor Cores (Ampere)",
      "FlashAttention",
      "cuBLAS",
      "Nsight Systems",
      "Nsight Compute",
      "NCSA Delta · A40",
    ],
    links: { note: "ECE 408 — source private per UIUC honor code" },
  },
  {
    slug: "schema",
    name: "Schema — AI Document Search",
    year: "2026",
    category: "ai",
    tagline:
      "A retrieval-augmented document search engine that grounds LLM answers in a private PDF library.",
    intro:
      "An end-to-end RAG pipeline that lets a language model recall and cite passages from a user's private library instead of hallucinating around them. It ingests typed and handwritten PDFs, embeds them with Instructor-XL, and retrieves with re-ranking on top of pgvector.",
    pullQuote:
      "Surfaced 80–90% relevant passages on real 800-page documents — enough context for downstream LLMs to ground their answers in the source.",
    body: [
      "The ingestion pipeline runs asynchronously, routing each PDF to one of two extractors: PyMuPDF for typed text, TrOCR for scanned or handwritten pages. Both paths converge on a sentence-aware chunker with overlapping windows, preserving semantic boundaries across chunk edges.",
      "Embeddings batch 64 chunks at a time against `hkunlp/instructor-xl` on CUDA, keeping GPU utilization high during bulk ingestion. Vectors land in Actian Vector — chosen for hybrid filtering — with the original chunk metadata stored alongside.",
      "Retrieval combines vector similarity with a re-ranking layer, so the passages returned to the LLM are actually relevant rather than merely nearest in latent space. Validation ran on real 800-page reference documents across multiple domains, where it consistently surfaced the right passages.",
      "The backend is a FastAPI service with Supabase JWT auth and user-scoped filtering on every query. Deletes cascade across PostgreSQL, the filesystem, and the vector store, so revoking a document removes it everywhere.",
    ],
    stack: [
      "FastAPI",
      "React",
      "Supabase",
      "Actian Vector",
      "pgvector",
      "PyMuPDF",
      "TrOCR",
      "Instructor-XL",
      "CUDA",
    ],
    links: {},
  },
  {
    slug: "homelab",
    name: "High-Availability K3s Home Lab Cluster",
    year: "2024 — present",
    category: "infra",
    tagline:
      "Six K3s nodes at home — every project on this site runs on them.",
    intro:
      "A private cloud built from scratch at home. Every AI, ML, and systems project on this site runs on it, behind networking the projects themselves never have to think about.",
    pullQuote:
      "Six-node Kubernetes on Proxmox, 99.9% uptime, fully behind mTLS Cloudflare tunnels with zero exposed public IPs.",
    heroMetric: { value: "99.9%", label: "Measured uptime across 12 months" },
    body: [
      "Six VMs on Proxmox, K3s on top, and everything here runs on it — LLM inference, Postgres, vector stores, CI runners, photo and document storage, this portfolio. Deploys go through Fleet, so what's running matches what's in Git.",
      "The network is intentionally paranoid: OPNsense at the edge, Suricata for IDS, CrowdSec for adaptive blocking. Nothing has a public IP — the only way in is a Cloudflare mTLS tunnel, so a port scan of the home address finds nothing.",
      "Longhorn replicates persistent volumes synchronously across three nodes. A node failing overnight surfaces the next morning, because nothing actually broke. WireGuard handles remote access.",
      "Deploys go through Jenkins: build a Docker image, push to GHCR, and do a zero-downtime rolling restart on the cluster — rarely touched by hand.",
    ],
    stack: [
      "K3s",
      "Proxmox",
      "OPNsense",
      "Cloudflare Tunnels",
      "Suricata",
      "CrowdSec",
      "WireGuard",
      "Longhorn",
      "Traefik",
      "Fleet",
      "Jenkins",
    ],
    links: {},
  },
  {
    slug: "robot-tour",
    name: "Autonomous Maze Solver — Robot Tour",
    year: "2024",
    category: "hardware",
    tagline:
      "A dual-core Raspberry Pi Pico robot that placed 5th of 50 at the UIUC State Science Olympiad.",
    intro:
      "A robot that autonomously navigates a complex maze using pre-programmed distances and turns — hard because the cheap motors and sensors available bring none of the precision the task requires.",
    pullQuote:
      "\"Integration hell\" went away once every sensor got its own CPU core — Core 0 ran the primary loop while Core 1 fielded secondary interrupts.",
    heroMetric: { value: "5th / 50", label: "UIUC State Science Olympiad" },
    body: [
      "The Pi Pico's dual cores were the unlock. An initial attempt multiplexed every sensor onto a single core and kept crashing under interrupt load. Splitting the work — Core 0 owning the primary loop, Core 1 owning secondary sensor interrupts — made the contention disappear.",
      "Cheap yellow DC motors have enough backlash and inertia to overshoot any naive angle-based rotation. A dynamic rotation algorithm fixed it: a turn terminates only once the gyro reads the target angle and angular velocity falls to zero, hitting precise headings on a surface with unpredictable friction.",
      "Command sequences are pre-compiled through a C preprocessor pass that converts authored command arrays into a format the main loop consumes directly, keeping the hot path branch-free.",
    ],
    stack: [
      "C / C++",
      "Raspberry Pi Pico",
      "LM393 light encoders",
      "HC-SR04 ultrasonic",
      "TB6612 motor driver",
      "MP1584 regulator",
      "HC-05 Bluetooth",
    ],
    links: {
      github: "https://github.com/geneticglitch/Autonomous-self-driving-robot",
    },
  },
  {
    slug: "journaling",
    name: "AI-Powered Digital Journaling Platform",
    year: "2025",
    category: "fullstack",
    tagline:
      "A journaling app that reads your face, checks your calendar, and writes a reflection that fits the day you actually had.",
    intro:
      "The idea: reflection prompts that feel like they know what kind of day you had. The app watches your face on the webcam, reads your calendar, and uses both to write you something more specific than \"how are you feeling?\" The AI layer was built as one part of a 15-person team project.",
    pullQuote:
      "The vision service runs under 100 ms per frame, so the camera feed feels live, not laggy.",
    body: [
      "The AI layer, owned end to end: getting the right context into the model, turning it into a prompt the model could actually use, and returning the response to the UI without it feeling slow.",
      "Reflection prompts come out of a RAG pipeline on top of Claude 3.5 Sonnet. It combines mood ratings, what the webcam read during the day, and what was on the calendar, then asks Claude for a prompt grounded in that — not a generic \"reflect on your day.\"",
      "Vision lives in its own FastAPI service running MediaPipe and OpenCV — sub-100 ms per frame, so the UI can show what the model thinks it sees without the loop stalling.",
      "CI/CD runs through Jenkins: it builds the Next.js frontend, the vision service, and the backend on every push, then rolls them out to a K3s cluster as Docker images.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Python",
      "FastAPI",
      "MediaPipe",
      "OpenCV",
      "Claude 3.5 Sonnet",
      "PostgreSQL",
      "Docker",
      "Jenkins",
      "K3s",
    ],
    links: {},
  },
  {
    slug: "urban-analytics",
    name: "Pathway to Improved Cities — Urban Analytics",
    year: "2025",
    category: "ai",
    tagline:
      "ML on millions of Chicago city records to find which neighborhoods are most underserved.",
    intro:
      "The Chicago Data Portal has years of 311 calls, crime reports, and service records sitting in public. The question: can you point at a neighborhood and predict whether it gets its fair share of city services? The answer is yes — and sometimes uncomfortable.",
    pullQuote:
      "XGBoost and Random Forest on millions of municipal records, cross-checked against PySAL spatial clusters of crime and traffic incidents.",
    body: [
      "XGBoost and Random Forest trained on a few million rows of city records — reported incidents, response times, demographic geography — reaching high precision and recall on whether a neighborhood is underserved.",
      "The data pipeline pulls live updates from the Chicago Data Portal through a NumPy + Pandas ETL. Cached intermediate stages keep refreshes cheap, so the dashboard stays current and the models retrain on recent data.",
      "On top of the model, a PySAL spatial pass finds geographic clusters of crime and traffic incidents, making it possible to check visually where predictions line up with ground truth. The whole thing renders as a Streamlit dashboard with Plotly and Mapbox layers.",
      "The point wasn't a paper. It was making the data clear enough that someone who allocates city services could look at the map and see where the gaps are.",
    ],
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "XGBoost",
      "Random Forest",
      "PySAL",
      "GeoPandas",
      "Streamlit",
      "Plotly",
      "Mapbox",
    ],
    links: {},
  },
  {
    slug: "nonstop-networking",
    name: "Nonstop Networking",
    year: "2025",
    category: "systems",
    tagline:
      "A non-blocking, epoll-driven client–server in C that handles any number of connections without threads.",
    intro:
      "An asynchronous, event-driven server in C that uses `epoll` and non-blocking I/O to handle any number of concurrent clients with a single thread and a per-connection state machine.",
    pullQuote:
      "One thread, one reactor, one state machine per connection — partial reads and writes resume exactly where the last `EAGAIN` left them.",
    body: [
      "The reactor is a single-threaded epoll loop. Every connection has a state machine that remembers exactly where the last read or write stopped, so a half-received request or a partial response continues correctly on the next epoll wake-up. No thread-per-connection, no busy waiting.",
      "The wire format is a custom binary protocol for GET, PUT, DELETE, and LIST over TCP, with explicit error codes and length prefixes. Framing edge cases — short reads, write blocking mid-response, abrupt client close — are handled at the state-machine level rather than papered over with retries.",
    ],
    stack: ["C", "epoll", "POSIX sockets", "non-blocking I/O"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "parallel-make",
    name: "Parallel Make",
    year: "2025",
    category: "systems",
    tagline:
      "A multi-threaded `make(1)` that respects DAG dependencies and parallelizes everything else.",
    intro:
      "A multi-threaded build system in C that parses a Makefile into a dependency DAG and dispatches worker threads to execute rules in dependency order — the same contract `make -j` honors, implemented from scratch.",
    pullQuote:
      "A thread pool guarded by condition variables on the ready queue wakes workers only when a new rule becomes runnable — so idle CPUs never busy-wait.",
    body: [
      "The DAG builder rejects cycles before scheduling begins. The thread-pool executor uses condition variables on the ready queue, so workers sleep when there's nothing to do and wake exactly when a new rule's dependencies are satisfied.",
      "Failure handling is the interesting part: when a rule fails, the failure has to propagate up the DAG without leaking threads or leaving half-built targets behind. Cancellation walks the DAG, marks unreachable targets, and joins workers cleanly.",
    ],
    stack: ["C", "pthreads", "mutex / cond vars", "DAG scheduling"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "sshell",
    name: "sshell — POSIX Shell",
    year: "2025",
    category: "systems",
    tagline: "A UNIX-like shell with pipes, redirection, and logical operators.",
    intro:
      "A POSIX shell with complex argument parsing, background processes, logical operators, and file redirection — most of what `sh` does, minus the scripting language.",
    pullQuote:
      "A hand-written tokenizer and parser handle quoted arguments, pipes, `&&` / `||` / `;`, and `<` / `>` / `>>` redirection — no grammar libraries.",
    body: [
      "Tokenization and parsing are hand-written, keeping the binary small and dependencies at zero. Quoted arguments, multi-stage pipelines, conditional sequences, and file redirection all flow through one expression tree.",
      "Process management is straightforward `fork` / `execvp` / `waitpid`, with explicit signal handling for Ctrl-C and Ctrl-Z so the shell isn't killed by signals meant for its children. Background processes report completion asynchronously without clobbering the prompt currently being typed.",
    ],
    stack: ["C", "POSIX", "fork / exec / wait", "signals"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "finding-filesystems",
    name: "Finding Filesystems",
    year: "2025",
    category: "systems",
    tagline: "An ext2 on-disk inode parser that walks raw filesystem bytes.",
    intro:
      "A tool that walks a raw ext2 filesystem image: parses the superblock, traverses inode and block-group descriptor tables, and reconstructs the directory tree without relying on the kernel's filesystem support.",
    pullQuote:
      "It resolves inode → block mappings through direct, singly-indirect, and doubly-indirect pointers — straight off the disk bytes.",
    body: [
      "Reading a real filesystem from scratch is an exercise in believing what's on disk rather than what a diagram says. The parser reads the superblock, walks block-group descriptors, and resolves inodes through the full pointer hierarchy.",
      "The directory hierarchy is rebuilt from on-disk `dir_entry` records, so a corrupted entry produces a useful error instead of a silent miss.",
    ],
    stack: ["C", "ext2", "on-disk structures"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "mnist-nn",
    name: "Handwritten Digit Neural Network (From Scratch)",
    year: "2024",
    category: "ai",
    tagline: "An MNIST classifier in Java with no ML library and no autograd.",
    intro:
      "A small feed-forward neural network written entirely in Java, with no external ML libraries — built to make the math of forward propagation, backpropagation, and stochastic gradient descent concrete.",
    pullQuote:
      "Forward propagation, backpropagation, and activation functions, all implemented directly. The whole point was to follow the gradient flow by hand.",
    body: [
      "Trained on MNIST with stochastic gradient descent to recognize handwritten digits zero through nine. Layer weights and activations are explicit matrices multiplied by hand, which turned every shape mismatch into a learning moment rather than a stack trace.",
    ],
    stack: ["Java", "Linear algebra", "MNIST"],
    links: {},
  },
  {
    slug: "xraypdf",
    name: "XRayPDF",
    year: "2026",
    category: "tool",
    tagline: "A tool that surfaces hidden text inside PDFs.",
    intro:
      "A tool that surfaces sneaky hidden text in PDFs — invisible layers, white-on-white text, and metadata-buried strings that slip past a normal reader. Useful for reviewing documents written by someone else.",
    pullQuote:
      "If a PDF is hiding something between the rendered glyphs, the tool reads it back out.",
    body: [
      "Built on PDF.js, it walks every text-object stream in the document and surfaces anything the renderer would normally suppress — zero-opacity layers, color-matched-to-background runs, hidden form-field defaults, and metadata strings.",
    ],
    stack: ["TypeScript", "PDF.js"],
    links: { github: "https://github.com/geneticglitch1/XRayPDF" },
  },
  {
    slug: "seafile-mtls",
    name: "Seafile + mTLS",
    year: "2026",
    category: "infra",
    tagline:
      "A fork of the Seafile desktop client with mutual-TLS authentication added.",
    intro:
      "A fork of the Seafile desktop client with mutual-TLS support: the client authenticates itself to the server with a certificate, on top of the existing password auth.",
    pullQuote:
      "Useful when the storage server lives behind a Cloudflare tunnel that already terminates mTLS at the edge.",
    body: [
      "The Qt-based client is patched to load a client certificate and present it on every TLS handshake. The change is small in lines but spans the network layer, the settings UI, and the keychain integration on each platform.",
    ],
    stack: ["C++", "Qt", "OpenSSL", "Seafile"],
    links: { github: "https://github.com/geneticglitch1/seafile-client" },
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categoryLabel: Record<ProjectCategory, string> = {
  systems: "Systems",
  fullstack: "Full Stack",
  ai: "AI / ML",
  hardware: "Hardware",
  infra: "Infrastructure",
  tool: "Tooling",
};
