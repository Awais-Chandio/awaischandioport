import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-backed content layer for /lab, mirroring lib/writing.js. Entries are MDX
 * files in `src/content/lab`, so an entry is added by committing a file.
 *
 * Frontmatter: title, slug, date, category, excerpt, draft are the writing
 * fields. `stack` (a list of names) and `link` (a URL) are optional and only
 * render when present.
 */
export const LAB_DIR = path.join(process.cwd(), "src/content/lab");

export const labCategories = ["AI Engineering", "React Native Fundamentals"];

const REQUIRED_FIELDS = ["title", "date", "category", "excerpt"];

// Same rule as Writing: drafts stay out of production, visible in `next dev`.
export const includeDrafts = process.env.NODE_ENV === "development";

const dateLabelFor = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const parseFile = (fileName) => {
  const filePath = path.join(LAB_DIR, fileName);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length) {
    throw new Error(`${fileName} is missing frontmatter: ${missing.join(", ")}`);
  }

  if (!labCategories.includes(data.category)) {
    throw new Error(
      `${fileName} has unknown category "${data.category}". Expected one of: ${labCategories.join(", ")}`
    );
  }

  // gray-matter parses a bare YAML date into a Date; keep it as YYYY-MM-DD.
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);

  return {
    slug: data.slug || fileName.replace(/\.mdx?$/, ""),
    title: data.title,
    date,
    dateLabel: dateLabelFor(date),
    category: data.category,
    excerpt: data.excerpt,
    stack: Array.isArray(data.stack) ? data.stack : [],
    link: data.link || null,
    draft: data.draft === true,
    content,
  };
};

const loadEntries = () => {
  if (!fs.existsSync(LAB_DIR)) return [];

  return fs
    .readdirSync(LAB_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(parseFile)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      // Entries that share a date keep a stable order across builds.
      return a.title.localeCompare(b.title);
    });
};

/** Listing data: no MDX body, so it is safe to hand to a client component. */
export const getEntries = ({ withDrafts = false } = {}) =>
  loadEntries()
    .filter((entry) => withDrafts || !entry.draft)
    .map(({ content, ...meta }) => meta);

export const getEntrySlugs = ({ withDrafts = false } = {}) =>
  loadEntries()
    .filter((entry) => withDrafts || !entry.draft)
    .map((entry) => entry.slug);

export const getEntry = (slug) =>
  loadEntries().find((entry) => entry.slug === slug) || null;
