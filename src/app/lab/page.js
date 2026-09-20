import { OG_IMAGE } from "@/lib/seo";
import PageShell from "@/components/layout/PageShell";
import LabIndex from "@/components/lab/LabIndex";
import { getEntries, includeDrafts, labCategories } from "@/lib/lab";

const description =
  "Practice projects and experiments: what I built, and what I learned while building it.";

export const metadata = {
  title: "Lab",
  description,
  openGraph: {
    title: "Lab",
    description,
    type: "website",
    images: [OG_IMAGE],
    url: "/lab",
  },
};

export default function LabPage() {
  // Drafts join the listing in `next dev` only, same as /writing.
  const entries = getEntries({ withDrafts: includeDrafts });

  return (
    <PageShell
      eyebrow="Lab"
      title="Lab"
      headingId="lab-heading"
      lead="Practice projects and experiments: what I built, and what I learned while building it."
    >
      <LabIndex entries={entries} categories={labCategories} />
    </PageShell>
  );
}
