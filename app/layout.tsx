import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Newsreader } from "next/font/google";
import LenisProvider from "@/components/motion/LenisProvider";
import ScrollVelocityProvider from "@/components/motion/ScrollVelocityProvider";
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

export const metadata: Metadata = {
  title: "Aryan Singh — Systems Engineer",
  description:
    "Systems engineer working on CUDA kernels, allocators, FPGA offload, and the infrastructure that keeps them fed. CS and Math at UIUC.",
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
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />

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
        <LenisProvider>
          <ScrollVelocityProvider />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
