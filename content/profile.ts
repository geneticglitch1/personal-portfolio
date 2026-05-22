export interface Award {
  title: string;
  detail: string;
  year: string;
  link?: string;
}

const awards: readonly Award[] = [
  {
    title: "CS 341 Malloc Performance Contest — 1st of 400",
    detail:
      "My custom memory allocator outscored both stock glibc and the optimized glibc baseline on the official benchmark suite.",
    year: "2025",
    link: "/projects/malloc",
  },
  {
    title: "UIUC Capture-the-Flag (CTF) Competition — 4th of 25+ teams",
    detail:
      "I played binary exploitation, reverse engineering, cryptography, and web — and we placed 4th.",
    year: "2025",
  },
  {
    title: "Science Olympiad Robot Tour — 5th of 50 regional teams",
    detail:
      "I built the best-performing team's robot at our school. Autonomous maze navigation on a Raspberry Pi Pico.",
    year: "2024",
    link: "/projects/robot-tour",
  },
];

export const profile = {
  name: "Aryan Singh",
  shortBio: "CS + Math at UIUC. I build systems that go fast.",
  tagline:
    "I write low-level systems code, ship full-stack products, and run the six-node K3s cluster every one of them lives on.",
  summary:
    "I'm a junior at the University of Illinois Urbana-Champaign studying Computer Science and Mathematics. I write CUDA kernels and memory allocators on weekdays, ship full-stack products on weekends, and keep the self-hosted K3s cluster behind all of it running at 99.9%.",
  location: "Champaign, IL · Chicago, IL",
  email: "asing271@illinois.edu",
  socials: {
    github: "https://github.com/geneticglitch1",
    githubAlt: "https://github.com/geneticglitch",
    linkedin: "https://linkedin.com/in/aryan-singh06",
  },
  resume: "/resume.pdf",
  education: {
    school: "University of Illinois Urbana-Champaign",
    degree: "B.S. Computer Science & Mathematics",
    gpa: "3.89",
    graduation: "May 2027",
    coursework: [
      "CS 446: Machine Learning",
      "CS 425: Distributed Systems",
      "CS 483: Applied Parallel Programming (CUDA)",
      "CS 475: Formal Models of Computation",
      "CS 374: Algorithms & Models of Computation",
      "CS 341: System Programming",
      "CS 411: Database Systems",
      "CS 357: Numerical Methods I",
      "CS 233: Computer Architecture",
      "CS 225: Data Structures",
      "CS 173: Discrete Structures",
      "MATH 412: Graph Theory",
      "MATH 441: Differential Equations",
      "MATH 314: Introduction to Higher Mathematics",
    ],
  },
  experience: [
    {
      company: "University of Illinois Chicago",
      role: "Systems Engineer",
      period: "May 2025 – August 2025",
      location: "Chicago, IL",
      headline:
        "I designed an FPGA-offloaded batch job scheduler that doubled production throughput.",
      bullets: [
        "I architected a high-performance pipeline that offloads OS-level job scheduling onto a Xilinx Alveo U55C FPGA using Vitis HLS and modern C++, freeing the host CPU from kernel-level resource management.",
        "I doubled system throughput by building a host memory-mapping interface that gave the host and FPGA shared physical memory, eliminating redundant host-to-device copies on production workloads.",
        "I engineered a multi-threaded C++ data pipeline — Writer, Reader, and Logger threads backed by mutex-locked queues and lock-free circular buffers — that kept dual free-running kernels saturated with zero idle time.",
        "I designed deterministic hardware scheduling for on-chip task-queue management, bypassing OS scheduler bottlenecks so high-priority dispatches resolve with microsecond latency.",
      ],
    },
  ],
  awards,
  memberships: ["ACM at UIUC", "SIGCHI", "SIG AIDA"],
  skills: {
    Languages: [
      "C",
      "C++",
      "Rust",
      "Python",
      "Java",
      "TypeScript",
      "CUDA",
      "SQL",
    ],
    "AI / ML": [
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "RAG Pipelines",
      "Vector Embeddings",
      "Semantic Search",
      "Anthropic SDK",
      "OpenAI SDK",
      "Model Context Protocol",
      "Ollama",
      "vLLM",
      "Whisper",
      "MediaPipe",
      "OpenCV",
      "TrOCR",
    ],
    "Python Data": [
      "NumPy",
      "Pandas",
      "scikit-learn",
      "XGBoost",
      "Random Forest",
      "PySAL",
      "GeoPandas",
      "Plotly",
      "Streamlit",
      "Mapbox",
    ],
    "Web & Backend": [
      "Next.js",
      "React",
      "FastAPI",
      "Spring Boot",
      "Fastify",
      "Django",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "Supabase",
    ],
    Infrastructure: [
      "Kubernetes (K3s)",
      "Docker",
      "Proxmox",
      "OPNsense",
      "WireGuard",
      "Traefik",
      "Longhorn",
      "Fleet",
      "Cloudflare",
      "Jenkins CI/CD",
      "GitHub Actions",
      "Keycloak",
      "MinIO",
    ],
    Tools: [
      "Git",
      "Linux",
      "Nsight Systems",
      "Nsight Compute",
      "VS Code",
      "Cursor",
      "Claude Code",
      "Postman",
    ],
  },
} as const;

export type Profile = typeof profile;
