import { getEntries } from "@/lib/lab";
import { getPosts } from "@/lib/writing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

/**
 * Routes only. Home-page sections (#about, #projects, #contact) are deliberately
 * absent: they are fragments of one document, and listing them would offer the
 * same page several times over. Draft posts are excluded because getPosts()
 * filters them by default.
 */
export default function sitemap() {
  const now = new Date();

  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work-with-me", priority: 0.9, changeFrequency: "yearly" },
    { path: "/writing", priority: 0.8, changeFrequency: "weekly" },
    { path: "/lab", priority: 0.6, changeFrequency: "monthly" },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = getPosts().map((post) => ({
    url: `${siteUrl}/writing/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const labEntries = getEntries().map((entry) => ({
    url: `${siteUrl}/lab/${entry.slug}`,
    lastModified: new Date(`${entry.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...routes, ...posts, ...labEntries];
}
