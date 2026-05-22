import type { Metadata } from "next";
import Script from "next/script";
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

const SITE_URL = "https://aryan-singh.dev";
const UMAMI_HOST = "https://umami.aryan-singh.dev";
const UMAMI_WEBSITE_ID = "66a4ccd6-e6ea-43f4-a46f-bed24397bc18";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Portfolio`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: profile.name,
    description: profile.tagline,
    url: SITE_URL,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="bg-[color:var(--color-ink)] text-[color:var(--color-bone)] min-h-screen antialiased">
        {children}
        <Script
          src={`${UMAMI_HOST}/script.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
        <Script
          src={`${UMAMI_HOST}/recorder.js`}
          data-website-id={UMAMI_WEBSITE_ID}
          data-sample-rate="0.15"
          data-mask-level="moderate"
          data-max-duration="300000"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
