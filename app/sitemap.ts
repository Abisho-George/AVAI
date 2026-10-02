import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://avai.school";

const ROUTES = [
  "",
  "/findings",
  "/how-it-works",
  "/roles",
  "/pilot",
  "/trust",
  "/pricing",
  "/about",
  "/contact",
  "/portal",
  "/portal/dashboard",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
