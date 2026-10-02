import type { Metadata } from "next";
import { Outfit, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../styles/tokens.css";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${plexSans.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
