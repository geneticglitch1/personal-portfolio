# Design prompt — Aryan Singh portfolio

> Paste this into Claude (design / artifact mode). It produces the visual design. Porting it into
> the real Next.js codebase is handled separately — you do **not** need to worry about frameworks,
> deploys, or file structure. Just make it look and move beautifully.

---

## What I want

Design a personal portfolio for **Aryan Singh** and deliver it as **one self-contained HTML file**
I can open in a browser and preview. It must look like a **typographic design magazine**, and it
must be **heavily animated but never tacky** — motion exists to land the content, never to decorate.

Use the **real content at the bottom of this prompt** — no lorem ipsum, no placeholder names.

### Output format
- A single `.html` file. Tailwind via CDN (or inline CSS) — no build step, opens directly.
- **Animations must actually run** in the file: use Lenis (CDN) for smooth scroll, and GSAP +
  ScrollTrigger (CDN) or the Web Animations API for reveals, count-ups, pinning, parallax.
- Desktop-first, but responsive down to mobile. Respect `prefers-reduced-motion` (static fallback).
- Two or three sections fully designed beats ten sections half-done — but aim for the full page.

---

## Who it's for (so the design has a point of view)

Aryan is a CS + Math junior at UIUC — a systems / performance / infrastructure person. His whole
identity: **code that has to be fast, and infrastructure that must not go down.** The single best
flex on the site: *this site is served from the same 6-node K3s cluster in his basement that it
describes — 99.9% uptime, no Vercel.* Make the design make me believe that.

Tone is dry, understated, first-person. Let the numbers do the bragging. Nothing salesy.

---

## Aesthetic: editorial + richly animated

Printed broadsheet / design-magazine spread, brought to life. Big type, asymmetric grid, generous
whitespace, monospace used for every technical detail like a printed spec sheet. Polish at the
level of Linear or Vercel marketing pages — but warmer and more editorial.

### Motion — DO (this is the floor, not a menu — the result must read as genuinely motion-rich)
- Lenis momentum/smooth scroll.
- Headline reveals: `clip-path` / mask wipes + line-by-line staggered fades on enter.
- **Count-ups on the real numbers** when a metric scrolls into view (the signature move — see the
  metrics list). Ease-out, ~0.8–1.2s, runs once.
- Animated editorial **pull quotes**.
- Magnetic links/buttons (a few px of pull toward the cursor).
- Project rows that expand / reveal on hover with intent.
- A pinned/sticky section transition or two; **small-scale** layered parallax (transform-only).
- Smooth crossfade transitions between views/sections.
- Optional, pick at most one: slow tasteful skills marquee; variable-font weight shift on hover.

### Motion — DON'T (the anti-tacky list)
- ❌ No 3D galaxies, starfields, floating particles, gratuitous WebGL.
- ❌ No autoplay audio / sound effects.
- ❌ No neon glow on everything, no glassmorphism overload, no heavy blur.
- ❌ No bouncy overshoot springs on every element, no confetti, no cursor trails, no typewriter
  effect on every heading.
- ❌ No rainbow gradients, no gradient text as a crutch.
- ❌ No "enter site" loader that wastes time. No motion that delays readable content > ~300ms or
  hijacks scroll.

If unsure whether something is tacky: it is. Cut it.

---

## Type, color, grid

- **Type (the backbone):** editorial contrast across three roles. *Display* (huge headlines): a
  high-contrast serif (e.g. Fraunces) **or** a strong grotesk (Inter Tight / Geist) — pick one and
  commit. *Body:* clean grotesk (Inter / Geist). *Mono* (the systems signature): use for every
  stack tag, metric value, year, category label, and margin annotation. (Geist Mono / JetBrains Mono.)
- **Color:** restrained — a paper/ink base + **exactly one** accent. Either warm off-white + near-
  black ink, or refined near-black + warm off-white. Accent appears only on metrics, links, key
  emphasis. No second accent. High contrast.
- **Grid:** 12-col, asymmetric, big margins, lots of whitespace, varied spans. Mono labels/numbers
  in the margins like a reference sheet.

---

## Page structure

1. **Hero** — name, the tagline, an oversized animated headline, a mono sub-line. A small live-
   feeling badge: *"served from a 6-node K3s cluster · 99.9% uptime."* Quiet scroll cue.
2. **Selected work** — feature spreads for the 4 flagships (below), each with a big **count-up**
   metric, its pull quote, a one-line intro, and mono stack tags.
3. **Index** — the remaining projects as an editorial list/table (`year · name · category ·
   tagline`), hover-expand.
4. **Experience** — the UIC FPGA role: headline + bullets.
5. **Skills** — grouped mono-tag clusters.
6. **Awards** — three, editorial.
7. **About / education** — UIUC CS + Math, GPA, grad date, memberships.
8. **Contact + footer** — email, GitHub, LinkedIn, résumé; footer carries the self-hosted flex line.

---

## The numbers the motion should land (real)

- malloc: **1st / 400** (scored 122.6 vs. glibc baseline 114.91)
- GPT-2 in CUDA: **24.2×** speedup (249.8 ms → 10.3 ms); **117×** per-token via KV cache
- UIC FPGA scheduler: throughput **2×**, latency → **microseconds**
- K3s homelab: **6 nodes**, **99.9%** uptime / 12 months
- supporting: CTF **4th / 25+**, Science Olympiad **5th / 50**, GPA **3.89**

---

# CONTENT (use verbatim — this is real)

**Name:** Aryan Singh
**Tagline:** Junior at UIUC studying CS + Math. Mostly C, CUDA, and the K3s cluster in my basement.
**Summary:** I'm a junior at UIUC studying CS + Math. I work on two kinds of problems: code that has
to be fast, and infrastructure that has to not go down. This site is hosted on the second one.
**Location:** Champaign, IL · Chicago, IL
**Email:** asing271@illinois.edu · **GitHub:** github.com/geneticglitch1 ·
**LinkedIn:** linkedin.com/in/aryan-singh06 · **Résumé:** /resume.pdf
**Education:** University of Illinois Urbana-Champaign — B.S. Computer Science & Mathematics ·
GPA 3.89 · grad May 2027.
**Memberships:** ACM at UIUC, SIGCHI, SIG AIDA.

### Flagship projects (feature these)

**High-Performance Custom Memory Allocator** — C / systems — `1st / 400`
*Tagline:* I wrote a malloc from scratch in C and beat both stock and optimized glibc on the CS 341
benchmark.
*Pull quote:* "First out of four hundred students. My allocator scored 122.6 — the optimized glibc
baseline scored 114.91 on the same suite."
Stack: C, POSIX, sbrk, glibc benchmark suite.

**GPT-2 Inference Engine — from Scratch in CUDA** — AI / systems — `24.2×`
*Tagline:* I wrote a complete GPT-2 forward pass in raw CUDA and tuned it from 249 ms to 10 ms.
*Pull quote:* "I drove the end-to-end forward pass from 249.8 ms to 10.3 ms — a 24.2× speedup.
Per-token generation hit a 117× peak via KV caching."
Stack: CUDA, C++17, CUTLASS, Tensor Cores, FlashAttention, cuBLAS, Nsight.

**High-Availability K3s Home Lab Cluster** — infrastructure — `99.9%`
*Tagline:* I run six K3s nodes in my basement — every project on this site lives on them.
*Pull quote:* "Six-node Kubernetes on Proxmox, 99.9% uptime, fully behind mTLS Cloudflare tunnels
with zero exposed public IPs."
Stack: K3s, Proxmox, OPNsense, Cloudflare Tunnels, Suricata, CrowdSec, WireGuard, Longhorn, Jenkins.

**OS Job Scheduler on an FPGA (UIC, Systems Engineer, May–Aug 2025)** — `2× throughput`
*Headline:* I moved the OS job scheduler onto an FPGA. Throughput doubled.
Bullets: moved scheduling off the CPU onto a Xilinx Alveo U55C FPGA so the host could do real work;
killed the host↔FPGA double-copy via shared physical memory (throughput 2×); wrote a 3-thread
C++ pipeline (Writer/Reader/Logger) with lock-free ring buffers keeping two kernels fed; moved the
task queue into hardware so high-priority jobs hit microsecond latency.

### Other projects (index)

EnvSync — zero-knowledge secret manager, Argon2id + AES-GCM, Rust CLI + Spring Boot (2026) ·
Schema — RAG document search, pgvector + re-ranking, 80–90% relevant on 800-page docs (2026) ·
AI Journaling Platform — webcam + calendar-aware reflections, vision < 100 ms/frame, 15-person team
(2025) · Pathway to Improved Cities — XGBoost/Random Forest on millions of Chicago records (2025) ·
Nonstop Networking — single-thread epoll C server, state machine per connection (2025) ·
Parallel Make — multithreaded `make` with DAG scheduling (2025) · sshell — POSIX shell w/ pipes &
redirection (2025) · Finding Filesystems — ext2 on-disk inode parser (2025) · MNIST NN — from
scratch in Java, no ML libs (2024) · XRayPDF — surfaces hidden text in PDFs (2026) · Seafile + mTLS
— forked the desktop client, added mutual-TLS auth (2026) · Autonomous Maze Solver — dual-core Pi
Pico robot, 5th/50 at State Science Olympiad (2024).

### Skills (group as mono-tag clusters)

**Languages:** C, C++, Rust, Python, Java, TypeScript, CUDA, SQL
**AI / ML:** PyTorch, TensorFlow, LangChain, RAG, vector embeddings, Anthropic SDK, MCP, Ollama,
vLLM, Whisper, MediaPipe, OpenCV, TrOCR
**Web & Backend:** Next.js, React, FastAPI, Spring Boot, Django, PostgreSQL, Redis, pgvector, Supabase
**Infrastructure:** K3s, Docker, Proxmox, OPNsense, WireGuard, Traefik, Longhorn, Fleet, Cloudflare,
Jenkins, Keycloak, MinIO
**Tools:** Git, Linux, Nsight Systems, Nsight Compute, Cursor, Claude Code

### Awards

CS 341 Malloc Performance Contest — **1st of 400** (2025) · UIUC Capture-the-Flag — **4th of 25+
teams** (2025) · Science Olympiad Robot Tour — **5th of 50** regional teams (2024).
