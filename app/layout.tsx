import type { Metadata } from "next";
import { Outfit, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../styles/tokens.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Avai",
  description: "What is stopping students from scoring higher?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${plexSans.variable} ${plexMono.variable}`}>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
