import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { OG_IMAGE } from "@/lib/seo";
import { getEntry, getEntrySlugs, includeDrafts } from "@/lib/lab";
import "@/styles/article.css";

// Only slugs produced below exist, so a draft 404s in a production build while
// staying reachable in `next dev`.
export const dynamicParams = false;

export function generateStaticParams() {
  return getEntrySlugs({ withDrafts: includeDrafts }).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const entry = getEntry(params.slug);
  if (!entry) return {};

  const url = `/lab/${entry.slug}`;

  return {
    title: entry.title,
    description: entry.excerpt,
    robots: entry.draft ? { index: false, follow: false } : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.excerpt,
      type: "article",
      url,
      publishedTime: entry.date,
      authors: ["Muhammad Awais"],
      tags: [entry.category],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.excerpt,
      images: [OG_IMAGE.url],
    },
  };
}

export default function LabEntryPage({ params }) {
  const entry = getEntry(params.slug);

  if (!entry || (entry.draft && !includeDrafts)) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-fg">
      {/* The background and nav come from the root layout. */}
      <div className="container-page relative pb-section pt-28 lg:pt-36">
        <article className="mx-auto w-full max-w-3xl">
          <Link
            href="/lab"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
            All lab entries
          </Link>

          <header className="mt-8 border-b border-line/10 pb-10 sm:pb-12">
            {entry.draft ? (
              <p className="mb-5 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm leading-6 text-accent">
                Draft preview. This entry is not published and is not reachable in a
                production build.
              </p>
            ) : null}

            <Badge variant="accent" size="sm">
              {entry.category}
            </Badge>

            <h1 className="text-balance mt-6 text-fg">{entry.title}</h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fg-dim">
              <time dateTime={entry.date}>{entry.dateLabel}</time>
            </div>

            {entry.stack.length ? (
              <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-2">
                {entry.stack.map((item) => (
                  <li key={item}>
                    <Badge variant="default" size="sm" className="normal-case tracking-normal">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          <div className="article mt-12 sm:mt-16">
            <MDXRemote
              source={entry.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {entry.link ? (
            <div className="mt-12 border-t border-line/10 pt-8">
              <a
                href={entry.link}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-fg transition-colors duration-300 hover:text-accent"
              >
                View project
                <ArrowUpRightIcon aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          ) : null}
        </article>
      </div>

      <Footer />
    </main>
  );
}
