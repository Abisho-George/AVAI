import type { Metadata } from "next";
import { Outfit, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../styles/tokens.css";
import "./globals.css";
import { MotionObserver } from "@/components/MotionObserver";
import { InteractiveFX } from "@/components/InteractiveFX";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Mono only carries marks and IDs, never above-the-fold copy, so it
// shouldn't compete with the hero text for early bandwidth.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avai.school"),
  title: "Avai",
  description: "What is stopping students from scoring higher?",
  openGraph: {
    siteName: "Avai",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Runs before first paint. Scroll reveals only hide content when the visitor
// allows motion and the browser can reveal it again; if the app never
// hydrates, the class comes off after three seconds so nothing stays hidden.
const MOTION_BOOT = `(function(){try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window))return;var d=document.documentElement;d.classList.add("motion-ready");setTimeout(function(){if(!window.__avaiMotion)d.classList.remove("motion-ready")},3000)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables sit on <html> so the :root tokens in tokens.css can resolve them.
    <html
      lang="en"
      className={`${outfit.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        {children}
        <MotionObserver />
        <InteractiveFX />
      </body>
    </html>
  );
}
