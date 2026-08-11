/**
 * The long-form writing — intro, pull quote, body, full stack list.
 *
 * NOT IMPORTED BY THE SITE. The cards carry everything a reader sees, so this
 * prose would otherwise ship in the payload and never render. Kept here
 * because it's the most considered description of each project that exists,
 * and it's the source to draw on if a detail view ever comes back.
 */
/**
 * Single source of truth for every project on the site.
 *
 * The first FEATURED entries render as the draggable cards in Selected work;
 * all of them render as rows in the index. A `metric` is only present where
 * there is a real measured result to report — most projects don't have one,
 * and that's the point.
 */

export interface ProjectLinks {
  github?: string;
  live?: string;
  /** Shown in place of a link when the source can't be published. */
  note?: string;
}

export interface ProjectMetric {
  /** Final rendered text, e.g. "24.2×". */
  value: string;
  /** Numeric target for the count-up. */
  count: number;
  /** Decimal places to hold during the count-up. */
  dec: number;
  pre: string;
  suf: string;
  label: string;
}

export interface ArchiveEntry {
  slug: string;
  name: string;
  year: string;
  cat: string;
  /** Short line for the featured card. */
  desc: string;
  /** Longer line for the index row. */
  line: string;
  metric?: ProjectMetric;
  tags: string[];
  intro: string;
  quote: string;
  body: string[];
  stack: string[];
  links: ProjectLinks;
}

export const ARCHIVE: ArchiveEntry[] = [
  {
    slug: "sentinel",
    name: "Sentinel — Homelab Control Agent",
    year: "2026",
    cat: "Infrastructure",
    desc: "An LLM agent that runs my homelab from one sentence, and won't touch anything destructive without a dry run.",
    line: "An LLM agent that operates my homelab from plain English, with a dry-run gate so it can't break what it's fixing.",
    tags: ["Python", "Agent SDK", "MCP"],
    intro:
      "I got tired of SSHing through three boxes to do one small thing — spin up a container on the Docker host, open a port in the OPNsense GUI, then check whether the firewall is actually dropping the scans hitting it or just logging them. Sentinel hands all of that to a Claude agent. I describe what I want in a sentence; it works out the tool calls, shows me the plan, and only runs it if I say so.",
    quote:
      "Anything that changes state is a dry run unless I pass confirm=true — because I once stopped sshd on the firewall mid-edit and locked myself out. Once was enough.",
    body: [
      "It drives three systems through one shared set of tools: Proxmox for VMs and containers, OPNsense for the firewall (Suricata IPS, CrowdSec), and a Debian Docker host for everything else. Same tools whether I reach it as an MCP server in Claude Desktop, a Claude Code plugin, or the standalone Agent SDK app behind the deploy command.",
      "The safety gate is the design, not a flag. Stop a VM, delete a firewall rule, remove a container, flip IDS mode — all of it refuses to run without an explicit confirm. The OPNsense provider only changes things through supported paths, configctl and the REST reconfigure endpoints, never a raw PHP poke, and it backs up config.xml before it touches anything.",
      "There's exactly one definition of each tool, in tools.py. The MCP server, the agent app, and the CLI all import the same functions, so nothing works in Claude Desktop but breaks from the CLI. Providers do the raw I/O; the tool layer owns the dry-run gate and the audit log. Every call — planned or applied — lands in that log, and the dashboard reads straight from it.",
      'The one-liner I actually use: sentinel deploy "run postgres:16, 2GB RAM, expose 5432". It prints the real docker run it would execute, then waits for a yes.',
    ],
    stack: [
      "Python",
      "Claude Agent SDK",
      "MCP",
      "Proxmox",
      "OPNsense",
      "Suricata",
      "CrowdSec",
      "Docker",
      "Nginx Proxy Manager",
      "Next.js",
      "ntfy",
    ],
    links: {
      github: "https://github.com/geneticglitch1/Sentinel",
      live: "https://sentinel.aryan-singh.dev/",
    },
  },
  {
    slug: "vega",
    name: "Vega — Multi-Agent Trading System",
    year: "2026",
    cat: "AI / ML",
    desc: "Four LLM personas share one local model overnight. A risk layer written in Python decides what actually gets ordered.",
    line: "Four LLM personas time-share one local model overnight; a pure, unit-tested risk layer decides what actually gets ordered at open.",
    tags: ["Python", "MLX", "Alpaca"],
    intro:
      "The Mac wakes itself at 23:55 and spends the night running four trader personas, one at a time, against a single local model. Each researches the market with tools and writes its theses to JSON. At 08:30 a separate job reads that JSON, runs it through risk guardrails, and places paper orders. Paper trading only — fake money, real prices. Whether a local model's theses are any good is the open question; the build being correct is a separate one, and that's the part I can actually test.",
    quote:
      "The model's sizing and stops are inputs, not instructions. Every one of them gets clamped in code before an order exists.",
    body: [
      "One model, four personas, so the constraint is wall-clock time rather than GPU memory. orchestration/budget.py hands each agent a deadline equal to its fair share of the remaining window, capped per-agent and never past the hard stop. An agent that finishes early rolls its unused time to the ones still waiting. The hard stop always holds, which matters when the whole thing has to be finished before the market opens.",
      "Each persona gets its own Alpaca paper account, so the books and their P&L stay separate and comparable. Before researching, an agent sees its own past picks marked to market — losses become explicit lessons rather than something it silently repeats. A market regime snapshot (SPY trend, VIX, sector momentum) is computed in code, not by the model, and injected into every kickoff so they all start from the same ground truth.",
      "After research, a chief-risk-officer pass reviews the whole book and issues per-pick verdicts — approve, reduce, or veto, with reasons. The morning executor enforces those verdicts rather than treating them as advice.",
      "execution/guardrails.py is the part I care about most: no network, no broker objects, just plain data in and an order plan out, so the whole pipeline is deterministic and unit-tested. It dedupes across agents, applies per-agent and per-day caps, filters on price and liquidity, clamps position sizing, and trims against buying power. Stops and takes are enforced there, not trusted from the model. Orders go out as GTC brackets so the stop and take legs survive a multi-day hold.",
    ],
    stack: [
      "Python",
      "MLX",
      "gpt-oss-20b",
      "Alpaca",
      "Finnhub",
      "launchd",
      "Streamlit",
      "pytest",
      "uv",
    ],
    links: { github: "https://github.com/geneticglitch1/trading-agent" },
  },
  {
    slug: "gpt2-cuda",
    name: "GPT-2 Inference Engine — from Scratch in CUDA",
    year: "2026",
    cat: "AI / ML",
    desc: "Every GPT-2 layer hand-written in CUDA, no PyTorch underneath. 250 ms a forward pass down to 10.",
    line: "Every GPT-2 layer hand-written in CUDA, no PyTorch. Tuned from 250 ms a pass down to 10.",
    metric: {
      value: "24.2×",
      count: 24.2,
      dec: 1,
      pre: "",
      suf: "×",
      label: "Forward-pass speedup",
    },
    tags: ["CUDA", "C++17", "CUTLASS"],
    intro:
      "Every layer of GPT-2 (124M parameters) written in raw C++/CUDA — no PyTorch, no framework underneath. I wanted a 12-layer transformer fast enough to be interesting on a single A40, so I wrote the kernels myself.",
    quote:
      "The forward pass went from 249.8 ms to 10.3 ms — 24.2× — and per-token generation peaked at 117× once the KV cache was in.",
    body: [
      "The baseline was a naive Python port: ~250 ms per forward pass on an A40. The CUDA version hits the same numeric output with custom kernels for every block — encoder, LayerNorm, multi-head self-attention with causal masking, feed-forward, GeLU.",
      "Most of the speed came from working the memory hierarchy. Shared-memory and register tiling keep matmul operands close to the SMs; tensor-core TF32 does the bulk of the math; cuBLAS takes over wherever a hand-written kernel would lose to the vendor library. Warp-level reductions keep softmax and LayerNorm tight.",
      "Attention runs a FlashAttention-style IO-aware tile schedule, so the working set stays in shared memory instead of streaming through HBM every step. For generation, a KV cache turns the O(n²) attention cost into O(n) per new token — that's where the 117× per-token peak comes from at large batch sizes.",
      "CUTLASS device GEMM templates with fused epilogues fold chains of small ops into one launch, cutting launch latency in the inner loop. Nothing went in on a hunch — coalescing, bank-conflict-free swizzles, warp-stall removal, all of it was measured under Nsight Systems and Nsight Compute before it earned a place.",
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
    links: {
      live: "https://gpt2.aryan-singh.dev/",
      note: "ECE 408 — source private per UIUC honor code",
    },
  },
  {
    slug: "fpga-scheduler",
    name: "Hardware Job Scheduler — FPGA Offload",
    year: "2025",
    cat: "Hardware",
    desc: "A Linux job scheduler moved off the CPU and onto a Xilinx Alveo U55C. Throughput doubled.",
    line: "Moved a Linux job scheduler off the CPU and onto a Xilinx Alveo U55C. Throughput doubled.",
    metric: {
      value: "2×",
      count: 2,
      dec: 0,
      pre: "",
      suf: "×",
      label: "Throughput vs. CPU baseline",
    },
    tags: ["C++", "Alveo U55C", "FPGA"],
    intro:
      "Built during my internship at UIC: take the job scheduler the OS normally runs on the CPU and put it on a Xilinx Alveo U55C FPGA instead. The CPU spends a surprising amount of time just deciding what to run next — the bet was that dedicated silicon could do that and hand the cycles back.",
    quote:
      "The host and FPGA were copying the same data across the bus twice. Sharing physical memory between them doubled throughput on its own.",
    body: [
      "With the scheduler living on the FPGA, the host CPU stopped burning cycles managing work it could have been executing. The first version still bottlenecked on data movement: every hand-off copied the same buffers across the PCIe bus twice.",
      "Sharing physical memory between host and FPGA removed the double-copy, and throughput doubled once those transfers were gone. A three-thread C++ pipeline — Writer, Reader, Logger — kept two FPGA kernels fed without stalling: lock-free ring buffers on the hot path, mutexes only where contention didn't matter.",
      "Putting the task queue itself in hardware let high-priority jobs bypass the OS scheduler entirely, dropping their latency into the microsecond range.",
    ],
    stack: [
      "C++",
      "Xilinx Alveo U55C",
      "FPGA",
      "Shared physical memory",
      "Lock-free ring buffers",
    ],
    links: { note: "UIC internship — source is private" },
  },
  {
    slug: "minecraft-craftdeck",
    name: "Minecraft Server + CraftDeck Panel",
    year: "2026",
    cat: "Infrastructure",
    desc: "A Fabric server for friends, plus the ops panel I got tired of not having.",
    line: "A self-hosted Fabric server plus CraftDeck, a full ops panel: console, mods, backups, schedules, and gated auth.",
    tags: ["Next.js", "Docker", "RCON"],
    intro:
      "Running a Minecraft server for friends is mostly fine until something breaks, and then it's twenty minutes of SSH and docker logs while six people wait. CraftDeck is the panel I built so it isn't: fourteen pages covering console, players, lag diagnostics, mods, backups, files, config, and schedules, sitting on top of a Fabric server that any vanilla client can join.",
    quote:
      "The panel mounts the Docker socket, which makes it root on the host. That's the reason it never gets port-forwarded — LAN or VPN only.",
    body: [
      "Three services in Docker Compose: the Fabric server, a backup sidecar that tars the world on a schedule and prunes by retention, and the panel. Server mods are resolved from Modrinth at start, so upgrading Minecraft is one line in .env rather than a manual mod hunt. Everything mutable lives in a bind mount, which means a container rebuild can't take the world with it.",
      "The server runs offline-mode, because half my friends are on launchers that can't do Mojang auth. That trades Mojang's username verification for something I had to build: a name gets approved in the panel, which opens a short registration window, and the player has to run /register inside it. Miss the window and the name comes back off the whitelist. After that it's a password on every login, enforced by EasyAuth.",
      "The panel is Next.js on the App Router with about thirty API routes. Console and logs stream over SSE rather than polling. Config and server files get a CodeMirror editor with JSON and YAML modes. Scheduled restarts and backups run on node-cron inside the panel container, and state lives in node:sqlite — no separate database service to babysit for a six-person server.",
      "The security model is the part worth stating plainly: the Minecraft port is the only thing that should ever face the internet, and the panel talks to the Docker socket, RCON, and the server files, so it gets treated like root on the host. It binds to the LAN and reaches me over Tailscale. RCON never leaves the internal Docker network.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Docker Compose",
      "Fabric",
      "RCON",
      "node:sqlite",
      "node-cron",
      "CodeMirror",
      "Modrinth API",
      "Tailscale",
    ],
    links: { github: "https://github.com/geneticglitch1/minecraft" },
  },
  {
    slug: "socratic",
    name: "Socratic Code Companion",
    year: "2026",
    cat: "Tooling",
    desc: "A VS Code reviewer that asks you one question instead of writing the fix. Runs entirely on a local model.",
    line: "A VS Code reviewer that asks one question instead of writing the fix, on a local model that can't reach the network.",
    tags: ["TypeScript", "VS Code", "MLX"],
    intro:
      "I'd hit a bug, tab-complete a fix I didn't fully understand, and move on slightly worse at my job than I started. The tools were doing the one part that actually makes you better. So I built the opposite: when it spots something off in code I just wrote, it asks me a question — one question — and makes me go look.",
    quote:
      "The moment it says \"line 40 has a use-after-free, here's the fix,\" it has failed.",
    body: [
      "It triggers on a real ⌘S and ignores autosave, so it never interrupts mid-thought. On save it takes the function I changed plus the diff — not the file, not the repo — and sends it to a local model whose system prompt exists to withhold answers.",
      "Support is rationed by a four-rung ladder: question, then a concept to reconsider, then the specific mechanism, and only as a last resort the worked answer. The rungs are advanced by the extension, not by the model, so it can't decide to skip ahead and just tell me. Where I landed on that ladder is what gets recorded — solving at the bare question means I caught it myself.",
      "It can be wrong, and being overruled is a first-class outcome rather than a failure. If I explain why the code is fine and I'm right, it concedes and logs it as overruled.",
      "Privacy is enforced in code rather than promised in a README: the extension refuses any endpoint that isn't a loopback address, so network egress isn't possible by construction. The event log is JSONL on disk, and a weekly review rolls it into a recurring-weakness note — which then feeds back in, so the sixth off-by-one gets called out as the sixth.",
    ],
    stack: [
      "TypeScript",
      "VS Code Extension API",
      "oMLX",
      "MLX",
      "gpt-oss-20b",
      "JSONL",
    ],
    links: { github: "https://github.com/geneticglitch1/socratic" },
  },
  {
    slug: "stint-studio",
    name: "Stint Studio",
    year: "2026",
    cat: "Mobile",
    desc: "An iOS drive logger that refuses to guess: it records raw stints and lets you assemble the trips by hand.",
    line: "An iOS drive logger that records raw stints and never auto-merges them — you assemble the trips yourself.",
    tags: ["Swift", "SwiftData", "MapKit"],
    intro:
      "Every drive logger I tried decided for me where one trip ended and the next began, and got it wrong often enough to make the history useless. This one records the atomic unit — a stint, one discrete movement of the car — and leaves the interpretation to me.",
    quote:
      "It suggests groupings and never applies them. A trip only exists because I tapped something.",
    body: [
      "A DriveStint is the atomic record: GPS waypoints, speed, distance, peak forward, braking and lateral G, harsh events, and plug state at both ends. Finalized stints land in an Inbox. A UserTrip is a container I assemble from them, and it's never finalized — I can eject a stint back to the Inbox, adopt new ones, reorder, or disband the trip entirely. Disbanding uses a nullify delete rule, so the stints survive their container.",
      "Recording is headless. A Shortcuts automation fires when the car's charger connects, which starts a stint at the first fix over 5 mph; unplugging stops it, as does three minutes stationary. The app ships native Start and Stop actions through App Intents, so setting it up doesn't involve typing a URL scheme. If I do open the app mid-drive, a live HUD floats over it with speed, elapsed time, and a G-meter.",
      "The trip detail is the payoff: a full time decomposition in Swift Charts showing the speed curve per stint, color-matched to the map route, with green plugged-in bands, grey unplugged bands for the pit stops, red rules on harsh events, and the elapsed / driving / parked split. Dragging across the chart scrubs it.",
      "Persistence is SwiftData behind a @ModelActor, so writes stay off the main thread. Structure is MVVM-C. Export is GPX, with a choice of merging the gaps between stints as pause points or skipping them entirely.",
    ],
    stack: [
      "Swift",
      "SwiftUI",
      "SwiftData",
      "Swift Charts",
      "MapKit",
      "App Intents",
      "Combine",
      "MVVM-C",
    ],
    links: { github: "https://github.com/geneticglitch1/stint-studio" },
  },
  {
    slug: "malloc",
    name: "High-Performance Custom Memory Allocator",
    year: "2025",
    cat: "Systems",
    desc: "A malloc/free written from scratch in C that beat the glibc allocator on the course benchmark.",
    line: "A malloc/free written from scratch in C that beat glibc's allocator on the CS 341 benchmark.",
    tags: ["C", "POSIX", "sbrk"],
    intro:
      "A full dynamic allocator in C, sitting on sbrk and implementing the whole malloc/calloc/realloc/free interface. The target was the glibc allocator that ships on every Linux box — match it first, then beat it, scored on the CS 341 benchmark suite.",
    quote:
      "Scored 122.6 against the optimized glibc baseline's 114.91.",
    body: [
      "The contest threw a workload mix at every student's allocator — one built to expose fragmentation, alignment, and locality bugs — and ranked submissions by a single score combining runtime and resident memory.",
      "Each block carries its metadata in a header right before the payload, so the free list walks without a separate index. Keeping that list address-sorted makes coalescing O(1) on free: a returning block looks at its two physical neighbors and merges in place.",
      "Splitting is fragmentation-aware. Instead of grabbing any block big enough, it prefers ones that leave a useful-sized remainder, and falls back to exact-fit when nothing fits that bill. realloc grows in place whenever the block to the right is free, skipping the copy a naive version would do.",
      "It held up under both small-allocation churn and big mixed workloads. Mostly it was a lesson in cache lines, branch prediction, and what one extra conditional costs on a hot path.",
    ],
    stack: ["C", "POSIX", "sbrk", "glibc benchmark suite"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "k3s-homelab",
    name: "High-Availability K3s Home Lab Cluster",
    year: "2024 — present",
    cat: "Infrastructure",
    desc: "Six K3s nodes in my apartment. Everything on this site runs on them.",
    line: "Six K3s nodes on Proxmox in my apartment, reconciled from Git. Everything on this site runs on them.",
    tags: ["K3s", "Proxmox", "Cloudflare"],
    intro:
      "A private cloud I built at home. Every AI, ML, and systems project here runs on it, behind networking the projects themselves never have to think about.",
    quote:
      "Fleet keeps the cluster reconciled against Git, so what's deployed is whatever's committed — not whatever I last did by hand at 1am.",
    body: [
      "Six VMs on Proxmox, K3s on top. It runs LLM inference, Postgres, vector stores, CI runners, photo and document storage, and this page.",
      "Nothing has a public IP. The only way in is a Cloudflare mTLS tunnel, with OPNsense at the edge, Suricata for IDS, and CrowdSec for adaptive blocking. WireGuard handles remote access when I need to be on the network rather than in front of one service.",
      "Longhorn replicates persistent volumes synchronously across three nodes, so a node dying overnight is something I read about the next morning instead of getting paged for.",
      "The CI side is Komodo: build a Docker image, push to GHCR, roll it out with zero downtime. I almost never touch a deploy by hand.",
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
      "Komodo",
    ],
    links: {},
  },
  {
    slug: "envsync",
    name: "EnvSync",
    year: "2026",
    cat: "Full Stack",
    desc: "A secret manager that encrypts on your machine and ships the server only ciphertext.",
    line: "A secret manager that encrypts on your machine and ships the server only ciphertext, for teams done pasting API keys into Slack.",
    tags: ["Rust", "Spring Boot", "AES-GCM"],
    intro:
      "Versions, diffs, and syncs .env files across machines and teammates, built so the server never holds anything readable. Encryption happens on the client; the backend only ever stores ciphertext.",
    quote:
      "Keys derived on-device with Argon2id, secrets sealed with AES-GCM, and only the ciphertext leaves your machine.",
    body: [
      "Everything is encrypted client-side before it leaves. A passphrase runs through Argon2id (tuned to ~250 ms — slow enough to make brute force miserable), then AES-GCM seals the secrets. The server sees ciphertext and nothing else. No admin override, no password reset: lose the passphrase and the vault is gone, on purpose.",
      "The Rust CLI behaves like git: envsync push, pull, diff, rollback. Login is OAuth2 device-code with auto-refresh, so the CLI never touches the password. Each project keeps its own snapshot history, which makes a bad rotation a one-command undo.",
      "Conflict resolution is deterministic, so two people editing the same vault never diverge. Scopes are per-project, so a leaked token costs you one vault, not all of them. Every push builds, tests, and deploys to K3s through a Komodo pipeline.",
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
      "Komodo",
    ],
    links: { github: "https://github.com/geneticglitch1/EnvSync" },
  },
  {
    slug: "schema",
    name: "Schema — AI Document Search",
    year: "2026",
    cat: "AI / ML",
    desc: "RAG over your own PDFs so the model cites real passages instead of inventing them.",
    line: "RAG over your own PDFs so the model cites real passages instead of inventing them — handwriting included.",
    tags: ["FastAPI", "pgvector", "CUDA"],
    intro:
      "A RAG pipeline that lets a model quote from your private library instead of hallucinating around it. It ingests typed and handwritten PDFs, embeds them with Instructor-XL, and retrieves with a re-ranking pass on top of pgvector.",
    quote:
      "On real 800-page documents it surfaced 80–90% relevant passages — enough for the model downstream to ground its answers in the source.",
    body: [
      "Ingestion is async and routes each PDF to one of two extractors: PyMuPDF for typed text, TrOCR for scanned or handwritten pages. Both paths feed a sentence-aware chunker with overlapping windows, so meaning doesn't get cut in half at a chunk boundary.",
      "Embeddings run 64 chunks at a time against hkunlp/instructor-xl on CUDA, which keeps the GPU busy during bulk ingestion. Vectors land in Actian Vector — picked for its hybrid filtering — with the original chunk metadata stored next to them.",
      "Retrieval pairs vector similarity with a re-ranking layer, so what reaches the model is actually relevant, not just nearest in latent space. I validated it on real 800-page reference documents across a few domains, where it kept pulling the right passages.",
      "The backend is FastAPI with Supabase JWT auth and user-scoped filtering on every query. Deletes cascade across PostgreSQL, the filesystem, and the vector store, so revoking a document actually removes it everywhere.",
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
    slug: "journaling",
    name: "AI-Powered Digital Journaling Platform",
    year: "2025",
    cat: "Full Stack",
    desc: "A journaling app that reads your webcam and calendar, then writes a prompt that fits the day you had.",
    line: "A journaling app that watches your webcam and reads your calendar, then writes a prompt that fits the day you actually had.",
    tags: ["Next.js", "FastAPI", "Claude"],
    intro:
      "Reflection prompts that feel like they know what kind of day you had. The app reads your face off the webcam and your schedule off the calendar, then writes something more specific than 'how are you feeling?' I built the AI layer as one piece of a 15-person team project.",
    quote:
      "The vision service stays under 100 ms a frame, so the camera feed reads as live instead of laggy.",
    body: [
      "I owned the AI layer end to end: pulling the right context together, shaping it into a prompt the model could actually use, and getting the response back to the UI before it felt slow.",
      "The prompts come out of a RAG pipeline on Claude 3.5 Sonnet. It pulls together mood ratings, what the webcam saw during the day, and what was on the calendar, then asks Claude for something grounded in all of that — not a generic 'reflect on your day.'",
      "Vision runs in its own FastAPI service on MediaPipe and OpenCV, under 100 ms a frame, so the UI can show what the model thinks it sees without stalling the loop.",
      "CI/CD is Komodo: every push builds the Next.js frontend, the vision service, and the backend, then rolls them out to K3s as Docker images.",
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
      "Komodo",
      "K3s",
    ],
    links: {},
  },
  {
    slug: "urban-analytics",
    name: "Pathway to Improved Cities — Urban Analytics",
    year: "2025",
    cat: "AI / ML",
    desc: "Models trained on a few million Chicago city records to flag which neighborhoods get shorted on services.",
    line: "Trained models on a few million Chicago city records to flag which neighborhoods get shorted on services.",
    tags: ["Python", "XGBoost", "PySAL"],
    intro:
      "The Chicago Data Portal has years of 311 calls, crime reports, and service records sitting out in the open. Could you point at a neighborhood and predict whether it gets its fair share of city services? Turns out yes — and the answer is sometimes uncomfortable.",
    quote:
      "XGBoost and Random Forest on millions of municipal records, cross-checked against PySAL spatial clusters of crime and traffic incidents.",
    body: [
      "XGBoost and Random Forest, trained on a few million rows of city records — reported incidents, response times, demographic geography — landing high precision and recall on whether a neighborhood is underserved.",
      "A NumPy + Pandas ETL pulls live updates from the portal, with cached intermediate stages so a refresh stays cheap. The dashboard stays current and the models retrain on recent data.",
      "On top of that, a PySAL spatial pass finds geographic clusters of crime and traffic incidents, so you can eyeball where the predictions line up with the ground truth. It all renders as a Streamlit dashboard with Plotly and Mapbox layers.",
      "The point was never a paper. It was getting the data clear enough that someone who actually allocates city services could open the map and see where the gaps are.",
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
    slug: "maze-robot",
    name: "Autonomous Maze Solver — Robot Tour",
    year: "2024",
    cat: "Hardware",
    desc: "A dual-core Pi Pico robot that solves mazes on its own.",
    line: "A dual-core Pi Pico maze robot. Giving every sensor its own core is what stopped it crashing.",
    tags: ["C / C++", "Pi Pico", "Sensors"],
    intro:
      "A robot that drives a maze on its own from pre-programmed distances and turns. The hard part wasn't the navigation — it was that the cheap motors and sensors I had to use bring none of the precision the task needs.",
    quote:
      "The crashing stopped the moment every sensor got its own core — Core 0 on the main loop, Core 1 fielding the secondary interrupts.",
    body: [
      "The Pico's two cores were the unlock. My first version multiplexed every sensor onto one core and kept crashing under interrupt load. Splitting it — Core 0 on the primary loop, Core 1 on the secondary sensor interrupts — made the contention disappear.",
      "Cheap yellow DC motors have enough backlash and inertia to overshoot any naive angle-based turn. The fix was a dynamic rotation routine: a turn only ends once the gyro reads the target angle and angular velocity has fallen to zero — accurate headings even on a surface with unpredictable friction.",
      "Command sequences get pre-compiled through a C preprocessor pass that turns the authored arrays into something the main loop consumes directly, so the hot path stays branch-free.",
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
    slug: "nonstop-networking",
    name: "Nonstop Networking",
    year: "2025",
    cat: "Systems",
    desc: "An epoll server in C that holds any number of connections on one thread.",
    line: "An epoll server in C that holds any number of connections on one thread: a state machine per socket, no threads.",
    tags: ["C", "epoll", "TCP"],
    intro:
      "An event-driven server in C built on epoll and non-blocking I/O. One thread, a state machine per connection, and as many concurrent clients as the box can hold.",
    quote:
      "One thread, one reactor, one state machine per connection — partial reads and writes pick up exactly where the last EAGAIN left off.",
    body: [
      "The reactor is a single-threaded epoll loop. Every connection carries a state machine that remembers exactly where the last read or write stopped, so a half-received request or a partial response just resumes on the next wake-up. No thread-per-connection, no busy-waiting.",
      "The wire format is a custom binary protocol — GET, PUT, DELETE, LIST over TCP, with explicit error codes and length prefixes. The framing edge cases (short reads, a write blocking mid-response, a client vanishing) get handled in the state machine instead of papered over with retries.",
    ],
    stack: ["C", "epoll", "POSIX sockets", "non-blocking I/O"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "parallel-make",
    name: "Parallel Make",
    year: "2025",
    cat: "Systems",
    desc: "A multi-threaded make(1): parse the Makefile into a DAG, then run what isn't waiting.",
    line: "A multi-threaded make(1): parse the Makefile into a DAG, then run everything that isn't waiting on something else.",
    tags: ["C", "pthreads", "DAG"],
    intro:
      "A multi-threaded build system in C. It parses a Makefile into a dependency DAG and hands rules to worker threads in dependency order — the same contract make -j honors, written from scratch.",
    quote:
      "A thread pool sits on a condition-variable-guarded ready queue, waking a worker only when a new rule becomes runnable — so idle cores never spin.",
    body: [
      "The DAG builder rejects cycles before any scheduling starts. The executor's thread pool uses condition variables on the ready queue, so workers sleep when there's nothing to do and wake the moment a rule's dependencies are satisfied.",
      "Failure handling is the interesting part. When a rule fails, that failure has to propagate up the DAG without leaking threads or leaving half-built targets around. Cancellation walks the graph, marks the now-unreachable targets, and joins every worker cleanly.",
    ],
    stack: ["C", "pthreads", "mutex / cond vars", "DAG scheduling"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "sshell",
    name: "sshell — POSIX Shell",
    year: "2025",
    cat: "Systems",
    desc: "A POSIX shell with a tokenizer and parser written by hand.",
    line: "A POSIX shell — pipes, redirection, && / ||, job control — with a tokenizer and parser written by hand.",
    tags: ["C", "POSIX", "signals"],
    intro:
      "A POSIX shell that handles real argument parsing, background processes, logical operators, and file redirection — most of what sh gives you, minus the scripting language.",
    quote:
      "A hand-written tokenizer and parser cover quoted arguments, pipes, && / || / ;, and < / > / >> redirection — no grammar library in sight.",
    body: [
      "Tokenizing and parsing are both hand-written, which keeps the binary small and the dependency count at zero. Quoted arguments, multi-stage pipelines, conditional sequences, and file redirection all run through one expression tree.",
      "Process management is plain fork / execvp / waitpid, with explicit signal handling for Ctrl-C and Ctrl-Z so the shell doesn't die from signals meant for its children. Background jobs report finishing asynchronously, without stomping on the prompt you're in the middle of typing.",
    ],
    stack: ["C", "POSIX", "fork / exec / wait", "signals"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "finding-filesystems",
    name: "Finding Filesystems",
    year: "2025",
    cat: "Systems",
    desc: "Walks a raw ext2 image straight off the disk bytes, without asking the kernel.",
    line: "Walks a raw ext2 image straight off the disk bytes — superblock, inodes, indirect pointers — without asking the kernel.",
    tags: ["C", "ext2"],
    intro:
      "A tool that walks a raw ext2 image by hand: parse the superblock, traverse the inode and block-group descriptor tables, and rebuild the directory tree — none of it leaning on the kernel's filesystem support.",
    quote:
      "It resolves inode → block mappings through direct, singly-indirect, and doubly-indirect pointers, reading straight off the disk bytes.",
    body: [
      "Reading a real filesystem from scratch is mostly an exercise in trusting what's on disk over what the diagram in the spec says. The parser reads the superblock, walks the block-group descriptors, and resolves inodes through the full pointer hierarchy.",
      "It rebuilds the directory tree from the on-disk dir_entry records, so a corrupted entry throws a useful error instead of silently going missing.",
    ],
    stack: ["C", "ext2", "on-disk structures"],
    links: { note: "UIUC honor code — source is private" },
  },
  {
    slug: "xraypdf",
    name: "XRayPDF",
    year: "2026",
    cat: "Tooling",
    desc: "Pulls the hidden text out of a PDF: invisible layers, white-on-white runs, buried metadata.",
    line: "Pulls the hidden text out of a PDF: invisible layers, white-on-white runs, strings buried in metadata.",
    tags: ["TypeScript", "PDF.js"],
    intro:
      "A tool that digs the sneaky text out of a PDF — invisible layers, white-on-white runs, strings buried in metadata, all the stuff a normal reader skips right over. Handy when you're vetting a document someone else wrote.",
    quote:
      "If a PDF is hiding something between the glyphs it renders, this reads it back out.",
    body: [
      "It's built on PDF.js: walk every text-object stream in the document and pull out anything the renderer would normally suppress — zero-opacity layers, runs color-matched to the background, hidden form-field defaults, metadata strings.",
    ],
    stack: ["TypeScript", "PDF.js"],
    links: { github: "https://github.com/geneticglitch1/XRayPDF" },
  },
  {
    slug: "seafile-mtls",
    name: "Seafile + mTLS",
    year: "2026",
    cat: "Infrastructure",
    desc: "A Seafile desktop-client fork that presents a client cert on every handshake.",
    line: "A Seafile desktop-client fork that presents a client cert on every handshake, so it works behind an mTLS tunnel.",
    tags: ["C++", "Qt", "OpenSSL"],
    intro:
      "A fork of the Seafile desktop client with mutual-TLS bolted on: the client proves itself to the server with a certificate, on top of the password auth that was already there.",
    quote:
      "Handy when the storage server sits behind a Cloudflare tunnel that already terminates mTLS at the edge.",
    body: [
      "The Qt client is patched to load a client certificate and present it on every TLS handshake. Small in line count, but it touches the network layer, the settings UI, and the per-platform keychain integration all at once.",
    ],
    stack: ["C++", "Qt", "OpenSSL", "Seafile"],
    links: { github: "https://github.com/geneticglitch1/seafile-client" },
  },
  {
    slug: "mnist-java",
    name: "Handwritten Digit Neural Network (From Scratch)",
    year: "2024",
    cat: "AI / ML",
    desc: "An MNIST net in Java with no ML library and no autograd. Backprop by hand.",
    line: "An MNIST net in Java with no ML library and no autograd. Backprop by hand, so the gradients had nowhere to hide.",
    tags: ["Java", "MNIST"],
    intro:
      "A small feed-forward net written entirely in Java, no external ML libraries. The whole point was to make forward propagation, backprop, and stochastic gradient descent concrete instead of abstract.",
    quote:
      "Forward pass, backward pass, activations — all written out directly, so I could follow the gradient flow by hand.",
    body: [
      "Trained on MNIST with SGD to recognize handwritten digits zero through nine. The weights and activations are explicit matrices I multiply myself, which turned every shape mismatch into something I had to actually understand rather than a stack trace to google.",
    ],
    stack: ["Java", "Linear algebra", "MNIST"],
    links: {},
  },
];
