import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-backed content layer for /writing. Posts are MDX files in
 * `src/content/writing`, so a post is added by committing a file — there is no
 * database or CMS to keep in sync.
 */
export const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

export const writingCategories = [
  "React Native / Mobile Engineering",
  "Behind the Build",
  "Freelance Journal",
];

const REQUIRED_FIELDS = ["title", "date", "category", "excerpt"];
const WORDS_PER_MINUTE = 200;

// Drafts stay out of the production build entirely, but remain reachable in
// `next dev` so a post can be previewed at its real URL before it is published.
export const includeDrafts = process.env.NODE_ENV === "development";

const readingTimeFor = (content) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

// Formatted on the server so the listing and the post header never disagree
// with the client's locale or timezone.
const dateLabelFor = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const parseFile = (fileName) => {
  const filePath = path.join(WRITING_DIR, fileName);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length) {
    throw new Error(`${fileName} is missing frontmatter: ${missing.join(", ")}`);
  }

  if (!writingCategories.includes(data.category)) {
    throw new Error(
      `${fileName} has unknown category "${data.category}". Expected one of: ${writingCategories.join(", ")}`
    );
  }

  return {
    slug: data.slug || fileName.replace(/\.mdx?$/, ""),
    title: data.title,
    date: data.date,
    dateLabel: dateLabelFor(data.date),
    category: data.category,
    excerpt: data.excerpt,
    // Frontmatter wins when present; otherwise it is derived from the body so
    // the number cannot drift away from the post as it is edited.
    readingTime: data.readingTime || readingTimeFor(content),
    // Cross-links. Both are optional and hold ids, not titles, so a rename in
    // projects.js or services.js cannot silently break the link.
    relatedProject: data.relatedProject || null,
    relatedService: data.relatedService || null,
    draft: data.draft === true,
    content,
  };
};

const loadPosts = () => {
  if (!fs.existsSync(WRITING_DIR)) return [];

  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

/** Listing data: no MDX body, so it is safe to hand to a client component. */
export const getPosts = ({ withDrafts = false } = {}) =>
  loadPosts()
    .filter((post) => withDrafts || !post.draft)
    .map(({ content, ...meta }) => meta);

export const getPostSlugs = ({ withDrafts = false } = {}) =>
  loadPosts()
    .filter((post) => withDrafts || !post.draft)
    .map((post) => post.slug);

export const getPost = (slug) =>
  loadPosts().find((post) => post.slug === slug) || null;

/**
 * Published posts grouped by the project they cover, for the Work section to
 * link out to. Drafts are excluded unconditionally: an unfinished post should
 * never be advertised from a case study, even in development.
 */
export const getPostsByProject = () => {
  const map = {};

  for (const post of getPosts()) {
    if (!post.relatedProject) continue;
    map[post.relatedProject] = map[post.relatedProject] || [];
    map[post.relatedProject].push({
      slug: post.slug,
      title: post.title,
      readingTime: post.readingTime,
    });
  }

  return map;
};
