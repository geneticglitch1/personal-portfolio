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
      "A custom memory allocator that outscored both stock and optimized glibc on the official benchmark suite.",
    year: "2025",
    link: "/projects/malloc",
  },
  {
    title: "UIUC Capture-the-Flag (CTF) Competition — 4th of 25+ teams",
    detail:
      "Binary exploitation, reverse engineering, cryptography, and web; placed 4th.",
    year: "2025",
  },
  {
    title: "Science Olympiad Robot Tour — 5th of 50 regional teams",
    detail:
      "Autonomous maze navigation on a Raspberry Pi Pico — the top-performing robot from the school.",
    year: "2024",
    link: "/projects/robot-tour",
  },
];

export const profile = {
  name: "Aryan Singh",
  shortBio: "CS + Math at UIUC. Allocators, CUDA kernels, a home Kubernetes cluster.",
  tagline:
    "Computer Science and Mathematics at the University of Illinois. Allocators, CUDA kernels, and a home Kubernetes cluster.",
  summary:
    "Computer Science and Mathematics student at the University of Illinois, graduating May 2027. The work splits in two: software where performance is the point — memory allocators, CUDA kernels, OS schedulers — and the infrastructure to run it reliably. Everything here runs on a self-managed Kubernetes cluster.",
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
        "Moved the OS job scheduler onto an FPGA. Throughput doubled.",
      bullets: [
        "Moved scheduling off the CPU and onto a Xilinx Alveo U55C FPGA. With the FPGA owning the scheduler, the host CPU stopped burning cycles managing the work it could be doing.",
        "Removed the host–FPGA double-copy by sharing physical memory between them; throughput doubled once those redundant transfers were gone.",
        "Built a three-thread C++ pipeline — Writer, Reader, Logger — to keep two FPGA kernels fed continuously: lock-free ring buffers on the hot path, mutexes elsewhere. The kernels never idled.",
        "Moved the task queue into hardware so high-priority jobs bypass the OS scheduler, dropping latency to microseconds.",
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
