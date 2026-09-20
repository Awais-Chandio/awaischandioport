import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { OG_IMAGE } from "@/lib/seo";
import { getPost, getPostSlugs, includeDrafts } from "@/lib/writing";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import "@/styles/article.css";

// Only slugs produced below exist, so a draft 404s in a production build while
// staying reachable in `next dev`.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs({ withDrafts: includeDrafts }).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};

  const title = post.title;
  const url = `/writing/${post.slug}`;

  return {
    title,
    description: post.excerpt,
    // Drafts previewed in dev must never be indexed if they ever leak out.
    robots: post.draft ? { index: false, follow: false } : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.date,
      authors: ["Muhammad Awais"],
      tags: [post.category],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [OG_IMAGE.url],
    },
  };
}

export default function WritingPostPage({ params }) {
  const post = getPost(params.slug);

  if (!post || (post.draft && !includeDrafts)) {
    notFound();
  }

  // Resolved from ids at render time: if a project or service is renamed the
  // label follows, and if one is removed the link disappears rather than 404s.
  const relatedService = post.relatedService
    ? services.find((service) => service.id === post.relatedService)
    : null;
  const relatedProject = post.relatedProject
    ? projects.find((project) => project.id === post.relatedProject)
    : null;

  const related = [
    relatedService && {
      kind: "Service",
      label: relatedService.title,
      href: "/services",
    },
    relatedProject && {
      kind: "Project",
      label: relatedProject.title,
      // Deep link straight into the case study rather than the section.
      href: `/?project=${relatedProject.id}#projects`,
    },
  ].filter(Boolean);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-fg">
      {/* The background and nav come from the root layout. */}
      <div className="container-page relative pb-section pt-28 lg:pt-36">
        <article className="mx-auto w-full max-w-3xl">
          <Link
            href="/writing"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
            All writing
          </Link>

          <header className="mt-8 border-b border-line/10 pb-10 sm:pb-12">
            {post.draft ? (
              <p className="mb-5 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm leading-6 text-accent">
                Draft preview. This post is not published and is not reachable in a
                production build.
              </p>
            ) : null}

            <Badge variant="accent" size="sm">
              {post.category}
            </Badge>

            <h1 className="text-balance mt-6 text-fg">{post.title}</h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fg-dim">
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          <div className="article mt-12 sm:mt-16">
            {/* GFM enables tables, task lists and strikethrough, all of which
                article.css already styles. */}
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {related.length ? (
            <aside
              aria-label="Related"
              className="mt-16 border-t border-line/10 pt-10 sm:mt-20 sm:pt-12"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-dim">
                Referenced in this post
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex min-h-[44px] items-center gap-3 text-sm text-fg-muted transition-colors duration-300 hover:text-accent"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                        {item.kind}
                      </span>
                      <span className="min-w-0 font-medium text-fg group-hover:text-accent">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </article>
      </div>

      <Footer />
    </main>
  );
}
