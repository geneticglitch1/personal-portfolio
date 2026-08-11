import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Newsreader,
  Instrument_Serif,
} from "next/font/google";
import LenisProvider from "@/components/motion/LenisProvider";
import Backdrop from "@/components/Backdrop";
import StructuredData from "@/components/StructuredData";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/content/site";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--mono",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});

/* The landing page only. One weight, no italic — it sets the name and the one
   line under it, and nothing else on the site uses it. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--display",
  display: "swap",
});

export const metadata: Metadata = {
  // Every relative URL below — canonical, og:image, the icons — resolves
  // against this. Without it Next emits them as paths, and OG scrapers that
  // don't resolve relative to the document silently drop the card.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Aryan Singh",
  authors: [{ name: "Aryan Singh", url: SITE_URL }],
  creator: "Aryan Singh",
  publisher: "Aryan Singh",
  category: "technology",
  keywords: [
    "Aryan Singh",
    "systems engineer",
    "CUDA",
    "GPU programming",
    "FPGA",
    "high performance computing",
    "memory allocator",
    "C++",
    "Rust",
    "homelab",
    "Kubernetes",
    "UIUC",
    "University of Illinois",
    "software engineering internship 2027",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
    // Discovery hint for anything that prefers the plain-text summary to
    // parsing a page made mostly of inline SVG.
    types: { "text/plain": `${SITE_URL}/llms.txt` },
  },
  openGraph: {
    type: "profile",
    firstName: "Aryan",
    lastName: "Singh",
    username: "geneticglitch1",
    url: SITE_URL,
    siteName: "Aryan Singh",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Aryan Singh — systems engineer. CUDA, FPGA offload, infrastructure.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google use the full snippet and a large thumbnail instead of the
      // conservative defaults it picks on its own.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#DDD6C4",
};

/**
 * Marks the document as animating before first paint, so the read-head base
 * state in CSS applies without a flash. Skipped entirely under reduced motion,
 * which leaves every block in its final visible state.
 */
const MOTION_FLAG = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

const UMAMI_SITE_ID = "66a4ccd6-e6ea-43f4-a46f-bed24397bc18";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The MOTION_FLAG script below adds a class to <html> before React
    // hydrates, so the class list is expected to differ from the server's.
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />

        {/* Person / ProfilePage / WebSite, built from content/ so it can't
            drift from the page. */}
        <StructuredData />

        {/* Umami: pageviews plus session recording. `async` rather than
            `defer` — React 19 hoists and executes async scripts natively, so
            these load on parse instead of waiting on hydration. */}
        <script
          async
          src="https://umami.aryan-singh.dev/script.js"
          data-website-id={UMAMI_SITE_ID}
        />
        <script
          async
          src="https://umami.aryan-singh.dev/recorder.js"
          data-website-id={UMAMI_SITE_ID}
        />
      </head>
      <body>
        <Backdrop />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
