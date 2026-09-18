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
    >
      <WritingIndex posts={posts} categories={writingCategories} />
    </PageShell>
  );
}
