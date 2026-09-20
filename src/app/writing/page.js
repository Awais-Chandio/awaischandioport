import Link from "next/link";
import { OG_IMAGE } from "@/lib/seo";
import PageShell from "@/components/layout/PageShell";
import WritingIndex from "@/components/writing/WritingIndex";
import { getPosts, includeDrafts, writingCategories } from "@/lib/writing";

export const metadata = {
  title: "Writing",
  description:
    "Notes on React Native and mobile engineering, build breakdowns of my own projects, and a freelance journal.",
  openGraph: {
    title: "Writing",
    description:
      "Notes on React Native and mobile engineering, build breakdowns of my own projects, and a freelance journal.",
    type: "website",
    images: [OG_IMAGE],
    url: "/writing",
  },
};

export default function WritingPage() {
  // Drafts join the listing in `next dev` only, so the authoring loop does not
  // depend on typing URLs by hand. The production listing never includes them.
  const posts = getPosts({ withDrafts: includeDrafts });

  return (
    <PageShell
      eyebrow="Writing"
      title="Writing"
      headingId="writing-heading"
      lead="Notes on mobile engineering, breakdowns of things I have built, and what freelance work actually looks like week to week."
      headerExtra={
        <p className="mt-4 text-sm text-fg-muted">
          Also see:{" "}
          <Link
            href="/lab"
            className="inline-flex min-h-[44px] items-center font-medium text-accent transition-colors duration-300 hover:text-fg"
          >
            Lab &rarr;
          </Link>
        </p>
      }
    >
      <WritingIndex posts={posts} categories={writingCategories} />
    </PageShell>
  );
}
