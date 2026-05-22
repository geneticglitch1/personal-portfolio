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
      "I wrote a malloc from scratch in C and beat both stock and optimized glibc on the CS 341 benchmark.",
    intro:
      "I built a complete `malloc / calloc / realloc / free` implementation in C on top of `sbrk`, then tuned it until it overtook the highly-optimized glibc baseline that ships with every Linux machine.",
    pullQuote:
      "First out of four hundred students. My allocator scored 122.6 — the optimized glibc baseline scored 114.91 on the same suite.",
    heroMetric: { value: "1st / 400", label: "CS 341 Malloc Contest" },
    body: [
      "The contest pitted every student's allocator against glibc on a workload mix designed to expose fragmentation, alignment, and locality bugs. Submissions were ranked by a single performance score combining runtime and resident memory.",
      "I packed block metadata into a header that lives immediately before each payload, so my freelist could be walked without an external index. I kept the free list address-sorted so coalescing was O(1) at free time — when a block returns, I check its two physical neighbors in constant time and merge in place.",
      "I made splitting fragmentation-aware: rather than serving any free block large enough for the request, my allocator favors blocks that leave a remainder large enough to be useful, falling back to exact-fit when no such candidate exists. I taught `realloc` to grow in place whenever the right-hand neighbor is free, avoiding the copy the naive implementation performs.",
      "The final design held up under both small-allocation churn and large mixed workloads. It's the project that taught me to think about cache lines, branch prediction, and the cost of a single conditional in a hot path.",
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
      "I built a zero-knowledge secret manager for teams that have stopped trusting Slack with their API keys.",
    intro:
      "I built a full-stack platform that versions, diffs, and syncs `.env` files across machines and teammates — designed so that the server is mathematically incapable of reading any secret it stores.",
    pullQuote:
      "Encrypted on-device with keys derived via Argon2id, sealed with AES-GCM, and sent to a server that only ever sees ciphertext.",
    body: [
      "Every vault is encrypted client-side before it leaves the developer's machine. I derive keys from the user's passphrase with Argon2id (tuned for ~250 ms on commodity hardware) and seal the resulting ciphertext with AES-GCM. The server stores opaque blobs, an access-control table, and nothing else — I built no admin override and no plaintext recovery path.",
      "I wrote a Rust CLI that gives developers a git-like workflow for secrets: `envsync push`, `envsync pull`, `envsync diff`, `envsync rollback`. Login uses an OAuth2 device-code flow with automatic token refresh, so the CLI never asks for a password directly. Snapshot history is per-project, so an accidental rotation is one command away from being undone.",
      "I designed a deterministic conflict-resolution protocol with per-project access scopes, so teams can share a vault without trusting any central authority to mediate edits. Production runs through a Jenkins pipeline I wrote that builds and tests the Next.js frontend, packages the Rust CLI binaries, and rolls out to my K3s cluster on every push to main.",
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
      "I wrote a complete GPT-2 forward pass in raw CUDA and tuned it from 249 ms to 10 ms per pass.",
    intro:
      "I wrote every layer of OpenAI's GPT-2 (124 M parameters) in raw C++/CUDA, with no PyTorch and no high-level abstractions. My goal was to make a 12-layer transformer fast enough to be interesting on a single A40.",
    pullQuote:
      "I drove the end-to-end forward pass from 249.8 ms to 10.3 ms — a 24.2× speedup. Per-token generation hit a 117× peak via KV caching.",
    heroMetric: { value: "24.2×", label: "Forward-pass speedup vs. baseline" },
    body: [
      "My reference implementation was a naive Python port that took ~250 ms per forward pass on an A40. The CUDA port I wrote targets the same numeric output, but reaches it through custom kernels for every transformer block: encoder, LayerNorm, multi-head self-attention with causal masking, feed-forward, and GeLU activations.",
      "I focused my performance work on three layers of the memory hierarchy. Shared-memory and register tiling for matmul moves the operands close to the SMs; tensor-core TF32 math handles the bulk of the arithmetic; cuBLAS picks up the cases where a hand-written kernel would lose to the vendor library. Warp-level reductions keep softmax and LayerNorm tight.",
      "I wrote attention using a FlashAttention-style IO-aware tile schedule so the working set stays in shared memory rather than streaming through HBM on every step. Autoregressive generation gets wrapped in a KV cache I implemented that turns the O(n²) attention cost into O(n) per new token — which is what gets me the 117× peak per-token speedup at large batch sizes.",
      "I used CUTLASS device GEMM templates with fused epilogues to collapse a chain of small ops into one launch, killing kernel-launch latency in the inner loop. Every optimization I shipped — coalescing, bank-conflict-free swizzles, warp-stall removal — I measured under Nsight Systems and Nsight Compute first, rather than guessing.",
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
      "I built a retrieval-augmented document search engine so LLMs can ground answers in my own PDFs.",
    intro:
      "I built an end-to-end RAG pipeline so a language model can recall and cite passages from a user's private library instead of hallucinating around them. It ingests typed and handwritten PDFs, embeds them with Instructor-XL, and retrieves with re-ranking on top of pgvector.",
    pullQuote:
      "I surfaced 80–90% relevant passages on real 800-page documents — enough context for downstream LLMs to actually ground their answers in the source.",
    body: [
      "I built the ingestion pipeline to run asynchronously and route each PDF to one of two extractors: PyMuPDF for typed text, and TrOCR for scanned or handwritten pages. Both paths converge on a sentence-aware chunker I wrote with overlapping windows, so semantic boundaries are preserved across chunk edges.",
      "I batch embeddings 64 chunks at a time against `hkunlp/instructor-xl` on CUDA, which keeps GPU utilization high during bulk ingestion. The vectors land in Actian Vector (I chose it for hybrid filtering) with the original chunk metadata stored alongside.",
      "Retrieval combines vector similarity with a re-ranking layer I added on top, so the passages returned to the LLM are actually relevant — not just nearest in latent space. I validated this on real-world workloads: 800-page reference documents across multiple domains. It consistently surfaced the right passages.",
      "The backend is a FastAPI service with Supabase JWT auth and user-scoped filtering on every query. I made deletes cascade across PostgreSQL, the filesystem, and the vector store, so revoking a document actually removes it everywhere.",
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
      "I run six K3s nodes in my basement — every project on this site lives on them.",
    intro:
      "I built a private cloud from scratch in my basement. Every AI, ML, and systems project on this site runs on it, behind enterprise-grade networking that the projects themselves never have to know about.",
    pullQuote:
      "Six-node Kubernetes on Proxmox, 99.9% uptime, fully behind mTLS Cloudflare tunnels with zero exposed public IPs.",
    heroMetric: { value: "99.9%", label: "Measured uptime across 12 months" },
    body: [
      "I run K3s across six VMs on a Proxmox hypervisor, hosting LLM inference endpoints, PostgreSQL, vector stores, internal CI services, photo storage, document storage, and this portfolio. I deploy workloads through a GitOps workflow on Fleet, so the cluster state always matches a versioned manifest in Git.",
      "I hardened the networking on purpose. OPNsense runs my perimeter firewall with WAN/LAN policy, Suricata IDS/IPS, and CrowdSec for adaptive blocking. The cluster never exposes a public IP — I let Cloudflare mTLS tunnels be the only ingress path, which means the underlying infrastructure is invisible from the open internet.",
      "I keep persistent state on Longhorn, distributed across three physical nodes with synchronous replication. A single node failure doesn't lose data and doesn't interrupt the workloads using the volume. WireGuard handles my administrative remote access on top of all of this.",
      "Build and deploy run through Jenkins pipelines I wrote that produce Docker images, push them to GHCR, and roll them out as zero-downtime rolling deploys onto the cluster. Manual intervention is my exception, not my path.",
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
      "I built a dual-core Raspberry Pi Pico robot that placed 5th of 50 at the UIUC State Science Olympiad.",
    intro:
      "I built and programmed a robot that autonomously navigates a complex maze using pre-programmed distances and turns — challenging because the cheap motors and sensors I had access to come with none of the precision the task requires by default.",
    pullQuote:
      "I solved \"integration hell\" by giving every sensor its own CPU core — Core 0 ran the primary loop while Core 1 fielded secondary interrupts.",
    heroMetric: { value: "5th / 50", label: "UIUC State Science Olympiad" },
    body: [
      "The Pi Pico is a dual-core microcontroller, which was the unlock for me on this project. My first implementation tried to multiplex every sensor onto a single core and kept crashing under interrupt load. I split the workload — Core 0 owning the primary loop, Core 1 owning secondary sensor interrupts — and the contention disappeared.",
      "Yellow DC motors have enough backlash and inertia to overshoot any naive angle-based rotation. I fixed this with a dynamic rotation algorithm that required both the gyro to read the target angle and the angular velocity to fall to zero before terminating the turn. That let me hit precise headings on a surface with unpredictable friction.",
      "I pre-compile command sequences through a C preprocessor pass that converts authored command arrays into an optimized format the main loop consumes directly, keeping the hot path branch-free.",
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
      "I built a multi-modal journaling app that reads your face, looks at your calendar, and writes you a daily reflection.",
    intro:
      "I helped build a web app designed to produce uncannily specific daily reflections. It reads emotion from the user's webcam in real time, pulls events from their Google Calendar, and fuses both signals through a RAG pipeline I designed to generate prompts that actually feel like they understand the day.",
    pullQuote:
      "I got the computer-vision microservice under 100 ms per frame — fast enough that the camera feed feels live, not laggy.",
    body: [
      "I worked inside a 15-person cross-functional engineering team across the full product lifecycle. I owned the architecture and delivery of the AI surface area: how the model gets the right context, how that context turns into a prompt, and how the response gets back to the UI without feeling latent.",
      "I built the reflection layer as a retrieval-augmented generation pipeline on top of Claude 3.5 Sonnet. I fuse mood ratings, captured facial expressions, and scheduled calendar events into structured insights, then ask the model to write a reflection prompt grounded in that context rather than a generic one.",
      "I broke vision out into its own microservice — a FastAPI process with MediaPipe and OpenCV — that produces gesture and facial-emotion classifications under 100 ms per frame. I designed it for real-time use, so the UI can show the user what the system thinks it sees without breaking the loop.",
      "I owned the CI/CD strategy end-to-end: Jenkins pipelines I wrote build the Next.js frontend, the FastAPI vision service, and the orchestration backend, then deploy dockerized images to the K3s cluster behind the scenes.",
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
      "I ran ML on millions of Chicago municipal records to surface the neighborhoods most underserved by city services.",
    intro:
      "I built a machine-learning system that predicts which Chicago neighborhoods most need municipal attention by analyzing millions of records from the Chicago Data Portal — combined with spatial statistics and an interactive geospatial dashboard I shipped on top.",
    pullQuote:
      "I trained XGBoost and Random Forest classifiers on millions of municipal records, then validated them against a PySAL spatial-cluster analysis of crime and traffic data.",
    body: [
      "I trained XGBoost and Random Forest classifiers on a multi-million-row corpus of municipal records to identify underserved communities with high precision and recall. My features combined reported incidents, response times, and demographic geography.",
      "I built the data pipeline to pull live updates from the Chicago Data Portal through a NumPy + Pandas ETL flow, so the dashboard and the models are always current. Cached intermediate stages keep the refresh cheap.",
      "I layered PySAL spatial analysis on top of the model output to detect geographic clusters of crime and traffic incidents — the dashboard renders these as interactive Plotly + Mapbox layers inside a Streamlit shell, so a policy reader can see where my model's confidence and the ground truth agree.",
      "I shipped the deliverable as something actionable: I turned complex municipal datasets into clear visual evidence for equitable service allocation.",
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
      "I wrote a non-blocking, epoll-driven client–server in C that handles any number of connections without threads.",
    intro:
      "I wrote an asynchronous, event-driven server in C that uses `epoll` and non-blocking I/O to handle any number of concurrent clients with a single thread and a per-connection state machine.",
    pullQuote:
      "One thread, one reactor, one state machine per connection — partial reads and writes resume exactly where the last `EAGAIN` left them.",
    body: [
      "My reactor is a single-threaded epoll loop. I gave every connection a state machine that remembers exactly where the last read or write stopped, so a half-received request or a partial response continues correctly on the next epoll wake-up. No thread-per-connection, no busy waiting.",
      "I designed my wire format as a custom binary protocol for GET, PUT, DELETE, and LIST over TCP, with explicit error codes and length prefixes. I handled framing edge cases — short reads, write blocking mid-response, abrupt client close — at the state-machine level rather than papering over them with retries.",
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
      "I wrote a multi-threaded `make(1)` that respects DAG dependencies and parallelises everything else.",
    intro:
      "I wrote a multi-threaded build system in C that parses a Makefile into a dependency DAG and dispatches worker threads to execute rules in dependency order — the same contract `make -j` honors, implemented from scratch.",
    pullQuote:
      "My thread pool, guarded by condition variables on the ready queue, wakes workers only when a new rule becomes runnable — so idle CPUs never busy-wait.",
    body: [
      "I made the DAG builder reject cycles before scheduling begins. My thread-pool executor uses condition variables on the ready queue, so workers sleep when there's nothing to do and wake exactly when a new rule's dependencies are satisfied.",
      "Failure handling is the interesting part: when a rule fails, the failure has to propagate up the DAG without leaking threads or leaving half-built targets behind. My cancellation walks the DAG, marks unreachable targets, and joins workers cleanly.",
    ],
    stack: ["C", "pthreads", "mutex / cond vars", "DAG scheduling"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "sshell",
    name: "sshell — POSIX Shell",
    year: "2025",
    category: "systems",
    tagline: "I wrote a UNIX-like shell with pipes, redirection, and logical operators.",
    intro:
      "I wrote a POSIX shell capable of complex argument parsing, background processes, logical operators, and file redirection — everything you'd expect from `sh` minus the scripting language.",
    pullQuote:
      "My tokenizer and parser handle quoted arguments, pipes, `&&` / `||` / `;`, and `<` / `>` / `>>` redirection — no grammar libraries.",
    body: [
      "I wrote tokenization and parsing by hand to keep the binary small and the dependency footprint at zero. Quoted arguments, multi-stage pipelines, conditional sequences, and file redirection all flow through the same expression tree I built.",
      "Process management is straightforward `fork` / `execvp` / `waitpid`, with explicit signal handling I wrote for Ctrl-C and Ctrl-Z so the shell doesn't get killed by signals meant for its children. Background processes report completion asynchronously without clobbering the prompt the user is currently typing into.",
    ],
    stack: ["C", "POSIX", "fork / exec / wait", "signals"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "finding-filesystems",
    name: "Finding Filesystems",
    year: "2025",
    category: "systems",
    tagline: "I wrote an ext2 on-disk inode parser that walks raw filesystem bytes.",
    intro:
      "I wrote a tool that walks a raw ext2 filesystem image: parses the superblock, traverses inode and block-group descriptor tables, and reconstructs the directory tree without relying on the kernel's filesystem support.",
    pullQuote:
      "It resolves inode → block mappings through direct, singly-indirect, and doubly-indirect pointers — straight off the disk bytes.",
    body: [
      "Reading a real filesystem from scratch is a useful exercise in believing what's actually there rather than what you remember from a diagram. My parser reads the superblock, walks block-group descriptors, and resolves inodes through the full pointer hierarchy.",
      "I rebuild the directory hierarchy from on-disk `dir_entry` records, so a corrupted entry produces a useful error rather than a silent miss.",
    ],
    stack: ["C", "ext2", "on-disk structures"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "mnist-nn",
    name: "Handwritten Digit Neural Network (From Scratch)",
    year: "2024",
    category: "ai",
    tagline: "I wrote an MNIST classifier in Java with no ML library and no autograd.",
    intro:
      "I wrote a small feed-forward neural network entirely in Java, with no external ML libraries — I built it to make the math of forward propagation, backpropagation, and stochastic gradient descent stop being abstract.",
    pullQuote:
      "Forward prop, backprop, and activation functions — I implemented all of them directly. The whole point was to feel the gradient flow.",
    body: [
      "I trained on MNIST with stochastic gradient descent, recognizing handwritten digits zero through nine. My layer weights and activations are explicit matrices the code multiplies by hand, which made every shape mismatch a learning moment rather than a stack trace.",
    ],
    stack: ["Java", "Linear algebra", "MNIST"],
    links: {},
  },
  {
    slug: "xraypdf",
    name: "XRayPDF",
    year: "2026",
    category: "tool",
    tagline: "I wrote a tool that surfaces hidden text inside PDFs.",
    intro:
      "I wrote a tool that surfaces sneaky hidden text in PDFs — invisible layers, white-on-white text, and metadata-buried strings that slip past a normal reader. Useful when I'm reviewing documents I didn't author.",
    pullQuote:
      "If a PDF is hiding something between the rendered glyphs, my tool reads it back out loud.",
    body: [
      "I built it on PDF.js. It walks every text-object stream in the document and surfaces anything the renderer would normally suppress — zero-opacity layers, color-matched-to-background runs, hidden form-field defaults, and metadata strings.",
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
      "I forked the Seafile desktop client and added mutual TLS authentication.",
    intro:
      "I forked the Seafile desktop client and added mutual-TLS support — the client now authenticates itself to the server with a certificate, on top of the existing password auth.",
    pullQuote:
      "Useful when my storage server lives behind a Cloudflare tunnel that already terminates mTLS at the edge.",
    body: [
      "I patched the Qt-based desktop client to load a client certificate and present it on every TLS handshake. The change is small in lines but spans the network layer, the settings UI, and the keychain integration on each platform.",
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
