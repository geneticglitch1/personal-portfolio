import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Newsreader } from "next/font/google";
import "./trace.css";

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
    "The work plotted as a trace: time across, stack depth down, from product to silicon. CUDA kernels, allocators, FPGA offload, and the infrastructure underneath.",
};

export const viewport: Viewport = {
  themeColor: "#0A0C0E",
};

const UMAMI_SITE_ID = "66a4ccd6-e6ea-43f4-a46f-bed24397bc18";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        {/* `async`, not `defer` — React 19 hoists and executes async scripts,
            so these load on parse rather than waiting on hydration. */}
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
      <body>{children}</body>
    </html>
  );
}
