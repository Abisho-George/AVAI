import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — Avai school portal",
  description: "Sign in to your school's Avai portal, or open a sample dashboard as principal, teacher or student.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
