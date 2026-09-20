import { OG_IMAGE } from "@/lib/seo";
import PageShell from "@/components/layout/PageShell";
import FaqSection from "@/components/faq/FaqSection";
import SectionDivider from "@/components/ui/SectionDivider";
import InquiryForm from "@/components/work-with-me/InquiryForm";
import { personalInfo } from "@/data/portfolio";

export const metadata = {
  title: "Work With Me",
  description:
    "Start a project enquiry: project type, budget, timeline and scope, so the first reply can be a useful one.",
  openGraph: {
    title: "Work With Me",
    description:
      "Start a project enquiry: project type, budget, timeline and scope, so the first reply can be a useful one.",
    type: "website",
    images: [OG_IMAGE],
    url: "/work-with-me",
  },
};

export default function WorkWithMePage() {
  return (
    <PageShell
      eyebrow="Work With Me"
      title="Work With Me"
      headingId="work-with-me-heading"
      lead="A few questions up front so my first reply can be useful rather than a request for more information. If you would rather just say hello, the links in the footer are the better route."
    >
      <section className="section-spacing grid min-w-0 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-medium text-fg sm:text-2xl">
            What happens next
          </h2>
          <ol className="mt-8 border-t border-line/10">
            {[
              {
                title: "You send this form",
                detail:
                  "Project type, budget and timeline tell me quickly whether I am the right fit.",
              },
              {
                title: "I reply within a couple of days",
                detail:
                  "Either with questions worth asking, or an honest note that it is not a good match.",
              },
              {
                title: "We scope it properly",
                detail:
                  "A call to agree what is being built, in what order, and what is out of scope.",
              },
            ].map((step, index) => (
              <li key={step.title} className="flex items-start gap-5 border-b border-line/10 py-7">
                <span
                  aria-hidden="true"
                  className="font-display text-sm leading-7 text-fg-dim tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-fg">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-fg-muted">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm leading-7 text-fg-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-medium text-fg underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-accent"
            >
              {personalInfo.email}
            </a>
          </p>
        </div>

        <div className="min-w-0">
          <InquiryForm />
        </div>
      </section>

      <SectionDivider />

      <FaqSection />
    </PageShell>
  );
}
