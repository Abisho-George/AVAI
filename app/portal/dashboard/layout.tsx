import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample dashboard — Avai school portal",
  description: "A sample principal dashboard: findings, section comparison, student table and the four limited-evidence states. Public demo, sample data only.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
