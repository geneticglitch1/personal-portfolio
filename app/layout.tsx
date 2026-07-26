import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import "./spreads.css";

const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    "Five projects explained properly: the dry-run gate, the nightly risk pipeline, IO-aware attention tiling, the PCIe copy that vanished, and O(1) coalescing. CS and Math at UIUC.",
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
  themeColor: "#F4F3F0",
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
