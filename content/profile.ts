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
  shortBio: "Junior at UIUC. C, CUDA, and the cluster in my basement.",
  tagline:
    "Junior at UIUC studying CS + Math. Mostly C, CUDA, and the K3s cluster in my basement.",
  summary:
    "I'm a junior at UIUC studying CS + Math. I work on two kinds of problems: code that has to be fast, and infrastructure that has to not go down. This site is hosted on the second one.",
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
        "I moved the OS job scheduler onto an FPGA. Throughput doubled.",
      bullets: [
        "Took the job scheduler off the CPU and put it on a Xilinx Alveo U55C FPGA. The CPU had been burning cycles doing the thing it was supposed to be managing — once the FPGA owned scheduling, the host could actually do work.",
        "Killed the double-copy between host and FPGA by sharing physical memory between them. Throughput doubled because we stopped paying for transfers we didn't need.",
        "Wrote a three-thread C++ pipeline — Writer, Reader, Logger — that kept two FPGA kernels fed at all times. Lock-free ring buffers on the hot path, mutexes for the rest. The kernels never sat idle.",
        "Moved the task queue into hardware so high-priority jobs don't wait on the OS scheduler. Latency dropped to microseconds.",
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
