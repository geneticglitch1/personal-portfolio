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
      "Custom memory allocator outperformed both stock glibc and the optimized glibc baseline on the official benchmark suite.",
    year: "2025",
    link: "/projects/malloc",
  },
  {
    title: "UIUC Capture-the-Flag (CTF) Competition — 4th of 25+ teams",
    detail:
      "Binary exploitation, reverse engineering, cryptography, and web tracks.",
    year: "2025",
  },
  {
    title: "Science Olympiad Robot Tour — 5th of 50 regional teams",
    detail:
      "Best-performing team in the school. Autonomous maze navigation on a Raspberry Pi Pico.",
    year: "2024",
    link: "/projects/robot-tour",
  },
];

export const profile = {
  name: "Aryan Singh",
  tagline:
    "Computer Science & Mathematics at UIUC. Builds high-throughput systems, ML infrastructure, and the K3s cluster that runs it all.",
  summary:
    "Aryan studies Computer Science and Mathematics at the University of Illinois Urbana-Champaign. He writes low-level systems code, ships full-stack products, and operates the self-hosted Kubernetes cluster that his projects live on.",
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
        "Designed an FPGA-offloaded batch job scheduler that doubled production throughput.",
      bullets: [
        "Architected a high-performance pipeline that offloads OS-level job scheduling onto a Xilinx Alveo U55C FPGA using Vitis HLS and modern C++, freeing the host CPU from kernel-level resource management.",
        "Doubled system throughput by building a host memory-mapping interface that gave the host and FPGA shared physical memory, eliminating redundant host-to-device copies on production workloads.",
        "Engineered a multi-threaded C++ data pipeline — Writer, Reader, Logger threads backed by mutex-locked queues and lock-free circular buffers — that kept dual free-running kernels saturated with zero idle time.",
        "Designed deterministic hardware scheduling for on-chip task-queue management, bypassing OS scheduler bottlenecks so high-priority dispatches resolve with microsecond latency.",
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
