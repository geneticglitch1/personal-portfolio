import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} Portfolio`,
  description: profile.summary,
  metadataBase: new URL("https://aryan-singh.dev"),
  openGraph: {
    title: `${profile.name} — Systems Engineer`,
    description: profile.tagline,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="bg-[color:var(--color-ink)] text-[color:var(--color-bone)] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
